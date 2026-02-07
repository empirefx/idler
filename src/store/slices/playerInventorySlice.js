import { createSlice, createSelector } from "@reduxjs/toolkit";
import { EQUIPMENT_SLOTS } from "./inventory/inventoryTypes.js";
import {
	validateSlotLimit,
	validateWeightLimit,
	validateItemExists,
	validateEquipmentSlot,
	validateInventoryExists,
} from "./inventory/inventoryValidators.js";
import {
	canItemsStack,
	calculateWeight,
	calculateTotalPlayerWeight,
	findItemById,
	getItemIndex,
	generateItemId,
	cloneItem,
} from "./inventory/inventoryUtils.js";

// Initial player inventory state
const initialState = {
	player: {
		id: "player",
		type: "player",
		playerId: "1",
		maxSlots: 20,
		maxWeight: 100,
		items: [
			{
				id: 1,
				name: "apple",
				description: "A fresh apple",
				type: "consumable",
				quantity: 5,
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
				stats: { defense: 10 },
				weight: 15,
			},
			{
				id: 2,
				name: "banana",
				description: "A ripe banana",
				type: "consumable",
				quantity: 3,
				weight: 0.5,
				consumable: { heal: 12 },
			},
		],
		equipment: {
			head: null,
			body: null,
			pants: null,
			"main-weapon": null,
			"second-weapon": null,
		},
	},
};

const playerInventorySlice = createSlice({
	name: "playerInventory",
	initialState,
	reducers: {
		// Add item to player inventory
		addItem(state, action) {
			const { inventoryId, item } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory) {
				console.warn(`Player inventory ${inventoryId} not found`);
				return;
			}

			const itemWeight = item.weight * (item.quantity || 1);

			// Check slot limit
			const slotValidation = validateSlotLimit(inventory, 1);
			if (!slotValidation.isValid) {
				console.warn(slotValidation.message);
				return;
			}

			// Check weight limit
			const weightValidation = validateWeightLimit(inventory, itemWeight);
			if (!weightValidation.isValid) {
				console.warn(weightValidation.message);
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

		// Remove item from player inventory
		removeItem(state, action) {
			const { inventoryId, itemId, quantity } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory) return;

			const itemValidation = validateItemExists(inventory, itemId);
			if (!itemValidation.isValid) {
				console.warn(
					`Item ${itemId} not found in player inventory ${inventoryId}`,
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

		// Move item from player inventory to another inventory
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

		// Update entire player inventory state
		updateInventory(state, action) {
			const { inventoryId, inventoryData } = action.payload;
			if (inventoryData && inventoryData.type === "player") {
				state[inventoryId] = inventoryData;
			}
		},

		// Equip item from inventory to equipment slot
		equipItem(state, action) {
			const { inventoryId, itemId } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory || inventory.type !== "player") return;

			const itemValidation = validateItemExists(inventory, itemId);
			if (!itemValidation.isValid) return;

			const item = inventory.items[itemValidation.itemIndex];

			// Validate that item can be equipped in its intended slot
			const equipmentValidation = validateEquipmentSlot(item, item.piece);
			if (!equipmentValidation.isValid) {
				console.warn(equipmentValidation.message);
				return;
			}

			const slot = item.piece;

			// If slot already has an item, swap it back to inventory
			const equippedItem = inventory.equipment[slot];
			if (equippedItem) {
				// Add old equipped item to inventory
				inventory.items.push(cloneItem(equippedItem));
			}

			// Equip new item
			inventory.equipment[slot] = cloneItem(item);

			// Remove from inventory
			inventory.items.splice(itemValidation.itemIndex, 1);
		},

		// Unequip item from equipment slot back to inventory
		unequipItem(state, action) {
			const { inventoryId, slot } = action.payload;
			const inventory = state[inventoryId];
			if (!inventory || inventory.type !== "player") return;

			if (!EQUIPMENT_SLOTS.includes(slot)) {
				console.warn(`Invalid equipment slot: ${slot}`);
				return;
			}

			const equippedItem = inventory.equipment[slot];
			if (!equippedItem) return;

			// Check if inventory has space
			const slotValidation = validateSlotLimit(inventory, 1);
			if (!slotValidation.isValid) {
				console.warn(slotValidation.message);
				return;
			}

			// Check weight limit
			const weightValidation = validateWeightLimit(
				inventory,
				equippedItem.weight,
			);
			if (!weightValidation.isValid) {
				console.warn(weightValidation.message);
				return;
			}

			// Add equipped item back to inventory
			inventory.items.push(cloneItem(equippedItem));

			// Remove from equipment slot
			inventory.equipment[slot] = null;
		},

		// Update player inventory configuration
		updateConfiguration(state, action) {
			const { inventoryId, maxSlots, maxWeight } = action.payload;
			const inventory = state[inventoryId];
			if (inventory && inventory.type === "player") {
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
	equipItem,
	unequipItem,
	updateConfiguration,
} = playerInventorySlice.actions;

// Memoized selectors
export const selectPlayerInventoryById = createSelector(
	[(state) => state.playerInventory, (state, playerId) => playerId],
	(playerInventory, playerId) =>
		playerInventory ? playerInventory[playerId] : undefined,
);

export const selectPlayerInventoryItems = createSelector(
	[selectPlayerInventoryById],
	(inventory) => (inventory ? inventory.items : []),
);

export const selectPlayerEquipment = createSelector(
	[selectPlayerInventoryById],
	(inventory) => (inventory ? inventory.equipment : {}),
);

export const selectPlayerInventoryStats = createSelector(
	[selectPlayerInventoryById],
	(inventory) => {
		if (!inventory) return null;

		return {
			slotsUsed: inventory.items.length,
			maxSlots: inventory.maxSlots,
			weightUsed: calculateTotalPlayerWeight(inventory),
			maxWeight: inventory.maxWeight,
			itemCount: inventory.items.length,
		};
	},
);

export const selectEquippedItem = createSelector(
	[selectPlayerEquipment, (state, slot) => slot],
	(equipment, slot) => (equipment ? equipment[slot] : null),
);

export const selectCanEquipItem = createSelector(
	[selectPlayerInventoryById, (state, itemId) => itemId],
	(inventory, itemId) => {
		if (!inventory) return false;
		const item = findItemById(inventory, itemId);
		return item && item.type === "equipment" && item.piece;
	},
);

export default playerInventorySlice.reducer;
