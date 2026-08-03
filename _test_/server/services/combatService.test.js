import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CombatService } from "../../../server/services/CombatService.js";

function mockRedis() {
  const store = {};
  return {
    get: vi.fn(),
    set: vi.fn(),
    expire: vi.fn(),
    del: vi.fn(),
    exists: vi.fn(),
    hget: vi.fn((key, field) => {
      const hash = store[key] || {};
      return Promise.resolve(hash[field] || null);
    }),
    hset: vi.fn((key, field, value) => {
      if (!store[key]) store[key] = {};
      store[key][field] = value;
      return Promise.resolve("OK");
    }),
    hgetall: vi.fn((key) => Promise.resolve(store[key] || {})),
    hdel: vi.fn((key, field) => {
      if (store[key]) delete store[key][field];
      return Promise.resolve(1);
    }),
    sadd: vi.fn(),
    smembers: vi.fn(),
  };
}

function seedPlayer(redis, sessionId, overrides = {}) {
  const base = {
    level: 1, gold: 0, exp: 0, expToNext: 100,
    hp: 150, maxHp: 150, attackCooldown: 1000,
    stats: { strength: 20, defense: 0, agility: 20, vitality: 10, intelligence: 10, wisdom: 0 },
    currentPlaceId: "forest_edge", lastAttackTime: 0,
    activeBuffs: [], activeCooldowns: {}, pausedCooldowns: {}, skillJobIds: {},
    autoCombat: false, isDead: false,
    ...overrides,
  };
  for (const [k, v] of Object.entries(base)) {
    redis.hset(`player:${sessionId}:stats`, k, JSON.stringify(v));
  }
}

function seedEnemy(redis, sessionId, enemyId, overrides = {}) {
  const enemy = {
    id: enemyId, placeId: "forest_edge", name: "Forest Beast",
    hp: 30, maxHp: 30, strength: 5, defense: 0, agility: 0, attack: 5,
    attackDelayRange: [100, 200], exp: 15, gold: 5,
    ...overrides,
  };
  redis.hset(`player:${sessionId}:enemies`, enemyId, JSON.stringify(enemy));
}

function seedWeapon(redis, sessionId, weapon = { id: "sword1", name: "Rusty Shortblade", type: "main-weapon", damageType: "physical" }) {
  redis.hset(`player:${sessionId}:inventory`, "player", JSON.stringify({
    id: "player",
    type: "player",
    equipment: { "main-weapon": weapon },
  }));
}

function setup() {
  const redis = mockRedis();
  const playerState = {
    load: (s) => {
      return redis.hgetall(`player:${s}:stats`).then((raw) => {
        const out = {};
        for (const [k, v] of Object.entries(raw)) out[k] = JSON.parse(v);
        return out;
      });
    },
    save: (s, data) => {
      for (const [k, v] of Object.entries(data)) redis.hset(`player:${s}:stats`, k, JSON.stringify(v));
      return Promise.resolve();
    },
    loadSkills: () => Promise.resolve({}),
    saveSkills: () => Promise.resolve(),
  };
  const inventoryState = {
    load: (s, field) => redis.hget(`player:${s}:inventory`, field).then((raw) => raw ? JSON.parse(raw) : null),
    loadAll: (s) => redis.hgetall(`player:${s}:inventory`),
  };
  const enemyState = {
    load: (s, id) => redis.hget(`player:${s}:enemies`, id).then((raw) => raw ? JSON.parse(raw) : null),
    save: (s, id, data) => redis.hset(`player:${s}:enemies`, id, JSON.stringify(data)),
    delete: (s, id) => redis.hdel(`player:${s}:enemies`, id),
    loadAll: (s) => redis.hgetall(`player:${s}:enemies`).then((raw) => {
      const out = {};
      for (const [k, v] of Object.entries(raw)) out[k] = JSON.parse(v);
      return out;
    }),
    clearAll: () => Promise.resolve(),
  };
  const enemyAttackQueue = { add: vi.fn(), remove: vi.fn() };
  const playerAttackQueue = { add: vi.fn().mockResolvedValue({ id: "pa-1" }), remove: vi.fn() };
  const spawnQueue = { add: vi.fn(), remove: vi.fn() };
  const broadcaster = { broadcast: vi.fn() };
  const cs = new CombatService(redis, playerState, inventoryState, enemyState, enemyAttackQueue, playerAttackQueue, spawnQueue, broadcaster);
  return { redis, playerState, inventoryState, enemyState, enemyAttackQueue, playerAttackQueue, spawnQueue, broadcaster, cs };
}

