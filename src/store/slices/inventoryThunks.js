import {
	moveItem as movePlayerItem,
	addItem as addPlayerItem,
	removeItem as removePlayerItem,
} from "./playerInventorySlice.js";
import {
	moveItem as movePlaceItem,
	addItem as addPlaceItem,
	removeItem as removePlaceItem,
} from "./placeInventorySlice.js";
import {
	validateItemMove,
	validateItemExists,
} from "./inventory/inventoryValidators.js";
import { cloneItem } from "./inventory/inventoryUtils.js";
import { addNotification } from "./notificationSlice.js";
import { NOTIFICATION_TYPES } from "./notificationSlice.js";

// Thunk for moving items between different inventory types
export const moveItemBetweenInventories = (
	fromInventoryId,
	toInventoryId,
	itemId,
	quantity,
) => {
	return (dispatch, getState) => {
		const state = getState();

		// Get source and target inventories
		let fromInventory, toInventory;
		let fromSliceActions, toSliceActions;

		// Determine source inventory
		if (
			fromInventoryId === "player" ||
			state.playerInventory[fromInventoryId]
		) {
			fromInventory = state.playerInventory[fromInventoryId];
			fromSliceActions = {
				move: movePlayerItem,
				add: addPlayerItem,
				remove: removePlayerItem,
			};
		} else {
			fromInventory =
				state.placeInventory[fromInventoryId] ||
				Object.values(state.placeInventory).find(
					(inv) => inv.placeId === fromInventoryId,
				);
			fromSliceActions = {
				move: movePlaceItem,
				add: addPlaceItem,
				remove: removePlaceItem,
			};
		}

		// Determine target inventory
		if (toInventoryId === "player" || state.playerInventory[toInventoryId]) {
			toInventory = state.playerInventory[toInventoryId];
			toSliceActions = {
				move: movePlayerItem,
				add: addPlayerItem,
				remove: removePlayerItem,
			};
		} else {
			toInventory =
				state.placeInventory[toInventoryId] ||
				Object.values(state.placeInventory).find(
					(inv) => inv.placeId === toInventoryId,
				);
			toSliceActions = {
				move: movePlaceItem,
				add: addPlaceItem,
				remove: removePlaceItem,
			};
		}

		if (!fromInventory || !toInventory) {
			dispatch(
				addNotification(
					"Source or target inventory not found",
					NOTIFICATION_TYPES.ERROR,
				),
			);
			return false;
		}

		// Validate the move
		const validation = validateItemMove(
			fromInventory,
			toInventory,
			itemId,
			quantity,
		);
		if (!validation.isValid) {
			// Dispatch notification for user feedback
			let notificationType = NOTIFICATION_TYPES.ERROR;
			if (
				validation.error === "WEIGHT_LIMIT_EXCEEDED" ||
				validation.error === "INVENTORY_FULL"
			) {
				notificationType = NOTIFICATION_TYPES.WARNING;
			}

			dispatch(addNotification(validation.message, notificationType));
			return false;
		}

		const { item, moveQuantity } = validation;

		// Create item to move
		const itemToMove = cloneItem(item);
		itemToMove.quantity = moveQuantity;

		// If this is a partial move, create a new ID
		if (moveQuantity < (item.quantity || 1)) {
			itemToMove.id = `${item.id}-moved-${Date.now()}`;
		}

		try {
			// Remove from source
			dispatch(
				fromSliceActions.move({
					fromInventoryId,
					toInventoryId,
					itemId,
					quantity: moveQuantity,
				}),
			);

			// Add to target
			dispatch(
				toSliceActions.add({
					inventoryId: toInventoryId,
					item: itemToMove,
				}),
			);

			return true;
		} catch (error) {
			dispatch(
				addNotification(
					`Failed to move item: ${error.message}`,
					NOTIFICATION_TYPES.ERROR,
				),
			);
			return false;
		}
	};
};

// Thunk for removing item from inventory (handles both types)
export const removeItemFromInventory = (inventoryId, itemId, quantity) => {
	return (dispatch, getState) => {
		const state = getState();

		// Determine which slice to use
		let sliceActions;
		let inventory;

		if (inventoryId === "player" || state.playerInventory[inventoryId]) {
			sliceActions = { remove: removePlayerItem };
			inventory = state.playerInventory[inventoryId];
		} else {
			sliceActions = { remove: removePlaceItem };
			inventory =
				state.placeInventory[inventoryId] ||
				Object.values(state.placeInventory).find(
					(inv) => inv.placeId === inventoryId,
				);
		}

		const validation = validateItemExists(inventory, itemId);
		if (!validation.isValid) {
			dispatch(addNotification(validation.message, NOTIFICATION_TYPES.ERROR));
			return false;
		}

		try {
			// Use the resolved inventory ID (might be different from input for place inventories)
			const resolvedInventoryId = inventory.id || inventoryId;
			dispatch(
				sliceActions.remove({
					inventoryId: resolvedInventoryId,
					itemId,
					quantity: quantity || undefined,
				}),
			);
			return true;
		} catch (error) {
			dispatch(
				addNotification(
					`Failed to remove item: ${error.message}`,
					NOTIFICATION_TYPES.ERROR,
				),
			);
			return false;
		}
	};
};
