import { describe, it, expect, beforeEach } from 'vitest';
import playerInventoryReducer, {
  addItem,
  removeItem,
  equipItem,
  unequipItem,
  updateInventory,
  selectPlayerInventoryById,
  selectPlayerInventoryItems,
  selectPlayerEquipment,
  selectPlayerInventoryStats
} from '../src/store/slices/playerInventorySlice';

describe('playerInventorySlice reducer and selectors', () => {
  let state;
  
  beforeEach(() => {
    state = playerInventoryReducer(undefined, { type: 'init' });
  });

  describe('initial state', () => {
    it('should have correct initial state structure', () => {
      expect(state).toHaveProperty('player');
      expect(state.player).toHaveProperty('id', 'player');
      expect(state.player).toHaveProperty('type', 'player');
      expect(state.player).toHaveProperty('maxSlots', 20);
      expect(state.player).toHaveProperty('maxWeight', 100);
      expect(state.player).toHaveProperty('items');
      expect(state.player).toHaveProperty('equipment');
    });
  });

  describe('addItem', () => {
    it('should add item to empty inventory', () => {
      const newItem = { id: 'test-item', name: 'Test Item', type: 'consumable', weight: 1, quantity: 1 };
      const newState = playerInventoryReducer(state, addItem({
        inventoryId: 'player',
        item: newItem
      }));
      
      expect(newState.player.items).toHaveLength(4); // Started with 3 items
      expect(newState.player.items).toContainEqual(expect.objectContaining({
        id: 'test-item',
        name: 'Test Item',
        quantity: 1
      }));
    });

    it('should stack identical items', () => {
      const existingItem = { id: 1, name: 'apple', type: 'consumable', quantity: 5, weight: 0.5 };
      const result = playerInventoryReducer(state, addItem({
        inventoryId: 'player',
        item: { id: 1, name: 'apple', type: 'consumable', quantity: 2, weight: 0.5 }
      }));
      
      const apple = result.player.items.find(item => item.name === 'apple');
      expect(apple.quantity).toBe(7); // 5 + 2
    });

    it('should not add item when inventory is full', () => {
      // Fill inventory to max capacity by adding items
      let fullState = state;
      for (let i = 0; i < 17; i++) { // Already have 3 items, need 17 more
        fullState = playerInventoryReducer(fullState, addItem({
          inventoryId: 'player',
          item: { id: `fill-${i}`, name: 'Fill Item', type: 'material', weight: 0.1 }
        }));
      }
      
      const result = playerInventoryReducer(fullState, addItem({
        inventoryId: 'player',
        item: { id: 'overflow', name: 'Overflow', type: 'material', weight: 0.1 }
      }));
      
      expect(result.player.items).toHaveLength(20);
      expect(result.player.items.some(item => item.id === 'overflow')).toBe(false);
    });
  });

  describe('removeItem', () => {
    it('should remove existing item completely', () => {
      const result = playerInventoryReducer(state, removeItem({
        inventoryId: 'player',
        itemId: 2 // banana
      }));
      
      expect(result.player.items.some(item => item.id === 2)).toBe(false);
    });

    it('should reduce item quantity when removing partial amount', () => {
      const result = playerInventoryReducer(state, removeItem({
        inventoryId: 'player',
        itemId: 1, // apple
        quantity: 2
      }));
      
      const apple = result.player.items.find(item => item.id === 1);
      expect(apple.quantity).toBe(3); // Started with 5, removed 2
    });
  });

  describe('equipItem', () => {
    it('should equip item to correct slot', () => {
      const result = playerInventoryReducer(state, equipItem({
        inventoryId: 'player',
        itemId: 'leather-hood'
      }));
      
      expect(result.player.equipment.body).toEqual(expect.objectContaining({
        id: 'leather-hood',
        name: 'rusty armor'
      }));
      expect(result.player.items.some(item => item.id === 'leather-hood')).toBe(false);
    });

    it('should swap items when slot is occupied', () => {
      // First equip an item
      let equippedState = playerInventoryReducer(state, equipItem({
        inventoryId: 'player',
        itemId: 'leather-hood'
      }));
      
      // Then equip another item to the same slot
      const newItem = { id: 'new-armor', name: 'New Armor', type: 'equipment', piece: 'body', weight: 20 };
      equippedState = playerInventoryReducer(equippedState, addItem({
        inventoryId: 'player',
        item: newItem
      }));
      
      const result = playerInventoryReducer(equippedState, equipItem({
        inventoryId: 'player',
        itemId: 'new-armor'
      }));
      
      expect(result.player.equipment.body).toEqual(expect.objectContaining({
        id: 'new-armor'
      }));
      expect(result.player.items.some(item => item.id === 'leather-hood')).toBe(true);
    });
  });

  describe('unequipItem', () => {
    it('should unequip item back to inventory', () => {
      // First equip an item
      let equippedState = playerInventoryReducer(state, equipItem({
        inventoryId: 'player',
        itemId: 'leather-hood'
      }));
      
      // Then unequip it
      const result = playerInventoryReducer(equippedState, unequipItem({
        inventoryId: 'player',
        slot: 'body'
      }));
      
      expect(result.player.equipment.body).toBeNull();
      expect(result.player.items.some(item => item.id === 'leather-hood')).toBe(true);
    });
  });

  describe('selectors', () => {
    it('should select inventory by ID', () => {
      const selected = selectPlayerInventoryById({ playerInventory: state }, 'player');
      expect(selected).toEqual(state.player);
    });

    it('should select inventory items', () => {
      const items = selectPlayerInventoryItems({ playerInventory: state }, 'player');
      expect(items).toEqual(state.player.items);
    });

    it('should select equipment', () => {
      const equipment = selectPlayerEquipment({ playerInventory: state }, 'player');
      expect(equipment).toEqual(state.player.equipment);
    });

    it('should select inventory stats', () => {
      const stats = selectPlayerInventoryStats({ playerInventory: state }, 'player');
      expect(stats).toEqual(expect.objectContaining({
        slotsUsed: 3,
        maxSlots: 20,
        weightUsed: expect.any(Number),
        maxWeight: 100,
        itemCount: 3
      }));
    });
  });
});