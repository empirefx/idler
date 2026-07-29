import { describe, it, expect, vi, beforeEach } from "vitest";
import { InventoryState } from "../../../server/state/InventoryState.js";

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
    del: vi.fn((key) => { delete store[key]; return Promise.resolve(); }),
  };
}

describe("InventoryState", () => {
  let redis, inv;
  beforeEach(() => { redis = mockRedis(); inv = new InventoryState(redis); });

  it("loadAll returns null for empty key", async () => {
    expect(await inv.loadAll("unknown")).toBeNull();
  });

  it("loadAll returns parsed inventory hash", async () => {
    const playerInv = JSON.stringify({ id: "player", items: [] });
    await redis.hset("player:sess1:inventory", "player", playerInv);
    const result = await inv.loadAll("sess1");
    expect(result.player.id).toBe("player");
  });

  it("save persists a single inventory", async () => {
    const data = { id: "player", items: [{ id: "ore", quantity: 5 }] };
    await inv.save("sess1", "player", data);
    const raw = await redis.hget("player:sess1:inventory", "player");
    expect(JSON.parse(raw).items[0].quantity).toBe(5);
  });

  it("load returns single field", async () => {
    const data = { id: "player", items: [] };
    await inv.save("sess1", "player", data);
    const result = await inv.load("sess1", "player");
    expect(result.id).toBe("player");
  });

  it("initialize creates default player inventory", async () => {
    await inv.initialize("sess1");
    const raw = await redis.hget("player:sess1:inventory", "player");
    const data = JSON.parse(raw);
    expect(data.id).toBe("player");
    expect(data.maxSlots).toBe(20);
    expect(data.items).toEqual([]);
    expect(data.equipment).toEqual({});
  });
});
