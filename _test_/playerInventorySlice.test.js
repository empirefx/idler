import { describe, it, expect, beforeEach } from "vitest";
import inventoryReducer, {
	addItem,
	removeItem,
	equipItem,
	unequipItem,
	updateInventory,
	selectInventoryById,
	selectInventoryItems,
	selectEquipment,
	selectInventoryStats,
} from "../src/store/slices/inventorySlice";
import { TYPE_TO_SLOT } from "../src/store/slices/inventory/inventoryTypes.js";
import { createInitialInventoryState } from "./utils/testHelpers.js";

function addAndEquipArmor(st, armorId = "test-armor", armorName = "Test Armor") {
	st = inventoryReducer(
		st,
		addItem({
			inventoryId: "player",
			item: { id: armorId, name: armorName, type: "body", weight: 5 },
		}),
	);
	return inventoryReducer(
		st,
		equipItem({
			inventoryId: "player",
			itemId: armorId,
			typeToSlot: TYPE_TO_SLOT,
		}),
	);
}

describe("playerInventorySlice reducer and selectors", () => {
	let state;

	beforeEach(() => {
		state = createInitialInventoryState();
	});

	describe("initial state", () => {
		it("should have correct initial state structure", () => {
			expect(state).toHaveProperty("player");
			expect(state.player).toHaveProperty("id", "player");
			expect(state.player).toHaveProperty("type", "player");
			expect(state.player).toHaveProperty("maxSlots", 20);
			expect(state.player).toHaveProperty("maxWeight", 100);
			expect(state.player).toHaveProperty("items");
			expect(state.player).toHaveProperty("equipment");
		});
	});

	describe("addItem", () => {
		it("should add item to inventory", () => {
			const newItem = {
				id: "test-item",
				name: "Test Item",
				type: "consumable",
				weight: 1,
				quantity: 1,
			};
			const newState = inventoryReducer(
				state,
				addItem({
					inventoryId: "player",
					item: newItem,
				}),
			);

			expect(newState.player.items).toContainEqual(
				expect.objectContaining({
					id: "test-item",
					name: "Test Item",
					quantity: 1,
				}),
			);
		});

		it("should stack identical items", () => {
			const result = inventoryReducer(
				state,
				addItem({
					inventoryId: "player",
					item: {
						id: 1,
						name: "apple",
						type: "consumable",
						quantity: 2,
						weight: 0.5,
					},
				}),
			);

			const apple = result.player.items.find((item) => item.name === "apple");
			expect(apple.quantity).toBe(7); // 5 + 2
		});
	});

	describe("removeItem", () => {
		it("should remove existing item completely", () => {
			const result = inventoryReducer(
				state,
				removeItem({
					inventoryId: "player",
					itemId: 1,
				}),
			);

			expect(result.player.items.some((item) => item.id === 1)).toBe(false);
		});

		it("should reduce item quantity when removing partial amount", () => {
			const result = inventoryReducer(
				state,
				removeItem({
					inventoryId: "player",
					itemId: 1,
					quantity: 2,
				}),
			);

			const apple = result.player.items.find((item) => item.id === 1);
			expect(apple.quantity).toBe(3); // Started with 5, removed 2
		});
	});

	describe("equipItem", () => {
		it("should equip item to correct slot", () => {
			let testState = inventoryReducer(
				state,
				addItem({
					inventoryId: "player",
					item: {
						id: "test-armor",
						name: "Test Armor",
						type: "body",
						weight: 5,
					},
				}),
			);

			const result = inventoryReducer(
				testState,
				equipItem({
					inventoryId: "player",
					itemId: "test-armor",
					typeToSlot: TYPE_TO_SLOT,
				}),
			);

			expect(result.player.equipment.body).toEqual(
				expect.objectContaining({
					id: "test-armor",
					name: "Test Armor",
				}),
			);
			expect(
				result.player.items.some((item) => item.id === "test-armor"),
			).toBe(false);
		});

		it("should swap items when slot is occupied", () => {
			let testState = addAndEquipArmor(state);

			testState = inventoryReducer(
				testState,
				addItem({
					inventoryId: "player",
					item: {
						id: "new-armor",
						name: "New Armor",
						type: "body",
						weight: 20,
					},
				}),
			);

			const result = inventoryReducer(
				testState,
				equipItem({
					inventoryId: "player",
					itemId: "new-armor",
					typeToSlot: TYPE_TO_SLOT,
				}),
			);

			expect(result.player.equipment.body).toEqual(
				expect.objectContaining({
					id: "new-armor",
				}),
			);
			expect(
				result.player.items.some((item) => item.id === "test-armor"),
			).toBe(true);
		});
	});

	describe("unequipItem", () => {
		it("should unequip item back to inventory", () => {
			let testState = addAndEquipArmor(state);

			const result = inventoryReducer(
				testState,
				unequipItem({
					inventoryId: "player",
					slot: "body",
				}),
			);

			expect(result.player.equipment.body).toBeNull();
			expect(
				result.player.items.some((item) => item.id === "test-armor"),
			).toBe(true);
		});
	});

	describe("selectors", () => {
		it("should select inventory by ID", () => {
			const selected = selectInventoryById(
				{ inventory: state },
				"player",
			);
			expect(selected).toEqual(state.player);
		});

		it("should select inventory items", () => {
			const items = selectInventoryItems(
				{ inventory: state },
				"player",
			);
			expect(items).toEqual(state.player.items);
		});

		it("should select equipment", () => {
			const equipment = selectEquipment(
				{ inventory: state },
				"player",
			);
			expect(equipment).toEqual(state.player.equipment);
		});

		it("should select inventory stats", () => {
			const stats = selectInventoryStats(
				{ inventory: state },
				"player",
			);
			expect(stats).toEqual(
				expect.objectContaining({
					maxSlots: 20,
					weightUsed: expect.any(Number),
					maxWeight: 100,
					itemCount: state.player.items.length,
				}),
			);
		});
	});
});
