import { describe, it, expect } from 'vitest';
import { canItemsStack, calculateTotalPlayerWeight } from '../src/store/slices/inventorySlice';

// Tests for canItemsStack
describe('canItemsStack', () => {
  it('should return true for items with same type and name and no stats', () => {
    const item1 = { type: 'consumable', name: 'Apple' };
    const item2 = { type: 'consumable', name: 'Apple' };
    expect(canItemsStack(item1, item2)).toBe(true);
  });

  it('should return false for items with different types', () => {
    const item1 = { type: 'consumable', name: 'Apple' };
    const item2 = { type: 'material', name: 'Apple' };
    expect(canItemsStack(item1, item2)).toBe(false);
  });

  it('should return false for items with different names', () => {
    const item1 = { type: 'consumable', name: 'Apple' };
    const item2 = { type: 'consumable', name: 'Banana' };
    expect(canItemsStack(item1, item2)).toBe(false);
  });

  it('should return true for equipment items with identical stats', () => {
    const stats = { atk: 5 };
    const item1 = { type: 'equipment', name: 'Sword', stats };
    const item2 = { type: 'equipment', name: 'Sword', stats: { atk: 5 } };
    expect(canItemsStack(item1, item2)).toBe(true);
  });

  it('should return false for equipment items with different stats', () => {
    const item1 = { type: 'equipment', name: 'Sword', stats: { atk: 5 } };
    const item2 = { type: 'equipment', name: 'Sword', stats: { atk: 7 } };
    expect(canItemsStack(item1, item2)).toBe(false);
  });

  it('should return false if one item has stats and the other does not', () => {
    const item1 = { type: 'equipment', name: 'Shield', stats: { def: 3 } };
    const item2 = { type: 'equipment', name: 'Shield' };
    expect(canItemsStack(item1, item2)).toBe(false);
  });
});

// Tests for calculateTotalPlayerWeight
describe('calculateTotalPlayerWeight', () => {
  it('should return 0 for undefined or null inventory', () => {
    expect(calculateTotalPlayerWeight()).toBe(0);
    expect(calculateTotalPlayerWeight(null)).toBe(0);
  });

  it('should calculate weight for items only', () => {
    const inventory = { items: [{ weight: 2, quantity: 3 }, { weight: 1 }], equipment: {} };
    expect(calculateTotalPlayerWeight(inventory)).toBe(2 * 3 + 1);
  });

  it('should include equipment weight', () => {
    const inventory = {
      items: [{ weight: 1, quantity: 2 }],
      equipment: { head: { weight: 1 }, body: null, pants: null, 'main-weapon': null, 'second-weapon': null }
    };
    // 1*2 + 1 = 3
    expect(calculateTotalPlayerWeight(inventory)).toBe(3);
  });
});
