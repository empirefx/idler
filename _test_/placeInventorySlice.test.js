import { describe, it, expect, beforeEach } from 'vitest';
import placeInventoryReducer, {
  addItem,
  removeItem,
  updateInventory,
  addPlaceInventory,
  mergeItems,
  selectPlaceInventoryById,
  selectPlaceInventoryItems,
  selectPlaceInventoryStats,
  selectVaultByPlaceId
} from '../src/store/slices/placeInventorySlice';

describe('placeInventorySlice reducer and selectors', () => {
  let state;
  
  beforeEach(() => {
    state = placeInventoryReducer(undefined, { type: 'init' });
  });

  describe('initial state', () => {
    it('should have correct initial state structure', () => {
      expect(state).toHaveProperty('village_center');
      expect(state.village_center).toHaveProperty('id', 'village_center');
      expect(state.village_center).toHaveProperty('type', 'place');
      expect(state.village_center).toHaveProperty('placeId', 'village_center');
      expect(state.village_center).toHaveProperty('maxSlots', 30);
      expect(state.village_center).toHaveProperty('items');
      expect(state.village_center.items).toHaveLength(2);
    });
  });

  describe('addItem', () => {
    it('should add item to place inventory', () => {
      const newItem = { id: 'test-item', name: 'Test Item', type: 'consumable', weight: 1, quantity: 1 };
      const newState = placeInventoryReducer(state, addItem({
        inventoryId: 'village_center',
        item: newItem
      }));
      
      expect(newState.village_center.items).toHaveLength(3);
      expect(newState.village_center.items).toContainEqual(expect.objectContaining({
        id: 'test-item',
        name: 'Test Item',
        quantity: 1
      }));
    });

    it('should stack identical items in place inventory', () => {
      const result = placeInventoryReducer(state, addItem({
        inventoryId: 'village_center',
        item: { id: 1, name: 'apple', type: 'consumable', quantity: 3, weight: 0.5 }
      }));
      
      const apple = result.village_center.items.find(item => item.name === 'apple');
      expect(apple.quantity).toBe(13); // 10 + 3
    });
  });

  describe('removeItem', () => {
    it('should remove item from place inventory', () => {
      const result = placeInventoryReducer(state, removeItem({
        inventoryId: 'village_center',
        itemId: 1
      }));
      
      expect(result.village_center.items.some(item => item.id === 1)).toBe(false);
    });

    it('should reduce item quantity when removing partial amount', () => {
      const result = placeInventoryReducer(state, removeItem({
        inventoryId: 'village_center',
        itemId: 1,
        quantity: 5
      }));
      
      const apple = result.village_center.items.find(item => item.id === 1);
      expect(apple.quantity).toBe(5); // Started with 10, removed 5
    });
  });

  describe('addPlaceInventory', () => {
    it('should add new place inventory', () => {
      const newPlace = {
        id: 'new_place',
        placeId: 'new_place',
        type: 'place',
        maxSlots: 25,
        items: []
      };
      
      const result = placeInventoryReducer(state, addPlaceInventory({
        placeId: 'new_place',
        inventoryData: newPlace
      }));
      
      expect(result).toHaveProperty('new_place');
      expect(result.new_place).toEqual(newPlace);
    });
  });

  describe('mergeItems', () => {
    it('should merge items from one place to another', () => {
      // Add a second place with items
      let stateWithTwoPlaces = placeInventoryReducer(state, addPlaceInventory({
        placeId: 'second_place',
        inventoryData: {
          id: 'second_place',
          placeId: 'second_place',
          type: 'place',
          maxSlots: 20,
          items: [{ id: 3, name: 'orange', type: 'consumable', quantity: 5, weight: 0.3 }]
        }
      }));
      
      // Merge items
      const result = placeInventoryReducer(stateWithTwoPlaces, mergeItems({
        fromInventoryId: 'second_place',
        toInventoryId: 'village_center'
      }));
      
      expect(result.village_center.items.some(item => item.name === 'orange')).toBe(true);
      expect(result.second_place.items).toHaveLength(0);
    });
  });

  describe('selectors', () => {
    it('should select place inventory by ID', () => {
      const selected = selectPlaceInventoryById({ placeInventory: state }, 'village_center');
      expect(selected).toEqual(state.village_center);
    });

    it('should select place inventory items', () => {
      const items = selectPlaceInventoryItems({ placeInventory: state }, 'village_center');
      expect(items).toEqual(state.village_center.items);
    });

    it('should select place inventory stats', () => {
      const stats = selectPlaceInventoryStats({ placeInventory: state }, 'village_center');
      expect(stats).toEqual(expect.objectContaining({
        slotsUsed: 2,
        maxSlots: 30,
        itemCount: 2,
        placeId: 'village_center'
      }));
    });

    it('should select vault by place ID', () => {
      const vault = selectVaultByPlaceId({ placeInventory: state }, 'village_center');
      expect(vault).toEqual(state.village_center);
    });
  });
});