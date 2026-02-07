import { describe, it, expect } from "vitest";
import {
  validateSlotLimit,
  validateWeightLimit,
  validateItemExists,
  validateEquipmentSlot,
  validateItemMove,
} from "../src/store/slices/inventory/inventoryValidators";

describe("inventoryValidators", () => {
  describe("validateSlotLimit", () => {
    it("should pass when inventory has space", () => {
      const inventory = { maxSlots: 20, items: Array(5).fill({}) };
      const result = validateSlotLimit(inventory, 1);

      expect(result.isValid).toBe(true);
    });

    it("should fail when inventory is full", () => {
      const inventory = { maxSlots: 20, items: Array(20).fill({}) };
      const result = validateSlotLimit(inventory, 1);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe("INVENTORY_FULL");
    });

    it("should fail when inventory is null", () => {
      const result = validateSlotLimit(null, 1);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe("ITEM_NOT_FOUND");
    });
  });

  describe("validateWeightLimit", () => {
    it("should pass for non-player inventories", () => {
      const inventory = { type: "place", maxWeight: 100, items: [] };
      const result = validateWeightLimit(inventory, 50);

      expect(result.isValid).toBe(true);
    });

    it("should pass when player has capacity", () => {
      const inventory = {
        type: "player",
        maxWeight: 100,
        items: [{ weight: 10, quantity: 5 }],
      };
      const result = validateWeightLimit(inventory, 20);

      expect(result.isValid).toBe(true);
    });

    it("should fail when player is overweight", () => {
      const inventory = {
        type: "player",
        maxWeight: 100,
        items: [{ weight: 10, quantity: 10 }], // 100 weight used
      };
      const result = validateWeightLimit(inventory, 10);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe("WEIGHT_LIMIT_EXCEEDED");
    });
  });

  describe("validateItemExists", () => {
    it("should pass when item exists", () => {
      const inventory = { items: [{ id: "test", name: "test" }] };
      const result = validateItemExists(inventory, "test");

      expect(result.isValid).toBe(true);
      expect(result.itemIndex).toBe(0);
    });

    it("should fail when item does not exist", () => {
      const inventory = { items: [] };
      const result = validateItemExists(inventory, "nonexistent");

      expect(result.isValid).toBe(false);
      expect(result.error).toBe("ITEM_NOT_FOUND");
    });
  });

  describe("validateEquipmentSlot", () => {
    it("should pass for valid equipment", () => {
      const item = { type: "equipment", piece: "head" };
      const result = validateEquipmentSlot(item, "head");

      expect(result.isValid).toBe(true);
    });

    it("should fail for non-equipment items", () => {
      const item = { type: "consumable", name: "potion" };
      const result = validateEquipmentSlot(item, "head");

      expect(result.isValid).toBe(false);
      expect(result.error).toBe("INVALID_ITEM_TYPE");
    });

    it("should fail for invalid slot", () => {
      const item = { type: "equipment", piece: "invalid" };
      const result = validateEquipmentSlot(item, "head");

      expect(result.isValid).toBe(false);
      expect(result.error).toBe("EQUIPMENT_SLOT_INVALID");
    });
  });

  describe("validateItemMove", () => {
    const fromInventory = {
      items: [{ id: "test", name: "test", weight: 1, quantity: 5 }],
      maxSlots: 20,
      maxWeight: 100,
    };

    const toInventory = {
      items: [],
      maxSlots: 20,
      maxWeight: 100,
    };

    it("should pass for valid move", () => {
      const result = validateItemMove(fromInventory, toInventory, "test", 2);

      expect(result.isValid).toBe(true);
      expect(result.item).toEqual(fromInventory.items[0]);
      expect(result.itemIndex).toBe(0);
      expect(result.moveQuantity).toBe(2);
    });

    it("should fail when source inventory is null", () => {
      const result = validateItemMove(null, toInventory, "test", 2);

      expect(result.isValid).toBe(false);
      expect(result.error).toBe("ITEM_NOT_FOUND");
    });

    it("should fail when item not found in source", () => {
      const result = validateItemMove(
        fromInventory,
        toInventory,
        "nonexistent",
        2,
      );

      expect(result.isValid).toBe(false);
      expect(result.error).toBe("ITEM_NOT_FOUND");
    });
  });
});
