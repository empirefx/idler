// Common test helper functions
import { vi } from 'vitest';
import { createBaseState, createTestState, createStateWithWorkers } from '../fixtures/stateBuilders.js';

// Helper to find and call event handlers
export const getEventHandler = (mockService, eventName) => {
	return mockService.on.mock.calls.find((call) => call[0] === eventName)?.[1];
};

// Helper to create mock event bus
export const createMockEventBus = () => ({
	on: vi.fn(),
	emit: vi.fn(),
	off: vi.fn(),
});

// Helper to create mock inventory service
export const createMockInventoryService = () => ({
	addItemToInventory: vi.fn(),
	removeItemFromInventory: vi.fn(),
	moveItemBetweenInventories: vi.fn(),
	getInventoryById: vi.fn(),
	canAddItem: vi.fn(() => ({ valid: true })),
});

// Helper to create mock item factory
export const createMockItemFactory = () => ({
	create: vi.fn((type, quantity) => ({
		id: `${type}-${Date.now()}`,
		name: type,
		type: "material",
		quantity: Math.max(1, Math.floor(quantity || 1)),
		weight: 1,
	})),
	_reset: () => {
		createMockItemFactory().create.mockReset();
	},
});

// Helper to create mock spawn service
export const createMockSpawnService = () => ({
	currentPlaceId: null,
	getSpawner: vi.fn(),
	createSpawner: vi.fn(),
	removeSpawner: vi.fn(),
});

// Helper to create mock building
export const createMockBuilding = (id, name, productionType, baseRate = 5) => ({
	id,
	name,
	productionType,
	baseProductionRate: baseRate,
});

// Helper to create mock worker
export const createMockWorker = (id, name, placeId = null, socketIndex = 0, material = null) => ({
	id,
	name,
	assignments: placeId ? { [placeId]: { socketIndex, material } } : {},
});

// Helper to create mock enemy
export const createMockEnemy = (id, placeId = "village_center") => ({
	id,
	placeId,
	health: 100,
	damage: 10,
});

// Helper to create test enemy with staggered pattern
export const createStaggeredEnemy = (id, placeId, health = 50) => ({
	id,
	health,
	attackPattern: "staggered",
	attackDelayRange: [2000, 5000],
});

// Helper to create test enemy with normal pattern
export const createNormalEnemy = (id, placeId, health = 30) => ({
	id,
	health,
	attackPattern: "normal",
	attackDelayRange: [2000, 5000],
});

// Helper to create test enemy
export const createTestEnemy = (id, placeId, overrides = {}) => ({
	id,
	placeId,
	health: 100,
	damage: 10,
	...overrides,
});

// Helper to create place state for testing
export const createPlaceState = (placesConfig) => ({
	places: placesConfig,
	inventory: {
		village_center: { items: [] },
	},
});

// Helper to assert common mock calls
export const expectMockCalledWith = (mock, ...args) => {
	expect(mock).toHaveBeenCalledWith(...args);
};

// Helper to assert mock not called
export const expectMockNotCalled = (mock) => {
	expect(mock).not.toHaveBeenCalled();
};

// Helper to create test production scenario
export const createProductionTestScenario = (buildingId, buildingName, productionType, baseRate, workerId = "worker1", socketIndex = 0) => {
	const building = createMockBuilding(buildingId, buildingName, productionType, baseRate);
	const state = createStateWithWorkers([
		{ id: workerId, assignments: { [buildingId]: { socketIndex, material: productionType } } },
	]);
	const deltaTime = 1000;

	return { building, state, deltaTime };
};

// Helper to test production processing with common assertions
export const testProductionProcessing = (service, mockItemFactory, buildingId, building, state, deltaTime, expectedType, expectedQuantity) => {
	service.processBuildingProduction(buildingId, 0, building, state, deltaTime);
	expect(mockItemFactory).toHaveBeenCalledWith(expectedType, expectedQuantity);
};

// Helper to test zero production scenario
export const testZeroProductionScenario = (service, mockItemFactory, mockInventoryService, buildingId, building, state, deltaTime) => {
	service.processBuildingProduction(buildingId, 0, building, state, deltaTime);
	expect(mockItemFactory).not.toHaveBeenCalledWith(expect.anything(), expect.anything());
	if (mockInventoryService) {
		expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
	}
};

// Helper to create test state with buildings and workers
export const createTestStateWithBuildings = (buildings, workers = []) => ({
	...createStateWithWorkers(workers),
	buildings,
	places: {
		currentPlaceId: "village_center",
		village_center: { hasInventory: true },
	},
	inventory: {
		village_center: { items: [] },
	},
});

// Helper to create multiple buildings test scenario
export const createMultipleBuildingsScenario = (buildingsConfig, workersConfig) => {
	const buildings = {};
	buildingsConfig.forEach(config => {
		buildings[config.id] = createMockBuilding(config.id, config.name, config.productionType, config.baseRate);
	});

	const state = createTestStateWithBuildings(buildings, workersConfig);
	return { buildings, state };
};

// Re-export state builders for backward compatibility
export { createBaseState, createTestState } from '../fixtures/stateBuilders.js';
export { createStateWithWorkers } from '../fixtures/stateBuilders.js';
