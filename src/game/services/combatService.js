// Combat Service - coordinates combat state with game loop
import Logger from '../utils/Logger';
import { enemyAttacked, playerDamaged } from '../events';
import { addItem } from '../../store/slices/playerInventorySlice';
import { gainExp } from '../../store/slices/playerSlice';
import { ItemFactory } from '../factory/itemFactory';

/**
 * CombatService coordinates combat state with game loop and handles combat mechanics.
 * Uses service pattern with singleton-like behavior for game coordination.
 */
export const CombatService = {
  // Initialize with store and eventBus
  initialize(store, eventBus) {
    this.store = store;
    this.eventBusService = eventBus;
  },

  // Start combat when combat state changes to true
  handleCombatStateChange(wasInCombat, isInCombat, gameLoop) {
    // Ensure store is available before proceeding
    if (!this.store) {
      console.error('CombatService: store not initialized');
      return;
    }
    // Transition from not in combat to in combat
    if (!wasInCombat && isInCombat) {
      this.startCombat(gameLoop);
    }
    // Transition from in combat to not in combat
    else if (wasInCombat && !isInCombat) {
      this.stopCombat(gameLoop);
    }
  },

  // Start combat system with game loop
  startCombat(gameLoop) {
    Logger.log('Starting combat system', 0, 'combat');
    if (!gameLoop || !gameLoop.register) {
      Logger.log('GameLoop is not available or missing register method', 0, 'combat');
      return;
    }
    Logger.log('GameLoop is available, attempting to register combat system', 0, 'combat');
    // Initialize store reference for better error messages
    const result = gameLoop.register('combat', (deltaTime) => {
      // Get current game state from store subscription
      const state = this.store.getState();
      const currentPlaceId = state.places.currentPlaceId;
      
      // Get enemies at current place
      const currentEnemies = Object.values(state.enemies.byId).filter(
        enemy => enemy.placeId === currentPlaceId
      );

      // Simple combat: player attacks first enemy, enemy attacks player
      const targetEnemy = currentEnemies[0];
      
      // Player attacks enemy (10 damage)
      this.store.dispatch({ 
        type: 'enemies/damageEnemy', 
        payload: { id: targetEnemy.id, amount: 10 } 
      });
      this.store.dispatch(playerDamaged('player', 'player', targetEnemy.id, 10, 'dealt'));
      this.store.dispatch(enemyAttacked('player', targetEnemy.id, 10));
      
      // Check if enemy died and emit death event
      setTimeout(() => {
        const updatedEnemy = this.store.getState().enemies.byId[targetEnemy.id];
        if (!updatedEnemy) {
          // Enemy died, handle drops and emit death event for respawn
          this.eventBusService.emit(`enemyDead:${targetEnemy.placeId}`, { 
            placeId: targetEnemy.placeId, 
            enemy: targetEnemy 
          });
          Logger.log(`${targetEnemy.id} died, emitting death event`, 0, 'combat');
          
          // Handle enemy drops and experience gain
          this.handleEnemyDrops(targetEnemy);
          this.handleEnemyExpGain(targetEnemy);
        } else if (updatedEnemy.health > 0) {
          // Enemy attacks player (5 damage) if enemy is still alive
          this.store.dispatch({ 
            type: 'player/damagePlayer', 
            payload: { amount: 5 } 
          });
          this.store.dispatch(enemyAttacked(targetEnemy.id, 'player', 5));
          this.store.dispatch(playerDamaged(targetEnemy.id, 'enemy', 'player', 5, 'received'));
        }
      }, 200);
    }, {
      priority: 0, // Highest priority
      interval: 500 // Every 500ms for combat
    });
    Logger.log('Combat registration result:', 0, 'combat', result);
  },

  // Stop combat system with game loop
  stopCombat(gameLoop) {
    gameLoop.unregister('combat');
  },

  // Handle enemy drops on death
  handleEnemyDrops(enemy) {
    const currentPlaceId = this.store.getState().places.currentPlaceId;
    const place = this.store.getState().places[currentPlaceId];
    const spawnInfo = place.spawn;
    
    // Drop items on enemy death
    if (spawnInfo && Array.isArray(spawnInfo.drops)) {
      spawnInfo.drops.forEach(({ itemId, dropRate }) => {
        if (Math.random() < dropRate) {
          const loot = ItemFactory.create(itemId, 1);
          if (loot) {
            this.store.dispatch(addItem({
              inventoryId: 'player',
              item: loot
            }));
          }
        }
      });
    }
  },

  // Handle experience gain on enemy death
  handleEnemyExpGain(enemy) {
    // Grant experience for enemy kill (equal to enemy's max health)
    this.store.dispatch(gainExp({ amount: enemy.maxHealth }));
  },

  // Subscribe to combat state changes
  subscribeToCombatChanges(state, gameLoop) {
    return state.subscribe(() => {
      this.handleCombatStateChange(state, gameLoop);
    });
  }
};

export default CombatService;