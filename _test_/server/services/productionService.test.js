import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductionService } from "../../../server/services/ProductionService.js";
import { PRODUCTION_INTERVAL_MS } from "../../../shared/constants.js";

function mockRedis(overrides = {}) {
  return {
    hset: vi.fn().mockResolvedValue(),
    hdel: vi.fn().mockResolvedValue(),
    hget: vi.fn().mockResolvedValue(null),
    hgetall: vi.fn().mockResolvedValue({}),
    get: vi.fn().mockResolvedValue("1"),
    set: vi.fn().mockResolvedValue(),
    ...overrides,
  };
}

const worker = {
  id: "w1",
  name: "Bob",
  firstName: "Bob",
  gender: "male",
  avatar: "worker_m.jpg",
  assignment: null,
};

const farmBuilding = { id: "farm", level: 1, placeId: "village_center", socketIndex: 0 };
const mineBuilding = { id: "mine", level: 1, placeId: "river_crossing", socketIndex: 0 };

function buildingsFixture() {
  return {
    "village_center:0": JSON.stringify(farmBuilding),
    "river_crossing:0": JSON.stringify(mineBuilding),
  };
}

describe("ProductionService", () => {
  let redis;
  let workersState;
  let inventoryState;
  let queue;
  let broadcaster;
  let ps;

  beforeEach(() => {
    redis = mockRedis();
    redis.hgetall.mockImplementation(async (key) => {
      if (key === "player:s1:buildings") return buildingsFixture();
      return {};
    });
    workersState = { load: vi.fn(), save: vi.fn() };
    inventoryState = { load: vi.fn(), save: vi.fn(), loadAll: vi.fn() };
    queue = { add: vi.fn().mockResolvedValue(), remove: vi.fn().mockResolvedValue() };
    broadcaster = { broadcast: vi.fn() };
    ps = new ProductionService(redis, workersState, inventoryState, queue, broadcaster);
  });

  describe("assignWorker", () => {
    it("rejects an unknown worker", async () => {
      workersState.load.mockResolvedValue({ hired: [], available: [], workerSlots: 1 });
      const result = await ps.assignWorker("s1", "village_center", 0, "nope", "wheat");
      expect(result.error).toBe("Worker not found");
    });

    it("rejects assigning when no building exists at the socket", async () => {
      workersState.load.mockResolvedValue({ hired: [worker], available: [], workerSlots: 1 });
      const result = await ps.assignWorker("s1", "farmlands", 3, "w1", "wheat");
      expect(result.error).toBe("No building at this location");
    });

    it("rejects assigning to a building that cannot produce", async () => {
      redis.hgetall.mockImplementation(async (key) =>
        key === "player:s1:buildings"
          ? { "village_center:0": JSON.stringify({ id: "woodcutter", level: 1, placeId: "village_center", socketIndex: 0 }) }
          : {},
      );
      workersState.load.mockResolvedValue({ hired: [worker], available: [], workerSlots: 1 });
      const result = await ps.assignWorker("s1", "village_center", 0, "w1", "wheat");
      expect(result.error).toBe("This building cannot produce");
    });

    it("rejects a material not allowed at the building level", async () => {
      workersState.load.mockResolvedValue({ hired: [worker], available: [], workerSlots: 1 });
      const result = await ps.assignWorker("s1", "village_center", 0, "w1", "stone");
      expect(result.error).toBe("Invalid material for this building level");
    });

    it("accepts a valid material, persists the assignment and schedules the job", async () => {
      const hired = [{ ...worker }];
      workersState.load.mockResolvedValue({ hired, available: [], workerSlots: 1 });

      const result = await ps.assignWorker("s1", "village_center", 0, "w1", "wheat");

      expect(result.assigned).toBe(true);
      expect(result.workers).toBeDefined();
      expect(hired[0].assignment).toEqual({ placeId: "village_center", socketIndex: 0, material: "wheat" });
      const savedRecord = JSON.parse(
        redis.hset.mock.calls.find((c) => c[0] === "player:s1:production:assignments")[2],
      );
      expect(savedRecord).toMatchObject({
        sessionId: "s1",
        placeId: "village_center",
        socketIndex: 0,
        workerId: "w1",
        material: "wheat",
      });
      expect(workersState.save).toHaveBeenCalled();
      expect(queue.add).toHaveBeenCalledWith(
        "produce",
        expect.objectContaining({ sessionId: "s1", material: "wheat" }),
        { jobId: "prod-s1-village_center-0", delay: PRODUCTION_INTERVAL_MS },
      );
    });

    it("replaces an existing assignment and removes the old job", async () => {
      const hired = [{ ...worker, assignment: { placeId: "river_crossing", socketIndex: 0, material: "stone" } }];
      workersState.load.mockResolvedValue({ hired, available: [], workerSlots: 1 });
      redis.hget.mockResolvedValue(
        JSON.stringify({ sessionId: "s1", placeId: "river_crossing", socketIndex: 0, workerId: "w1", material: "stone" }),
      );

      const result = await ps.assignWorker("s1", "village_center", 0, "w1", "wheat");

      expect(result.assigned).toBe(true);
      expect(hired[0].assignment).toEqual({ placeId: "village_center", socketIndex: 0, material: "wheat" });
      expect(redis.hdel).toHaveBeenCalledWith("player:s1:production:assignments", "prod-s1-river_crossing-0");
      expect(queue.remove).toHaveBeenCalledWith("prod-s1-river_crossing-0");
      expect(queue.add).toHaveBeenCalledWith(
        "produce",
        expect.objectContaining({ placeId: "village_center" }),
        { jobId: "prod-s1-village_center-0", delay: PRODUCTION_INTERVAL_MS },
      );
    });
  });

  describe("unassignWorker", () => {
    it("clears the assignment record, job and worker state", async () => {
      redis.hget.mockResolvedValue(
        JSON.stringify({ sessionId: "s1", placeId: "village_center", socketIndex: 0, workerId: "w1", material: "wheat" }),
      );
      const hired = [{ ...worker, assignment: { placeId: "village_center", socketIndex: 0, material: "wheat" } }];
      workersState.load.mockResolvedValue({ hired, available: [], workerSlots: 1 });

      const result = await ps.unassignWorker("s1", "village_center", 0, "w1");

      expect(result.unassigned).toBe(true);
      expect(hired[0].assignment).toBeNull();
      expect(redis.hdel).toHaveBeenCalledWith("player:s1:production:assignments", "prod-s1-village_center-0");
      expect(queue.remove).toHaveBeenCalledWith("prod-s1-village_center-0");
      expect(workersState.save).toHaveBeenCalled();
    });

    it("returns an error when no assignment exists", async () => {
      const result = await ps.unassignWorker("s1", "village_center", 0, "w1");
      expect(result.error).toBe("No assignment found");
    });

    it("returns an error when the workerId does not match the assignment", async () => {
      redis.hget.mockResolvedValue(
        JSON.stringify({ sessionId: "s1", placeId: "village_center", socketIndex: 0, workerId: "other", material: "wheat" }),
      );
      const result = await ps.unassignWorker("s1", "village_center", 0, "w1");
      expect(result.error).toBe("Assignment mismatch");
    });
  });

  describe("produce", () => {
    const record = { sessionId: "s1", placeId: "village_center", socketIndex: 0, workerId: "w1", material: "wheat" };

    function seedProduceMocks(overrides = {}) {
      redis.hget.mockResolvedValue(JSON.stringify(record));
      workersState.load.mockResolvedValue({
        hired: [{ ...worker, assignment: { placeId: "village_center", socketIndex: 0, material: "wheat" } }],
        available: [],
        workerSlots: 1,
      });
      inventoryState.load.mockResolvedValue({
        id: "place-village_center",
        type: "place",
        maxSlots: 30,
        items: [],
        equipment: {},
      });
      inventoryState.save.mockResolvedValue();
      inventoryState.loadAll.mockResolvedValue({
        player: { id: "player", items: [] },
        "place-village_center": { id: "place-village_center", items: [] },
      });
      queue.add.mockResolvedValue();
      if (overrides.connected !== undefined) redis.get.mockResolvedValue(overrides.connected);
      if (overrides.record) redis.hget.mockResolvedValue(JSON.stringify(overrides.record));
      if (overrides.worker) {
        workersState.load.mockResolvedValue({ hired: [overrides.worker], available: [], workerSlots: 1 });
      }
      if (overrides.inventory) inventoryState.load.mockResolvedValue(overrides.inventory);
    }

    it("creates an item from server state and delivers it to the nearest vault", async () => {
      seedProduceMocks();

      const result = await ps.produce("s1", "village_center", 0, "wheat");

      expect(result.item).toBeDefined();
      expect(result.item.name).toBe("Wheat");
      expect(result.item.icon).toBe("wheat");
      expect(result.item.weight).toBe(2);
      expect(result.targetPlaceId).toBe("village_center");
      expect(inventoryState.save).toHaveBeenCalledWith(
        "s1",
        "place-village_center",
        expect.objectContaining({ items: [expect.objectContaining({ name: "Wheat", quantity: 1 })] }),
      );
      expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "INVENTORY_UPDATE", expect.objectContaining({ inventories: expect.any(Object) }));
      expect(broadcaster.broadcast).toHaveBeenCalledWith(
        "s1",
        "PRODUCTION_TICK",
        expect.objectContaining({ item: expect.objectContaining({ name: "Wheat" }), targetPlaceId: "village_center", workerId: "w1" }),
      );
      expect(queue.add).toHaveBeenCalledWith(
        "produce",
        expect.objectContaining({ material: "wheat" }),
        { jobId: "prod-s1-village_center-0", delay: PRODUCTION_INTERVAL_MS },
      );
    });

    it("routes the produced item to the closest place with a vault via BFS", async () => {
      seedProduceMocks();
      const mineRecord = { sessionId: "s1", placeId: "river_crossing", socketIndex: 0, workerId: "w1", material: "stone" };
      redis.hget.mockResolvedValue(JSON.stringify(mineRecord));
      workersState.load.mockResolvedValue({
        hired: [{ ...worker, assignment: { placeId: "river_crossing", socketIndex: 0, material: "stone" } }],
        available: [],
        workerSlots: 1,
      });

      const result = await ps.produce("s1", "river_crossing", 0, "stone");

      expect(result.targetPlaceId).toBe("village_center");
      expect(inventoryState.save).toHaveBeenCalledWith("s1", "place-village_center", expect.anything());
    });

    it("skips when the player is offline and does not reschedule", async () => {
      seedProduceMocks({ connected: "0" });

      const result = await ps.produce("s1", "village_center", 0, "wheat");

      expect(result.skipped).toBe(true);
      expect(broadcaster.broadcast).not.toHaveBeenCalled();
      expect(queue.add).not.toHaveBeenCalled();
    });

    it("skips stale assignments that carry no material", async () => {
      seedProduceMocks({ record: { sessionId: "s1", placeId: "village_center", socketIndex: 0, workerId: "w1" } });

      const result = await ps.produce("s1", "village_center", 0, "wheat");

      expect(result.skipped).toBe(true);
      expect(queue.add).not.toHaveBeenCalled();
    });

    it("skips when the worker is no longer hired", async () => {
      seedProduceMocks({ worker: { ...worker, assignment: null } });

      const result = await ps.produce("s1", "village_center", 0, "wheat");

      expect(result.skipped).toBe(true);
      expect(queue.add).not.toHaveBeenCalled();
    });

    it("auto-unassigns the worker when the vault is full and notifies", async () => {
      const hired = [{ ...worker, assignment: { placeId: "village_center", socketIndex: 0, material: "wheat" } }];
      seedProduceMocks({
        worker: hired[0],
        inventory: { id: "place-village_center", type: "place", maxSlots: 1, items: [{ id: "x", type: "material", quantity: 1, weight: 1 }], equipment: {} },
      });

      const result = await ps.produce("s1", "village_center", 0, "wheat");

      expect(result.autoUnassigned).toBe(true);
      expect(hired[0].assignment).toBeNull();
      expect(redis.hdel).toHaveBeenCalledWith("player:s1:production:assignments", "prod-s1-village_center-0");
      expect(queue.remove).toHaveBeenCalledWith("prod-s1-village_center-0");
      expect(workersState.save).toHaveBeenCalled();
      expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "NOTIFICATION", expect.objectContaining({ type: "warning" }));
      expect(queue.add).not.toHaveBeenCalled();
    });
  });

  describe("findClosestPlaceWithInventory", () => {
    it("returns the current place when it is a vault", () => {
      expect(ps.findClosestPlaceWithInventory("village_center")).toBe("village_center");
    });

    it("returns the nearest vault from a neighbor place", () => {
      expect(ps.findClosestPlaceWithInventory("river_crossing")).toBe("village_center");
    });

    it("falls back to village_center when no vault is reachable", () => {
      expect(ps.findClosestPlaceWithInventory("nowhere_land")).toBe("village_center");
    });
  });

  describe("pauseAll / resumeAll", () => {
    it("pauseAll marks the session offline and removes every tracked job", async () => {
      const record = { sessionId: "s1", placeId: "village_center", socketIndex: 0, workerId: "w1", material: "wheat" };
      redis.hgetall.mockResolvedValue({
        "prod-s1-village_center-0": JSON.stringify(record),
        "prod-s1-river_crossing-0": JSON.stringify({ ...record, placeId: "river_crossing" }),
      });

      await ps.pauseAll("s1");

      expect(redis.set).toHaveBeenCalledWith("player:s1:connected", "0");
      expect(queue.remove).toHaveBeenCalledWith("prod-s1-village_center-0");
      expect(queue.remove).toHaveBeenCalledWith("prod-s1-river_crossing-0");
    });

    it("resumeAll marks the session online and re-adds every job", async () => {
      const record = { sessionId: "s1", placeId: "village_center", socketIndex: 0, workerId: "w1", material: "wheat" };
      const mineRecord = { sessionId: "s1", placeId: "river_crossing", socketIndex: 0, workerId: "w1", material: "stone" };
      redis.hgetall.mockResolvedValue({
        "prod-s1-village_center-0": JSON.stringify(record),
        "prod-s1-river_crossing-0": JSON.stringify(mineRecord),
      });

      await ps.resumeAll("s1");

      expect(redis.set).toHaveBeenCalledWith("player:s1:connected", "1");
      expect(queue.add).toHaveBeenCalledWith(
        "produce",
        expect.objectContaining({ material: "wheat" }),
        { jobId: "prod-s1-village_center-0", delay: PRODUCTION_INTERVAL_MS },
      );
      expect(queue.add).toHaveBeenCalledWith(
        "produce",
        expect.objectContaining({ material: "stone" }),
        { jobId: "prod-s1-river_crossing-0", delay: PRODUCTION_INTERVAL_MS },
      );
    });
  });

  describe("cleanupWorkerAssignment", () => {
    it("removes the worker's assignment record, job and state", async () => {
      const hired = [{ ...worker, assignment: { placeId: "river_crossing", socketIndex: 0, material: "stone" } }];
      workersState.load.mockResolvedValue({ hired, available: [], workerSlots: 1 });
      redis.hget.mockResolvedValue(
        JSON.stringify({ sessionId: "s1", placeId: "river_crossing", socketIndex: 0, workerId: "w1", material: "stone" }),
      );

      const result = await ps.cleanupWorkerAssignment("s1", "w1");

      expect(result.cleared).toBe(true);
      expect(hired[0].assignment).toBeNull();
      expect(redis.hdel).toHaveBeenCalledWith("player:s1:production:assignments", "prod-s1-river_crossing-0");
      expect(queue.remove).toHaveBeenCalledWith("prod-s1-river_crossing-0");
      expect(workersState.save).toHaveBeenCalled();
    });

    it("is a no-op for a worker without an assignment", async () => {
      workersState.load.mockResolvedValue({ hired: [{ ...worker }], available: [], workerSlots: 1 });
      const result = await ps.cleanupWorkerAssignment("s1", "w1");
      expect(result.cleared).toBe(false);
    });
  });
});
