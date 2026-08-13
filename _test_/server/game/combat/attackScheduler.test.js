import { describe, it, expect, vi, afterEach } from "vitest";
import { rollEnemyAttackDelay, scheduleEnemyAttack } from "../../../../server/game/combat/attackScheduler.js";

describe("attackScheduler", () => {
  afterEach(() => vi.restoreAllMocks());

  it("rollEnemyAttackDelay stays within attackDelayRange", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(rollEnemyAttackDelay({ attackDelayRange: [100, 200] })).toBe(100);
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(rollEnemyAttackDelay({ attackDelayRange: [100, 200] })).toBe(150);
    vi.spyOn(Math, "random").mockReturnValue(0.99);
    expect(rollEnemyAttackDelay({ attackDelayRange: [100, 200] })).toBe(199);
  });

  it("rollEnemyAttackDelay falls back to [1000, 3000] when absent", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(rollEnemyAttackDelay({})).toBe(1000);
  });

  it("scheduleEnemyAttack sets countdown fields, persists, and queues the job", async () => {
    const enemy = { id: "e1", attackDelayRange: [100, 200] };
    const enemyState = { save: vi.fn().mockResolvedValue() };
    const enemyAttackQueue = { add: vi.fn().mockResolvedValue() };
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    const before = Date.now();

    const out = await scheduleEnemyAttack({ enemyState, enemyAttackQueue }, "s1", enemy);

    expect(out.nextAttackDelay).toBe(150);
    expect(out.nextAttackAt).toBeGreaterThanOrEqual(before + 150);
    expect(enemyState.save).toHaveBeenCalledWith("s1", "e1", expect.objectContaining({ nextAttackDelay: 150, nextAttackAt: expect.any(Number) }));
    expect(enemyAttackQueue.add).toHaveBeenCalledWith("enemy-attack", { sessionId: "s1", enemyId: "e1" }, { delay: 150 });
  });
});
