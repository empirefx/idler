import { describe, it, expect, vi } from "vitest";
import { createCombatEventBus } from "../../../../server/game/combat/combatEvents.js";

describe("combatEvents", () => {
  it("invokes subscribers for the event and passes the payload", async () => {
    const bus = createCombatEventBus();
    const spy = vi.fn();
    bus.on("enemy-killed", spy);
    await bus.emit("enemy-killed", { sessionId: "s1", enemy: { id: "e1" } });
    expect(spy).toHaveBeenCalledWith({ sessionId: "s1", enemy: { id: "e1" } });
  });

  it("awaits async subscribers before emit resolves", async () => {
    const bus = createCombatEventBus();
    const order = [];
    bus.on("enemy-killed", async () => { await Promise.resolve(); order.push("sub"); });
    await bus.emit("enemy-killed", {});
    order.push("after");
    expect(order).toEqual(["sub", "after"]);
  });

  it("ignores events with no subscribers", async () => {
    const bus = createCombatEventBus();
    await expect(bus.emit("enemy-killed", {})).resolves.toBeUndefined();
  });

  it("off removes a subscriber", async () => {
    const bus = createCombatEventBus();
    const spy = vi.fn();
    bus.on("enemy-killed", spy);
    bus.off("enemy-killed", spy);
    await bus.emit("enemy-killed", {});
    expect(spy).not.toHaveBeenCalled();
  });
});
