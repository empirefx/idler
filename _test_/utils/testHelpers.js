// Common test helper functions
import { vi } from 'vitest';

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
	calculateProduction: vi.fn(() => baseRate),
	productionType,
	baseProductionRate: baseRate,
});

// Helper to create mock worker
export const createMockWorker = (id, name, buildingId = null) => ({
	id,
	name,
	assignedBuildingId: buildingId,
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
	placeInventory: {
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

// Import state builders to avoid duplication
export { createBaseState, createTestState } from '../fixtures/stateBuilders.js';
