import { describe, it, expect } from "vitest";
import { objectiveRegistry, createObjectiveRegistry } from "../../../../server/game/quests/registry.js";
import { killObjective } from "../../../../server/game/quests/handlers/killObjective.js";
import { collectObjective } from "../../../../server/game/quests/handlers/collectObjective.js";

describe("objectiveRegistry", () => {
  it("registers the built-in kill and collect handlers", () => {
    expect(objectiveRegistry.get("kill")).toBe(killObjective);
    expect(objectiveRegistry.get("collect")).toBe(collectObjective);
  });

  it("returns null for unknown objective types", () => {
    expect(objectiveRegistry.get("explore")).toBeNull();
  });

  it("reports whether a type is registered", () => {
    expect(objectiveRegistry.has("kill")).toBe(true);
    expect(objectiveRegistry.has("explore")).toBe(false);
  });
});

describe("createObjectiveRegistry", () => {
  it("returns an empty registry that can register new types", () => {
    const registry = createObjectiveRegistry();
    expect(registry.get("anything")).toBeNull();

    const custom = { type: "custom", applyProgress: () => null };
    registry.register("custom", custom);
    expect(registry.get("custom")).toBe(custom);
  });
});
