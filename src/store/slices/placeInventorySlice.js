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

// Initial place inventory state
const initialState = {
	village_center: {
		id: "village_center",
		placeId: "village_center",
		type: "place",
		maxSlots: 30,
		items: [
			{
				id: 1,
				name: "apple",
				description: "A fresh apple",
				type: "consumable",
				quantity: 10,
				weight: 0.5,
				consumable: { heal: 10 },
			},
			{
				id: "leather-hood",
				name: "rusty armor",
				description: "A sturdy piece of armor",
				type: "equipment",
				piece: "body",
				quantity: 1,
				stats: { defense: 12 },
				weight: 18,
			},
		],
	},
};

const placeInventorySlice = createSlice({
	name: "placeInventory",
	initialState,
	reducers: {
		// Add item to place inventory
		addItem(state, action) {
			const { inventoryId, item } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory) {
				console.warn(`Place inventory ${inventoryId} not found`);
				return;
			}

			// Check slot limit (place inventories don't have weight limits)
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

		// Remove item from place inventory
		removeItem(state, action) {
			const { inventoryId, itemId, quantity } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory) return;

			const itemValidation = validateItemExists(inventory, itemId);
			if (!itemValidation.isValid) {
				console.warn(
					`Item ${itemId} not found in place inventory ${inventoryId}`,
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

		// Move item from place inventory to another inventory
		moveItem(state, action) {
			const { fromInventoryId, toInventoryId, itemId, quantity } =
				action.payload;

			// This is a complex operation that involves both slices
			// The actual move logic will be handled by a thunk
			// This reducer just updates the local state
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

		// Update entire place inventory state
		updateInventory(state, action) {
			const { inventoryId, inventoryData } = action.payload;
			if (inventoryData && inventoryData.type === "place") {
				state[inventoryId] = inventoryData;
			}
		},

		// Add or update place inventory
		addPlaceInventory(state, action) {
			const { placeId, inventoryData } = action.payload;
			if (inventoryData && inventoryData.type === "place") {
				state[placeId] = inventoryData;
			}
		},

		// Remove place inventory entirely
		removePlaceInventory(state, action) {
			const { inventoryId } = action.payload;
			delete state[inventoryId];
		},

		// Update place inventory configuration
		updateConfiguration(state, action) {
			const { inventoryId, maxSlots } = action.payload;
			const inventory = state[inventoryId];
			if (inventory && inventory.type === "place") {
				if (typeof maxSlots === "number" && maxSlots > 0) {
					inventory.maxSlots = maxSlots;
				}
			}
		},

		// Merge items from one place inventory to another
		mergeItems(state, action) {
			const { fromInventoryId, toInventoryId } = action.payload;
			const fromInventory = state[fromInventoryId];
			const toInventory = state[toInventoryId];

			if (!fromInventory || !toInventory) return;

			// Move all items from source to target
			fromInventory.items.forEach((item) => {
				const existingItem = toInventory.items.find((i) =>
					canItemsStack(i, item),
				);
				if (existingItem && item.quantity) {
					existingItem.quantity =
						(existingItem.quantity || 1) + (item.quantity || 1);
				} else {
					toInventory.items.push(cloneItem(item));
				}
			});

			// Clear source inventory
			fromInventory.items = [];
		},
	},
});

export const {
	addItem,
	removeItem,
	moveItem,
	updateInventory,
	addPlaceInventory,
	removePlaceInventory,
	updateConfiguration,
	mergeItems,
} = placeInventorySlice.actions;

// Memoized selectors
export const selectPlaceInventoryById = createSelector(
	[(state) => state.placeInventory, (state, placeId) => placeId],
	(placeInventory, placeId) =>
		placeInventory ? placeInventory[placeId] : undefined,
);

export const selectPlaceInventoryItems = createSelector(
	[selectPlaceInventoryById],
	(inventory) => (inventory ? inventory.items : []),
);

export const selectPlaceInventoryStats = createSelector(
	[selectPlaceInventoryById],
	(inventory) => {
		if (!inventory) return null;

		return {
			slotsUsed: inventory.items.length,
			maxSlots: inventory.maxSlots,
			itemCount: inventory.items.length,
			placeId: inventory.placeId,
		};
	},
);

export const selectVaultByPlaceId = createSelector(
	[(state) => state.placeInventory, (state, placeId) => placeId],
	(placeInventory, placeId) => {
		// Find inventory by placeId (not inventoryId)
		const inventory = Object.values(placeInventory || {}).find(
			(inv) => inv.placeId === placeId,
		);
		return inventory;
	},
);

export const selectCanAddItemToPlace = createSelector(
	[selectPlaceInventoryById],
	(inventory) => {
		if (!inventory) return false;
		return inventory.items.length < inventory.maxSlots;
	},
);

export const selectItemCountByType = createSelector(
	[selectPlaceInventoryItems, (state, itemType) => itemType],
	(items, itemType) => {
		if (!Array.isArray(items)) return 0;
		return items.filter((item) => item.type === itemType).length;
	},
);

export const selectTotalQuantityByItemType = createSelector(
	[selectPlaceInventoryItems, (state, itemType) => itemType],
	(items, itemType) => {
		if (!Array.isArray(items)) return 0;
		return items
			.filter((item) => item.type === itemType)
			.reduce((total, item) => total + (item.quantity || 1), 0);
	},
);

export default placeInventorySlice.reducer;
