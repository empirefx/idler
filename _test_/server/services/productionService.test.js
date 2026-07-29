import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductionService } from "../../../server/services/ProductionService.js";

function mockRedis() {
  return { hset: vi.fn(), hdel: vi.fn(), hget: vi.fn() };
}

describe("ProductionService", () => {
  let redis;
  let inventoryState;
  let queue;
  let broadcaster;
  let ps;

  beforeEach(() => {
    redis = mockRedis();
    inventoryState = { load: vi.fn(), save: vi.fn() };
    queue = { add: vi.fn(), remove: vi.fn() };
    broadcaster = { broadcast: vi.fn() };
    ps = new ProductionService(redis, inventoryState, queue, broadcaster);
  });

  it("assignWorker persists assignment and schedules job", async () => {
    const building = { id: "woodcutter", productionInterval: 3000, produces: "wood" };
    const worker = { id: "w1", name: "Lumberjack" };

    const result = await ps.assignWorker("s1", "forest", 0, worker, building);
    expect(result.assigned).toBe(true);
    expect(redis.hset).toHaveBeenCalled();
    expect(queue.add).toHaveBeenCalledWith("produce", expect.any(Object), expect.objectContaining({ jobId: expect.any(String), delay: 3000 }));
  });

  it("unassignWorker removes assignment and job", async () => {
    const result = await ps.unassignWorker("s1", "forest", 0);
    expect(result.unassigned).toBe(true);
    expect(redis.hdel).toHaveBeenCalled();
    expect(queue.remove).toHaveBeenCalled();
  });

  it("produce creates item and broadcasts", async () => {
    const building = { id: "woodcutter", productionInterval: 3000, produces: "wood", itemWeight: 1 };
    const worker = { id: "w1", name: "Lumberjack" };

    inventoryState.load.mockResolvedValue({
      maxSlots: 100, maxWeight: 100, items: [], equipment: {},
    });
    inventoryState.save.mockResolvedValue(undefined);

    const result = await ps.produce("s1", "forest", 0, worker, building);
    expect(result).toHaveProperty("item");
    expect(result.item.template_id).toBe("wood");
    expect(inventoryState.save).toHaveBeenCalled();
    expect(broadcaster.broadcast).toHaveBeenCalledWith("PRODUCTION_TICK", expect.any(Object));
    expect(queue.add).toHaveBeenCalledTimes(1);
  });

  it("produce returns error when inventory is full", async () => {
    const building = { id: "woodcutter", productionInterval: 3000, produces: "wood", itemWeight: 1 };
    const worker = { id: "w1" };

    inventoryState.load.mockResolvedValue({
      maxSlots: 1, maxWeight: 100, items: [{ id: "existing", template_id: "stone", type: "material", quantity: 1, weight: 1 }], equipment: {},
    });

    const result = await ps.produce("s1", "forest", 0, worker, building);
    expect(result).toHaveProperty("error");
  });
});
