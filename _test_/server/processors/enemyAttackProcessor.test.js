import { describe, it, expect, vi, beforeEach } from "vitest";

const { WorkerMock } = vi.hoisted(() => ({ WorkerMock: vi.fn(() => ({ on: vi.fn() })) }));
vi.mock("bullmq", () => ({ Worker: WorkerMock }));

import { createEnemyAttackWorker } from "../../../server/processors/enemyAttackProcessor.js";

describe("createEnemyAttackWorker", () => {
  beforeEach(() => {
    WorkerMock.mockClear();
  });

  it("does not re-enqueue when the player is dead", async () => {
    const combatService = {
      handleEnemyAttack: vi.fn().mockResolvedValue({ playerDead: true }),
      enemyState: { load: vi.fn().mockResolvedValue({ id: "e1", hp: 50 }) },
    };
    const broadcaster = { broadcast: vi.fn() };
    const queue = { add: vi.fn() };
    createEnemyAttackWorker(combatService, broadcaster, queue);
    const [, handler] = WorkerMock.mock.calls[0];
    await handler({ data: { sessionId: "s1", enemyId: "e1" } });
    expect(broadcaster.broadcast).not.toHaveBeenCalled();
    expect(queue.add).not.toHaveBeenCalled();
  });

  it("re-enqueues while the enemy lives and the player is alive", async () => {
    const combatService = {
      handleEnemyAttack: vi.fn().mockResolvedValue({ playerDead: false, damageDealt: 3 }),
      enemyState: { load: vi.fn().mockResolvedValue({ id: "e1", hp: 50, attackDelayRange: [100, 200] }) },
    };
    const broadcaster = { broadcast: vi.fn() };
    const queue = { add: vi.fn() };
    createEnemyAttackWorker(combatService, broadcaster, queue);
    const [, handler] = WorkerMock.mock.calls[0];
    await handler({ data: { sessionId: "s1", enemyId: "e1" } });
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "ENEMY_ATTACK", expect.objectContaining({ damageDealt: 3 }));
    expect(queue.add).toHaveBeenCalledWith("enemy-attack", { sessionId: "s1", enemyId: "e1" }, expect.objectContaining({ delay: expect.any(Number) }));
  });
});
