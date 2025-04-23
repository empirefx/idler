import { describe, it, expect, beforeEach } from 'vitest';
import inventoryReducer, {
  addItem,
  moveItem,
  removeItem,
  equipItem,
  unequipItem,
  selectInventoryById,
  selectVaultByPlaceId,
} from '../src/store/slices/inventorySlice';

describe('inventorySlice reducer and selectors', () => {
  let state;
  beforeEach(() => {
    state = inventoryReducer(undefined, { type: 'init' });
  });

  it('should initialize player inventory with equipment slots', () => {
    const player = state.player;
    expect(player.equipment).toBeDefined();
    ['head','body','pants','main-weapon','second-weapon'].forEach(slot => {
      expect(player.equipment[slot]).toBe(null);
    });
  });

  it('should stack items on addItem', () => {
    const item = { id: 1, type: 'consumable', name: 'apple', quantity: 5, weight: 0.5 };
    const newState = inventoryReducer(state, addItem({ inventoryId: 'player', item }));
    expect(newState.player.items.find(i => i.id === 1).quantity).toBe(10);
  });

  it('should add new item when not stackable', () => {
    const newItem = { id: 99, type: 'consumable', name: 'orange', quantity: 2, weight: 0.3 };
    const newState = inventoryReducer(state, addItem({ inventoryId: 'player', item: newItem }));
    expect(newState.player.items.some(i => i.id === 99)).toBe(true);
  });

  it('should remove item quantity', () => {
    const newState = inventoryReducer(state, removeItem({ inventoryId: 'player', itemId: 1, quantity: 2 }));
    expect(newState.player.items.find(i => i.id === 1).quantity).toBe(3);
  });

  it('should move items between inventories', () => {
    const newState = inventoryReducer(
      state,
      moveItem({ fromInventoryId: 'village_center', toInventoryId: 'player', itemId: 1, quantity: 5 })
    );
    expect(newState.village_center.items.find(i => i.id === 1).quantity).toBe(5);
    expect(newState.player.items.find(i => i.id === 1).quantity).toBe(10);
  });

  it('should equip and unequip item', () => {
    const equippedState = inventoryReducer(state, equipItem({ inventoryId: 'player', itemId: 'armor1' }));
    expect(equippedState.player.equipment.body.id).toBe('armor1');
    expect(equippedState.player.items.some(i => i.id === 'armor1')).toBe(false);
    const unequippedState = inventoryReducer(
      equippedState,
      unequipItem({ inventoryId: 'player', slot: 'body' })
    );
    expect(unequippedState.player.equipment.body).toBe(null);
    expect(unequippedState.player.items.some(i => i.id === 'armor1')).toBe(true);
  });

  it('should select inventory by id', () => {
    const selected = selectInventoryById({ inventory: state }, 'player');
    expect(selected).toEqual(state.player);
  });

  it('should select vault by place id', () => {
    const vault = selectVaultByPlaceId({ inventory: state }, 'village_center');
    expect(vault).toEqual(state.village_center);
  });
});
