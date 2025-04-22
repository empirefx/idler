import { describe, it, expect, vi } from 'vitest';
import { InventoryService } from '../src/game/services/inventoryService';

describe('InventoryService', () => {
  it('getInventoryForPlace returns correct inventory or undefined', () => {
    const state = { inventory: { inventories: { p1: { items: [] } } } };
    expect(InventoryService.getInventoryForPlace(state, 'p1')).toEqual({ items: [] });
    expect(InventoryService.getInventoryForPlace(state, 'unknown')).toBeUndefined();
  });

  it('addItemToInventory dispatches correct action', () => {
    const store = { dispatch: vi.fn() };
    const item = { id: 1 };
    InventoryService.addItemToInventory(store, 'p1', item);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'inventory/addItem',
      payload: { inventoryId: 'p1', item }
    });
  });
});
