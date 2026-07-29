import { describe, it, expect, vi, beforeEach } from "vitest";
import { WorkerService } from "../../../server/services/WorkerService.js";

describe("WorkerService", () => {
  let workersState, broadcaster, ws;

  beforeEach(() => {
    workersState = { load: vi.fn(), save: vi.fn() };
    broadcaster = { broadcast: vi.fn() };
    ws = new WorkerService(null, workersState, broadcaster);
  });

  it("hire returns error when no workers available", async () => {
    workersState.load.mockResolvedValue({ hired: [], available: [] });
    const result = await ws.hire("s1");
    expect(result.error).toBe("No workers available");
  });

  it("hire moves worker from available to hired", async () => {
    workersState.load.mockResolvedValue({ hired: [], available: [{ id: "w1", name: "Bob" }] });
    const result = await ws.hire("s1");
    expect(result.success).toBe(true);
    expect(result.worker).toEqual({ id: "w1", name: "Bob" });
    expect(workersState.save).toHaveBeenCalledWith("s1", { hired: [{ id: "w1", name: "Bob" }], available: [] });
  });
});
