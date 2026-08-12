import { describe, it, expect, vi } from "vitest";
import { tradeHandlers } from "../../../../server/messages/handlers/trade.js";

const byType = (type) => tradeHandlers.find((h) => h.type === type).handler;

function makeCtx(overrides = {}) {
  return {
    sessionId: "s1",
    ws: { readyState: 1 },
    send: vi.fn(),
    playerState: { load: vi.fn(), save: vi.fn() },
    inventoryState: { load: vi.fn(), save: vi.fn(), loadAll: vi.fn() },
    broadcaster: { broadcast: vi.fn() },
    ...overrides,
  };
}

describe("trade handlers", () => {
  it("BUY_ITEM buys a stock item, persists gold and broadcasts updates", async () => {
    const ctx = makeCtx({
      playerState: { load: vi.fn().mockResolvedValue({ gold: 100 }), save: vi.fn() },
      inventoryState: {
        load: vi.fn().mockResolvedValue({ id: "player", type: "player", maxSlots: 20, items: [], equipment: {} }),
        save: vi.fn(),
        loadAll: vi.fn().mockResolvedValue({ player: { id: "player", items: [] } }),
      },
    });

    await byType("BUY_ITEM")(ctx, { npcId: "weapon_merchant", itemId: "90", quantity: 1 });

    expect(ctx.send).toHaveBeenCalledWith(ctx.ws, "TRADE_RESULT", expect.objectContaining({ success: true }));
    expect(ctx.playerState.save).toHaveBeenCalledWith("s1", { gold: 85 });
    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.gold", data: 85 });
  });

  it("SELL_ITEM sells and sends TRADE_RESULT with the new gold total", async () => {
    const ctx = makeCtx({
      playerState: { load: vi.fn().mockResolvedValue({ gold: 100 }), save: vi.fn() },
      inventoryState: {
        load: vi.fn().mockResolvedValue({
          id: "player", type: "player", maxSlots: 20,
          items: [{ id: 90, name: "Wooden Staff", icon: "staff1", type: "main-weapon", quantity: 1, sellable: { gold: 8 } }],
          equipment: {},
        }),
        save: vi.fn(),
        loadAll: vi.fn().mockResolvedValue({ player: { id: "player", items: [] } }),
      },
    });

    await byType("SELL_ITEM")(ctx, { itemId: "90", quantity: 1 });

    expect(ctx.send).toHaveBeenCalledWith(ctx.ws, "TRADE_RESULT", expect.objectContaining({ success: true }));
    expect(ctx.playerState.save).toHaveBeenCalledWith("s1", { gold: 108 });
  });

  it("USE_ITEM heals, consumes the item and sends USE_RESULT", async () => {
    const ctx = makeCtx({
      playerState: { load: vi.fn().mockResolvedValue({ hp: 50, maxHp: 150 }), save: vi.fn() },
      inventoryState: {
        load: vi.fn().mockResolvedValue({
          id: "player", type: "player", maxSlots: 20,
          items: [{ id: 30, name: "Health Potion", type: "consumable", quantity: 2, consumable: { heal: 40 } }],
          equipment: {},
        }),
        save: vi.fn(),
        loadAll: vi.fn().mockResolvedValue({ player: { id: "player", items: [] } }),
      },
    });

    await byType("USE_ITEM")(ctx, { itemId: 30 });

    expect(ctx.send).toHaveBeenCalledWith(ctx.ws, "USE_RESULT", { success: true, message: expect.stringContaining("restored 40 HP") });
    expect(ctx.playerState.save).toHaveBeenCalledWith("s1", { hp: 90 });
  });

  it("USE_ITEM failure sends an ERROR frame without a success flag", async () => {
    const ctx = makeCtx({
      inventoryState: { load: vi.fn().mockResolvedValue({ id: "player", type: "player", maxSlots: 20, items: [], equipment: {} }) },
    });

    await byType("USE_ITEM")(ctx, { itemId: "999" });

    expect(ctx.send).toHaveBeenCalledWith(ctx.ws, "ERROR", { message: "Item not found" });
    const args = ctx.send.mock.calls[0];
    expect(args[2].success).toBeUndefined();
  });
});
