import { describe, it, expect, vi, beforeEach } from "vitest";
import { WorkersState } from "../../../server/state/WorkersState.js";

function mockRedis() {
  const store = {};
  return {
    get: vi.fn((key) => Promise.resolve(store[key] || null)),
    set: vi.fn((key, value) => { store[key] = value; return Promise.resolve(); }),
  };
}

describe("WorkersState", () => {
  let redis, ws;
  beforeEach(() => { redis = mockRedis(); ws = new WorkersState(redis); });

  it("load returns null for unknown session", async () => {
    expect(await ws.load("unknown")).toBeNull();
  });

  it("save/load round-trips data", async () => {
    const data = { workers: [{ id: "w1", task: "mine" }] };
    await ws.save("sess1", data);
    const result = await ws.load("sess1");
    expect(result.workers[0].task).toBe("mine");
  });
});
