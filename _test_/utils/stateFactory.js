// Centralized state factory for test fixtures
import { createBaseState } from '../fixtures/stateBuilders.js';

export const createStateWithWorkers = (workers = []) => ({
	...createBaseState(),
	player: {
		...createBaseState().player,
		workers,
	},
});

export const createStateWithBuildings = (buildings = {}) => ({
	...createBaseState(),
	buildings,
});

export const createStateWithEnemies = (enemies = {}) => ({
	...createBaseState(),
	enemies: {
		byId: enemies,
	},
});

export const createStateWithItems = (playerItems = [], placeItems = []) => ({
	...createBaseState(),
	playerInventory: {
		...createBaseState().playerInventory,
		player: {
			...createBaseState().playerInventory.player,
			items: playerItems,
		},
	},
	placeInventory: {
		...createBaseState().placeInventory,
		village_center: {
			...createBaseState().placeInventory.village_center,
			items: placeItems,
		},
	},
});

export const createCombatState = (overrides = {}) => ({
	...createBaseState(),
	combat: { isInCombat: true },
	places: {
		currentPlaceId: "village_center",
		village_center: {
			spawn: {
				drops: [
					{ itemId: "apple", dropRate: 0.5 },
					{ itemId: "wood", dropRate: 0.3 },
				],
			},
		},
	},
	...overrides,
});

export const createProductionState = (workers = [], buildings = {}) => ({
	...createBaseState(),
	player: {
		workers,
		gold: 100,
	},
	buildings,
});

// Helper to create test items
export const createTestItem = (id, name, type = "material", quantity = 1, weight = 1) => ({
	id,
	name,
	type,
	quantity,
	weight,
});

// Helper to create test equipment
export const createTestEquipment = (id, name, slot, quantity = 1, weight = 5) => ({
	id,
	name,
	type: "equipment",
	quantity,
	weight,
	slot,
});
