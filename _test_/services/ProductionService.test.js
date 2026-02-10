import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
	createStateWithBuilding,
	createStateWithWorkers,
	createBaseState,
} from "../fixtures/stateBuilders.js";
import { createMockStore } from "../mocks/services.mock.js";
import { 
	createMockItemFactory, 
	createMockInventoryService, 
	createMockBuilding, 
	createPlaceState,
	createProductionTestScenario,
	testProductionProcessing,
	testZeroProductionScenario
} from "../utils/testHelpers.js";
import ProductionService from "../../src/game/services/ProductionService.js";

describe("ProductionService", () => {
	let productionService;
	let mockStore, mockDispatch, mockItemFactory, mockInventoryService;

	beforeEach(() => {
		// Setup mocks
		mockStore = createMockStore(createBaseState());
		mockDispatch = vi.fn();
		mockItemFactory = createMockItemFactory();
		mockInventoryService = createMockInventoryService();

		// Create ProductionService instance
		productionService = new ProductionService(
			mockInventoryService,
			mockItemFactory,
			mockStore,
			mockDispatch,
			{}, // events
		);

		// Mock Logger to avoid console output during tests
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
			// Override to test calculateProduction method
			building.calculateProduction = () => 10;

			// Mock the production calculation
			const expectedItem = {
				id: "wood-12345",
				name: "wood",
				type: "material",
				quantity: 10,
				weight: 1,
			};
			mockItemFactory.create.mockReturnValue(expectedItem);

			productionService.processBuildingProduction(
				"sawmill",
				building,
				state,
				deltaTime,
			);

			// Verify item creation
			expect(mockItemFactory.create).toHaveBeenCalledWith("wood", 10);

			// Verify inventory addition
			expect(mockInventoryService.addItemToInventory).toHaveBeenCalledWith(
				mockStore,
				"village_center", // inventoryId (from processBuildingProduction)
				expect.objectContaining({
					name: "wood",
					quantity: 10,
					type: "material",
				}),
			);
		});

		it("should not process production for building without workers", () => {
			const { building, state, deltaTime } = createProductionTestScenario(
				"mine", "Mine", "stone", 15
			);
			// Override to test calculateProduction method
			building.calculateProduction = () => 15;
			// Remove workers to test no-production scenario
			state.player.workers = [];

			productionService.processBuildingProduction(
				"mine",
				building,
				state,
				deltaTime,
			);

			// Should not create items
			expect(mockItemFactory.create).not.toHaveBeenCalled();
			expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
		});

		it("should use baseProductionRate when calculateProduction not available", () => {
			const { building, state, deltaTime } = createProductionTestScenario(
				"farm", "Farm", "food", 8
			);
			// Override building to test baseProductionRate fallback
			building.baseProductionRate = 8;
			building.calculateProduction = undefined;

			testProductionProcessing(
				productionService, mockItemFactory, "farm", building, state, deltaTime, "food", 8
			);
		});

		it("should handle zero production gracefully", () => {
			const { building, state, deltaTime } = createProductionTestScenario(
				"sawmill", "Sawmill", "wood", 0
			);

			testZeroProductionScenario(
				productionService, mockItemFactory, mockInventoryService, "sawmill", building, state, deltaTime
			);
		});
	});

	describe("getAssignedWorkers", () => {
		it("should return workers assigned to a specific building", () => {
			const state = createStateWithWorkers([
				{ id: "worker1", assignedBuildingId: "sawmill" },
				{ id: "worker2", assignedBuildingId: "mine" },
				{ id: "worker3", assignedBuildingId: null }, // Unassigned
			]);

			const workers = productionService.getAssignedWorkers(state, "sawmill");

			expect(workers).toHaveLength(1);
			expect(workers[0]).toEqual(
				expect.objectContaining({
					id: "worker1",
					assignedBuildingId: "sawmill",
				}),
			);
		});

		it("should return empty array when building has no workers", () => {
			const state = createStateWithWorkers([
				{ id: "worker1", assignedBuildingId: "mine" },
				{ id: "worker2", assignedBuildingId: null },
			]);

			const workers = productionService.getAssignedWorkers(state, "farm"); // Farm has no workers

			expect(workers).toHaveLength(0);
		});

		it("should return empty array for nonexistent building", () => {
			const state = createStateWithWorkers([
				{ id: "worker1", assignedBuildingId: "sawmill" },
			]);

			const workers = productionService.getAssignedWorkers(
				state,
				"nonexistent",
			);

			expect(workers).toHaveLength(0);
		});
	});

	describe("calculateProductionRate", () => {
		it("should calculate production rate correctly", () => {
			const building = {
				id: "sawmill",
				calculateProduction: () => 10,
				baseProductionRate: 5,
			};
			const state = createStateWithWorkers([
				{ id: "worker1", assignedBuildingId: "sawmill" },
			]);

			const rate = productionService.calculateProductionRate(building, state);

			expect(rate).toBe(10); // Should use custom calculation
		});

		it("should return base production rate when no custom calculation", () => {
			const building = {
				id: "mine",
				calculateProduction: undefined,
				baseProductionRate: 8,
			};
			const state = createStateWithWorkers([
				{ id: "worker1", assignedBuildingId: "mine" },
			]);

			const rate = productionService.calculateProductionRate(building, state);

			expect(rate).toBe(8); // Should use base rate
		});

		it("should return zero when no workers assigned", () => {
			const building = {
				id: "farm",
				baseProductionRate: 8,
			};
			const state = createStateWithWorkers([]); // No workers

			const rate = productionService.calculateProductionRate(building, state);

			expect(rate).toBe(0); // No workers = no production
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
				placeInventory: {
					village_center: { items: [] },
				},
			};

			const result = productionService.findClosestPlaceWithInventory(
				"village_center",
				state,
			);
			expect(result).toBe("village_center");
		});

		it("should find closest connected place with inventory", () => {
			const state = createPlaceState({
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
			});

			const result = productionService.findClosestPlaceWithInventory(
				"river_crossing",
				state,
			);
			expect(result).toBe("village_center");
		});

		it("should search multiple levels for closest inventory", () => {
			const state = createPlaceState({
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
			});

			const result = productionService.findClosestPlaceWithInventory(
				"river_crossing",
				state,
			);
			expect(result).toBe("village_center");
		});

		it("should fallback to village_center when no other inventory found", () => {
			const state = {
				places: {
					river_crossing: {
						hasInventory: false,
						connections: ["farmlands"],
					},
					farmlands: {
						hasInventory: false,
						connections: ["river_crossing"],
					},
				},
				placeInventory: {
					village_center: { items: [] },
				},
			};

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
				placeInventory: {},
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
				calculateProduction: () => 5,
				productionType: "or",
			};

			const state = {
				...createStateWithWorkers([
					{ id: "worker1", assignedBuildingId: "mine" },
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
				placeInventory: {
					village_center: { items: [] },
				},
			};
			const deltaTime = 1000;

			productionService.processBuildingProduction(
				"mine",
				building,
				state,
				deltaTime,
			);

			// Should send items to village_center (closest with inventory)
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
				calculateProduction: () => 3,
				productionType: "apple",
			};

			const state = {
				...createStateWithWorkers([
					{ id: "worker1", assignedBuildingId: "farm" },
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
				placeInventory: {
					village_center: { items: [] },
				},
			};
			const deltaTime = 1000;

			productionService.processBuildingProduction(
				"farm",
				building,
				state,
				deltaTime,
			);

			// Should keep items at village_center (current place has inventory)
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
			// Mock itemFactory to throw error
			mockItemFactory.create.mockImplementation(() => {
				throw new Error("Item creation failed");
			});

			const building = {
				id: "sawmill",
				calculateProduction: () => 10,
				productionType: "wood",
			};
			const state = createStateWithWorkers([
				{ id: "worker1", assignedBuildingId: "sawmill" },
			]);
			const deltaTime = 1000;

			// Should not crash
			expect(() => {
				productionService.processBuildingProduction(
					"sawmill",
					building,
					state,
					deltaTime,
				);
			}).not.toThrow();

			// Error should be logged
			expect(console.error).toHaveBeenCalledWith(
				"Failed to create item during production",
				expect.any(Error),
			);
		});
	});
});
