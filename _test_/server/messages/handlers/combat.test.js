import { describe, it, expect, vi } from "vitest";
import { combatHandlers } from "../../../../server/messages/handlers/combat.js";

const byType = (type) => combatHandlers.find((h) => h.type === type).handler;

function makeCtx(overrides = {}) {
  return {
    sessionId: "s1",
    ws: { readyState: 1 },
    send: vi.fn(),
    playerState: { load: vi.fn(), save: vi.fn() },
    enemyState: { load: vi.fn() },
    broadcaster: { broadcast: vi.fn() },
    combatService: {
      startAutoCombat: vi.fn().mockResolvedValue({ success: true }),
      stopAutoCombat: vi.fn(),
      revive: vi.fn(),
    },
    ...overrides,
  };
}

describe("combat handlers", () => {
  it("SET_TARGET locks the enemy, broadcasts, and starts combat when off", async () => {
    const ctx = makeCtx({
      playerState: { load: vi.fn().mockResolvedValue({ currentPlaceId: "forest_edge", isDead: false, autoCombat: false }), save: vi.fn() },
      enemyState: { load: vi.fn().mockResolvedValue({ id: "e1", hp: 30, placeId: "forest_edge" }) },
    });

    await byType("SET_TARGET")(ctx, { enemyId: "e1" });

    expect(ctx.playerState.save).toHaveBeenCalledWith("s1", { targetEnemyId: "e1" });
    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.targetEnemyId", data: "e1" });
    expect(ctx.combatService.startAutoCombat).toHaveBeenCalledWith("s1");
  });

  it("SET_TARGET switches the lock without restarting combat when already active", async () => {
    const ctx = makeCtx({
      playerState: { load: vi.fn().mockResolvedValue({ currentPlaceId: "forest_edge", isDead: false, autoCombat: true }), save: vi.fn() },
      enemyState: { load: vi.fn().mockResolvedValue({ id: "e2", hp: 30, placeId: "forest_edge" }) },
    });

    await byType("SET_TARGET")(ctx, { enemyId: "e2" });

    expect(ctx.combatService.startAutoCombat).not.toHaveBeenCalled();
    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.targetEnemyId", data: "e2" });
  });

  it("SET_TARGET errors on a dead player", async () => {
    const ctx = makeCtx({
      playerState: { load: vi.fn().mockResolvedValue({ currentPlaceId: "forest_edge", isDead: true, autoCombat: false }), save: vi.fn() },
      enemyState: { load: vi.fn().mockResolvedValue({ id: "e1", hp: 30, placeId: "forest_edge" }) },
    });

    await byType("SET_TARGET")(ctx, { enemyId: "e1" });

    expect(ctx.send).toHaveBeenCalledWith(ctx.ws, "ERROR", { message: "Player is dead" });
    expect(ctx.playerState.save).not.toHaveBeenCalled();
  });

  it("SET_TARGET errors when the enemy is dead or elsewhere", async () => {
    const ctx = makeCtx({
      playerState: { load: vi.fn().mockResolvedValue({ currentPlaceId: "forest_edge", isDead: false, autoCombat: false }), save: vi.fn() },
      enemyState: { load: vi.fn().mockResolvedValue({ id: "e1", hp: 0, placeId: "forest_edge" }) },
    });

    await byType("SET_TARGET")(ctx, { enemyId: "e1" });

    expect(ctx.send).toHaveBeenCalledWith(ctx.ws, "ERROR", { message: "Enemy not found" });
    expect(ctx.combatService.startAutoCombat).not.toHaveBeenCalled();
  });
});
