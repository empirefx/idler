import Logger from '../utils/Logger';

export default class ProductionService {
  constructor(inventoryService, itemFactory, store, dispatch, events) {
    this.inventoryService = inventoryService;
    this.itemFactory = itemFactory;
    this.store = store;
    this.dispatch = dispatch;
    this.events = events;
  }

  // Process production for a specific building
  processBuildingProduction(buildingId, building, state, deltaTime) {
    try {
      // Check if building has assigned workers
      const assignedWorkers = this.getAssignedWorkers(state, buildingId);
      
      if (assignedWorkers.length === 0) {
        Logger.log(`No workers assigned to ${buildingId}, skipping production`, 1, 'production');
        return;
      }

      // Calculate production rate
      const productionRate = this.calculateProductionRate(building, state);
      
      if (productionRate <= 0) {
        Logger.log(`Building ${buildingId} has zero production rate, skipping production`, 1, 'production');
        return;
      }

      // Get production type
      const productionType = building.productionType;
      if (!productionType) {
        Logger.log(`Building ${buildingId} has no productionType, skipping production`, 1, 'production');
        return;
      }

      // Create item using itemFactory
      const item = this.itemFactory.create(productionType, productionRate);
      
      if (!item) {
        Logger.log(`Failed to create item for ${productionType}`, 1, 'production');
        return;
      }

      // Determine which place to add the item to (use building's place or a default)
      // Get building's location from place data
      const buildingPlaceId = this.getBuildingPlaceId(buildingId, state) || 'village_center';
      
      // Add item to inventory at building's location
      this.inventoryService.addItemToInventory(this.store, buildingPlaceId, item);

      // Emit workerCreatedItem event using Redux dispatch
      if (this.dispatch) {
        // Emit event for each worker that produced the item
        assignedWorkers.forEach(worker => {
          const { workerCreatedItem } = require('../events');
          this.dispatch(workerCreatedItem(worker.id, item.type));
        });
      }

      Logger.log(`Produced ${productionRate}x ${productionType} at ${buildingId} with ${assignedWorkers.length} workers`, 0, 'production');
      
    } catch (error) {
      console.error('Failed to create item during production', error);
      Logger.log(`Production failed for ${buildingId}: ${error.message}`, 2, 'production');
    }
  }

  // Get workers assigned to a specific building
  getAssignedWorkers(state, buildingId) {
    const workers = state.player?.workers || [];
    return workers.filter(worker => worker.assignedBuildingId === buildingId);
  }

  // Get the place where building is located
  getBuildingPlaceId(buildingId, state) {
    // Find which place contains this building
    for (const [placeId, place] of Object.entries(state.places)) {
      if (place.buildings && place.buildings.includes(buildingId)) {
        return placeId;
      }
    }
    return null;
  }

  // Calculate production rate for a building
  calculateProductionRate(building, state) {
    // Check if building has workers assigned
    const assignedWorkers = this.getAssignedWorkers(state, building.id);
    
    if (assignedWorkers.length === 0) {
      return 0;
    }

    // Use custom calculateProduction method if available
    if (building.calculateProduction && typeof building.calculateProduction === 'function') {
      const production = building.calculateProduction();
      return Math.max(0, production);
    }

    // Fall back to baseProductionRate
    const baseRate = building.baseProductionRate || 0;
    return Math.max(0, baseRate);
  }

  // Check if a building can produce (has workers and production rate)
  canBuildingProduce(state, buildingId) {
    const building = state.buildings?.[buildingId];
    if (!building) {
      return false;
    }

    const hasWorkers = this.getAssignedWorkers(state, buildingId).length > 0;
    const productionRate = this.calculateProductionRate(building, state);
    
    return hasWorkers && productionRate > 0 && building.productionType;
  }

  // Get all production calculations for UI purposes
  getAllProductionCalculations(state) {
    const calculations = {};
    
    Object.entries(state.buildings || {}).forEach(([buildingId, building]) => {
      const workers = this.getAssignedWorkers(state, buildingId);
      const productionRate = this.calculateProductionRate(building, state);
      const canProduce = this.canBuildingProduce(state, buildingId);
      
      calculations[buildingId] = {
        buildingName: building.name,
        productionType: building.productionType,
        workerCount: workers.length,
        productionRate,
        canProduce,
        workers: workers.map(worker => ({
          id: worker.id,
          name: worker.name
        }))
      };
    });
    
    return calculations;
  }
}