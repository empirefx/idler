// Test event system logging functionality
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Import all event actions
import {
  workerCreatedItem,
  enemyAttacked,
  workerAssigned,
  workerUnassigned,
  locationChanged,
  playerDamaged
} from '../src/game/events.js';

// Import log actions
import { addLog, clearLogs } from '../src/store/slices/logSlice';

// Import store setup (copied from working tests)
import { configureStore } from '@reduxjs/toolkit';
import playerReducer from '../src/store/slices/playerSlice';
import buildingsReducer from '../src/store/slices/buildingsSlice';
import placesReducer from '../src/store/slices/placesSlice';
import playerInventoryReducer from '../src/store/slices/playerInventorySlice';
import placeInventoryReducer from '../src/store/slices/placeInventorySlice';
import enemiesReducer from '../src/store/slices/enemiesSlice';
import combatReducer from '../src/store/slices/combatSlice';
import logReducer from '../src/store/slices/logSlice';
import logMiddleware from '../src/store/middleware/logMiddleware';

const configureTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      player: playerReducer,
      buildings: buildingsReducer,
      places: placesReducer,
      playerInventory: playerInventoryReducer,
      placeInventory: placeInventoryReducer,
      enemies: enemiesReducer,
      combat: combatReducer,
      logs: logReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logMiddleware),
    ...initialState
  });
};

describe('Event System Logging', () => {
  let store;
  let consoleSpy;

  beforeEach(() => {
    // Create fresh store with log middleware
    store = configureTestStore();
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    // Clear existing logs
    store.dispatch(clearLogs());
  });

  it('should log worker created item events', () => {
    // Dispatch worker created item event
    store.dispatch(workerCreatedItem('worker1', 'wood'));
    
    // Check if log was added
    const logs = store.getState().logs;
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Worker worker1 made a wood');
  });

  it('should log enemy attacked events', () => {
    // Dispatch enemy attacked event
    store.dispatch(enemyAttacked('enemy1', 'player1', 15));
    
    // Check if log was added
    const logs = store.getState().logs;
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Enemy enemy1 hit player1 for 15 HP');
  });

  it('should log worker assigned events', () => {
    // Dispatch worker assigned event
    store.dispatch(workerAssigned('worker1', 'John', 'farm', 'Farm'));
    
    // Check if log was added
    const logs = store.getState().logs;
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Worker John assigned to Farm');
  });

  it('should log worker unassigned events', () => {
    // Dispatch worker unassigned event
    store.dispatch(workerUnassigned('worker1', 'John', 'farm', 'Farm'));
    
    // Check if log was added
    const logs = store.getState().logs;
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Worker John unassigned from Farm');
  });

  it('should log location changed events', () => {
    // Dispatch location changed event
    store.dispatch(locationChanged('village', 'forest'));
    
    // Check if log was added
    const logs = store.getState().logs;
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Moved from village to forest');
  });

  it('should log player damage dealt events', () => {
    // Dispatch player damage dealt event
    store.dispatch(playerDamaged('player1', 'enemy', 'enemy1', 20, 'dealt'));
    
    // Check if log was added
    const logs = store.getState().logs;
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Player dealt 20 damage to enemy enemy1');
  });

  it('should log player damage received events', () => {
    // Dispatch player damage received event
    store.dispatch(playerDamaged('enemy1', 'enemy', 'player1', 8, 'received'));
    
    // Check if log was added
    const logs = store.getState().logs;
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Player received 8 damage from enemy enemy1');
  });

  it('should not log addLog actions to prevent recursion', () => {
    // Dispatch addLog action directly (this should be ignored)
    store.dispatch(addLog('Direct log message'));
    
    // Check if only one log was added (addLog should work but not trigger middleware)
    const logs = store.getState().logs;
    expect(logs).toHaveLength(1);
    expect(logs[0].message).toBe('Direct log message');
  });

  it('should handle multiple events sequentially', () => {
    // Dispatch multiple events
    store.dispatch(workerAssigned('worker1', 'John', 'farm', 'Farm'));
    store.dispatch(locationChanged('village', 'forest'));
    store.dispatch(playerDamaged('enemy1', 'enemy', 'player1', 5, 'received'));
    
    // Check if all logs were added in order
    const logs = store.getState().logs;
    expect(logs).toHaveLength(3);
    expect(logs[0].message).toBe('Worker John assigned to Farm');
    expect(logs[1].message).toBe('Moved from village to forest');
    expect(logs[2].message).toBe('Player received 5 damage from enemy enemy1');
  });

  it('should limit log history to 100 entries', () => {
    // Add more than 100 logs
    for (let i = 0; i < 105; i++) {
      store.dispatch(workerCreatedItem(`worker${i}`, 'wood'));
    }
    
    // Check if logs are limited to 100
    const logs = store.getState().logs;
    expect(logs).toHaveLength(100);
    expect(logs[0].message).toBe('Worker worker5 made a wood'); // First log should be trimmed
    expect(logs[99].message).toBe('Worker worker104 made a wood'); // Last log
  });
});