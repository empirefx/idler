import { describe, it, expect, vi, beforeEach } from "vitest";

const { WorkerMock } = vi.hoisted(() => ({ WorkerMock: vi.fn(() => ({ on: vi.fn() })) }));
vi.mock("bullmq", () => ({ Worker: WorkerMock }));

import { createEnemyAttackWorker } from "../../../server/processors/enemyAttackProcessor.js";

describe("createEnemyAttackWorker", () => {
  beforeEach(() => {
    WorkerMock.mockClear();
  });

  it("does not re-schedule or broadcast when the player is dead", async () => {
    const combatService = {
      handleEnemyAttack: vi.fn().mockResolvedValue({ playerDead: true }),
      scheduleEnemyAttack: vi.fn().mockResolvedValue({ id: "e1", nextAttackAt: 12345, nextAttackDelay: 150 }),
    };
    const broadcaster = { broadcast: vi.fn() };
    const queue = { add: vi.fn() };
    createEnemyAttackWorker(combatService, broadcaster, queue);
    const [, handler] = WorkerMock.mock.calls[0];
    await handler({ data: { sessionId: "s1", enemyId: "e1" } });
    expect(combatService.scheduleEnemyAttack).not.toHaveBeenCalled();
    expect(broadcaster.broadcast).not.toHaveBeenCalled();
  });

  it("re-schedules the attack and broadcasts the fresh countdown while the player lives", async () => {
    const nextEnemy = { id: "e1", hp: 50, nextAttackAt: 12345, nextAttackDelay: 150 };
    const combatService = {
      handleEnemyAttack: vi.fn().mockResolvedValue({ playerDead: false, damageDealt: 3 }),
      scheduleEnemyAttack: vi.fn().mockResolvedValue(nextEnemy),
    };
    const broadcaster = { broadcast: vi.fn() };
    const queue = { add: vi.fn() };
    createEnemyAttackWorker(combatService, broadcaster, queue);
    const [, handler] = WorkerMock.mock.calls[0];
    await handler({ data: { sessionId: "s1", enemyId: "e1" } });
    expect(combatService.scheduleEnemyAttack).toHaveBeenCalledWith("s1", "e1");
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "ENEMY_ATTACK", expect.objectContaining({ damageDealt: 3, nextAttackAt: 12345, nextAttackDelay: 150 }));
  });
});
