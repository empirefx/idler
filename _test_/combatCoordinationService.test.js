// Test CombatCoordinationService functionality
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CombatCoordinationService } from '../src/game/services/CombatCoordinationService';
import { addItem } from '../src/store/slices/playerInventorySlice';
import { gainExp } from '../src/store/slices/playerSlice';
import { ItemFactory } from '../src/game/factory/itemFactory';

describe('CombatCoordinationService', () => {
  let mockStore;
  let mockGameLoop;
  let mockEventBus;
  let mockState;

  beforeEach(() => {
    mockStore = {
      dispatch: vi.fn(),
      getState: vi.fn(() => mockState),
      subscribe: vi.fn(() => vi.fn())
    };
    
    mockGameLoop = {
      register: vi.fn((name, callback, options) => {
        return { name, callback, options };
      }),
      unregister: vi.fn()
    };
    
    mockEventBus = {
      emit: vi.fn()
    };

    // Initialize service BEFORE each test
    CombatCoordinationService.initialize(mockStore, mockEventBus);

    // Reset state before each test
    mockState = {
      places: {
        currentPlaceId: 'village_center',
        village_center: {
          spawn: {
            drops: [
              { itemId: 'apple', dropRate: 0.5 },
              { itemId: 'wood', dropRate: 0.3 }
            ]
          }
        }
      },
      enemies: {
        byId: {
          enemy1: {
            id: 'enemy1',
            health: 10,
            maxHealth: 10,
            attack: 5,
            placeId: 'village_center'
          }
        }
      }
    };

    vi.spyOn(Math, 'random').mockReturnValue(0.2); // Ensure first drop succeeds
    vi.spyOn(ItemFactory, 'create').mockReturnValue({ type: 'apple', quantity: 1 });
  });

  it('should start combat when state changes to true', () => {
    const wasInCombat = false;
    const isInCombat = true;

    CombatCoordinationService.initialize(mockStore, mockEventBus);
    CombatCoordinationService.handleCombatStateChange(wasInCombat, isInCombat, mockGameLoop);

    expect(mockGameLoop.register).toHaveBeenCalledWith('combat', expect.any(Function), {
      priority: 0,
      interval: 500
    });
  });

  it('should stop combat when state changes to false', () => {
    const wasInCombat = true;
    const isInCombat = false;

    CombatCoordinationService.initialize(mockStore, mockEventBus);
    CombatCoordinationService.handleCombatStateChange(wasInCombat, isInCombat, mockGameLoop);

    expect(mockGameLoop.unregister).toHaveBeenCalledWith('combat');
  });

  it('should handle enemy drops correctly', () => {
    const enemy = {
      id: 'enemy1',
      maxHealth: 10
    };

    // Call handleEnemyDrops
    CombatCoordinationService.handleEnemyDrops(enemy);

    expect(mockStore.dispatch).toHaveBeenCalledWith(addItem({
      inventoryId: 'player',
      item: { type: 'apple', quantity: 1 }
    }));

    // Should not dispatch for second drop (wood) since random is 0.2 < 0.3
    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should handle enemy experience gain correctly', () => {
    const enemy = {
      id: 'enemy1',
      maxHealth: 10
    };

    CombatCoordinationService.handleEnemyExpGain(enemy);

    expect(mockStore.dispatch).toHaveBeenCalledWith(gainExp({ amount: 10 }));
  });

  it('should emit enemy death event', () => {
    const enemy = {
      id: 'enemy1',
      placeId: 'village_center'
    };

    CombatCoordinationService.handleEnemyDrops(enemy);

    expect(mockEventBus.emit).toHaveBeenCalledWith(
      'enemyDead:village_center',
      { 
        placeId: 'village_center', 
        enemy: enemy 
      }
    );
  });

  it('should handle multiple drops when random is high enough', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.8); // High enough for both drops
    
    const enemy = {
      id: 'enemy1',
      maxHealth: 10
    };

    CombatCoordinationService.handleEnemyDrops(enemy);

    // Should dispatch both drops since 0.8 > 0.5 and 0.8 > 0.3
    expect(mockStore.dispatch).toHaveBeenCalledTimes(2);
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(1, addItem({
      inventoryId: 'player',
      item: { type: 'apple', quantity: 1 }
    }));
    expect(mockStore.dispatch).toHaveBeenNthCalledWith(2, addItem({
      inventoryId: 'player',
      item: { type: 'wood', quantity: 1 }
    }));
  });

  it('should handle empty drops array', () => {
    mockState.places.village_center.spawn.drops = [];
    
    const enemy = {
      id: 'enemy1',
      maxHealth: 10
    };

    CombatCoordinationService.handleEnemyDrops(enemy);

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(addItem(expect.any(Object)));
  });

  it('should handle missing spawn info', () => {
    mockState.places.village_center.spawn = null;
    
    const enemy = {
      id: 'enemy1',
      maxHealth: 10
    };

    CombatCoordinationService.handleEnemyDrops(enemy);

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(addItem(expect.any(Object)));
  });

  it('should register combat system with correct configuration', () => {
    const wasInCombat = false;
    const isInCombat = true;

    CombatCoordinationService.handleCombatStateChange(wasInCombat, isInCombat, mockGameLoop);

    expect(mockGameLoop.register).toHaveBeenCalledWith(
      'combat',
      expect.any(Function),
      {
        priority: 0, // Highest priority
        interval: 500 // Every 500ms
      }
    );
  });
});