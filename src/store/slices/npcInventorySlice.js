import { createSlice, createSelector } from "@reduxjs/toolkit";
import {
	validateSlotLimit,
	validateItemExists,
} from "./inventory/inventoryValidators.js";
import { canItemsStack, cloneItem } from "./inventory/inventoryUtils.js";
import { inventoryData } from "../../data/inventory.js";

// Filter NPC inventories from the main inventory data
const getNpcInventories = () => {
	const npcInventories = {};
	Object.entries(inventoryData).forEach(([key, inventory]) => {
		if (inventory.type === "npc") {
			npcInventories[key] = inventory;
		}
	});
	return npcInventories;
};

// Initial NPC inventory state from data
const initialState = getNpcInventories();

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
			const { fromInventoryId, itemId, quantity } = action.payload;

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
	[(state) => state.npcInventory, (_state, npcId) => npcId],
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
	[selectNpcInventoryItems, (_state, itemType) => itemType],
	(items, itemType) => {
		if (!Array.isArray(items)) return 0;
		return items.filter((item) => item.type === itemType).length;
	},
);

export const selectTotalQuantityByItemType = createSelector(
	[selectNpcInventoryItems, (_state, itemType) => itemType],
	(items, itemType) => {
		if (!Array.isArray(items)) return 0;
		return items
			.filter((item) => item.type === itemType)
			.reduce((total, item) => total + (item.quantity || 1), 0);
	},
);

export default npcInventorySlice.reducer;
