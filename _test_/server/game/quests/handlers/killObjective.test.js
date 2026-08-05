import { describe, it, expect } from "vitest";
import { killObjective } from "../../../../../server/game/quests/handlers/killObjective.js";

const objective = { type: "kill", target: "any", required: 5, progressKey: "monstersKilled" };
const entry = { questId: "q1", startedAt: 1, progress: {} };

describe("killObjective", () => {
  it("exposes the kill type", () => {
    expect(killObjective.type).toBe("kill");
  });

  it("increments progress for kill events", () => {
    const patch = killObjective.applyProgress({
      entry,
      objective,
      event: { kind: "kill", data: { enemy: { id: "e1", name: "Forest Beast" } } },
    });
    expect(patch).toEqual({ monstersKilled: 1 });
  });

  it("returns null for events of other kinds", () => {
    expect(killObjective.applyProgress({ entry, objective, event: { kind: "collect" } })).toBeNull();
  });

  it("caps progress at the required amount", () => {
    const atCap = { ...entry, progress: { monstersKilled: 5 } };
    expect(
      killObjective.applyProgress({ entry: atCap, objective, event: { kind: "kill", data: { enemy: {} } } }),
    ).toBeNull();

    const nearCap = { ...entry, progress: { monstersKilled: 4 } };
    expect(
      killObjective.applyProgress({ entry: nearCap, objective, event: { kind: "kill", data: { enemy: {} } } }),
    ).toEqual({ monstersKilled: 5 });
  });

  it("ignores kills that do not match a specific target", () => {
    const specific = { type: "kill", target: "wolf", required: 3, progressKey: "wolvesKilled" };
    const patch = killObjective.applyProgress({
      entry,
      objective: specific,
      event: { kind: "kill", data: { enemy: { id: "bear", name: "Bear" } } },
    });
    expect(patch).toBeNull();
  });

  it("matches a specific target by enemy id", () => {
    const specific = { type: "kill", target: "wolf", required: 3, progressKey: "wolvesKilled" };
    const patch = killObjective.applyProgress({
      entry,
      objective: specific,
      event: { kind: "kill", data: { enemy: { id: "wolf" } } },
    });
    expect(patch).toEqual({ wolvesKilled: 1 });
  });

  it("isComplete is true when progress reaches the requirement", () => {
    const full = { ...entry, progress: { monstersKilled: 5 } };
    expect(killObjective.isComplete({ entry: full, objective })).toBe(true);
    expect(killObjective.isComplete({ entry, objective })).toBe(false);
  });

  it("getProgress reads the stored counter", () => {
    const full = { ...entry, progress: { monstersKilled: 4 } };
    expect(killObjective.getProgress({ entry: full, objective })).toBe(4);
    expect(killObjective.getProgress({ entry, objective })).toBe(0);
  });
});
