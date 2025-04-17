import Logger from './Logger';

import { listBuildingsWithAssignedWorkers } from '../../store/slices/playerSlice';
import { InventoryService } from '../services/inventoryService';
import { PlaceSelector } from '../services/placeSelector';
import { ItemFactory } from '../factory/itemFactory';
import SpawnService, { EventBus } from '../services/spawnService';

class GameEngine {
  constructor(dispatch, store, {
    inventoryService = InventoryService,
    placeSelector = PlaceSelector,
    itemFactory = ItemFactory
  } = {}) {
    this.store = store;
    this.lastState = store.getState();
    this.dispatch = dispatch;
    this.lastUpdate = Date.now();
    this.isRunning = false;
    this.tickInterval = null;
    
    // Dependency injection for testability/modularity
    this.inventoryService = inventoryService;
    this.placeSelector = placeSelector;
    this.itemFactory = itemFactory;
    this.eventBus = new EventBus();
    this.spawnService = new SpawnService(this.eventBus);
  }

  // Get the inventory object for a given place
  getVaultInventory(state, targetPlace) {
    const inventories = state.inventory && state.inventory.inventories;
    return inventories && targetPlace ? inventories[targetPlace.id] : undefined;
  }

  // Add an item to a place's inventory handled by InventoryService
  addItemToInventory(targetPlaceId, item) {
    this.inventoryService.addItemToInventory(this.store, targetPlaceId, item);
  }

  // Process production for a single building
  processBuildingProduction(buildingId, building, state, deltaTime) {
    const production = building.calculateProduction ? building.calculateProduction() : building.baseProductionRate || 0;
    const producedItem = this.itemFactory.create(
      building.productionType,
      Math.floor(production * deltaTime)
    );

    if (producedItem && producedItem.quantity > 0) {
      // Find nearest Place with hasInventory:true (for now, just village_center)
      const targetPlace = this.placeSelector.findFirstWithInventory(state);
      const vaultInventory = this.inventoryService.getInventoryForPlace(state, targetPlace && targetPlace.id);

      if (targetPlace && vaultInventory) {
        // Add produced item to the place's inventory
        this.addItemToInventory(targetPlace.id, producedItem);
      } else if (targetPlace && !vaultInventory) {
        Logger.error('No inventory found for target place:', 0, 'inventory', targetPlace);
      }
    }
  }

  // Start the game loop
  start() {
    if (this.isRunning) return;
    
    Logger.log('Game engine starting', 0, 'game-loop');
    this.isRunning = true;
    this.lastUpdate = Date.now();
    this.tickInterval = setInterval(() => {
      Logger.log('Tick interval called', 0, 'game-loop');
      this.tick();
    }, 1000); // Update every 1000ms for smoother updates

    // Hook navigation to spawn logic
    this.unsubscribeNav = this.store.subscribe(() => {
      const state = this.store.getState();
      const placeId = state.places.currentPlaceId;
      this.eventBus.emit('enterPlace', placeId);
    });
  }

  // Stop the game loop
  stop() {
    this.isRunning = false;
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
    if (this.unsubscribeNav) this.unsubscribeNav();
  }

  // Game tick
  tick() {
    if (!this.isRunning) return;

    Logger.log('Tick method called', 0, 'game-loop');
    const now = Date.now();
    const deltaTime = (now - this.lastUpdate) / 1000; // Convert to seconds
    this.lastUpdate = now;

    this.update(deltaTime);

    // Listen for spawned enemies
    this.eventBus.on('spawnEnemy', ({ placeId, enemy }) => {
      this.dispatch({ type: 'enemies/addEnemy', payload: { placeId, enemy } });
    });
  }

  // Update game state
  update(deltaTime) {
    Logger.log(`Update called with deltaTime: ${deltaTime.toFixed(3)}`, 0, 'game-loop');

    // Load game state if not already loaded
    if (!localStorage.getItem('gameState')) {
      Logger.log('No saved game state found', 0, 'game-loop');
      this.save();
      Logger.log('Saved current state', 0, 'game-loop');
    }

    const state = this.store.getState();
    const buildingsWithAssignedWorkers = listBuildingsWithAssignedWorkers(state);

    // Update resources based on building production
    // Produce items and store in nearest Place with hasInventory:true
    Object.entries(state.buildings).forEach(([buildingId, building]) => {
      if (
        buildingsWithAssignedWorkers.includes(buildingId)
        && (building.calculateProduction ? building.calculateProduction() : building.baseProductionRate || 0) > 0
      ) {
        this.processBuildingProduction(buildingId, building, state, deltaTime);
      }
    });
  }

  // Save game state
  save() {
    const currentState = this.store.getState(); // Get fresh state from Redux
    const state = {
      player: currentState.player,
      buildings: currentState.buildings,
      place: currentState.places
    };

    localStorage.setItem('gameState', JSON.stringify(state));
  }

  // Load game state
  load() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        
        // Dispatch the correct actions with the right payload format
        if (state.player) {
          this.dispatch({ 
            type: 'player/setPlayerState',
            payload: state.player 
          });
        }
        
        if (state.buildings) {
          this.dispatch({ 
            type: 'buildings/setBuildings', 
            payload: state.buildings 
          });
        }
        
        if (state.place) {
          this.dispatch({ 
            type: 'places/setPlaces', 
            payload: state.place 
          });
        }
        Logger.log('Game state loaded successfully', 0, 'game-loop');
      } catch (error) {
        Logger.error('Error parsing saved game state:', 0, 'game-loop', error);
        // Clear corrupted state to prevent further errors
        localStorage.removeItem('gameState');
      }
    } else {
      Logger.log('No saved game state found', 0, 'game-loop');
    }
  }
}

export default GameEngine;