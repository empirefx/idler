import { describe, it, expect, vi, beforeEach } from "vitest";
import { SessionManager } from "../../server/session.js";
import { CombatService } from "../../server/services/CombatService.js";
import { SkillsService } from "../../server/services/SkillsService.js";
import { SpawnService } from "../../server/services/SpawnService.js";
import { PlayerState } from "../../server/state/PlayerState.js";
import { InventoryState } from "../../server/state/InventoryState.js";
import { EnemyState } from "../../server/state/EnemyState.js";
import { createServerLogger } from "../../server/logger.js";

function mockRedis() {
  const store = {};
  return {
    get: vi.fn((key) => Promise.resolve(store[key] || null)),
    set: vi.fn((key, value) => { store[key] = value; return Promise.resolve("OK"); }),
    exists: vi.fn((key) => Promise.resolve(key in store ? 1 : 0)),
    del: vi.fn((key) => { delete store[key]; return Promise.resolve(1); }),
    expire: vi.fn(() => Promise.resolve(1)),
    hget: vi.fn((key, field) => {
      const hash = store[key] || {};
      return Promise.resolve(hash[field] || null);
    }),
    hset: vi.fn((key, field, value) => {
      if (!store[key]) store[key] = {};
      store[key][field] = value;
      return Promise.resolve();
    }),
    hgetall: vi.fn((key) => Promise.resolve(store[key] || {})),
    hdel: vi.fn((key, field) => {
      if (store[key]) delete store[key][field];
      return Promise.resolve();
    }),
    sadd: vi.fn(),
    smembers: vi.fn(() => Promise.resolve([])),
  };
}

