import { createSlice, createSelector } from '@reduxjs/toolkit';

import inventoryData from '../../data/inventory.json';

// Create a flattened object structure for the initial state
const EQUIPMENT_SLOTS = ['head', 'body', 'pants', 'main-weapon', 'second-weapon'];

const initialStateInventories = Object.entries(inventoryData.inventory).reduce((acc, [id, inventory]) => {
  acc[id] = {
    ...inventory,
    id,
    // Ensure equipment object exists for player inventory
    ...(inventory.type === 'player' && !inventory.equipment
      ? {
          equipment: {
            head: null,
            body: null,
            pants: null,
            'main-weapon': null,
            'second-weapon': null,
          },
        }
      : {})
  };
  return acc;
}, {});

const initialState = {
  inventories: initialStateInventories,
};

// Helper function to check if two items can stack
const canItemsStack = (item1, item2) => {
  // Stackable items must have the same type and name
  if (item1.type !== item2.type) return false;
  if (item1.name !== item2.name) return false;

  // Non-stackable items (e.g., armor) only stack if stats are identical
  if (item1.stats && item2.stats) {
    return JSON.stringify(item1.stats) === JSON.stringify(item2.stats);
  }
  return !item1.stats && !item2.stats;
};

// Helper function to calculate total weight (inventory only)
const calculateWeight = (items) => {
  return items.reduce((total, item) => total + item.weight * (item.quantity || 1), 0);
};

// Helper to calculate total carried weight (inventory + equipped)
export const calculateTotalPlayerWeight = (playerInventory) => {
  if (!playerInventory) return 0;
  let total = calculateWeight(playerInventory.items || []);
  if (playerInventory.equipment) {
    for (const slot of Object.keys(playerInventory.equipment)) {
      const eq = playerInventory.equipment[slot];
      if (eq && eq.weight) {
        total += eq.weight;
      }
    }
  }
  return total;
};

