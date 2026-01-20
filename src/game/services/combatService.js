import { damageEnemy } from '../../store/slices/enemiesSlice';
import { damagePlayer, gainExp } from '../../store/slices/playerSlice';
import { addItem } from '../../store/slices/playerInventorySlice';
import { ItemFactory } from '../factory/itemFactory';
import { enemyAttacked } from '../engine/events';

/**
 * CombatService automates idle combat between player and enemies.
 * It ticks at a fixed interval, letting the player attack the first enemy
 * and alive enemies attack back.
 */
export default class CombatService {
  constructor(eventBus, dispatch, getState) {
    this.eventBusService = eventBus;
    this.dispatch = dispatch;
    this.getState = getState;
    this.isInCombat = false;
    this.gameLoop = null; // Will be injected when combat starts
    this.tickRate = 1000; // milliseconds
  }

  startCombat(gameLoop) {
    if (this.isInCombat) return;
    this.isInCombat = true;
    this.gameLoop = gameLoop;

    // Register combat system with GameLoop
    this.gameLoop.register('combat', (deltaTime) => {
      this._tick();
    }, {
      priority: 2, // Run after production (priority 1)
      interval: this.tickRate
    });
  }

  // Stop combat and unregister from GameLoop
  stopCombat(gameLoop) {
    if (!this.isInCombat) return;
    this.isInCombat = false;

    if (this.gameLoop) {
      // Unregister from GameLoop
      this.gameLoop.unregister('combat');
      this.gameLoop = null;
    }
  }

  _tick() {
    if (!this.isInCombat) return;
    const state = this.getState();
    const placeId = state.places.currentPlaceId;
    // Get enemies in current place
    const enemies = state.enemies.allIds
      .map(id => state.enemies.byId[id])
      .filter(e => e.placeId === placeId);

    const player = state.player;
    if (!player) return;

    // If no enemies, stop combat
    if (enemies.length === 0) {
      this.stopCombat();
      return;
    }

    // Player attacks first enemy
    const target = enemies[0];
    const playerAttack = player.stats.strength;
    this.dispatch(damageEnemy({ id: target.id, amount: playerAttack }));

    // Enemy attacks back if still alive, or roll drops on death
    const after = this.getState().enemies.byId[target.id];
    if (after) {
      const enemyAttack = after.attack || 0;
      this.dispatch(damagePlayer({ amount: enemyAttack }));
      this.dispatch(enemyAttacked(target.id, player.id, enemyAttack));
    } else {
      const place = this.getState().places[this.getState().places.currentPlaceId]; // Get current place
      const spawnInfo = place.spawn; // Get spawn info
      // Drop items on enemy death
      // for each drop in spawnInfo.drops, create an item and add it to the player's inventory
      if (spawnInfo && Array.isArray(spawnInfo.drops)) {
        spawnInfo.drops.forEach(({ itemId, dropRate }) => {
          if (Math.random() < dropRate) {
            const loot = ItemFactory.create(itemId, 1);
            if (loot) {
              this.dispatch(addItem({
                inventoryId: 'player',
                item: loot
              }));
            }
          }
        });
      }
      // Grant experience for enemy kill
      this.dispatch(gainExp({ amount: target.maxHealth }));
    }
  }
}
