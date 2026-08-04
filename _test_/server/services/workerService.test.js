import { describe, it, expect, vi, beforeEach } from "vitest";
import { WorkerService } from "../../../server/services/WorkerService.js";

describe("WorkerService", () => {
  let workersState, playerState, broadcaster, productionService, ws;

  beforeEach(() => {
    workersState = { load: vi.fn(), save: vi.fn() };
    playerState = { load: vi.fn(), save: vi.fn() };
    broadcaster = { broadcast: vi.fn() };
    productionService = { cleanupWorkerAssignment: vi.fn().mockResolvedValue({ cleared: true }) };
    ws = new WorkerService(null, workersState, playerState, broadcaster, productionService);
  });

  it("hire returns error when no slot available", async () => {
    workersState.load.mockResolvedValue({ hired: [], available: [{ id: "w1", name: "Bob" }], workerSlots: 0 });
    const result = await ws.hire("s1", "w1");
    expect(result.error).toBe("No available worker slots");
  });

  it("hire returns error when player not found", async () => {
    workersState.load.mockResolvedValue({ hired: [], available: [{ id: "w1", name: "Bob" }], workerSlots: 1 });
    playerState.load.mockResolvedValue(null);
    const result = await ws.hire("s1", "w1");
    expect(result.error).toBe("Player not found");
  });

  it("hire returns error when not enough gold", async () => {
    workersState.load.mockResolvedValue({ hired: [], available: [{ id: "w1", name: "Bob" }], workerSlots: 1 });
    playerState.load.mockResolvedValue({ gold: 0 });
    const result = await ws.hire("s1", "w1");
    expect(result.error).toBe("Not enough gold");
  });

  it("hire returns error when worker not in available pool", async () => {
    workersState.load.mockResolvedValue({ hired: [], available: [{ id: "w1", name: "Bob" }], workerSlots: 1 });
    playerState.load.mockResolvedValue({ gold: 100 });
    const result = await ws.hire("s1", "w2");
    expect(result.error).toBe("Worker not available");
  });

  it("hire moves worker from available to hired", async () => {
    workersState.load.mockResolvedValue({ hired: [], available: [{ id: "w1", name: "Bob" }], workerSlots: 1 });
    playerState.load.mockResolvedValue({ gold: 100 });
    const result = await ws.hire("s1", "w1");
    expect(result.workers.hired).toHaveLength(1);
    expect(result.workers.hired[0].id).toBe("w1");
    expect(result.workers.available).toHaveLength(0);
    expect(result.gold).toBe(50);
    expect(workersState.save).toHaveBeenCalled();
    expect(playerState.save).toHaveBeenCalledWith("s1", { gold: 50 });
  });

  it("hire returns a hired worker with name and no assignment", async () => {
    workersState.load.mockResolvedValue({ hired: [], available: [{ id: "w1", name: "Bob" }], workerSlots: 1 });
    playerState.load.mockResolvedValue({ gold: 100 });
    const result = await ws.hire("s1", "w1");
    expect(result.workers.hired[0].name).toBe("Bob");
    expect(result.workers.hired[0].assignment).toBeNull();
  });

  describe("fire", () => {
    it("returns an error when the worker is not hired", async () => {
      workersState.load.mockResolvedValue({ hired: [], available: [], workerSlots: 1 });
      playerState.load.mockResolvedValue({ gold: 100 });
      const result = await ws.fire("s1", "w1");
      expect(result.error).toBe("Worker not found");
    });

    it("returns an error when the player cannot afford the fire cost", async () => {
      workersState.load.mockResolvedValue({ hired: [{ id: "w1", name: "Bob", assignment: null }], available: [], workerSlots: 1 });
      playerState.load.mockResolvedValue({ gold: 10 });
      const result = await ws.fire("s1", "w1");
      expect(result.error).toBe("Not enough gold");
    });

    it("removes the worker and deducts the fire cost", async () => {
      workersState.load.mockResolvedValue({ hired: [{ id: "w1", name: "Bob", assignment: null }], available: [], workerSlots: 1 });
      playerState.load.mockResolvedValue({ gold: 100 });
      const result = await ws.fire("s1", "w1");
      expect(result.workers.hired).toHaveLength(0);
      expect(result.gold).toBe(75);
      expect(workersState.save).toHaveBeenCalled();
      expect(playerState.save).toHaveBeenCalledWith("s1", { gold: 75 });
    });

    it("cleans up the production assignment before removing a working worker", async () => {
      workersState.load.mockResolvedValue({ hired: [{ id: "w1", name: "Bob", assignment: { placeId: "village_center", socketIndex: 0, material: "wheat" } }], available: [], workerSlots: 1 });
      playerState.load.mockResolvedValue({ gold: 100 });
      const result = await ws.fire("s1", "w1");
      expect(productionService.cleanupWorkerAssignment).toHaveBeenCalledWith("s1", "w1");
      expect(result.workers.hired).toHaveLength(0);
    });
  });
});