// Helper function to count slots (each item/stack takes one slot)
const countSlots = (items) => {
  return items.length;
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    // Add item to inventory
    addItem(state, action) {
      const { inventoryId, item } = action.payload;
      const inventory = state.inventories[inventoryId];
      if (!inventory) return;

      const maxSlots = inventory.maxSlots;
      const currentSlots = countSlots(inventory.items);
      const currentWeight = calculateWeight(inventory.items);
      const itemWeight = item.weight * (item.quantity || 1);

      // Check slot limit
      if (currentSlots >= maxSlots) {
        console.warn(`Inventory ${inventoryId} is full (${maxSlots} slots)`);
        return;
      }

      // Check weight limit for player
      if (inventory.type === 'player' && currentWeight + itemWeight > inventory.maxWeight) {
        console.warn(`Player ${inventoryId} cannot carry more weight`);
        return;
      }

      // Try to stack with existing items
      const existingItem = inventory.items.find((i) => canItemsStack(i, item));
      if (existingItem && item.quantity) {
        existingItem.quantity = (existingItem.quantity || 1) + item.quantity;
      } else {
        // Add new item
        inventory.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }
    },

    // Move item between inventories
    moveItem(state, action) {
      const { fromInventoryId, toInventoryId, itemId, quantity } = action.payload;
      const fromInv = state.inventories[fromInventoryId];
      const toInv = state.inventories[toInventoryId];
      if (!fromInv || !toInv) return;

      // Find the item in source inventory
      const itemIndex = fromInv.items.findIndex((i) => i.id === itemId);
      if (itemIndex === -1) return;

      const item = fromInv.items[itemIndex];
      const moveQuantity = quantity || item.quantity || 1;

      // Validate move quantity
      if (moveQuantity > (item.quantity || 1)) {
        console.warn(`Cannot move ${moveQuantity} of item ${itemId}, only ${item.quantity} available`);
        return;
      }

      // Check target inventory constraints
      const toSlots = countSlots(toInv.items);
      const toWeight = calculateWeight(toInv.items);
      const itemWeight = item.weight * moveQuantity;

      // Slot limit check
      const willNeedNewSlot = !toInv.items.some((i) => canItemsStack(i, item));
      if (willNeedNewSlot && toSlots >= toInv.maxSlots) {
        console.warn(`Target inventory ${toInventoryId} is full (${toInv.maxSlots} slots)`);
        return;
      }

      // Weight limit check for player
      if (toInv.type === 'player' && toWeight + itemWeight > toInv.maxWeight) {
        console.warn(`Player ${toInventoryId} cannot carry more weight`);
        return;
      }

      // Create item to move
      const itemToMove = {
        ...item,
        quantity: moveQuantity,
        id: moveQuantity < (item.quantity || 1) ? `${item.id}-${Date.now()}` : item.id, // New ID for partial stack
      };

      // Update source inventory
      if (moveQuantity < (item.quantity || 1)) {
        item.quantity -= moveQuantity;
      } else {
        fromInv.items.splice(itemIndex, 1);
      }

      // Update target inventory
      const existingItem = toInv.items.find((i) => canItemsStack(i, itemToMove));
      if (existingItem && itemToMove.quantity) {
        existingItem.quantity = (existingItem.quantity || 1) + moveQuantity;
      } else {
        toInv.items.push(itemToMove);
      }
    },

    // Remove item from inventory
    removeItem(state, action) {
      const { inventoryId, itemId, quantity } = action.payload;
      const inventory = state.inventories[inventoryId];
      if (!inventory) return;

      const itemIndex = inventory.items.findIndex((i) => i.id === itemId);
      if (itemIndex === -1) return;

      const item = inventory.items[itemIndex];
      const removeQuantity = quantity || item.quantity || 1;

      if (removeQuantity >= (item.quantity || 1)) {
        inventory.items.splice(itemIndex, 1);
      } else {
        item.quantity -= removeQuantity;
      }
    },
    updateInventory(state, action) {
      state.inventory = action.payload;
    },

    // Equip item from inventory to equipment slot
    equipItem(state, action) {
      const { inventoryId, itemId } = action.payload;
      const inventory = state.inventories[inventoryId];
      if (!inventory || inventory.type !== 'player') return;
      const itemIdx = inventory.items.findIndex((i) => i.id === itemId);
      if (itemIdx === -1) return;
      const item = inventory.items[itemIdx];
      if (item.type !== 'equipment' || !item.piece || !EQUIPMENT_SLOTS.includes(item.piece)) return;
      const slot = item.piece;
      // If slot already has an item, swap it back to inventory
      const equipped = inventory.equipment[slot];
      if (equipped) {
        // Add old equipped item to inventory
        inventory.items.push(equipped);
      }
      // Equip new item
      inventory.equipment[slot] = item;
      // Remove from inventory
      inventory.items.splice(itemIdx, 1);
    },

    // Unequip item from equipment slot back to inventory
    unequipItem(state, action) {
      const { inventoryId, slot } = action.payload;
      const inventory = state.inventories[inventoryId];
      if (!inventory || inventory.type !== 'player') return;
      if (!EQUIPMENT_SLOTS.includes(slot)) return;
      const equipped = inventory.equipment[slot];
      if (!equipped) return;
      // Add equipped item back to inventory
      inventory.items.push(equipped);
      // Remove from equipment slot
      inventory.equipment[slot] = null;
    },
  },
});

export const { updateInventory, addItem, moveItem, removeItem, equipItem, unequipItem } = inventorySlice.actions;

// Memoized selectors
export const selectInventoryById = (state, id) =>
  state.inventory && state.inventory.inventories ? state.inventory.inventories[id] : undefined;

export const selectVaultByPlaceId = createSelector(
  [(state) => state.inventory.inventories, (state, placeId) => placeId],
  (inventories, placeId) => (inventories ? inventories[placeId] : undefined)
);

export default inventorySlice.reducer;