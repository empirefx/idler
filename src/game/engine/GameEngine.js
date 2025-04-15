import Logger from './Logger';

import { listBuildingsWithAssignedWorkers } from '../../store/slices/playerSlice';

class GameEngine {
  constructor(dispatch, store) {
    this.store = store;
    this.lastState = store.getState();
    this.dispatch = dispatch;
    this.lastUpdate = Date.now();
    this.isRunning = false;
    this.tickInterval = null;
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
  }

  // Stop the game loop
  stop() {
    this.isRunning = false;
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
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
      const production = building.calculateProduction ? building.calculateProduction() : building.baseProductionRate || 0;
      
      if (
        buildingsWithAssignedWorkers.includes(buildingId) 
        && production > 0
      ) {
        // Determine item to produce
        let producedItem = null;
        if (building.productionType === 'apple') {
          producedItem = { id: 'apple', type: 'apple', name: 'Apple', weight: 1, quantity: Math.floor(production * deltaTime) };
        } else if (building.productionType === 'ore') {
          producedItem = { id: 'ore', type: 'ore', name: 'Ore', weight: 2, quantity: Math.floor(production * deltaTime) };
        }
        if (producedItem && producedItem.quantity > 0) {
          // Find nearest Place with hasInventory:true (for now, just village_center)
          const places = Object.values(state.places || {});
          const targetPlace = places.find(p => p.hasInventory);
          const inventories = state.inventory && state.inventory.inventories;
          const vaultInventory = inventories && targetPlace ? inventories[targetPlace.id] : undefined;

          if (targetPlace && vaultInventory) {
            // Add produced item to the place's inventory
            this.store.dispatch({
              type: 'inventory/addItem',
              payload: {
                inventoryId: targetPlace.id,
                item: producedItem
              }
            });
          } else if (targetPlace && !vaultInventory) {
            Logger.error('No inventory found for target place:', 0, 'inventory', targetPlace);
          }
        }
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