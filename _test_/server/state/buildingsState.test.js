import { describe, it, expect, vi, beforeEach } from "vitest";
import { BuildingsState } from "../../../server/state/BuildingsState.js";

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

describe("BuildingsState", () => {
  let redis, bs;
  beforeEach(() => { redis = mockRedis(); bs = new BuildingsState(redis); });

  it("loadAll returns {} for unknown session", async () => {
    expect(await bs.loadAll("unknown")).toEqual({});
  });

  it("loadAll returns parsed buildings", async () => {
    const bld = { id: "mine", level: 2 };
    await redis.hset("player:sess1:buildings", "mine", JSON.stringify(bld));
    const result = await bs.loadAll("sess1");
    expect(result.mine.level).toBe(2);
  });

  it("save persists a building", async () => {
    const bld = { id: "forge", level: 1 };
    await bs.save("sess1", "forge", bld);
    const raw = await redis.hget("player:sess1:buildings", "forge");
    expect(JSON.parse(raw).id).toBe("forge");
  });

  it("delete removes a building", async () => {
    await bs.save("sess1", "mine", { id: "mine" });
    await bs.delete("sess1", "mine");
    const result = await bs.loadAll("sess1");
    expect(result).toEqual({});
  });
});
