import { describe, it, expect, vi, beforeEach } from "vitest";
import { PresenceService, MAX_VISIBLE_PLAYERS } from "../../../server/services/PresenceService.js";

function fakePlayerState() {
  return { load: vi.fn() };
}

describe("PresenceService", () => {
  let clock;
  let presence;
  let playerState;

  beforeEach(() => {
    clock = { t: 1000 };
    presence = new PresenceService({ now: () => clock.t });
    playerState = fakePlayerState();
  });

  it("register adds a player to a place", async () => {
    playerState.load.mockResolvedValue({ level: 5, avatar: "1" });
    presence.register("s1", "Hero", "village_center");
    const list = await presence.listFor("village_center", playerState);
    expect(list).toEqual([{ nickname: "Hero", level: 5, avatar: "1", enteredAt: 1000 }]);
  });

  it("listFor orders players newest-first", async () => {
    playerState.load.mockResolvedValue({ level: 1, avatar: "1" });
    presence.register("s1", "Alpha", "village_center");
    clock.t = 2000;
    presence.register("s2", "Beta", "village_center");
    const list = await presence.listFor("village_center", playerState);
    expect(list.map((p) => p.nickname)).toEqual(["Beta", "Alpha"]);
  });

  it("register with refresh preserves the original enteredAt", async () => {
    playerState.load.mockResolvedValue({ level: 1 });
    presence.register("s1", "Alpha", "village_center");
    clock.t = 5000;
    presence.register("s1", "Alpha", "village_center", { refresh: true });
    const list = await presence.listFor("village_center", playerState);
    expect(list[0].enteredAt).toBe(1000);
  });

  it("register returns whether the player is new to the place", () => {
    expect(presence.register("s1", "Alpha", "village_center")).toBe(true);
    expect(presence.register("s1", "Alpha", "village_center", { refresh: true })).toBe(false);
    expect(presence.register("s1", "Alpha", "forest")).toBe(true);
  });

  it("unregister removes the player and returns their place", async () => {
    presence.register("s1", "Alpha", "village_center");
    expect(presence.unregister("s1")).toBe("village_center");
    expect(await presence.listFor("village_center", playerState)).toEqual([]);
    expect(presence.getSessionIds("village_center")).toEqual([]);
  });

  it("unregister of an unknown session returns null", () => {
    expect(presence.unregister("nope")).toBeNull();
  });

  it("move relocates a player between places", async () => {
    playerState.load.mockResolvedValue({ level: 1 });
    presence.register("s1", "Alpha", "village_center");
    clock.t = 3000;
    const result = presence.move("s1", "forest");
    expect(result).toEqual({ from: "village_center", to: "forest" });
    expect(presence.getSessionIds("village_center")).toEqual([]);
    expect(presence.getSessionIds("forest")).toEqual(["s1"]);
    const list = await presence.listFor("forest", playerState);
    expect(list[0].enteredAt).toBe(3000);
  });

  it("move to the same place is a no-op", () => {
    presence.register("s1", "Alpha", "village_center");
    expect(presence.move("s1", "village_center")).toEqual({ from: "village_center", to: "village_center" });
    expect(presence.getSessionIds("village_center")).toEqual(["s1"]);
  });

  it("get returns the stored entry, getByNickname resolves a session", () => {
    presence.register("s1", "Alpha", "village_center");
    expect(presence.get("s1")).toMatchObject({ nickname: "Alpha", placeId: "village_center" });
    expect(presence.getByNickname("Alpha")).toMatchObject({ sessionId: "s1", nickname: "Alpha" });
    expect(presence.getByNickname("Ghost")).toBeNull();
  });

  it("broadcastPlace excludes each recipient from their own list", async () => {
    playerState.load.mockResolvedValue({ level: 3, avatar: "1" });
    presence.register("s1", "Alpha", "village_center");
    clock.t = 2000;
    presence.register("s2", "Beta", "village_center");
    const broadcaster = { broadcast: vi.fn() };
    await presence.broadcastPlace("village_center", broadcaster, playerState);
    expect(broadcaster.broadcast).toHaveBeenCalledTimes(2);
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "PRESENCE_UPDATE", {
      placeId: "village_center",
      players: [{ nickname: "Beta", level: 3, avatar: "1", enteredAt: 2000 }],
    });
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s2", "PRESENCE_UPDATE", {
      placeId: "village_center",
      players: [{ nickname: "Alpha", level: 3, avatar: "1", enteredAt: 1000 }],
    });
  });

  it("broadcastPlace caps each list at MAX_VISIBLE_PLAYERS others", async () => {
    playerState.load.mockResolvedValue({ level: 1, avatar: "1" });
    const names = Array.from({ length: MAX_VISIBLE_PLAYERS + 3 }, (_, i) => `P${i}`);
    names.forEach((name, i) => presence.register(`s${i}`, name, "village_center"));
    const broadcaster = { broadcast: vi.fn() };
    await presence.broadcastPlace("village_center", broadcaster, playerState);
    const calls = broadcaster.broadcast.mock.calls;
    expect(calls).toHaveLength(names.length);
    for (const [sessionId, , payload] of calls) {
      const ownName = names[Number(sessionId.slice(1))];
      expect(payload.players.length).toBeLessThanOrEqual(MAX_VISIBLE_PLAYERS);
      expect(payload.players.some((p) => p.nickname === ownName)).toBe(false);
    }
  });

  describe("poke rate limiting", () => {
    it("allows 3 pokes, blocks the 4th", () => {
      presence.recordPoke("s1");
      clock.t = 2000;
      presence.recordPoke("s1");
      clock.t = 3000;
      presence.recordPoke("s1");
      expect(presence.canPoke("s1")).toBe(false);
      clock.t = 5000;
      expect(presence.canPoke("s1")).toBe(false);
    });

    it("allows again after the window expires", () => {
      presence.recordPoke("s1");
      clock.t = 2000;
      presence.recordPoke("s1");
      clock.t = 3000;
      presence.recordPoke("s1");
      clock.t = 16001;
      expect(presence.canPoke("s1")).toBe(true);
    });

    it("counts pokes from separate senders independently", () => {
      presence.recordPoke("s1");
      presence.recordPoke("s1");
      presence.recordPoke("s1");
      expect(presence.canPoke("s2")).toBe(true);
    });
  });
});
