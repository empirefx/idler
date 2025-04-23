import Logger from '../utils/Logger';

import { listBuildingsWithAssignedWorkers } from '../../store/slices/playerSlice';
import { InventoryService } from '../services/inventoryService';
import { ItemFactory } from '../factory/itemFactory';
import SpawnService from '../services/spawnService';
import { EventBusService } from '../services/eventBusService';
import { removeEnemiesByPlace } from '../../store/slices/enemiesSlice';
import CombatService from '../services/combatService';
import { workerCreatedItem } from './events';

class GameEngine {
  constructor(dispatch, store, {
    inventoryService = InventoryService,
    itemFactory = ItemFactory,
    combatService = CombatService
  } = {}) {
    this.store = store;
    this.lastState = store.getState();
    this.dispatch = dispatch;
    this.lastUpdate = Date.now();
    this.isRunning = false;
    this.tickInterval = null;
    
    // Dependency injection for testability/modularity
    this.inventoryService = inventoryService;
    this.itemFactory = itemFactory;
    this.eventBusService = new EventBusService();
    this.spawnService = new SpawnService(this.eventBusService);
    // Instantiate CombatService so instance methods are available
    this.combatService = new combatService(
      this.eventBusService,
      this.dispatch,
      () => this.store.getState()
    );

    // Track enemy state for death detection
    this.lastEnemyState = this.store.getState().enemies.byId;

    // Initialize lastPlaceId to detect actual place changes
    this.lastPlaceId = this.store.getState().places.currentPlaceId;
    
    // Register spawnEnemy handler once
    this.eventBusService.on('spawnEnemy', ({ placeId, enemy }) => {
      this.dispatch({ type: 'enemies/addEnemy', payload: { placeId, enemy } });
    });
  }

  // Get the inventory object for a given place
  getVaultInventory(state, targetPlace) {
    const inventories = state.inventory;
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
      const targetPlace = Object.values(state.places).find(p => p.hasInventory);
      const vaultInventory = state.inventory && state.inventory[targetPlace?.id];

      if (targetPlace && vaultInventory) {
        // Add produced item to the place's inventory
        // Dispatch WORKER_CREATED_ITEM actions for assigned workers
        this.addItemToInventory(targetPlace.id, producedItem);
        const assignedWorkerIds = state.player.workers
          .filter(w => w.assignedBuildingId === buildingId)
          .map(w => w.id);

        assignedWorkerIds.forEach(workerId =>
          this.dispatch(workerCreatedItem(workerId, building.productionType))
        );
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
      const newPlaceId = state.places.currentPlaceId;
      const oldPlaceId = this.lastPlaceId;
      if (newPlaceId !== oldPlaceId) {
        this.lastPlaceId = newPlaceId;
        // Despawn enemies from the previous place
        this.dispatch(removeEnemiesByPlace(oldPlaceId));
        this.eventBusService.emit('enterPlace', newPlaceId);
      }
    });
    
    // Subscribe to enemy removals to emit death events
    this.unsubscribeEnemyDeath = this.store.subscribe(() => {
      const state = this.store.getState();
      const currById = state.enemies.byId;
      const oldById = this.lastEnemyState || {};
      // Any ids in old not in curr => deaths
      Object.keys(oldById).filter(id => !(id in currById)).forEach(id => {
        const placeId = oldById[id].placeId;
        this.eventBusService.emit(`enemyDead:${placeId}`);
      });
      this.lastEnemyState = { ...currById };
    });

    // Subscribe to combat state changes to trigger automated combat
    this.unsubscribeCombat = this.store.subscribe(() => {
      const isInCombat = this.store.getState().combat.isInCombat;
      if (isInCombat) {
        this.combatService.startCombat();
      } else {
        this.combatService.stopCombat();
      }
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
    if (this.unsubscribeEnemyDeath) this.unsubscribeEnemyDeath();
    if (this.unsubscribeCombat) this.unsubscribeCombat();
  }

  // Game tick
  tick() {
    if (!this.isRunning) return;

    Logger.log('Tick method called', 0, 'game-loop');
    const now = Date.now();
    const deltaTime = (now - this.lastUpdate) / 1000; // Convert to seconds
    this.lastUpdate = now;

    this.update(deltaTime);
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