import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
	createStateWithBuilding,
	createStateWithWorkers,
	createBaseState,
} from "../fixtures/stateBuilders.js";
import { createMockStore } from "../mocks/services.mock.js";
import {
	createMockInventoryService,
	createMockBuilding,
	createPlaceState,
	createProductionTestScenario,
	testProductionProcessing,
	testZeroProductionScenario
} from "../utils/testHelpers.js";
import ProductionService from "../../src/game/services/ProductionService.js";

const createSawmillState = (overrides = {}) => ({
	...createStateWithWorkers([
		{ id: "worker1", assignments: { sawmill: { socketIndex: 0, material: "wood" } } },
	]),
	places: {
		village_center: { hasInventory: true, connections: [] },
	},
	inventory: {
		village_center: { items: [] },
	},
	...overrides,
});

describe("ProductionService", () => {
	let productionService;
	let mockStore, mockDispatch, mockItemFactory, mockInventoryService;

	beforeEach(() => {
		mockStore = createMockStore(createBaseState());
		mockDispatch = vi.fn();
		mockItemFactory = vi.fn().mockImplementation((type, qty) => ({
			id: `${type}-${Date.now()}`,
			name: type,
			type: "material",
			quantity: Math.max(1, Math.floor(qty || 1)),
			weight: 1,
		}));
		mockInventoryService = createMockInventoryService();

		productionService = new ProductionService(
			mockInventoryService,
			mockItemFactory,
			mockStore,
			mockDispatch,
			{},
		);

		vi.spyOn(console, "log").mockImplementation(() => {});
		vi.spyOn(console, "error").mockImplementation(() => {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("processBuildingProduction", () => {
		it("should process production for building with workers", () => {
			const { building, state, deltaTime } = createProductionTestScenario(
				"sawmill", "Sawmill", "wood", 10
			);

			productionService.processBuildingProduction(
				"sawmill",
				0,
				building,
				state,
				deltaTime,
			);

			expect(mockItemFactory).toHaveBeenCalledWith("wood", 10);

			expect(mockInventoryService.addItemToInventory).toHaveBeenCalledWith(
				mockStore,
				"village_center",
				expect.objectContaining({
					name: "wood",
					type: "material",
				}),
			);
		});

		it("should not process production for building without workers", () => {
			const { building, state, deltaTime } = createProductionTestScenario(
				"mine", "Mine", "stone", 15
			);
			state.player.workers = [];

			productionService.processBuildingProduction(
				"mine",
				0,
				building,
				state,
				deltaTime,
			);

			expect(mockItemFactory).not.toHaveBeenCalled();
			expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
		});

		it("should use baseProductionRate for production rate", () => {
			const { building, state, deltaTime } = createProductionTestScenario(
				"farm", "Farm", "food", 8
			);

			testProductionProcessing(
				productionService, mockItemFactory, "farm", building, state, deltaTime, "food", 8
			);
		});

		it("should handle zero production gracefully", () => {
			const building = { id: "sawmill", baseProductionRate: 0 };
			const state = createSawmillState();

			mockItemFactory.mockReturnValue(null);

			productionService.processBuildingProduction(
				"sawmill",
				0,
				building,
				state,
				1000,
			);

			expect(mockItemFactory).toHaveBeenCalledWith("wood", 1);
			expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
		});
	});

	describe("getWorkerByPlaceAndSocket", () => {
		it("should return worker assigned to a specific place and socket", () => {
			const state = {
				...createBaseState(),
				player: {
					workers: [
						{
							id: "worker1",
							assignments: {
								sawmill: { socketIndex: 0, material: "wood" },
							},
						},
						{
							id: "worker2",
							assignments: {
								mine: { socketIndex: 0, material: "stone" },
							},
						},
					],
				},
			};

			const worker = productionService.getWorkerByPlaceAndSocket(state, "sawmill", 0);

			expect(worker).toEqual(
				expect.objectContaining({
					id: "worker1",
				}),
			);
		});

		it("should return undefined when building has no workers", () => {
			const state = {
				...createBaseState(),
				player: {
					workers: [
						{
							id: "worker1",
							assignments: {
								mine: { socketIndex: 0, material: "stone" },
							},
						},
					],
				},
			};

			const worker = productionService.getWorkerByPlaceAndSocket(state, "farm", 0);

			expect(worker).toBeUndefined();
		});

		it("should return undefined for nonexistent building", () => {
			const state = createStateWithWorkers([
				{ id: "worker1", assignments: { sawmill: { socketIndex: 0, material: "wood" } } },
			]);

			const worker = productionService.getWorkerByPlaceAndSocket(
				state,
				"nonexistent",
				0,
			);

			expect(worker).toBeUndefined();
		});
	});

	describe("canBuildingProduce", () => {
		it("should return true when building has worker with material and production rate", () => {
			const state = createStateWithWorkers([
				{ id: "worker1", assignments: { sawmill: { socketIndex: 0, material: "wood" } } },
			]);
			const building = {
				id: "sawmill",
				baseProductionRate: 10,
			};

			const result = productionService.canBuildingProduce(state, "sawmill", 0, building);

			expect(result).toBeTruthy();
		});

		it("should return falsy when no workers assigned", () => {
			const state = {
				...createBaseState(),
				player: { workers: [] },
			};
			const building = {
				id: "farm",
				baseProductionRate: 8,
			};

			const result = productionService.canBuildingProduce(state, "farm", 0, building);

			expect(result).toBeFalsy();
		});

		it("should return falsy when production rate is zero", () => {
			const state = createStateWithWorkers([
				{ id: "worker1", assignments: { farm: { socketIndex: 0, material: "food" } } },
			]);
			const building = {
				id: "farm",
				baseProductionRate: 0,
			};

			const result = productionService.canBuildingProduce(state, "farm", 0, building);

			expect(result).toBeFalsy();
		});
	});

	describe("findClosestPlaceWithInventory", () => {
		it("should return current place when it has inventory", () => {
			const state = {
				places: {
					village_center: {
						hasInventory: true,
						connections: ["river_crossing"],
					},
					river_crossing: {
						hasInventory: false,
						connections: ["village_center"],
					},
				},
				inventory: {
					village_center: { items: [] },
				},
			};

			const result = productionService.findClosestPlaceWithInventory(
				"village_center",
				state,
			);
			expect(result).toBe("village_center");
		});

		it.each([
			["directly connected", {
				river_crossing: {
					hasInventory: false,
					connections: ["village_center", "farmlands"],
				},
				village_center: {
					hasInventory: true,
					connections: ["river_crossing"],
				},
				farmlands: {
					hasInventory: false,
					connections: ["river_crossing"],
				},
			}],
			["multi-level", {
				river_crossing: {
					hasInventory: false,
					connections: ["farmlands"],
				},
				farmlands: {
					hasInventory: false,
					connections: ["river_crossing", "village_center"],
				},
				village_center: {
					hasInventory: true,
					connections: ["farmlands"],
				},
			}],
			["fallback to village_center when no path", {
				river_crossing: {
					hasInventory: false,
					connections: ["farmlands"],
				},
				farmlands: {
					hasInventory: false,
					connections: ["river_crossing"],
				},
			}],
		])("should find closest place with inventory (%s)", (_, places) => {
			const state = createPlaceState(places);
			const result = productionService.findClosestPlaceWithInventory(
				"river_crossing",
				state,
			);
			expect(result).toBe("village_center");
		});

		it("should return current place as fallback when no inventory found anywhere", () => {
			const state = {
				places: {
					river_crossing: {
						hasInventory: false,
						connections: [],
					},
				},
				inventory: {},
			};

			const result = productionService.findClosestPlaceWithInventory(
				"river_crossing",
				state,
			);
			expect(result).toBe("river_crossing");
		});
	});

	describe("processBuildingProduction with closest inventory", () => {
		it("should send items to closest place inventory when current place has none", () => {
			const building = {
				id: "mine",
				baseProductionRate: 5,
			};

			const state = {
				...createStateWithWorkers([
					{ id: "worker1", assignments: { mine: { socketIndex: 0, material: "or" } } },
				]),
				places: {
					river_crossing: {
						hasInventory: false,
						connections: ["village_center"],
						buildings: ["mine"],
					},
					village_center: {
						hasInventory: true,
						connections: ["river_crossing"],
						buildings: ["farm"],
					},
				},
				inventory: {
					village_center: { items: [] },
				},
			};
			const deltaTime = 1000;

			productionService.processBuildingProduction(
				"mine",
				0,
				building,
				state,
				deltaTime,
			);

			expect(mockInventoryService.addItemToInventory).toHaveBeenCalledWith(
				mockStore,
				"village_center",
				expect.objectContaining({
					name: "or",
					quantity: 5,
					type: "material",
				}),
			);
		});

		it("should keep items at current place when it has inventory", () => {
			const building = {
				id: "farm",
				baseProductionRate: 3,
			};

			const state = {
				...createStateWithWorkers([
					{ id: "worker1", assignments: { farm: { socketIndex: 0, material: "apple" } } },
				]),
				places: {
					village_center: {
						hasInventory: true,
						connections: ["river_crossing"],
						buildings: ["farm"],
					},
					river_crossing: {
						hasInventory: false,
						connections: ["village_center"],
						buildings: ["mine"],
					},
				},
				inventory: {
					village_center: { items: [] },
				},
			};
			const deltaTime = 1000;

			productionService.processBuildingProduction(
				"farm",
				0,
				building,
				state,
				deltaTime,
			);

			expect(mockInventoryService.addItemToInventory).toHaveBeenCalledWith(
				mockStore,
				"village_center",
				expect.objectContaining({
					name: "apple",
					quantity: 3,
				}),
			);
		});
	});

	describe("Error handling", () => {
		it("should handle errors gracefully", () => {
			mockItemFactory.mockImplementation(() => {
				throw new Error("Item creation failed");
			});

			const building = { id: "sawmill", baseProductionRate: 10 };
			const state = createSawmillState();
			const deltaTime = 1000;

			expect(() => {
				productionService.processBuildingProduction(
					"sawmill",
					0,
					building,
					state,
					deltaTime,
				);
			}).not.toThrow();

			expect(console.error).toHaveBeenCalledWith(
				"Failed to create item during production",
				expect.any(Error),
			);
		});
	});
});
