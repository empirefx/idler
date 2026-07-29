import { describe, it, expect, vi, beforeEach } from "vitest";
import { PlayerState } from "../../../server/state/PlayerState.js";

function mockRedis() {
  const store = {};
  return {
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
    smembers: vi.fn((key) => Promise.resolve(store[key] ? Object.keys(store[key]) : [])),
    sadd: vi.fn((key, value) => {
      if (!store[key]) store[key] = {};
      store[key][value] = true;
      return Promise.resolve();
    }),
  };
}

describe("PlayerState", () => {
  let redis, ps;
  beforeEach(() => { redis = mockRedis(); ps = new PlayerState(redis); });

  it("load returns null for unknown session", async () => {
    expect(await ps.load("unknown")).toBeNull();
  });

  it("load returns saved stats", async () => {
    await redis.hset("player:sess1:stats", "level", "1");
    await redis.hset("player:sess1:stats", "gold", "100");
    const result = await ps.load("sess1");
    expect(result.level).toBe(1);
    expect(result.gold).toBe(100);
  });

  it("save persists and returns data", async () => {
    await ps.save("sess1", { level: 2, gold: 50 });
    const raw = await redis.hget("player:sess1:stats", "gold");
    expect(JSON.parse(raw)).toBe(50);
  });

  it("loadSkills returns null for missing set", async () => {
    expect(await ps.loadSkills("sess1")).toBeNull();
  });

  it("loadRecipes returns empty for missing set", async () => {
    const result = await ps.loadRecipes("sess1");
    expect(result).toEqual([]);
  });

  it("addRecipe adds to set", async () => {
    await ps.addRecipe("sess1", "recipe_sword");
    const result = await ps.loadRecipes("sess1");
    expect(result).toContain("recipe_sword");
  });
});
