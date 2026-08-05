import { describe, it, expect } from "vitest";
import { collectObjective } from "../../../../../server/game/quests/handlers/collectObjective.js";

const objective = { type: "collect", target: "iron-ore", required: 5, progressKey: "ironOreCollected" };
const entry = { questId: "q1", startedAt: 1, progress: {} };

function makeInventory(items, overrides = {}) {
  return {
    id: "player",
    type: "player",
    maxSlots: 20,
    maxWeight: 100,
    items,
    equipment: {},
    ...overrides,
  };
}

describe("collectObjective", () => {
  it("exposes the collect type", () => {
    expect(collectObjective.type).toBe("collect");
  });

  it("getProgress counts matching items across stacks", () => {
    const inventory = makeInventory([
      { id: "a", icon: "iron-ore", quantity: 3 },
      { id: "b", icon: "iron-ore", quantity: 4 },
      { id: "c", icon: "coal", quantity: 10 },
    ]);
    expect(collectObjective.getProgress({ entry, objective, ctx: { inventory } })).toBe(7);
  });

  it("getProgress returns 0 when the item is not present", () => {
    expect(collectObjective.getProgress({ entry, objective, ctx: { inventory: makeInventory([]) } })).toBe(0);
  });

  it("isComplete is true when inventory holds the required amount", () => {
    const inventory = makeInventory([{ id: "a", icon: "iron-ore", quantity: 5 }]);
    expect(collectObjective.isComplete({ entry, objective, ctx: { inventory } })).toBe(true);
  });

  it("isComplete is false when inventory is short", () => {
    const inventory = makeInventory([{ id: "a", icon: "iron-ore", quantity: 3 }]);
    expect(collectObjective.isComplete({ entry, objective, ctx: { inventory } })).toBe(false);
  });

  it("consume deducts the required quantity from the inventory", () => {
    const inventory = makeInventory([{ id: "a", icon: "iron-ore", quantity: 7 }]);
    collectObjective.consume({ entry, objective, ctx: { inventory } });
    expect(inventory.items).toEqual([{ id: "a", icon: "iron-ore", quantity: 2 }]);
  });

  it("consume removes fully depleted stacks", () => {
    const inventory = makeInventory([
      { id: "a", icon: "iron-ore", quantity: 2 },
      { id: "b", icon: "iron-ore", quantity: 4 },
    ]);
    collectObjective.consume({ entry, objective, ctx: { inventory } });
    expect(inventory.items).toEqual([{ id: "b", icon: "iron-ore", quantity: 1 }]);
  });

  it("applyProgress is a no-op since collect progress is derived from inventory", () => {
    expect(collectObjective.applyProgress({ entry, objective, event: { kind: "collect" } })).toBeNull();
  });
});
