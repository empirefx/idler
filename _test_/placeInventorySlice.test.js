import { describe, it, expect, beforeEach } from "vitest";
import inventoryReducer, {
	addItem,
	removeItem,
	updateInventory,
	addInventory,
	mergeInventories,
	selectInventoryById,
	selectInventoryItems,
	selectInventoryStats,
	selectInventoryByPlaceId,
} from "../src/store/slices/inventorySlice";

describe("placeInventorySlice reducer and selectors", () => {
	let state;

	beforeEach(() => {
		state = inventoryReducer(undefined, { type: "init" });
	});

	describe("initial state", () => {
		it("should have correct initial state structure", () => {
			expect(state).toHaveProperty("village_center");
			expect(state.village_center).toHaveProperty("id", "village_center");
			expect(state.village_center).toHaveProperty("type", "place");
			expect(state.village_center).toHaveProperty("placeId", "village_center");
			expect(state.village_center).toHaveProperty("maxSlots", 30);
			expect(state.village_center).toHaveProperty("items");
			expect(state.village_center.items).toHaveLength(1);
		});
	});

	describe("addItem", () => {
		it("should add item to place inventory", () => {
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
					inventoryId: "village_center",
					item: newItem,
				}),
			);

			expect(newState.village_center.items).toContainEqual(
				expect.objectContaining({
					id: "test-item",
					name: "Test Item",
					quantity: 1,
				}),
			);
		});

		it("should stack identical items in place inventory", () => {
			const result = inventoryReducer(
				state,
				addItem({
					inventoryId: "village_center",
					item: {
						id: 1,
						name: "apple",
						type: "consumable",
						quantity: 3,
						weight: 0.5,
					},
				}),
			);

			const apple = result.village_center.items.find(
				(item) => item.name === "apple",
			);
			expect(apple.quantity).toBe(13); // 10 + 3
		});
	});

	describe("removeItem", () => {
		it("should remove item from place inventory", () => {
			const result = inventoryReducer(
				state,
				removeItem({
					inventoryId: "village_center",
					itemId: 1,
				}),
			);

			expect(result.village_center.items.some((item) => item.id === 1)).toBe(
				false,
			);
		});

		it("should reduce item quantity when removing partial amount", () => {
			const result = inventoryReducer(
				state,
				removeItem({
					inventoryId: "village_center",
					itemId: 1,
					quantity: 5,
				}),
			);

			const apple = result.village_center.items.find((item) => item.id === 1);
			expect(apple.quantity).toBe(5); // Started with 10, removed 5
		});
	});

	describe("addInventory", () => {
		it("should add new place inventory", () => {
			const newPlace = {
				id: "new_place",
				placeId: "new_place",
				type: "place",
				maxSlots: 25,
				items: [],
			};

			const result = inventoryReducer(
				state,
				addInventory({
					inventoryId: "new_place",
					inventoryData: newPlace,
				}),
			);

			expect(result).toHaveProperty("new_place");
			expect(result.new_place).toEqual(
				expect.objectContaining({
					id: "new_place",
					placeId: "new_place",
					type: "place",
					maxSlots: 25,
				}),
			);
		});
	});

	describe("mergeInventories", () => {
		it("should merge items from one place to another", () => {
			const stateWithTwoPlaces = inventoryReducer(
				state,
				addInventory({
					inventoryId: "second_place",
					inventoryData: {
						id: "second_place",
						placeId: "second_place",
						type: "place",
						maxSlots: 20,
						items: [
							{
								id: 3,
								name: "orange",
								type: "consumable",
								quantity: 5,
								weight: 0.3,
							},
						],
					},
				}),
			);

			const result = inventoryReducer(
				stateWithTwoPlaces,
				mergeInventories({
					fromInventoryId: "second_place",
					toInventoryId: "village_center",
				}),
			);

			expect(
				result.village_center.items.some((item) => item.name === "orange"),
			).toBe(true);
			expect(result.second_place.items).toHaveLength(0);
		});
	});

	describe("selectors", () => {
		it("should select place inventory by ID", () => {
			const selected = selectInventoryById(
				{ inventory: state },
				"village_center",
			);
			expect(selected).toEqual(state.village_center);
		});

		it("should select place inventory items", () => {
			const items = selectInventoryItems(
				{ inventory: state },
				"village_center",
			);
			expect(items).toEqual(state.village_center.items);
		});

		it("should select place inventory stats", () => {
			const stats = selectInventoryStats(
				{ inventory: state },
				"village_center",
			);
			expect(stats).toEqual(
				expect.objectContaining({
					slotsUsed: 1,
					maxSlots: 30,
					itemCount: 1,
				}),
			);
		});

		it("should select inventory by place ID", () => {
			const vault = selectInventoryByPlaceId(
				{ inventory: state },
				"village_center",
			);
			expect(vault).toEqual(state.village_center);
		});
	});
});
