import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import playerInventoryReducer from '../../src/store/slices/playerInventorySlice';
import placeInventoryReducer from '../../src/store/slices/placeInventorySlice';
import playerReducer from '../../src/store/slices/playerSlice';
import buildingsReducer from '../../src/store/slices/buildingsSlice';
import placesReducer from '../../src/store/slices/placesSlice';
import enemiesReducer from '../../src/store/slices/enemiesSlice';
import combatReducer from '../../src/store/slices/combatSlice';
import { playerData } from '../../src/data/player';

import GameEngine from '../../src/game/engine/GameEngine';
import { createMockLocalStorage } from '../mocks/localStorage.mock.js';

describe('GameEngine Integration Tests', () => {
  let store;
  let gameEngine;
  let originalLocalStorage;

  beforeEach(() => {
    // Setup real Redux store for integration tests
    store = configureStore({
      reducer: {
        player: playerReducer,
        buildings: buildingsReducer,
        places: placesReducer,
        enemies: enemiesReducer,
        combat: combatReducer,
        playerInventory: playerInventoryReducer,
        placeInventory: placeInventoryReducer,
      },
      preloadedState: {
        player: { ...playerData, gold: 100 },
        buildings: {},
        places: { currentPlaceId: 'village_center' },
        enemies: { byId: {}, allIds: [] },
        combat: { isInCombat: false }
      }
    });

    // Setup real GameEngine with mocked localStorage
    originalLocalStorage = global.localStorage;
    global.localStorage = createMockLocalStorage();

    gameEngine = new GameEngine(store.dispatch, store);
    
    // Mock Logger to avoid console output
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    if (gameEngine) {
      gameEngine.stop();
    }
    global.localStorage = originalLocalStorage;
    vi.restoreAllMocks();
  });

  describe('Full Game Loop Integration', () => {
    it('should complete production cycle from start to save', () => {
      // Setup building with worker
      store.dispatch({
        type: 'buildings/addBuilding',
        payload: {
          id: 'test_sawmill',
          name: 'Test Sawmill',
          calculateProduction: () => 5,
          baseProductionRate: 3,
          productionType: 'wood'
        }
      });

      store.dispatch({
        type: 'player/addWorker',
        payload: {
          id: 'test_worker',
          name: 'Test Worker',
          assignedBuildingId: 'test_sawmill'
        }
      });

      // Start game engine
      gameEngine.start();

      // Manually trigger production update (normally done by GameLoop)
      gameEngine.update(1000);

      // Verify item was created and added
      const state = store.getState();
      const inventory = state.placeInventory['village_center'];
      
      expect(inventory).toBeDefined();
      expect(inventory.items).toHaveLength(1);
      expect(inventory.items[0]).toEqual(
        expect.objectContaining({
          name: 'wood',
          type: 'material',
          quantity: 5
        })
      );

      // Save and verify persistence
      gameEngine.save();
      
      const savedState = JSON.parse(global.localStorage.setItem.mock.calls.find(call => call[0] === 'gameState')[1]);
      expect(savedState).toHaveProperty('player');
      expect(savedState).toHaveProperty('buildings');
      expect(savedState).toHaveProperty('places');
    });

    it('should handle navigation and enemy lifecycle', () => {
      // Start game engine
      gameEngine.start();

      // Add an enemy
      const enemy = { id: 'test_enemy', name: 'Test Enemy', placeId: 'village_center', health: 50 };
      store.dispatch({
        type: 'enemies/addEnemy',
        payload: { placeId: 'village_center', enemy }
      });

      // Navigate to different place
      store.dispatch({
        type: 'places/setCurrentPlace',
        payload: 'forest'
      });

      // Verify enemy was removed from old place
      const enemyState = store.getState().enemies.byId;
      expect(enemyState['test_enemy']).toBeUndefined();

      // Stop game engine
      gameEngine.stop();
    });
  });

  describe('Service Coordination', () => {
    it('should coordinate combat service with game loop', () => {
      gameEngine.start();

      // Enter combat
      store.dispatch({
        type: 'combat/setCombatState',
        payload: { isInCombat: true }
      });

      // Verify combat service was notified (indirectly tested through game loop integration)
      const combatState = store.getState().combat;
      expect(combatState.isInCombat).toBe(true);

      // Exit combat
      store.dispatch({
        type: 'combat/setCombatState',
        payload: { isInCombat: false }
      });

      gameEngine.stop();
    });

    it('should maintain state consistency across operations', () => {
      gameEngine.start();

      // Perform multiple operations
      gameEngine.update(1000); // Production
      gameEngine.save(); // Persistence
      gameEngine.load(); // Loading (will create new state)

      // Verify store is still functional
      const state = store.getState();
      expect(state).toHaveProperty('player');
      expect(state).toHaveProperty('buildings');
      expect(state).toHaveProperty('places');
      expect(state).toHaveProperty('playerInventory');
      expect(state).toHaveProperty('placeInventory');

      gameEngine.stop();
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw
      global.localStorage.setItem.mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      gameEngine.start();
      gameEngine.save();

      // Should not crash
      expect(gameEngine).toBeDefined();
      
      // Error should be logged
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle invalid saved state', () => {
      // Mock invalid saved state
      global.localStorage.getItem.mockReturnValue('{ "invalid": json }');

      gameEngine.load();

      // Should handle error gracefully
      expect(console.error).toHaveBeenCalledWith('Error parsing saved game state:', 0, 'game-loop', expect.any(Error));
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('gameState');
    });
  });

  describe('Performance Integration', () => {
    it('should not cause memory leaks in subscriptions', () => {
      // Start and stop multiple times
      for (let i = 0; i < 10; i++) {
        gameEngine.start();
        gameEngine.stop();
      }

      // GameEngine should still be functional
      expect(() => {
        gameEngine.start();
        gameEngine.update(1000);
        gameEngine.stop();
      }).not.toThrow();
    });

    it('should handle rapid state changes', () => {
      gameEngine.start();

      // Simulate rapid updates
      for (let i = 0; i < 100; i++) {
        gameEngine.update(100); // Faster updates
      }

      // Should not crash or degrade
      const state = store.getState();
      expect(state).toBeDefined();

      gameEngine.stop();
    });
  });
});