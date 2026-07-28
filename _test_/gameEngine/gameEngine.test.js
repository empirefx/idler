import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const {
	mockGameLoopInstance,
	MockGameLoopConstructor,
	mockInventoryServiceInstance,
	mockSaveServiceInstance,
	mockCombatServiceInstance,
	mockNavigationServiceInstance,
	mockEnemyLifecycleServiceInstance,
	mockEventBusInstance,
	mockCreateItem,
	mockProductionServiceInstance,
	mockCraftingServiceConstructor,
	mockCraftingServiceInstance,
	mockBuildingServiceConstructor,
	mockBuildingServiceInstance,
	mockWorkerServiceConstructor,
	mockWorkerServiceInstance,
	mockSpawnServiceConstructor,
	mockSpawnServiceInstance,
} = vi.hoisted(() => {
	const mockGameLoopInstance = {
		start: vi.fn(),
		stop: vi.fn(),
		register: vi.fn(),
	};
	const MockGameLoopConstructor = vi.fn(() => mockGameLoopInstance);

	const mockInventoryServiceInstance = {
		addItemToInventory: vi.fn(),
		getInventoryForPlace: vi.fn(),
	};
	const mockSaveServiceInstance = {
		saveState: vi.fn(),
		validateLoadedState: vi.fn(),
		hasSavedState: vi.fn(),
		clearSavedState: vi.fn(),
	};
	const mockCombatServiceInstance = {
		initialize: vi.fn(),
		handleCombatStateChange: vi.fn(),
		startCombat: vi.fn(),
		stopCombat: vi.fn(),
	};
	const mockNavigationServiceInstance = {
		subscribeToPlaceChanges: vi.fn(),
		eventBus: null,
	};
	const mockEnemyLifecycleServiceInstance = {
		initialize: vi.fn(),
		subscribeToEnemyChanges: vi.fn(),
		eventBusService: null,
	};
	const mockEventBusInstance = {
		on: vi.fn(),
		emit: vi.fn(),
		off: vi.fn(),
	};
	const mockCreateItem = vi.fn((type, rate) => ({
		id: `${type}-1`,
		name: type,
		type: "material",
		quantity: rate || 1,
		weight: 1,
	}));
	const mockProductionServiceInstance = {
		processBuildingProduction: vi.fn(),
		getWorkersBySocketIndex: vi.fn(),
		canBuildingProduce: vi.fn(),
	};
	const mockCraftingServiceInstance = {
		craft: vi.fn(),
		learnRecipe: vi.fn(),
	};
	const mockCraftingServiceConstructor = vi.fn(() => mockCraftingServiceInstance);
	const mockBuildingServiceInstance = {};
	const mockBuildingServiceConstructor = vi.fn(() => mockBuildingServiceInstance);
	const mockWorkerServiceInstance = {};
	const mockWorkerServiceConstructor = vi.fn(() => mockWorkerServiceInstance);
	const mockSpawnServiceInstance = {
		spawners: {},
		currentPlaceId: null,
	};
	const mockSpawnServiceConstructor = vi.fn(() => mockSpawnServiceInstance);

	return {
		mockGameLoopInstance,
		MockGameLoopConstructor,
		mockInventoryServiceInstance,
		mockSaveServiceInstance,
		mockCombatServiceInstance,
		mockNavigationServiceInstance,
		mockEnemyLifecycleServiceInstance,
		mockEventBusInstance,
		mockCreateItem,
		mockProductionServiceInstance,
		mockCraftingServiceConstructor,
		mockCraftingServiceInstance,
		mockBuildingServiceConstructor,
		mockBuildingServiceInstance,
		mockWorkerServiceConstructor,
		mockWorkerServiceInstance,
		mockSpawnServiceConstructor,
		mockSpawnServiceInstance,
	};
});

