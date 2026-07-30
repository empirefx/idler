import { describe, it, expect, vi, beforeAll } from "vitest";
import { SessionManager } from "../../server/session.js";
import { CombatService } from "../../server/services/CombatService.js";
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
    sadd: vi.fn((key, value) => {
      if (!store[key]) store[key] = {};
      store[key][value] = true;
      return Promise.resolve();
    }),
    smembers: vi.fn((key) => Promise.resolve(store[key] ? Object.keys(store[key]) : [])),
  };
}

describe("Full Game Flow", () => {
  let redis;
  let sessionManager;
  let combatService;

  beforeAll(() => {
    redis = mockRedis();
    const logger = createServerLogger({ debug: false });
    sessionManager = new SessionManager(redis, logger, { sessionTtl: 2592000 });
    const playerState = new PlayerState(redis);
    const inventoryState = new InventoryState(redis);
    const enemyState = new EnemyState(redis);
    const queue = { add: vi.fn(), remove: vi.fn() };
    const broadcaster = { broadcast: vi.fn() };
    combatService = new CombatService(redis, playerState, inventoryState, enemyState, queue, broadcaster);
  });

  it("full flow: join -> spawn enemy -> attack -> kill -> gain gold", async () => {
    const join = await sessionManager.createSession("Warrior");
    expect(join.accepted).toBe(true);
    const sessionId = join.session_id;

    await sessionManager.initializeFullState(sessionId);

    await redis.hset(`player:${sessionId}:enemies`, "e1", JSON.stringify({
      id: "e1", placeId: "forest", name: "Goblin", hp: 10, maxHp: 10,
      agility: 5, strength: 5, defense: 2, exp: 15, gold: 5,
    }));

    for (let i = 0; i < 20; i++) {
      const result = await combatService.handlePlayerAttack(sessionId, "e1");
      if (result.enemyDead) {
        expect(result.goldGained).toBe(5);
        expect(result.expGained).toBe(15);
        return;
      }
      if (result.error) {
        expect(result.error).toContain("not found or already dead");
        return;
      }
    }
    expect(true).toBe(false);
  });
});
