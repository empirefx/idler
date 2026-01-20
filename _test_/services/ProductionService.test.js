import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createStateWithBuilding, createStateWithWorkers, createBaseState } from '../fixtures/stateBuilders.js';
import { createMockStore } from '../mocks/services.mock.js';
import ProductionService from '../../src/game/services/ProductionService.js';

describe('ProductionService', () => {
  let productionService;
  let mockStore, mockDispatch, mockItemFactory, mockInventoryService;

  beforeEach(() => {
    // Setup mocks
    mockStore = createMockStore(createBaseState());
    mockDispatch = vi.fn();
    mockItemFactory = {
      create: vi.fn((type, quantity) => ({
        id: `${type}-${Date.now()}`,
        name: type,
        type: 'material',
        quantity: Math.max(1, Math.floor(quantity || 1)),
        weight: 1
      }))
    };
    mockInventoryService = {
      addItemToInventory: vi.fn()
    };

    // Create ProductionService instance
    productionService = new ProductionService(
      mockInventoryService,
      mockItemFactory,
      mockStore,
      mockDispatch,
      {} // events
    );

    // Mock Logger to avoid console output during tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('processBuildingProduction', () => {
    it('should process production for building with workers', () => {
      const building = {
        id: 'sawmill',
        calculateProduction: () => 10,
        productionType: 'wood'
      };
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'sawmill' }
      ]);
      const deltaTime = 1000;

      // Mock the production calculation
      const expectedItem = {
        id: 'wood-12345',
        name: 'wood',
        type: 'material',
        quantity: 10,
        weight: 1
      };

      productionService.processBuildingProduction('sawmill', building, state, deltaTime);

      // Verify item creation
      expect(mockItemFactory.create).toHaveBeenCalledWith('wood', 10);

      // Verify inventory addition
      expect(mockInventoryService.addItemToInventory).toHaveBeenCalledWith(
        mockStore,
        'village_center', // inventoryId (from processBuildingProduction)
        expect.objectContaining({
          name: 'wood',
          quantity: 10,
          type: 'material'
        })
      );
    });

    it('should not process production for building without workers', () => {
      const building = {
        id: 'mine',
        calculateProduction: () => 15,
        productionType: 'stone'
      };
      const state = createStateWithWorkers([]); // No workers
      const deltaTime = 1000;

      productionService.processBuildingProduction('mine', building, state, deltaTime);

      // Should not create items
      expect(mockItemFactory.create).not.toHaveBeenCalled();
      expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
    });

    it('should use baseProductionRate when calculateProduction not available', () => {
      const building = {
        id: 'farm',
        baseProductionRate: 8,
        productionType: 'food'
      };
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'farm' }
      ]);
      const deltaTime = 1000;

      productionService.processBuildingProduction('farm', building, state, deltaTime);

      // Should use base production rate
      expect(mockItemFactory.create).toHaveBeenCalledWith('food', 8);
    });

    it('should handle zero production gracefully', () => {
      const building = {
        id: 'sawmill',
        calculateProduction: () => 0,
        productionType: 'wood'
      };
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'sawmill' }
      ]);
      const deltaTime = 1000;

      productionService.processBuildingProduction('sawmill', building, state, deltaTime);

      // Should not create items
      expect(mockItemFactory.create).not.toHaveBeenCalled();
      expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
    });

    it('should handle building with workers but zero production', () => {
      const building = {
        id: 'sawmill',
        calculateProduction: () => 0, // Zero production
        productionType: 'wood'
      };
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'sawmill' }
      ]);
      const deltaTime = 1000;

      productionService.processBuildingProduction('sawmill', building, state, deltaTime);

      // Should not create items
      expect(mockItemFactory.create).not.toHaveBeenCalled();
      expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
    });
  });

  describe('getAssignedWorkers', () => {
    it('should return workers assigned to a specific building', () => {
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'sawmill' },
        { id: 'worker2', assignedBuildingId: 'mine' },
        { id: 'worker3', assignedBuildingId: null } // Unassigned
      ]);

      const workers = productionService.getAssignedWorkers(state, 'sawmill');

      expect(workers).toHaveLength(1);
      expect(workers[0]).toEqual(
        expect.objectContaining({
          id: 'worker1',
          assignedBuildingId: 'sawmill'
        })
      );
    });

    it('should return empty array when building has no workers', () => {
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'mine' },
        { id: 'worker2', assignedBuildingId: null }
      ]);

      const workers = productionService.getAssignedWorkers(state, 'farm'); // Farm has no workers

      expect(workers).toHaveLength(0);
    });

    it('should return empty array for nonexistent building', () => {
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'sawmill' }
      ]);

      const workers = productionService.getAssignedWorkers(state, 'nonexistent');

      expect(workers).toHaveLength(0);
    });
  });

  describe('calculateProductionRate', () => {
    it('should calculate production rate correctly', () => {
      const building = {
        id: 'sawmill',
        calculateProduction: () => 10,
        baseProductionRate: 5
      };
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'sawmill' }
      ]);

      const rate = productionService.calculateProductionRate(building, state);

      expect(rate).toBe(10); // Should use custom calculation
    });

    it('should return base production rate when no custom calculation', () => {
      const building = {
        id: 'mine',
        calculateProduction: undefined,
        baseProductionRate: 8
      };
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'mine' }
      ]);

      const rate = productionService.calculateProductionRate(building, state);

      expect(rate).toBe(8); // Should use base rate
    });

    it('should return zero when no workers assigned', () => {
      const building = {
        id: 'farm',
        baseProductionRate: 8
      };
      const state = createStateWithWorkers([]); // No workers

      const rate = productionService.calculateProductionRate(building, state);

      expect(rate).toBe(0); // No workers = no production
    });
  });

  describe('Error handling', () => {
    it('should handle errors gracefully', () => {
      // Mock itemFactory to throw error
      mockItemFactory.create.mockImplementation(() => {
        throw new Error('Item creation failed');
      });

      const building = {
        id: 'sawmill',
        calculateProduction: () => 10,
        productionType: 'wood'
      };
      const state = createStateWithWorkers([
        { id: 'worker1', assignedBuildingId: 'sawmill' }
      ]);
      const deltaTime = 1000;

      // Should not crash
      expect(() => {
        productionService.processBuildingProduction('sawmill', building, state, deltaTime);
      }).not.toThrow();

      // Error should be logged
      expect(console.error).toHaveBeenCalledWith(
        'Failed to create item during production',
        expect.any(Error)
      );
    });
  });
});