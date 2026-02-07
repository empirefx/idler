import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
  validateSlotLimit,
  validateItemExists,
} from "./inventory/inventoryValidators.js";
import {
  canItemsStack,
  findItemById,
  getItemIndex,
  cloneItem,
} from "./inventory/inventoryUtils.js";

// Initial NPC inventory state
const initialState = {
  blacksmith: {
    id: "blacksmith",
    npcId: "blacksmith",
    type: "npc",
    maxSlots: 20,
    maxWeight: 200,
    items: [
      {
        id: "iron_sword",
        name: "Iron Sword",
        description: "A sturdy iron sword",
        type: "equipment",
        piece: "main-weapon",
        quantity: 3,
        stats: { attack: 15 },
        weight: 5,
      },
      {
        id: "iron_helmet",
        name: "Iron Helmet",
        description: "Protective headgear",
        type: "equipment",
        piece: "head",
        quantity: 2,
        stats: { defense: 8 },
        weight: 4,
      },
      {
        id: "iron_chestplate",
        name: "Iron Chestplate",
        description: "Strong chest armor",
        type: "equipment",
        piece: "body",
        quantity: 2,
        stats: { defense: 15 },
        weight: 12,
      },
    ],
  },
  trader: {
    id: "trader",
    npcId: "trader",
    type: "npc",
    maxSlots: 25,
    maxWeight: 150,
    items: [
      {
        id: "apple",
        name: "apple",
        description: "A fresh apple",
        type: "consumable",
        quantity: 15,
        weight: 0.5,
        consumable: { heal: 10 },
      },
      {
        id: "banana",
        name: "banana",
        description: "A ripe banana",
        type: "consumable",
        quantity: 10,
        weight: 0.5,
        consumable: { heal: 12 },
      },
      {
        id: "or",
        name: "or",
        description: "A piece of or",
        type: "material",
        quantity: 20,
        weight: 2,
      },
    ],
  },
};

const npcInventorySlice = createSlice({
  name: "npcInventory",
  initialState,
  reducers: {
    // Add item to NPC inventory
    addItem(state, action) {
      const { inventoryId, item } = action.payload;
      const inventory = state[inventoryId];
      if (!inventory) {
        console.warn(`NPC inventory ${inventoryId} not found`);
        return;
      }

      // Check slot limit
      const slotValidation = validateSlotLimit(inventory, 1);
      if (!slotValidation.isValid) {
        console.warn(slotValidation.message);
        return;
      }

      // Try to stack with existing items
      const existingItem = inventory.items.find((i) => canItemsStack(i, item));
      if (existingItem && item.quantity) {
        existingItem.quantity = (existingItem.quantity || 1) + item.quantity;
      } else {
        // Add new item
        inventory.items.push({
          ...cloneItem(item),
          quantity: item.quantity || 1,
        });
      }
    },

    // Remove item from NPC inventory
    removeItem(state, action) {
      const { inventoryId, itemId, quantity } = action.payload;
      const inventory = state[inventoryId];
      if (!inventory) return;

      const itemValidation = validateItemExists(inventory, itemId);
      if (!itemValidation.isValid) {
        console.warn(
          `Item ${itemId} not found in NPC inventory ${inventoryId}`,
        );
        return;
      }

      const itemIndex = itemValidation.itemIndex;
      const item = inventory.items[itemIndex];
      const removeQuantity = quantity || item.quantity || 1;

      if (removeQuantity >= (item.quantity || 1)) {
        inventory.items.splice(itemIndex, 1);
      } else {
        item.quantity -= removeQuantity;
      }
    },

    // Move item from NPC inventory to another inventory
    moveItem(state, action) {
      const { fromInventoryId, toInventoryId, itemId, quantity } =
        action.payload;

      const inventory = state[fromInventoryId];
      if (!inventory) return;

      const itemValidation = validateItemExists(inventory, itemId);
      if (!itemValidation.isValid) return;

      const itemIndex = itemValidation.itemIndex;
      const item = inventory.items[itemIndex];
      const moveQuantity = quantity || item.quantity || 1;

      // Update source inventory
      if (moveQuantity < (item.quantity || 1)) {
        item.quantity -= moveQuantity;
      } else {
        inventory.items.splice(itemIndex, 1);
      }
    },

    // Update entire NPC inventory state
    updateInventory(state, action) {
      const { inventoryId, inventoryData } = action.payload;
      if (inventoryData && inventoryData.type === "npc") {
        state[inventoryId] = inventoryData;
      }
    },

    // Add or update NPC inventory
    addNpcInventory(state, action) {
      const { npcId, inventoryData } = action.payload;
      if (inventoryData && inventoryData.type === "npc") {
        state[npcId] = inventoryData;
      }
    },

    // Remove NPC inventory entirely
    removeNpcInventory(state, action) {
      const { inventoryId } = action.payload;
      delete state[inventoryId];
    },

    // Update NPC inventory configuration
    updateConfiguration(state, action) {
      const { inventoryId, maxSlots, maxWeight } = action.payload;
      const inventory = state[inventoryId];
      if (inventory && inventory.type === "npc") {
        if (typeof maxSlots === "number" && maxSlots > 0) {
          inventory.maxSlots = maxSlots;
        }
        if (typeof maxWeight === "number" && maxWeight > 0) {
          inventory.maxWeight = maxWeight;
        }
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  moveItem,
  updateInventory,
  addNpcInventory,
  removeNpcInventory,
  updateConfiguration,
} = npcInventorySlice.actions;

// Memoized selectors
export const selectNpcInventoryById = createSelector(
  [(state) => state.npcInventory, (state, npcId) => npcId],
  (npcInventory, npcId) => (npcInventory ? npcInventory[npcId] : undefined),
);

export const selectNpcInventoryItems = createSelector(
  [selectNpcInventoryById],
  (inventory) => (inventory ? inventory.items : []),
);

export const selectNpcInventoryStats = createSelector(
  [selectNpcInventoryById],
  (inventory) => {
    if (!inventory) return null;

    return {
      slotsUsed: inventory.items.length,
      maxSlots: inventory.maxSlots,
      itemCount: inventory.items.length,
      npcId: inventory.npcId,
      totalWeight: inventory.items.reduce(
        (total, item) => total + (item.weight || 0) * (item.quantity || 1),
        0,
      ),
      maxWeight: inventory.maxWeight,
    };
  },
);

export const selectCanAddItemToNpc = createSelector(
  [selectNpcInventoryById],
  (inventory) => {
    if (!inventory) return false;
    return inventory.items.length < inventory.maxSlots;
  },
);

export const selectItemCountByType = createSelector(
  [selectNpcInventoryItems, (state, itemType) => itemType],
  (items, itemType) => {
    if (!Array.isArray(items)) return 0;
    return items.filter((item) => item.type === itemType).length;
  },
);

export const selectTotalQuantityByItemType = createSelector(
  [selectNpcInventoryItems, (state, itemType) => itemType],
  (items, itemType) => {
    if (!Array.isArray(items)) return 0;
    return items
      .filter((item) => item.type === itemType)
      .reduce((total, item) => total + (item.quantity || 1), 0);
  },
);

export default npcInventorySlice.reducer;
