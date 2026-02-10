import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import GameEngine from "../../src/game/engine/GameEngine";
import Logger from "../../src/game/utils/Logger";
import {
	createMockStore,
	createMockGameLoopConstructor,
	createMockGameLoop,
	createMockEventBus,
	createMockInventoryService,
	createMockItemFactory,
	createMockCombatService,
	createMockSpawnService,
} from "../mocks";
import {
	createBaseState,
	createStateWithBuilding,
	createStateWithWorkers,
} from "../fixtures/stateBuilders";
import { 
	createMockBuilding,
	createTestStateWithBuildings,
	createProductionTestScenario,
	testProductionProcessing,
	testZeroProductionScenario,
	createMultipleBuildingsScenario
} from "../utils/testHelpers.js";

describe("GameEngine", () => {
	let gameEngine;
	let mockStore,
		mockDispatch,
		mockGameLoop,
		mockEventBus,
		mockInventoryService,
		mockItemFactory,
		mockCombatService,
		mockSpawnService;
	let originalLocalStorage;

	beforeEach(() => {
		// Setup mocks
		mockStore = createMockStore(createBaseState());
		mockDispatch = vi.fn();
		mockGameLoop = createMockGameLoop();
		mockEventBus = createMockEventBus();
		mockInventoryService = createMockInventoryService();
		mockItemFactory = createMockItemFactory();
		mockCombatService = createMockCombatService();
		mockSpawnService = createMockSpawnService();

		// Mock Logger to avoid console output during tests
		vi.spyOn(Logger, "log").mockImplementation(() => {});
		vi.spyOn(Logger, "error").mockImplementation(() => {});

		// Save original localStorage
		originalLocalStorage = global.localStorage;
		global.localStorage = {
			getItem: vi.fn(),
			setItem: vi.fn(),
			removeItem: vi.fn(),
			clear: vi.fn(),
		};

		// Create GameEngine instance with mocked dependencies
		const MockGameLoopClass = createMockGameLoopConstructor();

		gameEngine = new GameEngine(mockDispatch, mockStore, {
			gameLoop: MockGameLoopClass,
			inventoryService: mockInventoryService,
			itemFactory: mockItemFactory,
			combatService: mockCombatService,
			SpawnService: mockSpawnService,
		});
	});

	afterEach(() => {
		// Restore localStorage
		global.localStorage = originalLocalStorage;
		vi.restoreAllMocks();
	});

	describe("Constructor", () => {
		it("should initialize with correct dependencies", () => {
			expect(gameEngine.store).toBe(mockStore);
			expect(gameEngine.dispatch).toBe(mockDispatch);
			expect(gameEngine.gameLoop).toBeDefined();
			expect(gameEngine.inventoryService).toBe(mockInventoryService);
			expect(gameEngine.itemFactory).toBe(mockItemFactory);
			expect(gameEngine.eventBusService).toBeDefined();
			expect(gameEngine.spawnService).toBeDefined();
			expect(gameEngine.combatService).toBeDefined();
		});

		it("should set up initial state tracking", () => {
			expect(gameEngine.lastEnemyState).toEqual({});
			expect(gameEngine.lastPlaceId).toBe("village_center");
			expect(gameEngine.lastUpdate).toBeDefined();
			expect(gameEngine.isRunning).toBe(false);
		});

		it("should register spawnEnemy event handler", () => {
			const enemyData = {
				placeId: "test_place",
				enemy: { id: "enemy1", name: "Test Enemy" },
			};

			mockEventBus.emit("spawnEnemy", enemyData);

			expect(mockDispatch).toHaveBeenCalledWith({
				type: "enemies/addEnemy",
				payload: enemyData,
			});
		});

		it("should create GameLoop instance", () => {
			expect(mockGameLoop).toHaveBeenCalled();
		});
	});

	describe("Game Lifecycle Management", () => {
		describe("start()", () => {
			it("should start game loop when not running", () => {
				gameEngine.start();

				expect(gameEngine.isRunning).toBe(true);
				expect(mockGameLoop.start).toHaveBeenCalled();
				expect(Logger.log).toHaveBeenCalledWith(
					"Game engine starting",
					0,
					"game-loop",
				);
			});

			it("should not start when already running", () => {
				gameEngine.isRunning = true;

				gameEngine.start();

				expect(mockGameLoop.start).toHaveBeenCalledTimes(1); // Only called once in beforeEach
			});

			it("should set up navigation subscription", () => {
				gameEngine.start();

				expect(mockStore.subscribe).toHaveBeenCalled();
			});

			it("should set up enemy death subscription", () => {
				gameEngine.start();

				expect(mockStore.subscribe).toHaveBeenCalledTimes(2); // nav + enemy
			});

			it("should set up combat subscription", () => {
				gameEngine.start();

				expect(mockStore.subscribe).toHaveBeenCalledTimes(3); // nav + enemy + combat
			});
		});

		describe("stop()", () => {
			it("should stop game loop and clean up subscriptions", () => {
				// Mock the unsubscribe functions
				const mockUnsubscribeNav = vi.fn();
				const mockUnsubscribeEnemy = vi.fn();
				const mockUnsubscribeCombat = vi.fn();

				mockStore.subscribe.mockImplementation(() => mockUnsubscribeNav);
				mockStore.subscribe.mockImplementation(() => mockUnsubscribeEnemy);
				mockStore.subscribe.mockImplementation(() => mockUnsubscribeCombat);

				// Start first to set up subscriptions
				gameEngine.start();

				// Then stop
				gameEngine.stop();

				expect(gameEngine.isRunning).toBe(false);
				expect(mockGameLoop.stop).toHaveBeenCalled();
				expect(mockUnsubscribeNav).toHaveBeenCalled();
				expect(mockUnsubscribeEnemy).toHaveBeenCalled();
				expect(mockUnsubscribeCombat).toHaveBeenCalled();
			});
		});
	});

	describe("Inventory Management", () => {
		describe("getVaultInventory()", () => {
			it("should return inventory for target place", () => {
				const targetPlace = { id: "village_center", name: "Village" };
				const state = {
					...mockStore.getState(),
					placeInventory: {
						village_center: { items: [{ id: "item1" }] },
					},
				};

				const result = gameEngine.getVaultInventory(state, targetPlace);

				expect(result).toEqual({ items: [{ id: "item1" }] });
			});

			it("should return undefined when no target place", () => {
				const result = gameEngine.getVaultInventory({}, null);

				expect(result).toBeUndefined();
			});

			it("should return undefined when no inventory for place", () => {
				const targetPlace = { id: "nonexistent", name: "Nowhere" };
				const state = {
					...mockStore.getState(),
					placeInventory: {},
				};

				const result = gameEngine.getVaultInventory(state, targetPlace);

				expect(result).toBeUndefined();
			});
		});

		describe("addItemToInventory()", () => {
			it("should call inventory service with correct parameters", () => {
				const targetPlaceId = "village_center";
				const item = { id: "wood-1", name: "wood", quantity: 10 };

				gameEngine.addItemToInventory(targetPlaceId, item);

				expect(mockInventoryService.addItemToInventory).toHaveBeenCalledWith(
					mockStore,
					targetPlaceId,
					item,
				);
			});
		});
	});

	describe("Production Processing", () => {
		describe("processBuildingProduction()", () => {
			it("should process production for building with workers", () => {
				const { building, state, deltaTime } = createProductionTestScenario(
					"sawmill", "Sawmill", "wood", 15
				);
				// Override to test calculateProduction method
				building.calculateProduction = () => 15;

				testProductionProcessing(
					gameEngine, mockItemFactory, "sawmill", building, state, deltaTime, "wood", 15
				);
			});

			it("should not process production for building without workers", () => {
				const { building, state, deltaTime } = createProductionTestScenario(
					"sawmill", "Sawmill", "wood", 15
				);
				// Override to test calculateProduction method
				building.calculateProduction = () => 15;
				// Remove workers to test no-production scenario
				state.player.workers = [];

				gameEngine.processBuildingProduction(
					"sawmill",
					building,
					state,
					deltaTime,
				);

				expect(mockItemFactory.create).not.toHaveBeenCalled();
				expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
			});

			it("should use baseProductionRate when calculateProduction not available", () => {
				const { building, state, deltaTime } = createProductionTestScenario(
					"sawmill", "Sawmill", "wood", 8
				);
				// Override building to test baseProductionRate fallback
				building.baseProductionRate = 8;
				building.calculateProduction = undefined;

				testProductionProcessing(
					gameEngine, mockItemFactory, "sawmill", building, state, deltaTime, "wood", 8
				);
			});

			it("should handle zero production gracefully", () => {
				const { building, state, deltaTime } = createProductionTestScenario(
					"sawmill", "Sawmill", "wood", 0
				);

				gameEngine.processBuildingProduction("sawmill", building, state, deltaTime);
				expect(mockItemFactory.create).toHaveBeenCalledWith("wood", 0);
			});

			it("should handle invalid place inventory gracefully", () => {
				const { building, state, deltaTime } = createProductionTestScenario(
					"sawmill", "Sawmill", "wood", 10
				);
				// Override to test calculateProduction method
				building.calculateProduction = () => 10;
				// Remove place inventory to test error handling
				state.placeInventory = {};

				gameEngine.processBuildingProduction(
					"sawmill",
					building,
					state,
					deltaTime,
				);

				expect(Logger.error).toHaveBeenCalledWith(
					"No inventory found for target place:",
					0,
					"inventory",
					expect.any(Object),
				);
			});
		});
	});

	describe("Save/Load Operations", () => {
		describe("save()", () => {
			it("should save current state to localStorage", () => {
				const mockState = {
					player: { gold: 200, level: 5 },
					buildings: { sawmill: { level: 2 } },
					places: { currentPlaceId: "forest" },
				};
				mockStore.getState.mockReturnValue(mockState);

				gameEngine.save();

				const expectedState = {
					player: mockState.player,
					buildings: mockState.buildings,
					place: mockState.places,
				};

				expect(global.localStorage.setItem).toHaveBeenCalledWith(
					"gameState",
					JSON.stringify(expectedState),
				);
			});

			it("should get fresh state from store", () => {
				gameEngine.save();

				// Verify getState was called
				expect(mockStore.getState).toHaveBeenCalled();
			});
		});

		describe("load()", () => {
			it("should load and restore saved state", () => {
				const savedState = {
					player: { gold: 500, level: 10 },
					buildings: { mine: { level: 3 } },
					places: { currentPlaceId: "mountains" },
				};
				global.localStorage.getItem.mockReturnValue(JSON.stringify(savedState));

				gameEngine.load();

				// Should dispatch player state
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "player/setPlayerState",
					payload: savedState.player,
				});

				// Should dispatch buildings
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "buildings/setBuildings",
					payload: savedState.buildings,
				});

				// Should dispatch places
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "places/setPlaces",
					payload: savedState.places,
				});

				expect(Logger.log).toHaveBeenCalledWith(
					"Game state loaded successfully",
					0,
					"game-loop",
				);
			});

			it("should handle JSON parsing errors gracefully", () => {
				global.localStorage.getItem.mockReturnValue("invalid json");

				gameEngine.load();

				expect(Logger.error).toHaveBeenCalledWith(
					"Error parsing saved game state:",
					0,
					"game-loop",
					expect.any(Error),
				);
				expect(global.localStorage.removeItem).toHaveBeenCalledWith(
					"gameState",
				);
			});

			it("should handle no saved state", () => {
				global.localStorage.getItem.mockReturnValue(null);

				gameEngine.load();

				expect(Logger.log).toHaveBeenCalledWith(
					"No saved game state found",
					0,
					"game-loop",
				);
				expect(mockDispatch).not.toHaveBeenCalled();
			});
		});
	});

	describe("update() method", () => {
		const standardBuildingsConfig = [
			{ id: "sawmill", name: "Sawmill", productionType: "wood", baseRate: 10 },
			{ id: "mine", name: "Mine", productionType: "stone", baseRate: 5 },
		];

		it("should save initial state when no localStorage data exists", () => {
			global.localStorage.getItem.mockReturnValue(null);

			gameEngine.update(1000);

			expect(Logger.log).toHaveBeenCalledWith(
				"No saved game state found",
				0,
				"game-loop",
			);
			expect(Logger.log).toHaveBeenCalledWith(
				"Saved current state",
				0,
				"game-loop",
			);
			expect(global.localStorage.setItem).toHaveBeenCalled();
		});

		it("should process building production for all buildings with workers", () => {
			const workersConfig = [
				{ id: "worker1", assignedBuildingId: "sawmill" },
				{ id: "worker2", assignedBuildingId: "mine" },
			];
			
			const { buildings, state } = createMultipleBuildingsScenario(standardBuildingsConfig, workersConfig);

			gameEngine.update(1000, state);

			// Should process both buildings
			expect(mockItemFactory.create).toHaveBeenCalledWith("wood", 10);
			expect(mockItemFactory.create).toHaveBeenCalledWith("stone", 5);
		});

		it("should not process buildings without assigned workers", () => {
			const workersConfig = [
				{ id: "worker1", assignedBuildingId: "sawmill" }, // Only assigned to sawmill
			];
			
			const { buildings, state } = createMultipleBuildingsScenario(standardBuildingsConfig, workersConfig);

			gameEngine.update(1000, state);

			// Should only process sawmill (has worker)
			expect(mockItemFactory.create).toHaveBeenCalledWith("wood", 10);
			expect(mockItemFactory.create).not.toHaveBeenCalledWith("stone", 5);
		});
	});

	describe("Event Handling", () => {
		describe("navigation events", () => {
			it("should emit enterPlace event on navigation", () => {
				const mockUnsubscribeNav = vi.fn();
				mockStore.subscribe.mockImplementation(() => mockUnsubscribeNav);

				const oldState = {
					...mockStore.getState(),
					places: { currentPlaceId: "village_center" },
				};
				const newState = {
					...mockStore.getState(),
					places: { currentPlaceId: "forest" },
				};

				mockStore.getState.mockReturnValueOnce(oldState);
				mockStore.getState.mockReturnValue(newState);

				gameEngine.start();

				// Trigger subscription callback
				mockUnsubscribeNav.mock.calls[0][0]();

				expect(gameEngine.lastPlaceId).toBe("forest");
				expect(mockDispatch).toHaveBeenCalledWith({
					type: "enemies/removeEnemiesByPlace",
					payload: "village_center",
				});
				expect(mockEventBus.emit).toHaveBeenCalledWith("enterPlace", "forest");
			});
		});

		describe("enemy death events", () => {
			it("should emit death events for dead enemies", () => {
				const mockUnsubscribeEnemy = vi.fn();
				mockStore.subscribe.mockImplementation(() => mockUnsubscribeEnemy);

				const oldEnemyState = {
					enemy1: { id: "enemy1", placeId: "village_center", health: 100 },
					enemy2: { id: "enemy2", placeId: "forest", health: 50 },
				};
				const newEnemyState = {
					enemy2: { id: "enemy2", placeId: "forest", health: 25 }, // enemy1 died
				};

				gameEngine.lastEnemyState = oldEnemyState;
				mockStore.getState.mockReturnValue({
					enemies: { byId: newEnemyState },
				});

				gameEngine.start();

				// Trigger subscription callback
				mockUnsubscribeEnemy.mock.calls[0][0]();

				expect(mockEventBus.emit).toHaveBeenCalledWith(
					"enemyDead:village_center",
				);
				expect(gameEngine.lastEnemyState).toEqual(newEnemyState);
			});
		});

		describe("combat state changes", () => {
			it("should start combat when combat state becomes true", () => {
				const mockUnsubscribeCombat = vi.fn();
				mockStore.subscribe.mockImplementation(() => mockUnsubscribeCombat);

				mockStore.getState.mockReturnValue({ combat: { isInCombat: true } });

				gameEngine.start();

				// Trigger subscription callback
				mockUnsubscribeCombat.mock.calls[0][0]();

				expect(mockCombatService.startCombat).toHaveBeenCalledWith(
					mockGameLoop,
				);
			});

			it("should stop combat when combat state becomes false", () => {
				const mockUnsubscribeCombat = vi.fn();
				mockStore.subscribe.mockImplementation(() => mockUnsubscribeCombat);

				mockStore.getState.mockReturnValue({ combat: { isInCombat: false } });

				gameEngine.start();

				// Trigger subscription callback
				mockUnsubscribeCombat.mock.calls[0][0]();

				expect(mockCombatService.stopCombat).toHaveBeenCalledWith(mockGameLoop);
			});
		});
	});
});
