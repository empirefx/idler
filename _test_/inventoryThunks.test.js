import { describe, it, expect, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../src/store/slices/inventorySlice.js";
import {
	moveItemBetweenInventories,
	removeItemFromInventory,
} from "../src/store/slices/inventoryThunks.js";
import { createTestState } from "./utils/testHelpers.js";
import { createTestItem } from "./utils/stateFactory.js";

const baseState = createTestState();

const createTestStore = (inventoryOverrides = {}) => {
	return configureStore({
		reducer: {
			inventory: inventoryReducer,
		},
		preloadedState: {
			inventory: {
				player: baseState.playerInventory.player,
				village_center: baseState.placeInventory.village_center,
				...inventoryOverrides,
			},
		},
	});
};

describe("inventoryThunks", () => {
	let store;

	beforeEach(() => {
		store = createTestStore();
		vi.clearAllMocks();
	});

	describe("moveItemBetweenInventories", () => {
		it("should move item from player inventory to place inventory", () => {
			const testStore = createTestStore({
				player: {
					...baseState.playerInventory.player,
					items: [
						createTestItem("apple1", "apple", "consumable", 5, 0.5),
					],
				},
			});

			const result = testStore.dispatch(
				moveItemBetweenInventories("player", "village_center", "apple1", 2),
			);

			expect(result).toBe(true);

			const state = testStore.getState();

			const playerApples = state.inventory.player.items.find(
				(item) => item.id === "apple1",
			);
			expect(playerApples.quantity).toBe(3);

			const villageApples = state.inventory.village_center.items.find(
				(item) => item.name === "apple",
			);
			expect(villageApples.quantity).toBe(2);
		});

		it("should move item from place inventory to player inventory", () => {
			const testStore = createTestStore({
				village_center: {
					...baseState.placeInventory.village_center,
					items: [
						{
							...createTestItem("sword1", "iron sword", "equipment", 1, 5),
							piece: "main-weapon",
						},
					],
				},
			});

			const result = testStore.dispatch(
				moveItemBetweenInventories("village_center", "player", "sword1", 1),
			);

			expect(result).toBe(true);

			const state = testStore.getState();

			expect(
				state.inventory.village_center.items.some(
					(item) => item.id === "sword1",
				),
			).toBe(false);

			const playerSword = state.inventory.player.items.find(
				(item) => item.id === "sword1",
			);
			expect(playerSword).toBeDefined();
			expect(playerSword.name).toBe("iron sword");
		});

		it("should handle partial stack moves correctly", () => {
			const testStore = createTestStore({
				player: {
					...baseState.playerInventory.player,
					items: [
						createTestItem("berries1", "berries", "consumable", 10, 0.1),
					],
				},
			});

			const result = testStore.dispatch(
				moveItemBetweenInventories("player", "village_center", "berries1", 3),
			);

			expect(result).toBe(true);

			const state = testStore.getState();

			const playerBerries = state.inventory.player.items.find(
				(item) => item.id === "berries1",
			);
			expect(playerBerries.quantity).toBe(7);

			const villageBerries = state.inventory.village_center.items.find(
				(item) => item.name === "berries",
			);
			expect(villageBerries.quantity).toBe(3);

			// Moved item retains original id via cloneItem
			expect(villageBerries.id).toBe("berries1");
		});

		it("should return false when source inventory does not exist", () => {
			const result = store.dispatch(
				moveItemBetweenInventories("nonexistent", "village_center", "item1", 1),
			);

			expect(result).toBe(false);
		});

		it("should return false when target inventory does not exist", () => {
			const result = store.dispatch(
				moveItemBetweenInventories("player", "nonexistent", "apple1", 1),
			);

			expect(result).toBe(false);
		});

		it("should return false when item not found in source inventory", () => {
			const result = store.dispatch(
				moveItemBetweenInventories(
					"player",
					"village_center",
					"nonexistent_item",
					1,
				),
			);

			expect(result).toBe(false);
		});

		it("should return false when target inventory is full", () => {
			const fullTargetState = {
				player: {
					id: "player",
					type: "player",
					maxSlots: 20,
					maxWeight: 100,
					items: [
						{
							id: "item1",
							name: "test item",
							type: "material",
							quantity: 1,
							weight: 1,
						},
					],
					equipment: {
						head: null,
						body: null,
						pants: null,
						boots: null,
						hands: null,
						"main-weapon": null,
						"second-weapon": null,
					},
				},
				village_center: {
					id: "village_center",
					type: "place",
					maxSlots: 1,
					items: [
						{
							id: "filler",
							name: "filler",
							type: "material",
							quantity: 1,
							weight: 1,
						},
					],
				},
			};

			const testStore = createTestStore(fullTargetState);

			const result = testStore.dispatch(
				moveItemBetweenInventories("player", "village_center", "item1", 1),
			);

			expect(result).toBe(false);
		});

		it("should return false when player weight limit exceeded", () => {
			const overweightState = {
				player: {
					...baseState.playerInventory.player,
					maxWeight: 10,
					items: [],
				},
				village_center: {
					...baseState.placeInventory.village_center,
					items: [
						createTestItem("heavy", "heavy item", "material", 1, 100),
					],
				},
			};

			const testStore = createTestStore(overweightState);

			const result = testStore.dispatch(
				moveItemBetweenInventories("village_center", "player", "heavy", 1),
			);

			expect(result).toBe(false);
		});
	});

	describe("removeItemFromInventory", () => {
		it("should remove item from player inventory", () => {
			const testStore = createTestStore({
				player: {
					...baseState.playerInventory.player,
					items: [
						createTestItem("apple1", "apple", "consumable", 5, 0.5),
					],
				},
			});

			const result = testStore.dispatch(
				removeItemFromInventory("player", "apple1", 2),
			);

			expect(result).toBe(true);

			const state = testStore.getState();
			const playerApples = state.inventory.player.items.find(
				(item) => item.id === "apple1",
			);
			expect(playerApples.quantity).toBe(3);
		});

		it("should remove item from place inventory", () => {
			const testStore = createTestStore({
				village_center: {
					...baseState.placeInventory.village_center,
					items: [
						createTestItem("berry1", "berries", "consumable", 10, 0.1),
					],
				},
			});

			const result = testStore.dispatch(
				removeItemFromInventory("village_center", "berry1", 10),
			);

			expect(result).toBe(true);

			const state = testStore.getState();
			expect(
				state.inventory.village_center.items.some(
					(item) => item.id === "berry1",
				),
			).toBe(false);
		});

		it("should remove entire item when quantity not specified", () => {
			const testStore = createTestStore({
				player: {
					...baseState.playerInventory.player,
					items: [
						{
							id: "single1",
							name: "single item",
							type: "material",
							quantity: 1,
							weight: 1,
						},
					],
				},
			});

			const result = testStore.dispatch(
				removeItemFromInventory("player", "single1"),
			);

			expect(result).toBe(true);

			const finalState = testStore.getState();
			expect(
				finalState.inventory.player.items.some(
					(item) => item.id === "single1",
				),
			).toBe(false);
		});

		it("should return false when inventory does not exist", () => {
			const result = store.dispatch(
				removeItemFromInventory("nonexistent", "item1", 1),
			);

			expect(result).toBe(false);
		});

		it("should return false when item not found", () => {
			const result = store.dispatch(
				removeItemFromInventory("player", "nonexistent_item", 1),
			);

			expect(result).toBe(false);
		});

		it("should remove item from a non-default inventory", () => {
			const placeState = {
				some_place_id: {
					id: "some_place_id",
					placeId: "village_center",
					type: "place",
					maxSlots: 30,
					items: [
						{
							id: "test",
							name: "test",
							type: "material",
							quantity: 1,
							weight: 1,
						},
					],
				},
			};

			const testStore = createTestStore(placeState);

			const result = testStore.dispatch(
				removeItemFromInventory("some_place_id", "test", 1),
			);

			expect(result).toBe(true);

			const state = testStore.getState();
			expect(state.inventory.some_place_id.items).toHaveLength(0);
		});
	});

	describe("error handling", () => {
		it("should return false for move failures", () => {
			const result = store.dispatch(
				moveItemBetweenInventories(
					"nonexistent",
					"village_center",
					"item1",
					1,
				),
			);

			expect(result).toBe(false);
		});

		it("should return false for remove failures", () => {
			const result = store.dispatch(
				removeItemFromInventory("player", "nonexistent_item", 1),
			);

			expect(result).toBe(false);
		});
	});
});
