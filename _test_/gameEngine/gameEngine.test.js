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
	};
	const mockEnemyLifecycleServiceInstance = {
		initialize: vi.fn(),
		subscribeToEnemyChanges: vi.fn(),
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
});
