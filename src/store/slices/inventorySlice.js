import { createSlice, createSelector } from "@reduxjs/toolkit";
import { inventoryData } from "../../data/inventory.js";
import {
	EQUIPMENT_SLOTS,
	INVENTORY_TYPES,
} from "./inventory/inventoryTypes.js";
import {
	canItemsStack,
	cloneItem,
	calculateWeight,
	calculateTotalPlayerWeight,
	countSlots,
} from "./inventory/inventoryUtils.js";

const getInitialState = () => {
	const inventories = {};
	Object.entries(inventoryData).forEach(([key, data]) => {
		inventories[key] = {
			...data,
			items: data.items || [],
			equipment: data.equipment || {},
		};
	});
	return inventories;
};

const inventorySlice = createSlice({
	name: "inventory",
	initialState: getInitialState(),
	reducers: {
		addItem(state, action) {
			const { inventoryId, item } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory) return;

			const existingItem = inventory.items.find((i) => canItemsStack(i, item));
			if (existingItem && item.quantity) {
				existingItem.quantity = (existingItem.quantity || 1) + item.quantity;
			} else {
				inventory.items.push({
					...cloneItem(item),
					quantity: item.quantity || 1,
				});
			}
		},

		removeItem(state, action) {
			const { inventoryId, itemId, quantity } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory) return;

			const index = inventory.items.findIndex((i) => i.id === itemId);
			if (index === -1) return;

			const item = inventory.items[index];
			const removeQty = quantity || item.quantity || 1;

			if (removeQty >= (item.quantity || 1)) {
				inventory.items.splice(index, 1);
			} else {
				item.quantity -= removeQty;
			}
		},

		moveItem(state, action) {
			const { fromId, toId, itemId, quantity } = action.payload;
			const fromInventory = state[fromId];
			const toInventory = state[toId];

			if (!fromInventory || !toInventory) return;

			const fromIndex = fromInventory.items.findIndex((i) => i.id === itemId);
			if (fromIndex === -1) return;

			const item = fromInventory.items[fromIndex];
			const moveQty = quantity || item.quantity || 1;

			if (moveQty >= (item.quantity || 1)) {
				fromInventory.items.splice(fromIndex, 1);
			} else {
				item.quantity -= moveQty;
			}

			const targetItem = cloneItem(item);
			targetItem.quantity = moveQty;

			const existingItem = toInventory.items.find((i) =>
				canItemsStack(i, targetItem),
			);
			if (existingItem) {
				existingItem.quantity = (existingItem.quantity || 1) + moveQty;
			} else {
				toInventory.items.push(targetItem);
			}
		},

		equipItem(state, action) {
			const { inventoryId, itemId, typeToSlot } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory || inventory.type !== INVENTORY_TYPES.PLAYER) return;

			const itemIndex = inventory.items.findIndex((i) => i.id === itemId);
			if (itemIndex === -1) return;

			const item = inventory.items[itemIndex];
			const slot = typeToSlot[item.type];
			if (!slot) return;

			if (inventory.equipment[slot]) {
				inventory.items.push(cloneItem(inventory.equipment[slot]));
			}

			inventory.equipment[slot] = cloneItem(item);
			inventory.items.splice(itemIndex, 1);
		},

		unequipItem(state, action) {
			const { inventoryId, slot } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory || inventory.type !== INVENTORY_TYPES.PLAYER) return;

			if (!EQUIPMENT_SLOTS.includes(slot)) return;

			const equipped = inventory.equipment[slot];
			if (!equipped) return;

			inventory.items.push(cloneItem(equipped));
			inventory.equipment[slot] = null;
		},

		mergeInventories(state, action) {
			const { fromInventoryId, toInventoryId } = action.payload;
			const fromInventory = state[fromInventoryId];
			const toInventory = state[toInventoryId];

			if (!fromInventory || !toInventory) return;

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

			fromInventory.items = [];
		},

		updateConfiguration(state, action) {
			const { inventoryId, maxSlots, maxWeight } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory) return;

			if (typeof maxSlots === "number" && maxSlots > 0) {
				inventory.maxSlots = maxSlots;
			}
			if (typeof maxWeight === "number" && maxWeight > 0) {
				inventory.maxWeight = maxWeight;
			}
		},

		updateInventory(state, action) {
			const { inventoryId, inventoryData } = action.payload;
			if (inventoryData) {
				state[inventoryId] = {
					...inventoryData,
					items: inventoryData.items || [],
					equipment: inventoryData.equipment || {},
				};
			}
		},

		addInventory(state, action) {
			const { inventoryId, inventoryData } = action.payload;
			if (inventoryData) {
				state[inventoryId] = {
					...inventoryData,
					items: inventoryData.items || [],
					equipment: inventoryData.equipment || {},
				};
			}
		},

		removeInventory(state, action) {
			const { inventoryId } = action.payload;
			delete state[inventoryId];
		},
	},
});

