import { describe, it, expect, vi } from "vitest";
import { presenceHandlers } from "../../../../server/messages/handlers/presence.js";

const byType = (type) => presenceHandlers.find((h) => h.type === type).handler;

function makePresence(overrides = {}) {
  return {
    get: vi.fn(),
    getByNickname: vi.fn(),
    canPoke: vi.fn().mockReturnValue(true),
    recordPoke: vi.fn(),
    ...overrides,
  };
}

function makeCtx(overrides = {}) {
  return {
    sessionId: "s1",
    broadcaster: { broadcast: vi.fn() },
    playerState: { load: vi.fn().mockResolvedValue({ avatar: "1.png" }) },
    presenceService: makePresence(),
    ...overrides,
  };
}

describe("POKE handler", () => {
  it("delivers POKED to the target and POKE_ACK ok to the sender", async () => {
    const ctx = makeCtx({
      presenceService: makePresence({
        get: vi.fn().mockReturnValue({ nickname: "Hero", placeId: "village_center" }),
        getByNickname: vi.fn().mockReturnValue({ sessionId: "s2", nickname: "Mage", placeId: "village_center" }),
      }),
    });

    await byType("POKE")(ctx, { targetNickname: "Mage" });

    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s2", "POKED", {
      fromNickname: "Hero",
      fromAvatar: "1.png",
    });
    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s1", "POKE_ACK", {
      ok: true,
      targetNickname: "Mage",
    });
    expect(ctx.presenceService.recordPoke).toHaveBeenCalledWith("s1");
  });

  it("rejects when the target is in another place", async () => {
    const ctx = makeCtx({
      presenceService: makePresence({
        get: vi.fn().mockReturnValue({ nickname: "Hero", placeId: "village_center" }),
        getByNickname: vi.fn().mockReturnValue({ sessionId: "s2", nickname: "Mage", placeId: "forest" }),
      }),
    });

    await byType("POKE")(ctx, { targetNickname: "Mage" });

    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s1", "POKE_ACK", {
      ok: false,
      reason: "NOT_IN_PLACE",
    });
    expect(ctx.broadcaster.broadcast).not.toHaveBeenCalledWith("s2", "POKED", expect.anything());
  });

  it("rejects an unknown target", async () => {
    const ctx = makeCtx({
      presenceService: makePresence({
        get: vi.fn().mockReturnValue({ nickname: "Hero", placeId: "village_center" }),
        getByNickname: vi.fn().mockReturnValue(null),
      }),
    });

    await byType("POKE")(ctx, { targetNickname: "Ghost" });

    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s1", "POKE_ACK", {
      ok: false,
      reason: "NOT_IN_PLACE",
    });
  });

  it("rejects poking yourself", async () => {
    const ctx = makeCtx({
      presenceService: makePresence({
        get: vi.fn().mockReturnValue({ nickname: "Hero", placeId: "village_center" }),
        getByNickname: vi.fn().mockReturnValue({ sessionId: "s1", nickname: "Hero", placeId: "village_center" }),
      }),
    });

    await byType("POKE")(ctx, { targetNickname: "Hero" });

    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s1", "POKE_ACK", {
      ok: false,
      reason: "NOT_IN_PLACE",
    });
  });

  it("rejects when the sender is rate limited", async () => {
    const ctx = makeCtx({
      presenceService: makePresence({
        get: vi.fn().mockReturnValue({ nickname: "Hero", placeId: "village_center" }),
        canPoke: vi.fn().mockReturnValue(false),
      }),
    });

    await byType("POKE")(ctx, { targetNickname: "Mage" });

    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s1", "POKE_ACK", {
      ok: false,
      reason: "RATE_LIMITED",
    });
    expect(ctx.presenceService.recordPoke).not.toHaveBeenCalled();
  });

  it("rejects when the sender is not online", async () => {
    const ctx = makeCtx({
      presenceService: makePresence({ get: vi.fn().mockReturnValue(null) }),
    });

    await byType("POKE")(ctx, { targetNickname: "Mage" });

    expect(ctx.broadcaster.broadcast).toHaveBeenCalledWith("s1", "POKE_ACK", {
      ok: false,
      reason: "TARGET_GONE",
    });
  });
});
