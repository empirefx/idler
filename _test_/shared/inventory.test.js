import { describe, it, expect } from "vitest";
import {
	validateSlotLimit,
	validateWeightLimit,
	validateMoveQuantity,
	validateItemExists,
	validateEquipmentSlot,
	canItemsStack,
	calculateWeight,
	countSlots,
	cloneItem,
	applyAddItem,
	applyRemoveItem,
	applyMoveItem,
	applyEquipItem,
	applyUnequipItem,
	materializeItem,
	canAddItems,
} from "../../shared/inventory.js";
import { INVENTORY_ERRORS, TYPE_TO_SLOT } from "../../shared/constants.js";

const mockInventory = (overrides = {}) => ({
	id: "player",
	type: "player",
	maxSlots: 20,
	maxWeight: 100,
	items: [{ id: "item_1", name: "apple", type: "consumable", quantity: 5, weight: 0.5 }],
	equipment: {},
	...overrides,
});

describe("shared inventory validators", () => {

	it("validateSlotLimit: passes when under limit", () => {
		const inv = mockInventory({ items: [] });
		expect(validateSlotLimit(inv, 1).isValid).toBe(true);
	});

	it("validateSlotLimit: fails when over limit", () => {
		const inv = mockInventory({ maxSlots: 0 });
		expect(validateSlotLimit(inv, 1).isValid).toBe(false);
		expect(validateSlotLimit(inv, 1).error).toBe(INVENTORY_ERRORS.INVENTORY_FULL);
	});

	it("validateWeightLimit: passes for non-player inventories", () => {
		const inv = mockInventory({ type: "place" });
		expect(validateWeightLimit(inv, 999).isValid).toBe(true);
	});

	it("validateWeightLimit: fails when overweight", () => {
		const inv = mockInventory({ maxWeight: 10, items: [{ id: "x", weight: 10, quantity: 1, type: "material", name: "rock" }] });
		expect(validateWeightLimit(inv, 5).isValid).toBe(false);
	});

	it("validateMoveQuantity: fails when quantity exceeds available", () => {
		const item = { id: "x", quantity: 3 };
		expect(validateMoveQuantity(item, 5).isValid).toBe(false);
	});

	it("validateMoveQuantity: passes when quantity is valid", () => {
		const item = { id: "x", quantity: 5 };
		expect(validateMoveQuantity(item, 3).isValid).toBe(true);
	});

	it("validateItemExists: fails when item not found", () => {
		const inv = mockInventory({ items: [] });
		expect(validateItemExists(inv, "missing").isValid).toBe(false);
	});

	it("validateItemExists: passes when item found", () => {
		const inv = mockInventory();
		const result = validateItemExists(inv, "item_1");
		expect(result.isValid).toBe(true);
		expect(result.itemIndex).toBe(0);
	});

	it("validateEquipmentSlot: fails for non-equipable type", () => {
		const item = { id: "x", type: "consumable" };
		expect(validateEquipmentSlot(item, "head").isValid).toBe(false);
	});

	it("canItemsStack: returns true for same consumable", () => {
		const a = { type: "consumable", name: "apple", stats: null };
		const b = { type: "consumable", name: "apple", stats: null };
		expect(canItemsStack(a, b)).toBe(true);
	});

	it("canItemsStack: returns false for different types", () => {
		const a = { type: "consumable", name: "apple" };
		const b = { type: "material", name: "apple" };
		expect(canItemsStack(a, b)).toBe(false);
	});

	it("calculateWeight: sums item weights with quantities", () => {
		const items = [
			{ weight: 2, quantity: 3 },
			{ weight: 1, quantity: 1 },
		];
		expect(calculateWeight(items)).toBe(7);
	});

	it("countSlots: returns item count", () => {
		expect(countSlots([{}, {}, {}])).toBe(3);
	});

	it("cloneItem: deep copies an item", () => {
		const item = { id: "x", stats: { attack: 5 } };
		const clone = cloneItem(item);
		expect(clone).toEqual(item);
		expect(clone).not.toBe(item);
		expect(clone.stats).not.toBe(item.stats);
	});

	it("applyAddItem: adds new item to inventory", () => {
		const inv = mockInventory({ items: [] });
		const item = { id: "new_item", type: "material", name: "wood", quantity: 1, weight: 2 };
		applyAddItem(inv, cloneItem(item));
		expect(inv.items).toHaveLength(1);
		expect(inv.items[0].id).toBe("new_item");
	});

	it("applyAddItem: stacks onto existing item", () => {
		const inv = mockInventory();
		const item = { id: "item_2", type: "consumable", name: "apple", quantity: 3, weight: 0.5, stats: null };
		applyAddItem(inv, cloneItem(item));
		expect(inv.items).toHaveLength(1);
		expect(inv.items[0].quantity).toBe(8);
	});

	it("applyRemoveItem: reduces quantity", () => {
		const inv = mockInventory();
		applyRemoveItem(inv, "item_1", 2);
		expect(inv.items[0].quantity).toBe(3);
	});

	it("applyRemoveItem: removes item when quantity fully consumed", () => {
		const inv = mockInventory();
		applyRemoveItem(inv, "item_1", 5);
		expect(inv.items).toHaveLength(0);
	});

	it("applyMoveItem: moves item between inventories", () => {
		const from = mockInventory();
		const to = mockInventory({ id: "vault_1", type: "place", items: [] });
		applyMoveItem(from, to, "item_1", 3);
		expect(from.items[0].quantity).toBe(2);
		expect(to.items).toHaveLength(1);
		expect(to.items[0].quantity).toBe(3);
	});

	it("applyEquipItem: equips item to slot", () => {
		const inv = mockInventory({
			items: [{ id: "helm_1", type: "head", name: "Helm", weight: 2, quantity: 1, stats: { defense: 2 }, consumable: null }],
		});
		applyEquipItem(inv, "helm_1", TYPE_TO_SLOT);
		expect(inv.equipment.head).toBeTruthy();
		expect(inv.items).toHaveLength(0);
	});

	it("applyUnequipItem: unequips item back to inventory", () => {
		const inv = mockInventory({
			items: [],
			equipment: { head: { id: "helm_1", type: "head", name: "Helm", weight: 2, quantity: 1 } },
		});
		applyUnequipItem(inv, "head");
		expect(inv.equipment.head).toBeNull();
		expect(inv.items).toHaveLength(1);
	});
});

