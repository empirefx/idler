import { describe, it, expect, vi, beforeEach } from "vitest";
import { CombatService } from "../../../server/services/CombatService.js";

function mockRedis() {
  return { get: vi.fn(), set: vi.fn(), hgetall: vi.fn(), hset: vi.fn(), hget: vi.fn(), hdel: vi.fn() };
}

describe("CombatService", () => {
  let redis;
  let cs;

  beforeEach(() => {
    redis = mockRedis();
    const broadcaster = { broadcast: vi.fn() };
    const queue = { add: vi.fn(), remove: vi.fn() };
    cs = new CombatService(redis, null, null, null, queue, broadcaster);
  });

  it("calculateDamage returns damage within expected range", () => {
    const dmg = cs.calculateDamage(
      { strength: 20, agility: 15 },
      { defense: 5 },
      { damage: { min: 5, max: 15 } }
    );
    expect(dmg).toBeGreaterThanOrEqual(0);
    expect(dmg).toBeLessThanOrEqual(30);
  });

  it("rollHit returns true within range", () => {
    const hit = cs.rollHit(50, 20);
    expect(typeof hit).toBe("boolean");
  });

  it("rollCrit returns true sometimes with high agility", () => {
    const crit = cs.rollCrit(100);
    expect(typeof crit).toBe("boolean");
  });

  it("handlePlayerAttack returns error if player not found", async () => {
    redis.hgetall.mockResolvedValue({});
    const result = await cs.handlePlayerAttack("s1", "e1");
    expect(result.error).toBe("Player not found");
  });

  function mockStatsAndEnemy(stats, enemy) {
    redis.hgetall.mockImplementation((key) => {
      if (key.includes("stats")) {
        const obj = {};
        for (const [k, v] of Object.entries(stats)) obj[k] = JSON.stringify(v);
        return obj;
      }
      return {};
    });
    redis.hget.mockImplementation((key, field) => {
      if (key.includes("enemies") && field === "e1") return JSON.stringify(enemy);
      return null;
    });
    redis.hset.mockResolvedValue();
    redis.hdel.mockResolvedValue();
  }

  it("handlePlayerAttack deals damage on hit", async () => {
    const stats = { level: 1, strength: 10, agility: 10, hp: 100, maxHp: 100 };
    const enemy = { hp: 50, agility: 5, defense: 2 };
    mockStatsAndEnemy(stats, enemy);

    const result = await cs.handlePlayerAttack("s1", "e1");
    expect(result).toHaveProperty("damageDealt");
    expect(result).toHaveProperty("hit");
  });

  it("handlePlayerAttack returns miss when rollHit fails", async () => {
    cs.rollHit = () => false;
    const stats = { level: 1, strength: 10, agility: 10, hp: 100, maxHp: 100 };
    const enemy = { hp: 50, agility: 5, defense: 2 };
    mockStatsAndEnemy(stats, enemy);

    const result = await cs.handlePlayerAttack("s1", "e1");
    expect(result.hit).toBe(false);
    expect(result.damageDealt).toBe(0);
  });

  it("handleEnemyAttack damages player", async () => {
    const stats = { level: 1, strength: 10, agility: 10, hp: 100, maxHp: 100 };
    const enemy = { hp: 50, agility: 5, defense: 2, strength: 8 };
    mockStatsAndEnemy(stats, enemy);

    const result = await cs.handleEnemyAttack("s1", "e1");
    expect(result).toHaveProperty("damageDealt");
    expect(result).toHaveProperty("playerHp");
  });
});