export const {
	addItem,
	removeItem,
	moveItem,
	equipItem,
	unequipItem,
	mergeInventories,
	updateConfiguration,
	updateInventory,
	addInventory,
	removeInventory,
} = inventorySlice.actions;

export const selectInventoryById = createSelector(
	[(state) => state.inventory, (_state, id) => id],
	(inventory, id) => inventory?.[id],
);

export const selectInventoryItems = createSelector(
	[selectInventoryById],
	(inventory) => inventory?.items || [],
);

export const selectInventoryStats = createSelector(
	[selectInventoryById],
	(inventory) => {
		if (!inventory) return null;

		return {
			slotsUsed: countSlots(inventory.items || []),
			maxSlots: inventory.maxSlots,
			weightUsed:
				inventory.type === INVENTORY_TYPES.PLAYER
					? calculateTotalPlayerWeight(inventory)
					: calculateWeight(inventory.items || []),
			maxWeight: inventory.maxWeight,
			itemCount: inventory.items?.length || 0,
			type: inventory.type,
		};
	},
);

export const selectEquipment = createSelector(
	[selectInventoryById],
	(inventory) => inventory?.equipment || {},
);

export const selectEquippedItem = createSelector(
	[selectEquipment, (_state, slot) => slot],
	(equipment, slot) => equipment?.[slot] || null,
);

export const selectPlaceInventories = createSelector(
	[(state) => state.inventory],
	(inventory) =>
		Object.values(inventory || {}).filter(
			(i) => i.type === INVENTORY_TYPES.PLACE,
		),
);

export const selectNpcInventories = createSelector(
	[(state) => state.inventory],
	(inventory) =>
		Object.values(inventory || {}).filter(
			(i) => i.type === INVENTORY_TYPES.NPC,
		),
);

export const selectPlayerInventories = createSelector(
	[(state) => state.inventory],
	(inventory) =>
		Object.values(inventory || {}).filter(
			(i) => i.type === INVENTORY_TYPES.PLAYER,
		),
);

export const selectCanAddItem = createSelector(
	[selectInventoryById],
	(inventory) => {
		if (!inventory) return false;
		return countSlots(inventory.items || []) < inventory.maxSlots;
	},
);

export const selectItemById = createSelector(
	[selectInventoryItems, (_state, itemId) => itemId],
	(items, itemId) => items.find((item) => item.id === itemId) || null,
);

export const selectInventoryByPlaceId = createSelector(
	[(state) => state.inventory, (_state, placeId) => placeId],
	(inventory, placeId) => {
		return Object.values(inventory || {}).find(
			(inv) => inv.placeId === placeId,
		);
	},
);

export const selectInventoryByNpcId = createSelector(
	[(state) => state.inventory, (_state, npcId) => npcId],
	(inventory, npcId) => {
		return Object.values(inventory || {}).find((inv) => inv.npcId === npcId);
	},
);

export default inventorySlice.reducer;
