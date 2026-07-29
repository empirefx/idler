import { describe, it, expect } from "vitest";
import { buildDiff } from "../../server/diff.js";

describe("buildDiff", () => {
  it("returns diff when value changes", () => {
    const result = buildDiff({ gold: 100 }, { gold: 150 }, "player");
    expect(result).toEqual({ path: "player.gold", data: 150 });
  });

  it("returns null when value unchanged", () => {
    const result = buildDiff({ gold: 100 }, { gold: 100 }, "player");
    expect(result).toBeNull();
  });

  it("returns diff for nested path", () => {
    const result = buildDiff({ items: [{ id: "a", qty: 1 }] }, { items: [{ id: "a", qty: 2 }] }, "inventory.player");
    expect(result).toEqual({ path: "inventory.player.items", data: [{ id: "a", qty: 2 }] });
  });

  it("returns diff for new key", () => {
    const result = buildDiff({}, { gold: 50 }, "player");
    expect(result).toEqual({ path: "player.gold", data: 50 });
  });

  it("returns diff for deleted key", () => {
    const result = buildDiff({ gold: 50 }, {}, "player");
    expect(result).toEqual({ path: "player.gold", data: null });
  });
});
