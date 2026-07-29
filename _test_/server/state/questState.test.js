import { describe, it, expect, vi, beforeEach } from "vitest";
import { QuestState } from "../../../server/state/QuestState.js";

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

describe("QuestState", () => {
  let redis, qs;
  beforeEach(() => { redis = mockRedis(); qs = new QuestState(redis); });

  it("loadActive returns {} for unknown session", async () => {
    expect(await qs.loadActive("unknown")).toEqual({});
  });

  it("saveActive persists quest progress", async () => {
    await qs.saveActive("sess1", "q1", { kills: 5, target: 10 });
    const raw = await redis.hget("player:sess1:quests:active", "q1");
    expect(JSON.parse(raw).kills).toBe(5);
  });

  it("deleteActive removes a quest", async () => {
    await qs.saveActive("sess1", "q1", { kills: 5 });
    await qs.deleteActive("sess1", "q1");
    const result = await qs.loadActive("sess1");
    expect(result).toEqual({});
  });

  it("loadCompleted returns {} for unknown session", async () => {
    expect(await qs.loadCompleted("unknown")).toEqual({});
  });

  it("saveCompleted persists completed quest data", async () => {
    await qs.saveCompleted("sess1", "q1", { completedAt: 1000 });
    const raw = await redis.hget("player:sess1:quests:completed", "q1");
    expect(JSON.parse(raw).completedAt).toBe(1000);
  });
});