describe("materializeItem", () => {
	it("fills damageType from the catalog for a seed weapon", () => {
		const seed = {
			icon: "staff1",
			id: 90,
			type: "main-weapon",
			name: "Wooden Staff",
			stats: { attack: 2, intelligence: 2 },
			buy: { gold: 15 },
		};
		const item = materializeItem(seed);
		expect(item.damageType).toBe("magic");
		expect(item.icon).toBe("staff1");
	});

	it("preserves seed id, quantity, and buy price", () => {
		const seed = {
			icon: "sword1",
			id: 54,
			quantity: 3,
			buy: { gold: 25 },
			sellable: { gold: 8 },
			stats: { attack: 3 },
		};
		const item = materializeItem(seed);
		expect(item.id).toBe(54);
		expect(item.quantity).toBe(3);
		expect(item.buy).toEqual({ gold: 25 });
		expect(item.sellable).toEqual({ gold: 8 });
		expect(item.damageType).toBe("physical");
	});

	it("returns the item unchanged when it has no icon", () => {
		const item = { id: "x", type: "consumable", name: "apple" };
		expect(materializeItem(item)).toBe(item);
	});

	it("returns the item unchanged when the icon is not in the catalog", () => {
		const item = { id: "x", icon: "not-a-real-icon", type: "main-weapon" };
		expect(materializeItem(item)).toBe(item);
	});
});

describe("canAddItems", () => {
	it("returns isValid true when there is room", () => {
		const inv = mockInventory({ items: [] });
		const res = canAddItems(inv, [
			{ id: "a", type: "consumable", name: "apple", quantity: 1, weight: 0.5 },
		]);
		expect(res.isValid).toBe(true);
	});

	it("allows stacking into an existing entry without using a slot", () => {
		const inv = mockInventory({});
		const res = canAddItems(inv, [
			{ id: "item_1", name: "apple", type: "consumable", quantity: 3, weight: 0.5 },
		]);
		expect(res.isValid).toBe(true);
	});

	it("rejects when adding would exceed max slots", () => {
		const inv = mockInventory({ maxSlots: 1, items: [] });
		const res = canAddItems(inv, [
			{ id: "a", type: "consumable", name: "apple", quantity: 1, weight: 0.5 },
			{ id: "b", type: "consumable", name: "bread", quantity: 1, weight: 0.5 },
		]);
		expect(res.isValid).toBe(false);
		expect(res.error).toBe(INVENTORY_ERRORS.INVENTORY_FULL);
	});

	it("rejects when adding would exceed max weight", () => {
		const inv = mockInventory({ maxSlots: 20, maxWeight: 1, items: [] });
		const res = canAddItems(inv, [
			{ id: "a", type: "consumable", name: "apple", quantity: 3, weight: 0.5 },
		]);
		expect(res.isValid).toBe(false);
		expect(res.error).toBe(INVENTORY_ERRORS.WEIGHT_LIMIT_EXCEEDED);
	});

	it("does not mutate the input inventory", () => {
		const inv = mockInventory({});
		canAddItems(inv, [
			{ id: "a", type: "consumable", name: "apple", quantity: 3, weight: 0.5 },
		]);
		expect(inv.items).toEqual([
			{ id: "item_1", name: "apple", type: "consumable", quantity: 5, weight: 0.5 },
		]);
	});
});