describe("Full Game Flow", () => {
  let redis, sessionManager, combatService, spawnService, skillsService, playerState, inventoryState, broadcaster;
  const queues = { enemyAttackQueue: {}, playerAttackQueue: {}, spawnQueue: {} };

  beforeEach(() => {
    redis = mockRedis();
    const logger = createServerLogger({ debug: false });
    sessionManager = new SessionManager(redis, logger, { sessionTtl: 2592000 });
    playerState = new PlayerState(redis);
    inventoryState = new InventoryState(redis);
    const enemyState = new EnemyState(redis);
    queues.enemyAttackQueue = { add: vi.fn().mockResolvedValue({ id: "ea-1" }), remove: vi.fn() };
    queues.playerAttackQueue = { add: vi.fn().mockResolvedValue({ id: "pa-1" }), remove: vi.fn() };
    queues.spawnQueue = { add: vi.fn().mockResolvedValue({ id: "sp-1" }), remove: vi.fn() };
    broadcaster = { broadcast: vi.fn() };
    combatService = new CombatService(redis, playerState, inventoryState, enemyState, queues.enemyAttackQueue, queues.playerAttackQueue, queues.spawnQueue, broadcaster);
    skillsService = new SkillsService(redis, playerState, inventoryState, broadcaster);
    spawnService = new SpawnService(redis, enemyState, queues.spawnQueue, queues.enemyAttackQueue, queues.playerAttackQueue, playerState, broadcaster);
  });

  it("full flow: join -> spawn -> auto-combat on -> kill wave -> respawn scheduled -> revive path", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const join = await sessionManager.createSession("Warrior");
    expect(join.accepted).toBe(true);
    const sessionId = join.session_id;
    await sessionManager.initializeFullState(sessionId);

    // Navigate the player to a spawning place and spawn a wave (enemies always attack => jobs seeded)
    await playerState.save(sessionId, { currentPlaceId: "forest_edge" });
    await spawnService.triggerSpawn(sessionId, "forest_edge");
    expect(queues.enemyAttackQueue.add).toHaveBeenCalledWith(
      "enemy-attack",
      expect.objectContaining({ sessionId }),
      expect.objectContaining({ delay: expect.any(Number) }),
    );

    // Enable auto-combat; the player chain is enqueued.
    await combatService.startAutoCombat(sessionId);
    expect(queues.playerAttackQueue.add).toHaveBeenCalledWith(
      "player-attack",
      { sessionId },
      expect.objectContaining({ jobId: expect.stringContaining("player-attack-"), removeOnComplete: true }),
    );

    // Run the player-attack job until the enemy dies.
    let result;
    for (let i = 0; i < 30; i++) {
      result = await combatService.handlePlayerAttackJob(sessionId);
      if (result.enemyDead) break;
    }
    expect(result.enemyDead).toBe(true);
    expect(result.goldGained).toBeGreaterThan(0);
    expect(result.expGained).toBeGreaterThan(0);

    // Last enemy killed => respawn job scheduled with respawnDelay (5s).
    expect(queues.spawnQueue.add).toHaveBeenCalledWith(
      "enemy-spawn",
      { sessionId, placeId: "forest_edge" },
      { delay: 5000 },
    );

    // Player chain paused (no re-enqueue after kill).
    const callsAfterKill = queues.playerAttackQueue.add.mock.calls.length;
    await combatService.handlePlayerAttackJob(sessionId);
    expect(queues.playerAttackQueue.add.mock.calls.length).toBe(callsAfterKill);

    vi.restoreAllMocks();
  });

  it("skill flow: spend -> buff fires via skill job -> cooldowns pause on stop", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    const join = await sessionManager.createSession("Skiller");
    expect(join.accepted).toBe(true);
    const sessionId = join.session_id;
    await sessionManager.initializeFullState(sessionId);

    // Seed a physical weapon + a skill point, then spend it.
    await inventoryState.save(sessionId, "player", {
      id: "player",
      type: "player",
      maxSlots: 40,
      maxWeight: 50,
      items: [],
      equipment: { "main-weapon": { id: "sword1", name: "Rusty Shortblade", type: "main-weapon", damageType: "physical" } },
    });
    await playerState.save(sessionId, { skillPoints: 1 });

    const spent = await skillsService.spendSkillPoint(sessionId, "warCry");
    expect(spent.success).toBe(true);
    expect(spent.skills.warCry).toBe(1);
    expect(spent.skillPoints).toBe(0);
    expect(broadcaster.broadcast).toHaveBeenCalledWith(sessionId, "DIFF", {
      path: "player.skills",
      data: { warCry: 1 },
    });
    expect(broadcaster.broadcast).toHaveBeenCalledWith(sessionId, "DIFF", {
      path: "player.skillPoints",
      data: 0,
    });

    // Navigate to a spawning place, spawn enemies, enable auto-combat.
    await playerState.save(sessionId, { currentPlaceId: "forest_edge" });
    await spawnService.triggerSpawn(sessionId, "forest_edge");
    await combatService.startAutoCombat(sessionId);

    // startAutoCombat schedules a dedicated skill-activation job for warCry.
    expect(queues.playerAttackQueue.add).toHaveBeenCalledWith(
      "skill-activation",
      { sessionId, skillId: "warCry" },
      expect.objectContaining({ jobId: expect.stringContaining(`skill-activation-${sessionId}-warCry-`), removeOnComplete: true }),
    );

    // Firing the skill-activation job applies the buff and sets its cooldown.
    const buffResult = await combatService.handleSkillActivationJob(sessionId, "warCry");
    expect(buffResult.skillId).toBe("warCry");
    expect(buffResult.skillType).toBe("active_buff");
    expect(buffResult.buff).toMatchObject({ skillId: "warCry", stat: "strength", value: 8 });

    const afterBuff = await playerState.load(sessionId);
    expect(afterBuff.activeBuffs).toEqual([expect.objectContaining({ skillId: "warCry", duration: 2 })]);
    expect(afterBuff.activeCooldowns.warCry).toBeGreaterThan(Date.now());

    // Stopping auto-combat pauses the cooldown.
    await combatService.stopAutoCombat(sessionId);
    const afterStop = await playerState.load(sessionId);
    expect(afterStop.autoCombat).toBe(false);
    expect(afterStop.activeCooldowns).toEqual({});
    expect(afterStop.pausedCooldowns.warCry).toBeGreaterThan(0);

    vi.restoreAllMocks();
  });
});
