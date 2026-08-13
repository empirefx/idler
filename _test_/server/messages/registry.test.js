import { describe, it, expect, vi } from "vitest";
import { createMessageRegistry, messageRegistry } from "../../../server/messages/registry.js";

describe("messageRegistry", () => {
  it("registers and looks up handlers by type", () => {
    const reg = createMessageRegistry();
    const handler = vi.fn();
    reg.register("PING", handler);
    expect(reg.has("PING")).toBe(true);
    expect(reg.get("PING")).toBe(handler);
  });

  it("returns null for unknown types", () => {
    const reg = createMessageRegistry();
    expect(reg.get("NOPE")).toBeNull();
    expect(reg.has("NOPE")).toBe(false);
  });

  it("registers all 27 client message types", () => {
    const expected = [
      "JOIN", "RESUME",
      "TOGGLE_AUTO_COMBAT", "SET_TARGET", "REVIVE", "SPEND_SKILL_POINT", "LEVEL_UP", "NAVIGATE",
      "BUY_SOCKET", "BUILD", "UPGRADE_BUILDING", "DEMOLISH",
      "ASSIGN_WORKER", "UNASSIGN_WORKER", "FIRE_WORKER", "HIRE_WORKER", "REROLL_WORKERS", "BUY_WORKER_SLOT",
      "CRAFT",
      "BUY_ITEM", "SELL_ITEM", "USE_ITEM",
      "ACCEPT_QUEST", "COMPLETE_QUEST",
      "MOVE_ITEM", "EQUIP_ITEM", "UNEQUIP_ITEM",
    ];
    expect(expected).toHaveLength(27);
    for (const type of expected) {
      expect(messageRegistry.has(type), type).toBe(true);
    }
  });
});
