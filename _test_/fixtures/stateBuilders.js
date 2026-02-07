// State builders for creating test fixtures
export const createBaseState = (overrides = {}) => ({
	enemies: { byId: {} },
	places: { currentPlaceId: "village_center" },
	player: { workers: [], gold: 100 },
	buildings: {},
	playerInventory: {
		player: {
			id: "player",
			type: "player",
			maxSlots: 20,
			maxWeight: 100,
			items: [],
			equipment: {
				head: null,
				body: null,
				pants: null,
				"main-weapon": null,
				"second-weapon": null,
			},
		},
	},
	placeInventory: {
		village_center: {
			id: "village_center",
			placeId: "village_center",
			type: "place",
			maxSlots: 30,
			items: [],
		},
	},
	...overrides,
});

export const createStateWithBuilding = (building, overrides = {}) => ({
	...createBaseState(),
	buildings: {
		[building.id]: building,
	},
	...overrides,
});

export const createStateWithWorkers = (workers, overrides = {}) => ({
	...createBaseState(),
	player: {
		...createBaseState().player,
		workers,
	},
	...overrides,
});

export const createStateWithEnemies = (enemies, overrides = {}) => ({
	...createBaseState(),
	enemies: { byId: enemies },
	...overrides,
});

export const createStateWithInventory = (
	inventoryId,
	items,
	overrides = {},
) => {
	const state = { ...createBaseState() };
	if (state.placeInventory[inventoryId]) {
		state.placeInventory[inventoryId].items = items;
	}
	return {
		...state,
		...overrides,
	};
};