describe("CombatService", () => {
  let ctx;
  const SID = "s1";

  beforeEach(() => {
    ctx = setup();
    vi.spyOn(Math, "random").mockReturnValue(0); // deterministic: always hit, never crit
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("computeAndBroadcastDerivedStats broadcasts and persists derivedStats", async () => {
    seedPlayer(ctx.redis, SID);
    const result = await ctx.cs.computeAndBroadcastDerivedStats(SID);
    expect(result.success).toBe(true);
    const player = await ctx.playerState.load(SID);
    expect(player.derivedStats).toMatchObject({ damageType: "physical", defense: 0 });
    expect(player.derivedStats.maxHealth).toBeUndefined();
    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith(SID, "DIFF", {
      path: "player.derivedStats",
      data: expect.objectContaining({ damageType: "physical" }),
    });
  });

  it("startAutoCombat sets autoCombat and enqueues the player-attack job", async () => {
    seedPlayer(ctx.redis, SID);
    const result = await ctx.cs.startAutoCombat(SID);
    expect(result.success).toBe(true);
    const player = await ctx.playerState.load(SID);
    expect(player.autoCombat).toBe(true);
    expect(ctx.playerAttackQueue.add).toHaveBeenCalledWith(
      "player-attack",
      { sessionId: SID },
      expect.objectContaining({ delay: 0, jobId: expect.stringContaining("player-attack-"), removeOnComplete: true }),
    );
    expect(player.attackJobId).toBe("pa-1");
  });

  it("startAutoCombat is a no-op when already active (spam-click safe)", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true });
    const result = await ctx.cs.startAutoCombat(SID);
    expect(result).toEqual({ success: true, alreadyActive: true });
    expect(ctx.playerAttackQueue.add).not.toHaveBeenCalled();
    expect(ctx.broadcaster.broadcast).not.toHaveBeenCalledWith(SID, "DIFF", { path: "player.autoCombat", data: true });
  });

  it("startAutoCombat is refused while the player is dead", async () => {
    seedPlayer(ctx.redis, SID, { isDead: true, autoCombat: false });
    const result = await ctx.cs.startAutoCombat(SID);
    expect(result.error).toBe("Player is dead");
    expect(ctx.playerAttackQueue.add).not.toHaveBeenCalled();
  });

  it("startAutoCombat schedules one skill-activation job per ranked active skill", async () => {
    seedPlayer(ctx.redis, SID);
    seedWeapon(ctx.redis, SID);
    ctx.playerState.loadSkills = () => Promise.resolve({ warCry: 1, shieldBash: 2, ironSkin: 1 });
    await ctx.cs.startAutoCombat(SID);
    const skillCalls = ctx.playerAttackQueue.add.mock.calls.filter((c) => c[0] === "skill-activation");
    expect(skillCalls).toHaveLength(2); // warCry + shieldBash, passives excluded
    expect(skillCalls.map((c) => c[1])).toEqual([
      { sessionId: SID, skillId: "warCry" },
      { sessionId: SID, skillId: "shieldBash" },
    ]);
    const player = await ctx.playerState.load(SID);
    expect(Object.keys(player.skillJobIds)).toEqual(["warCry", "shieldBash"]);
  });

  it("stopAutoCombat sets autoCombat false, removes attack + skill jobs, and pauses cooldowns", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true, attackJobId: "atk-1", skillJobIds: { warCry: "sk-1" } });
    const result = await ctx.cs.stopAutoCombat(SID);
    expect(result.success).toBe(true);
    const player = await ctx.playerState.load(SID);
    expect(player.autoCombat).toBe(false);
    expect(player.attackJobId).toBeNull();
    expect(player.skillJobIds).toEqual({});
    expect(ctx.playerAttackQueue.remove).toHaveBeenCalledWith("atk-1");
    expect(ctx.playerAttackQueue.remove).toHaveBeenCalledWith("sk-1");
  });

  it("handlePlayerAttackJob deals damage and re-enqueues when auto-combat is on", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true });
    seedEnemy(ctx.redis, SID, "e1", { hp: 100 });

    const result = await ctx.cs.handlePlayerAttackJob(SID);

    expect(result.damageDealt).toBeGreaterThan(0);
    expect(result.hit).toBe(true);
    expect(result.skillId).toBeNull();
    const enemy = await ctx.enemyState.load(SID, "e1");
    expect(enemy.hp).toBeLessThan(100);
    expect(ctx.playerAttackQueue.add).toHaveBeenCalledWith(
      "player-attack",
      { sessionId: SID },
      expect.objectContaining({ jobId: expect.stringContaining("player-attack-"), removeOnComplete: true }),
    );
  });

  it("handlePlayerAttackJob no-ops when auto-combat is off or player dead", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: false });
    seedEnemy(ctx.redis, SID, "e1");
    const off = await ctx.cs.handlePlayerAttackJob(SID);
    expect(off.skipped).toBe(true);
    expect(ctx.playerAttackQueue.add).not.toHaveBeenCalled();

    await ctx.playerState.save(SID, { autoCombat: true, isDead: true });
    const dead = await ctx.cs.handlePlayerAttackJob(SID);
    expect(dead.skipped).toBe(true);
    expect(ctx.playerAttackQueue.add).not.toHaveBeenCalled();
  });

  it("handlePlayerAttackJob grants exp/gold and deletes the enemy on kill", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true });
    seedEnemy(ctx.redis, SID, "e1", { hp: 5 });

    const result = await ctx.cs.handlePlayerAttackJob(SID);
    expect(result.enemyDead).toBe(true);
    expect(result.expGained).toBe(15);
    expect(result.goldGained).toBe(5);
    const enemy = await ctx.enemyState.load(SID, "e1");
    expect(enemy).toBeNull();
    const player = await ctx.playerState.load(SID);
    expect(player.exp).toBe(15);
    expect(player.gold).toBe(5);
  });

  it("schedules respawn when the last alive enemy is killed", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true });
    seedEnemy(ctx.redis, SID, "e1", { hp: 5 });

    await ctx.cs.handlePlayerAttackJob(SID);
    expect(ctx.spawnQueue.add).toHaveBeenCalledWith(
      "enemy-spawn",
      { sessionId: SID, placeId: "forest_edge" },
      { delay: 5000 }, // forest_edge respawnDelay = 5 seconds
    );
    expect(ctx.playerAttackQueue.add).not.toHaveBeenCalled(); // chain paused until respawn
  });

  it("broadcasts the kill COMBAT_DIFF when the last alive enemy is killed", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true });
    seedEnemy(ctx.redis, SID, "e1", { hp: 5 });

    await ctx.cs.handlePlayerAttackJob(SID);
    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith(
      SID,
      "COMBAT_DIFF",
      expect.objectContaining({ enemyDead: true, expGained: 15, goldGained: 5 }),
    );
  });

  it("handleSkillActivationJob applies a time-based buff for ACTIVE_BUFF skills", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true });
    seedEnemy(ctx.redis, SID, "e1", { hp: 100 });
    seedWeapon(ctx.redis, SID);
    ctx.playerState.loadSkills = () => Promise.resolve({ warCry: 1 });
    const before = Date.now();

    const result = await ctx.cs.handleSkillActivationJob(SID, "warCry");
    expect(result.skillId).toBe("warCry");
    expect(result.skillType).toBe("active_buff");
    expect(result.damageDealt).toBe(0);
    expect(result.buff).toMatchObject({ skillId: "warCry", stat: "strength", value: 8 });
    expect(result.buff.expiresAt).toBeGreaterThanOrEqual(before + 2000);
    expect(result.buff.expiresAt).toBeLessThan(before + 3000);

    const player = await ctx.playerState.load(SID);
    expect(player.activeBuffs).toEqual([expect.objectContaining({ skillId: "warCry", stat: "strength", value: 8 })]);
    expect(player.activeCooldowns.warCry).toBeGreaterThan(before);

    expect(ctx.playerAttackQueue.add).toHaveBeenCalledWith(
      "skill-activation",
      { sessionId: SID, skillId: "warCry" },
      expect.objectContaining({ delay: 15000, jobId: expect.stringContaining("skill-activation-s1-warCry-"), removeOnComplete: true }),
    );
  });

  it("handleSkillActivationJob deals damage for ACTIVE_DAMAGE skills", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true });
    seedEnemy(ctx.redis, SID, "e1", { hp: 100 });
    seedWeapon(ctx.redis, SID);
    ctx.playerState.loadSkills = () => Promise.resolve({ shieldBash: 1 });

    const result = await ctx.cs.handleSkillActivationJob(SID, "shieldBash");
    expect(result.skillId).toBe("shieldBash");
    expect(result.skillType).toBe("active_damage");
    expect(result.damageDealt).toBeGreaterThan(0);
    const enemy = await ctx.enemyState.load(SID, "e1");
    expect(enemy.hp).toBeLessThan(100);
  });

  it("handleSkillActivationJob skips but re-enqueues when no enemies are present", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true });
    seedWeapon(ctx.redis, SID);
    ctx.playerState.loadSkills = () => Promise.resolve({ warCry: 1 });

    const result = await ctx.cs.handleSkillActivationJob(SID, "warCry");
    expect(result.skipped).toBe(true);
    expect(result.reason).toBe("no enemies");
    expect(ctx.playerAttackQueue.add).toHaveBeenCalledWith(
      "skill-activation",
      { sessionId: SID, skillId: "warCry" },
      expect.objectContaining({ delay: 15000 }),
    );
  });

  it("handleSkillActivationJob no-ops without re-enqueue when auto-combat is off", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: false });
    seedEnemy(ctx.redis, SID, "e1");
    seedWeapon(ctx.redis, SID);
    ctx.playerState.loadSkills = () => Promise.resolve({ warCry: 1 });

    const result = await ctx.cs.handleSkillActivationJob(SID, "warCry");
    expect(result.skipped).toBe(true);
    expect(ctx.playerAttackQueue.add).not.toHaveBeenCalled();
  });

  it("revive heals to full, clears isDead, re-seeds enemy attacks and restarts auto-combat", async () => {
    seedPlayer(ctx.redis, SID, { hp: 0, isDead: true, autoCombat: true });
    seedEnemy(ctx.redis, SID, "e1", { hp: 30 });

    const result = await ctx.cs.revive(SID);
    expect(result.success).toBe(true);
    const player = await ctx.playerState.load(SID);
    expect(player.hp).toBe(player.maxHp);
    expect(player.isDead).toBe(false);
    expect(ctx.enemyAttackQueue.add).toHaveBeenCalledWith(
      "enemy-attack",
      { sessionId: SID, enemyId: "e1" },
      expect.objectContaining({ delay: expect.any(Number) }),
    );
    expect(ctx.playerAttackQueue.add).toHaveBeenCalled();
  });

  it("revive is refused when the player is not dead", async () => {
    seedPlayer(ctx.redis, SID, { hp: 150, isDead: false });
    const result = await ctx.cs.revive(SID);
    expect(result.error).toBe("Player is not dead");
  });

  it("handleEnemyAttack skips and removes the enemy when the player has left its place", async () => {
    seedPlayer(ctx.redis, SID, { hp: 100, currentPlaceId: "village_center" });
    seedEnemy(ctx.redis, SID, "e1", { placeId: "forest_edge", hp: 30 });

    const result = await ctx.cs.handleEnemyAttack(SID, "e1");
    expect(result.skipped).toBe(true);
    const player = await ctx.playerState.load(SID);
    expect(player.hp).toBe(100);
    expect(await ctx.enemyState.load(SID, "e1")).toBeNull();
  });

  it("levelUp applies bonuses and advances the level when exp suffices", async () => {
    seedPlayer(ctx.redis, SID, { exp: 150, expToNext: 100 });
    const result = await ctx.cs.levelUp(SID, { strength: 1, vitality: 3 });
    expect(result.success).toBe(true);
    const player = await ctx.playerState.load(SID);
    expect(player.level).toBe(2);
    expect(player.expToNext).toBe(200);
    expect(player.exp).toBe(50); // 150 - 100
    expect(player.skillPoints).toBe(1);
    expect(player.stats.strength).toBe(21);
    expect(player.stats.vitality).toBe(13);
    expect(player.maxHp).toBe(130); // 13 * 10
  });

  it("levelUp is refused without enough exp", async () => {
    seedPlayer(ctx.redis, SID, { exp: 50, expToNext: 100 });
    const result = await ctx.cs.levelUp(SID, {});
    expect(result.error).toBe("Not enough exp");
  });

  it("levelUp clamps oversized bonuses and ignores unknown/negative keys", async () => {
    seedPlayer(ctx.redis, SID, { exp: 150, expToNext: 100 });
    const result = await ctx.cs.levelUp(SID, { strength: 9999, defense: 10, agility: -5, vitality: 3, intelligence: 99 });
    expect(result.success).toBe(true);
    const player = await ctx.playerState.load(SID);
    expect(player.stats.strength).toBe(21); // +1 cap
    expect(player.stats.defense).toBe(2); // +2 cap
    expect(player.stats.agility).toBe(20); // negative ignored
    expect(player.stats.vitality).toBe(13); // +3 cap
    expect(player.stats.intelligence).toBe(10); // ignored unknown
  });

  it("pauseSkillCooldowns converts timestamps to remaining ms", async () => {
    seedPlayer(ctx.redis, SID, { activeCooldowns: { shieldBash: Date.now() + 5000 } });
    const result = await ctx.cs.pauseSkillCooldowns(SID);
    expect(result.success).toBe(true);
    expect(result.pausedCooldowns.shieldBash).toBeGreaterThan(4000);
    expect(result.pausedCooldowns.shieldBash).toBeLessThan(6000);
    const player = await ctx.playerState.load(SID);
    expect(player.activeCooldowns).toEqual({});
  });

  it("pauseSkillCooldowns drops expired cooldowns", async () => {
    seedPlayer(ctx.redis, SID, { activeCooldowns: { warCry: Date.now() - 1000, shieldBash: Date.now() + 5000 } });
    const result = await ctx.cs.pauseSkillCooldowns(SID);
    expect(result.pausedCooldowns.warCry).toBeUndefined();
    expect(result.pausedCooldowns.shieldBash).toBeGreaterThan(4000);
  });

  it("pauseSkillCooldowns is a no-op when nothing is active", async () => {
    seedPlayer(ctx.redis, SID, { activeCooldowns: {}, pausedCooldowns: { warCry: 1000 } });
    const result = await ctx.cs.pauseSkillCooldowns(SID);
    expect(result.success).toBe(true);
    expect(ctx.broadcaster.broadcast).not.toHaveBeenCalledWith(SID, "DIFF", { path: "player.pausedCooldowns", data: expect.anything() });
    const player = await ctx.playerState.load(SID);
    expect(player.pausedCooldowns.warCry).toBe(1000);
  });

  it("resumeSkillCooldowns restores now + remaining and clears pausedCooldowns", async () => {
    seedPlayer(ctx.redis, SID, { pausedCooldowns: { shieldBash: 5000 } });
    const before = Date.now();
    const result = await ctx.cs.resumeSkillCooldowns(SID);
    expect(result.success).toBe(true);
    expect(result.activeCooldowns.shieldBash).toBeGreaterThanOrEqual(before + 5000);
    const player = await ctx.playerState.load(SID);
    expect(player.pausedCooldowns).toEqual({});
    expect(player.activeCooldowns.shieldBash).toBeGreaterThanOrEqual(before + 5000);
  });

  it("stopAutoCombat pauses active cooldowns", async () => {
    seedPlayer(ctx.redis, SID, { autoCombat: true, activeCooldowns: { shieldBash: Date.now() + 8000 } });
    await ctx.cs.startAutoCombat(SID);
    await ctx.cs.stopAutoCombat(SID);
    const player = await ctx.playerState.load(SID);
    expect(player.autoCombat).toBe(false);
    expect(player.activeCooldowns).toEqual({});
    expect(player.pausedCooldowns.shieldBash).toBeGreaterThan(7000);
  });

  it("startAutoCombat resumes paused cooldowns", async () => {
    seedPlayer(ctx.redis, SID, { pausedCooldowns: { shieldBash: 5000 } });
    const before = Date.now();
    await ctx.cs.startAutoCombat(SID);
    const player = await ctx.playerState.load(SID);
    expect(player.activeCooldowns.shieldBash).toBeGreaterThanOrEqual(before + 5000);
    expect(player.pausedCooldowns).toEqual({});
  });

  it("handleEnemyAttack pauses cooldowns, removes jobs, and clears job ids when the player dies", async () => {
    seedPlayer(ctx.redis, SID, { hp: 10, activeCooldowns: { shieldBash: Date.now() + 8000 }, attackJobId: "atk-1", skillJobIds: { warCry: "sk-1" } });
    seedEnemy(ctx.redis, SID, "e1", { strength: 50, attack: 50, agility: 10 });
    const result = await ctx.cs.handleEnemyAttack(SID, "e1");
    expect(result.playerDead).toBe(true);
    const player = await ctx.playerState.load(SID);
    expect(player.isDead).toBe(true);
    expect(player.autoCombat).toBe(false);
    expect(player.activeCooldowns).toEqual({});
    expect(player.pausedCooldowns.shieldBash).toBeGreaterThan(7000);
    expect(player.attackJobId).toBeNull();
    expect(player.skillJobIds).toEqual({});
    expect(ctx.playerAttackQueue.remove).toHaveBeenCalledWith("atk-1");
    expect(ctx.playerAttackQueue.remove).toHaveBeenCalledWith("sk-1");
  });
});
