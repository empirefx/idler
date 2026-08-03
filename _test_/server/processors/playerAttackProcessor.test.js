import { describe, it, expect, vi, beforeEach } from "vitest";

const { WorkerMock } = vi.hoisted(() => ({ WorkerMock: vi.fn(() => ({ on: vi.fn() })) }));
vi.mock("bullmq", () => ({ Worker: WorkerMock }));

import { createPlayerAttackWorker } from "../../../server/processors/playerAttackProcessor.js";

describe("createPlayerAttackWorker", () => {
  beforeEach(() => {
    WorkerMock.mockClear();
  });

  it("wraps handlePlayerAttackJob in a player-attacks worker", () => {
    const combatService = { handlePlayerAttackJob: vi.fn().mockResolvedValue({ damageDealt: 5 }) };
    const worker = createPlayerAttackWorker(combatService);
    expect(worker).toBeDefined();
    expect(WorkerMock).toHaveBeenCalledWith(
      "player-attacks",
      expect.any(Function),
      expect.objectContaining({ connection: { host: "127.0.0.1", port: 6379 } }),
    );
    const [, handler] = WorkerMock.mock.calls[0];
    const job = { data: { sessionId: "s1" } };
    return handler(job).then((result) => {
      expect(combatService.handlePlayerAttackJob).toHaveBeenCalledWith("s1");
    });
  });
});
