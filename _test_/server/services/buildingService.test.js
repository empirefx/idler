import { describe, it, expect, vi, beforeEach } from "vitest";
import { BuildingService } from "../../../server/services/BuildingService.js";

function makeMocks() {
  const buildings = {};
  const sockets = {};
  const playerState = {
    load: vi.fn(async () => ({ gold: 1000 })),
    save: vi.fn(),
  };
  const buildingsState = {
    loadAll: vi.fn(async () => buildings),
    save: vi.fn(async (sid, field, building) => { buildings[field] = building; }),
    delete: vi.fn(async (sid, field) => { delete buildings[field]; }),
  };
  const socketsState = {
    loadAll: vi.fn(async () => sockets),
    save: vi.fn(async (sid, field, data) => { sockets[field] = data; }),
    delete: vi.fn(async (sid, field) => { delete sockets[field]; }),
  };
  const productionService = { cleanupSocket: vi.fn(async () => {}) };
  const broadcaster = { broadcast: vi.fn() };
  return { playerState, buildingsState, socketsState, productionService, broadcaster, buildings, sockets };
}

describe("BuildingService", () => {
  let mocks, bs;
  beforeEach(() => {
    mocks = makeMocks();
    bs = new BuildingService(
      mocks.playerState,
      mocks.buildingsState,
      mocks.socketsState,
      mocks.productionService,
      mocks.broadcaster,
    );
  });

  describe("buySocket", () => {
    it("buys a locked socket and deducts gold", async () => {
      const result = await bs.buySocket("s1", "farmlands", 0);
      expect(result).toEqual({
        gold: 920,
        socket: { placeId: "farmlands", socketIndex: 0, status: "empty" },
      });
      expect(mocks.playerState.save).toHaveBeenCalledWith("s1", { gold: 920 });
      expect(mocks.socketsState.save).toHaveBeenCalledWith("s1", "farmlands:0", { status: "empty" });
    });

    it("returns an error when the place or socket does not exist", async () => {
      const result = await bs.buySocket("s1", "farmlands", 99);
      expect(result.error).toBeDefined();
      expect(mocks.playerState.save).not.toHaveBeenCalled();
    });

    it("returns an error when the socket is not locked", async () => {
      const result = await bs.buySocket("s1", "village_center", 0); // occupied by default
      expect(result.error).toBeDefined();
      expect(mocks.socketsState.save).not.toHaveBeenCalled();
    });

    it("returns an error when gold is insufficient", async () => {
      mocks.playerState.load.mockResolvedValue({ gold: 10 });
      const result = await bs.buySocket("s1", "farmlands", 0);
      expect(result.error).toMatch(/gold/i);
      expect(mocks.playerState.save).not.toHaveBeenCalled();
    });
  });

  describe("build", () => {
    it("builds on an empty socket and deducts gold", async () => {
      await bs.buySocket("s1", "farmlands", 0);
      mocks.playerState.load.mockResolvedValue({ gold: 920 });
      const result = await bs.build("s1", "farmlands", 0, "farm");
      expect(result.gold).toBe(870);
      expect(result.socket).toEqual({ placeId: "farmlands", socketIndex: 0, status: "occupied", buildingId: "farm", level: 1 });
      expect(mocks.buildingsState.save).toHaveBeenCalledWith("s1", "farmlands:0", { id: "farm", level: 1, placeId: "farmlands", socketIndex: 0 });
    });

    it("returns an error when the socket is not empty", async () => {
      const result = await bs.build("s1", "village_center", 0, "farm"); // occupied
      expect(result.error).toBeDefined();
      expect(mocks.buildingsState.save).not.toHaveBeenCalled();
    });

    it("returns an error for an unknown building", async () => {
      await bs.buySocket("s1", "farmlands", 0);
      const result = await bs.build("s1", "farmlands", 0, "nope");
      expect(result.error).toBeDefined();
      expect(mocks.buildingsState.save).not.toHaveBeenCalled();
    });

    it("returns an error when gold is insufficient", async () => {
      await bs.buySocket("s1", "farmlands", 0);
      mocks.playerState.load.mockResolvedValue({ gold: 10 });
      const result = await bs.build("s1", "farmlands", 0, "farm");
      expect(result.error).toMatch(/gold/i);
      expect(mocks.buildingsState.save).not.toHaveBeenCalled();
    });
  });

  describe("upgrade", () => {
    it("upgrades an occupied building and deducts gold", async () => {
      mocks.buildings["river_crossing:0"] = { id: "mine", level: 1, placeId: "river_crossing", socketIndex: 0 };
      const result = await bs.upgrade("s1", "river_crossing", 0);
      expect(result.gold).toBe(800);
      expect(result.socket).toEqual({ placeId: "river_crossing", socketIndex: 0, status: "occupied", buildingId: "mine", level: 2 });
      expect(mocks.buildingsState.save).toHaveBeenCalledWith("s1", "river_crossing:0", { id: "mine", level: 2, placeId: "river_crossing", socketIndex: 0 });
    });

    it("returns an error when the socket is not occupied", async () => {
      const result = await bs.upgrade("s1", "farmlands", 0);
      expect(result.error).toBeDefined();
      expect(mocks.buildingsState.save).not.toHaveBeenCalled();
    });

    it("returns an error at max level", async () => {
      mocks.buildings["river_crossing:0"] = { id: "mine", level: 5, placeId: "river_crossing", socketIndex: 0 };
      const result = await bs.upgrade("s1", "river_crossing", 0);
      expect(result.error).toBeDefined();
      expect(mocks.buildingsState.save).not.toHaveBeenCalled();
    });

    it("returns an error when gold is insufficient", async () => {
      mocks.buildings["river_crossing:0"] = { id: "mine", level: 1, placeId: "river_crossing", socketIndex: 0 };
      mocks.playerState.load.mockResolvedValue({ gold: 10 });
      const result = await bs.upgrade("s1", "river_crossing", 0);
      expect(result.error).toMatch(/gold/i);
      expect(mocks.buildingsState.save).not.toHaveBeenCalled();
    });
  });

  describe("demolish", () => {
    it("demolishes an occupied building, empties the socket, cleans up production", async () => {
      mocks.buildings["river_crossing:0"] = { id: "mine", level: 1, placeId: "river_crossing", socketIndex: 0 };
      const result = await bs.demolish("s1", "river_crossing", 0);
      expect(result).toEqual({ socket: { placeId: "river_crossing", socketIndex: 0, status: "empty" } });
      expect(mocks.buildingsState.delete).toHaveBeenCalledWith("s1", "river_crossing:0");
      expect(mocks.socketsState.save).toHaveBeenCalledWith("s1", "river_crossing:0", { status: "empty" });
      expect(mocks.productionService.cleanupSocket).toHaveBeenCalledWith("s1", "river_crossing", 0);
    });

    it("returns an error when the socket is not occupied", async () => {
      const result = await bs.demolish("s1", "farmlands", 0);
      expect(result.error).toBeDefined();
      expect(mocks.buildingsState.delete).not.toHaveBeenCalled();
    });
  });

  describe("can* validators", () => {
    it("canBuild reports valid on an empty socket with enough gold", async () => {
      mocks.sockets["farmlands:0"] = { status: "empty" };
      const result = await bs.canBuild("s1", "farmlands", 0, "farm");
      expect(result.valid).toBe(true);
    });

    it("canUpgrade reports valid on an occupied socket with enough gold", async () => {
      mocks.buildings["river_crossing:0"] = { id: "mine", level: 1, placeId: "river_crossing", socketIndex: 0 };
      const result = await bs.canUpgrade("s1", "river_crossing", 0);
      expect(result.valid).toBe(true);
    });

    it("canDemolish reports valid on an occupied socket", async () => {
      mocks.buildings["river_crossing:0"] = { id: "mine", level: 1, placeId: "river_crossing", socketIndex: 0 };
      const result = await bs.canDemolish("s1", "river_crossing", 0);
      expect(result.valid).toBe(true);
    });
  });
});