vi.mock("../../src/game/core/GameLoop", () => ({
	default: MockGameLoopConstructor,
}));
vi.mock("../../src/game/services/InventoryService", () => ({
	InventoryService: mockInventoryServiceInstance,
}));
vi.mock("../../src/game/services/SaveService", () => ({
	SaveService: mockSaveServiceInstance,
}));
vi.mock("../../src/game/services/CombatService", () => ({
	CombatService: mockCombatServiceInstance,
}));
vi.mock("../../src/game/services/NavigationService", () => ({
	NavigationService: mockNavigationServiceInstance,
}));
vi.mock("../../src/game/services/EnemyLifecycleService", () => ({
	EnemyLifecycleService: mockEnemyLifecycleServiceInstance,
}));
vi.mock("../../src/game/services/EventBusService", () => ({
	globalEventBus: mockEventBusInstance,
}));
vi.mock("../../src/game/services/ProductionService", () => ({
	default: vi.fn(() => mockProductionServiceInstance),
}));
vi.mock("../../src/game/factory/itemFactory", () => ({
	createItem: mockCreateItem,
}));
vi.mock("../../src/game/services/CraftingService", () => ({
	CraftingService: mockCraftingServiceConstructor,
}));
vi.mock("../../src/game/services/BuildingService", () => ({
	default: mockBuildingServiceConstructor,
}));
vi.mock("../../src/game/services/WorkerService", () => ({
	default: mockWorkerServiceConstructor,
}));
vi.mock("../../src/game/services/SpawnService", () => ({
	default: mockSpawnServiceConstructor,
}));

import GameEngine from "../../src/game/engine/GameEngine";
import Logger from "../../src/game/utils/Logger";
import { createMockStore } from "../mocks";
import { createBaseState } from "../fixtures/stateBuilders";

