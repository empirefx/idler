import { describe, it, expect, vi, beforeEach } from "vitest";
import { SocketsState } from "../../../server/state/SocketsState.js";

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

describe("SocketsState", () => {
  let redis, ss;
  beforeEach(() => { redis = mockRedis(); ss = new SocketsState(redis); });

  it("loadAll returns {} for unknown session", async () => {
    expect(await ss.loadAll("unknown")).toEqual({});
  });

  it("loadAll returns parsed socket state", async () => {
    await redis.hset("player:sess1:sockets", "village_center:1", JSON.stringify({ status: "empty" }));
    const result = await ss.loadAll("sess1");
    expect(result["village_center:1"]).toEqual({ status: "empty" });
  });

  it("save persists socket state", async () => {
    await ss.save("sess1", "village_center:1", { status: "empty" });
    const raw = await redis.hget("player:sess1:sockets", "village_center:1");
    expect(JSON.parse(raw)).toEqual({ status: "empty" });
  });

  it("delete removes socket state", async () => {
    await ss.save("sess1", "village_center:1", { status: "empty" });
    await ss.delete("sess1", "village_center:1");
    const result = await ss.loadAll("sess1");
    expect(result).toEqual({});
  });
});
