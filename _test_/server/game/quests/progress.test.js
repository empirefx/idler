import { describe, it, expect } from "vitest";
import { incrementProgress } from "../../../../server/game/quests/progress.js";

describe("incrementProgress", () => {
  it("returns the incremented value for a matching progress key", () => {
    const entry = { questId: "q1", progress: { monstersKilled: 2 } };
    expect(incrementProgress(entry, "monstersKilled", 1, 5)).toBe(3);
  });

  it("starts from 0 when the key is missing", () => {
    expect(incrementProgress({ questId: "q1", progress: {} }, "monstersKilled", 1, 5)).toBe(1);
  });

  it("caps the value at the required amount", () => {
    const entry = { questId: "q1", progress: { monstersKilled: 4 } };
    expect(incrementProgress(entry, "monstersKilled", 1, 5)).toBe(5);
  });

  it("returns null when the value would not change", () => {
    const entry = { questId: "q1", progress: { monstersKilled: 5 } };
    expect(incrementProgress(entry, "monstersKilled", 1, 5)).toBeNull();
  });
});
