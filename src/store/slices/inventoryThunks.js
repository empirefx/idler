import {
	moveItem,
	addItem,
	removeItem,
} from "./inventorySlice.js";
import {
	validateItemExists,
	validateMoveQuantity,
	validateSlotLimit,
	validateWeightLimit,
} from "./inventory/inventoryValidators.js";
import { canItemsStack, cloneItem } from "./inventory/inventoryUtils.js";
import { addNotification } from "./notificationSlice.js";
import { NOTIFICATION_TYPES } from "./notificationSlice.js";
import { INVENTORY_TYPES } from "./inventory/inventoryTypes.js";

const validateMove = (fromInventory, toInventory, itemId, quantity) => {
	if (!fromInventory || !toInventory) {
		return { isValid: false, error: "INVENTORY_NOT_FOUND", message: "Source or target inventory not found" };
	}

	const itemCheck = validateItemExists(fromInventory, itemId);
	if (!itemCheck.isValid) {
		return itemCheck;
	}

	const item = fromInventory.items[itemCheck.itemIndex];
	const moveQty = quantity || item.quantity || 1;

	const quantityCheck = validateMoveQuantity(item, moveQty);
	if (!quantityCheck.isValid) {
		return quantityCheck;
	}

	const needsSlot = !toInventory.items?.some((i) => canItemsStack(i, item));
	if (needsSlot) {
		const slotCheck = validateSlotLimit(toInventory, 1);
		if (!slotCheck.isValid) {
			return slotCheck;
		}
	}

	if (toInventory.type === INVENTORY_TYPES.PLAYER) {
		const weightCheck = validateWeightLimit(toInventory, item.weight * moveQty);
		if (!weightCheck.isValid) {
			return weightCheck;
		}
	}

	return { isValid: true, item, itemIndex: itemCheck.itemIndex, moveQuantity: moveQty };
};

export const moveItemBetweenInventories = (
	fromInventoryId,
	toInventoryId,
	itemId,
	quantity,
) => {
	return (dispatch, getState) => {
		const state = getState();
		const fromInventory = state.inventory[fromInventoryId];
		const toInventory = state.inventory[toInventoryId];

		if (!fromInventory || !toInventory) {
			dispatch(
				addNotification(
					"Source or target inventory not found",
					NOTIFICATION_TYPES.ERROR,
				),
			);
			return false;
		}

		const validation = validateMove(
			fromInventory,
			toInventory,
			itemId,
			quantity,
		);
		if (!validation.isValid) {
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

		try {
			dispatch(
				moveItem({
					fromId: fromInventoryId,
					toId: toInventoryId,
					itemId,
					quantity: moveQuantity,
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

export const removeItemFromInventory = (inventoryId, itemId, quantity) => {
	return (dispatch, getState) => {
		const state = getState();
		const inventory = state.inventory[inventoryId];

		if (!inventory) {
			dispatch(addNotification("Inventory not found", NOTIFICATION_TYPES.ERROR));
			return false;
		}

		const validation = validateItemExists(inventory, itemId);
		if (!validation.isValid) {
			dispatch(addNotification(validation.message, NOTIFICATION_TYPES.ERROR));
			return false;
		}

		try {
			dispatch(
				removeItem({
					inventoryId,
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
