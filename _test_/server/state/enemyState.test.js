import { describe, it, expect, vi, beforeEach } from "vitest";
import { EnemyState } from "../../../server/state/EnemyState.js";

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
    hdel: vi.fn((key, field) => {
      if (store[key]) delete store[key][field];
      return Promise.resolve();
    }),
  };
}

describe("EnemyState", () => {
  let redis, es;
  beforeEach(() => { redis = mockRedis(); es = new EnemyState(redis); });

  it("loadAll returns {} for unknown session", async () => {
    expect(await es.loadAll("unknown")).toEqual({});
  });

  it("load returns null for unknown enemy", async () => {
    expect(await es.load("sess1", "e1")).toBeNull();
  });

  it("save/load round-trips enemy data", async () => {
    const data = { id: "goblin", hp: 50 };
    await es.save("sess1", "e1", data);
    const result = await es.load("sess1", "e1");
    expect(result.hp).toBe(50);
  });

  it("delete removes an enemy", async () => {
    await es.save("sess1", "e1", { id: "goblin" });
    await es.delete("sess1", "e1");
    const result = await es.loadAll("sess1");
    expect(result).toEqual({});
  });
});