describe("GameEngine", () => {
	let gameEngine;
	let mockStore;
	let originalLocalStorage;

	beforeEach(() => {
		vi.clearAllMocks();

		mockStore = createMockStore(createBaseState({
			combat: { isInCombat: false },
		}));

		vi.spyOn(Logger, "log").mockImplementation(() => {});
		vi.spyOn(Logger, "error").mockImplementation(() => {});

		originalLocalStorage = global.localStorage;
		global.localStorage = {
			getItem: vi.fn(),
			setItem: vi.fn(),
			removeItem: vi.fn(),
			clear: vi.fn(),
		};

		gameEngine = new GameEngine(mockStore.dispatch, mockStore);
		mockStore.dispatch.mockClear();
	});

	afterEach(() => {
		global.localStorage = originalLocalStorage;
		vi.restoreAllMocks();
	});

	describe("Constructor", () => {
		it("should initialize with correct dependencies", () => {
			expect(gameEngine.store).toBe(mockStore);
			expect(gameEngine.dispatch).toBe(mockStore.dispatch);
			expect(gameEngine.gameLoop).toBeDefined();
			expect(gameEngine.inventoryService).toBe(mockInventoryServiceInstance);
			expect(gameEngine.saveService).toBe(mockSaveServiceInstance);
			expect(gameEngine.combatService).toBe(mockCombatServiceInstance);
			expect(gameEngine.eventBusService).toBe(mockEventBusInstance);
		});

		it("should set up initial state tracking", () => {
			expect(gameEngine.isRunning).toBe(false);
		});

		it("should register spawnEnemy event handler", () => {
			const spawnHandler = mockEventBusInstance.on.mock.calls.find(
				(call) => call[0] === "spawnEnemy",
			)?.[1];
			expect(spawnHandler).toBeDefined();
		});

		it("should create GameLoop instance", () => {
			expect(MockGameLoopConstructor).toHaveBeenCalled();
		});
	});

	describe("Game Lifecycle Management", () => {
		describe("start()", () => {
			it("should start game loop when not running", () => {
				gameEngine.start();

				expect(gameEngine.isRunning).toBe(true);
				expect(mockGameLoopInstance.start).toHaveBeenCalled();
				expect(Logger.log).toHaveBeenCalledWith(
					"Game engine starting",
					0,
					"game-loop",
				);
			});

			it("should not start when already running", () => {
				gameEngine.start();
				mockGameLoopInstance.start.mockClear();

				gameEngine.start();

				expect(mockGameLoopInstance.start).not.toHaveBeenCalled();
			});

			it("should register production system on game loop", () => {
				gameEngine.start();

				expect(mockGameLoopInstance.register).toHaveBeenCalledWith(
					"production",
					expect.any(Function),
					expect.objectContaining({ priority: 2, interval: 1000 }),
				);
			});
		});

		describe("stop()", () => {
			it("should stop game loop", () => {
				gameEngine.start();
				gameEngine.stop();

				expect(gameEngine.isRunning).toBe(false);
				expect(mockGameLoopInstance.stop).toHaveBeenCalled();
			});

			it("should not stop when not running", () => {
				gameEngine.stop();

				expect(mockGameLoopInstance.stop).not.toHaveBeenCalled();
			});
		});
	});

	describe("Inventory Management", () => {
		describe("getVaultInventory()", () => {
			it("should delegate to inventory service", () => {
				const targetPlace = { id: "village_center", name: "Village" };
				const fakeInventory = { items: [{ id: "item1" }] };
				mockInventoryServiceInstance.getInventoryForPlace.mockReturnValue(fakeInventory);

				const result = gameEngine.getVaultInventory(mockStore.getState(), targetPlace);

				expect(mockInventoryServiceInstance.getInventoryForPlace).toHaveBeenCalledWith(
					mockStore.getState(),
					targetPlace,
				);
				expect(result).toBe(fakeInventory);
			});
		});

		describe("addItemToInventory()", () => {
			it("should delegate to inventory service", () => {
				const targetPlaceId = "village_center";
				const item = { id: "wood-1", name: "wood", quantity: 10 };

				gameEngine.addItemToInventory(targetPlaceId, item);

				expect(mockInventoryServiceInstance.addItemToInventory).toHaveBeenCalledWith(
					mockStore,
					targetPlaceId,
					item,
				);
			});
		});
	});

	describe("Save/Load Operations", () => {
		describe("save()", () => {
			it("should delegate to saveService", () => {
				gameEngine.save();

				expect(mockSaveServiceInstance.saveState).toHaveBeenCalledWith(mockStore);
			});
		});

		describe("load()", () => {
			it("should load and restore saved state", () => {
				const savedState = {
					player: { gold: 500, level: 10 },
					buildings: { mine: { level: 3 } },
					place: { currentPlaceId: "mountains" },
				};
				global.localStorage.getItem.mockReturnValue(JSON.stringify(savedState));

				gameEngine.load();

				expect(mockStore.dispatch).toHaveBeenCalledWith({
					type: "player/setPlayerState",
					payload: savedState.player,
				});
				expect(mockStore.dispatch).toHaveBeenCalledWith({
					type: "buildings/setBuildings",
					payload: savedState.buildings,
				});
				expect(mockStore.dispatch).toHaveBeenCalledWith({
					type: "places/setPlaces",
					payload: savedState.place,
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
				expect(global.localStorage.removeItem).toHaveBeenCalledWith("gameState");
			});

			it("should handle no saved state", () => {
				global.localStorage.getItem.mockReturnValue(null);

				gameEngine.load();

				expect(mockStore.dispatch).not.toHaveBeenCalled();
			});
		});
	});

	describe("update() method", () => {
		it("should iterate places with sockets and call production service", () => {
			const state = {
				...createBaseState({ combat: { isInCombat: false } }),
				places: {
					currentPlaceId: "village_center",
					village_center: {
						sockets: [
							{ status: "occupied", buildingId: "lumber_mill" },
						],
					},
				},
			};

			gameEngine.update(state, 1000);

			expect(gameEngine.productionService.processBuildingProduction).toHaveBeenCalled();
		});

		it("should skip sockets without occupied status", () => {
			const state = {
				...createBaseState({ combat: { isInCombat: false } }),
				places: {
					currentPlaceId: "village_center",
					village_center: {
						sockets: [
							{ status: "empty", buildingId: "lumber_mill" },
						],
					},
				},
			};

			gameEngine.update(state, 1000);

			expect(gameEngine.productionService.processBuildingProduction).not.toHaveBeenCalled();
		});

		it("should skip places without sockets", () => {
			const state = {
				...createBaseState({ combat: { isInCombat: false } }),
				places: {
					currentPlaceId: "village_center",
					village_center: {},
				},
			};

			gameEngine.update(state, 1000);

			expect(gameEngine.productionService.processBuildingProduction).not.toHaveBeenCalled();
		});
	});

	describe("Event Handling", () => {
		it("should subscribe to store on start", () => {
			gameEngine.start();

			expect(mockStore.subscribe).toHaveBeenCalled();
		});
	});

	describe("Constructor - Service Initialization", () => {
		it("should initialize all services", () => {
			expect(gameEngine.productionService).toBe(mockProductionServiceInstance);
			expect(gameEngine.craftingService).toBe(mockCraftingServiceInstance);
			expect(gameEngine.buildingService).toBe(mockBuildingServiceInstance);
			expect(gameEngine.workerService).toBe(mockWorkerServiceInstance);
			expect(gameEngine.spawnService).toBe(mockSpawnServiceInstance);
		});

		it("should call combatService.initialize with store and eventBus", () => {
			expect(mockCombatServiceInstance.initialize).toHaveBeenCalledWith(
				mockStore,
				mockEventBusInstance,
			);
		});

		it("should register playerIntentCraft event handler", () => {
			const handler = mockEventBusInstance.on.mock.calls.find(
				(call) => call[0] === "game/PLAYER_INTENT_CRAFT",
			)?.[1];
			expect(handler).toBeDefined();
		});

		it("should register playerIntentLearnRecipe event handler", () => {
			const handler = mockEventBusInstance.on.mock.calls.find(
				(call) => call[0] === "game/PLAYER_INTENT_LEARN_RECIPE",
			)?.[1];
			expect(handler).toBeDefined();
		});

		it("should delegate playerIntentCraft to craftingService.craft", () => {
			const handler = mockEventBusInstance.on.mock.calls.find(
				(call) => call[0] === "game/PLAYER_INTENT_CRAFT",
			)?.[1];
			handler({ recipeId: "recipe1", outputItemId: "sword" });
			expect(mockCraftingServiceInstance.craft).toHaveBeenCalledWith(
				"recipe1",
				"sword",
			);
		});

		it("should delegate playerIntentLearnRecipe to craftingService.learnRecipe", () => {
			const handler = mockEventBusInstance.on.mock.calls.find(
				(call) => call[0] === "game/PLAYER_INTENT_LEARN_RECIPE",
			)?.[1];
			handler({ recipeId: "recipe1", itemId: "iron_sword" });
			expect(mockCraftingServiceInstance.learnRecipe).toHaveBeenCalledWith(
				"recipe1",
				"iron_sword",
			);
		});

		it("should store lastState from store.getState()", () => {
			expect(gameEngine.lastState).toBe(mockStore.getState());
		});

		it("should initialize lastUpdate", () => {
			expect(gameEngine.lastUpdate).toBeDefined();
			expect(typeof gameEngine.lastUpdate).toBe("number");
		});
	});

	describe("processBuildingProduction()", () => {
		it("should delegate to productionService.processBuildingProduction", () => {
			const state = createBaseState({ combat: { isInCombat: false } });
			gameEngine.processBuildingProduction(
				"village_center",
				0,
				{ id: "lumber_mill" },
				state,
				1000,
			);
			expect(
				mockProductionServiceInstance.processBuildingProduction,
			).toHaveBeenCalledWith(
				"village_center",
				0,
				{ id: "lumber_mill" },
				state,
				1000,
			);
		});
	});

	describe("getAssignedWorkersBySocketIndex()", () => {
		it("should delegate to productionService.getWorkersBySocketIndex", () => {
			const expected = [{ id: "worker1" }];
			mockProductionServiceInstance.getWorkersBySocketIndex.mockReturnValue(
				expected,
			);
			const state = createBaseState({ combat: { isInCombat: false } });
			const result = gameEngine.getAssignedWorkersBySocketIndex(state, 0);
			expect(
				mockProductionServiceInstance.getWorkersBySocketIndex,
			).toHaveBeenCalledWith(state, 0);
			expect(result).toBe(expected);
		});
	});

	describe("calculateProductionRate()", () => {
		it("should return baseProductionRate from buildingData", () => {
			const rate = gameEngine.calculateProductionRate(
				{ baseProductionRate: 5 },
				createBaseState(),
			);
			expect(rate).toBe(5);
		});

		it("should return 0 when no baseProductionRate", () => {
			const rate = gameEngine.calculateProductionRate({}, createBaseState());
			expect(rate).toBe(0);
		});
	});

	describe("canBuildingProduce()", () => {
		it("should delegate to productionService.canBuildingProduce", () => {
			mockProductionServiceInstance.canBuildingProduce.mockReturnValue(true);
			const state = createBaseState({ combat: { isInCombat: false } });
			const result = gameEngine.canBuildingProduce(state, 0, {
				id: "lumber_mill",
			});
			expect(
				mockProductionServiceInstance.canBuildingProduce,
			).toHaveBeenCalledWith(state, 0, { id: "lumber_mill" });
			expect(result).toBe(true);
		});
	});

	describe("getCraftingService()", () => {
		it("should return craftingService", () => {
			expect(gameEngine.getCraftingService()).toBe(
				mockCraftingServiceInstance,
			);
		});
	});

	describe("validateLoadedState()", () => {
		it("should delegate to saveService.validateLoadedState", () => {
			mockSaveServiceInstance.validateLoadedState.mockReturnValue(true);
			const result = gameEngine.validateLoadedState({ player: {} });
			expect(
				mockSaveServiceInstance.validateLoadedState,
			).toHaveBeenCalledWith({ player: {} });
			expect(result).toBe(true);
		});
	});

	describe("hasSavedState()", () => {
		it("should delegate to saveService.hasSavedState", () => {
			mockSaveServiceInstance.hasSavedState.mockReturnValue(true);
			const result = gameEngine.hasSavedState();
			expect(mockSaveServiceInstance.hasSavedState).toHaveBeenCalled();
			expect(result).toBe(true);
		});
	});

	describe("clearSavedState()", () => {
		it("should delegate to saveService.clearSavedState", () => {
			gameEngine.clearSavedState();
			expect(mockSaveServiceInstance.clearSavedState).toHaveBeenCalled();
		});
	});

	describe("update() - Filtering", () => {
		it("should filter out currentPlaceId key", () => {
			const state = {
				...createBaseState({ combat: { isInCombat: false } }),
				places: {
					currentPlaceId: "village_center",
					village_center: {
						sockets: [
							{ status: "occupied", buildingId: "lumber_mill" },
						],
					},
				},
			};
			gameEngine.update(state, 1000);
			expect(
				mockProductionServiceInstance.processBuildingProduction,
			).toHaveBeenCalledTimes(1);
			expect(
				mockProductionServiceInstance.processBuildingProduction.mock
					.calls[0][0],
			).toBe("village_center");
		});

		it("should filter out previousPlaceId key", () => {
			const state = {
				...createBaseState({ combat: { isInCombat: false } }),
				places: {
					previousPlaceId: "old_place",
					village_center: {
						sockets: [
							{ status: "occupied", buildingId: "lumber_mill" },
						],
					},
				},
			};
			gameEngine.update(state, 1000);
			expect(
				mockProductionServiceInstance.processBuildingProduction,
			).toHaveBeenCalledTimes(1);
			expect(
				mockProductionServiceInstance.processBuildingProduction.mock
					.calls[0][0],
			).toBe("village_center");
		});

		it("should filter out availableConnections key", () => {
			const state = {
				...createBaseState({ combat: { isInCombat: false } }),
				places: {
					availableConnections: ["forest"],
					village_center: {
						sockets: [
							{ status: "occupied", buildingId: "lumber_mill" },
						],
					},
				},
			};
			gameEngine.update(state, 1000);
			expect(
				mockProductionServiceInstance.processBuildingProduction,
			).toHaveBeenCalledTimes(1);
			expect(
				mockProductionServiceInstance.processBuildingProduction.mock
					.calls[0][0],
			).toBe("village_center");
		});

		it("should handle places with null sockets", () => {
			const state = {
				...createBaseState({ combat: { isInCombat: false } }),
				places: {
					village_center: { sockets: null },
				},
			};
			gameEngine.update(state, 1000);
			expect(
				mockProductionServiceInstance.processBuildingProduction,
			).not.toHaveBeenCalled();
		});

		it("should skip sockets with unknown buildingId", () => {
			const state = {
				...createBaseState({ combat: { isInCombat: false } }),
				places: {
					village_center: {
						sockets: [
							{ status: "occupied", buildingId: "nonexistent" },
						],
					},
				},
			};
			gameEngine.update(state, 1000);
			expect(
				mockProductionServiceInstance.processBuildingProduction,
			).not.toHaveBeenCalled();
		});
	});

	describe("start() - Lifecycle Subscriptions", () => {
		it("should initialize enemyLifecycleService", () => {
			gameEngine.start();
			expect(
				mockEnemyLifecycleServiceInstance.initialize,
			).toHaveBeenCalledWith(mockStore.getState());
		});

		it("should subscribe enemyLifecycleService to enemy changes", () => {
			gameEngine.start();
			expect(
				mockEnemyLifecycleServiceInstance.subscribeToEnemyChanges,
			).toHaveBeenCalledWith(mockStore);
		});

		it("should subscribe navigationService to place changes", () => {
			gameEngine.start();
			expect(
				mockNavigationServiceInstance.subscribeToPlaceChanges,
			).toHaveBeenCalledWith(mockStore);
		});

		it("should set combatService store and eventBusService on start", () => {
			gameEngine.start();
			expect(mockCombatServiceInstance.store).toBe(mockStore);
			expect(mockCombatServiceInstance.eventBusService).toBe(
				mockEventBusInstance,
			);
		});

		it("should set navigationService eventBus on start", () => {
			gameEngine.start();
			expect(mockNavigationServiceInstance.eventBus).toBe(
				mockEventBusInstance,
			);
		});

		it("should call handleCombatStateChange when combat state changes", () => {
			gameEngine.start();
			const subscribeCallback = mockStore.subscribe.mock.calls[0]?.[0];
			expect(subscribeCallback).toBeDefined();

			// Simulate combat state change from false to true
			mockStore.getState.mockReturnValue({
				...createBaseState({ combat: { isInCombat: true } }),
			});
			subscribeCallback();

			expect(
				mockCombatServiceInstance.handleCombatStateChange,
			).toHaveBeenCalledWith(false, true, mockGameLoopInstance);
		});

		it("should not call handleCombatStateChange when combat state unchanged", () => {
			gameEngine.start();
			const subscribeCallback = mockStore.subscribe.mock.calls[0]?.[0];

			// Simulate no combat state change
			subscribeCallback();

			expect(
				mockCombatServiceInstance.handleCombatStateChange,
			).not.toHaveBeenCalled();
		});
	});

	describe("load() - Partial State", () => {
		it("should load only player state when only player exists", () => {
			const savedState = { player: { gold: 100 } };
			global.localStorage.getItem.mockReturnValue(
				JSON.stringify(savedState),
			);
			gameEngine.load();
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "player/setPlayerState",
				payload: savedState.player,
			});
			expect(mockStore.dispatch).not.toHaveBeenCalledWith(
				expect.objectContaining({ type: "buildings/setBuildings" }),
			);
		});

		it("should load only buildings when only buildings exist", () => {
			const savedState = { buildings: { mine: { level: 2 } } };
			global.localStorage.getItem.mockReturnValue(
				JSON.stringify(savedState),
			);
			gameEngine.load();
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "buildings/setBuildings",
				payload: savedState.buildings,
			});
			expect(mockStore.dispatch).not.toHaveBeenCalledWith(
				expect.objectContaining({ type: "player/setPlayerState" }),
			);
		});
	});

	describe("spawnEnemy Event Handler", () => {
		it("should dispatch enemies/addEnemy when spawnEnemy event fires", () => {
			const handler = mockEventBusInstance.on.mock.calls.find(
				(call) => call[0] === "spawnEnemy",
			)?.[1];
			const payload = {
				placeId: "forest",
				enemy: { id: "enemy1", name: "Goblin" },
			};
			handler(payload);
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "enemies/addEnemy",
				payload,
			});
		});
	});
});
