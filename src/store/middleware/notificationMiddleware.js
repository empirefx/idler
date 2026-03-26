import { INVENTORY_ERRORS } from "../../store/slices/inventory/inventoryTypes.js";
import { addNotification } from "../../store/slices/notificationSlice.js";
import { NOTIFICATION_TYPES } from "../../store/slices/notificationSlice.js";
import { calculateTotalPlayerWeight } from "../slices/inventory/inventoryUtils.js";

const notificationMiddleware = (store) => (next) => (action) => {
	// Handle addItem for player inventory - check capacity BEFORE adding
	if (action.type === "inventory/addItem" && action.payload?.inventoryId === "player") {
		const state = store.getState();
		const playerInventory = state.inventory.player;
		const item = action.payload?.item;
		const itemWeight = (item?.weight || 0) * (item?.quantity || 1);

		// Check inventory slots
		if (playerInventory && playerInventory.items.length >= playerInventory.maxSlots) {
			const itemName = item?.name || "item";
			const message = `Inventory full! Lost "${itemName}"`;
			store.dispatch(addNotification(message, NOTIFICATION_TYPES.WARNING));
			return; // Don't call next(action) - item not added
		}

		// Check weight limit
		if (playerInventory?.maxWeight) {
			const currentWeight = calculateTotalPlayerWeight(playerInventory);
			if (currentWeight + itemWeight > playerInventory.maxWeight) {
				const itemName = item?.name || "item";
				const message = `Too heavy! Lost "${itemName}"`;
				store.dispatch(addNotification(message, NOTIFICATION_TYPES.WARNING));
				return; // Don't call next(action) - item not added
			}
		}
	}

	const result = next(action);

	// Handle failed inventory actions by checking for error types
	if (action.type?.includes("moveItem") && action.error) {
		const error = action.error;
		let message = "";
		let type = NOTIFICATION_TYPES.ERROR;

		switch (error) {
			case INVENTORY_ERRORS.WEIGHT_LIMIT_EXCEEDED:
				message = "Cannot carry more weight - inventory overweight!";
				type = NOTIFICATION_TYPES.WARNING;
				break;
			case INVENTORY_ERRORS.INVENTORY_FULL:
				message = "Inventory is full - no more slots available!";
				type = NOTIFICATION_TYPES.WARNING;
				break;
			case INVENTORY_ERRORS.ITEM_NOT_FOUND:
				message = "Item not found in inventory";
				break;
			case INVENTORY_ERRORS.INVALID_QUANTITY:
				message = error.message || "Invalid item quantity";
				break;
			default:
				message = error.message || "Inventory operation failed";
		}

		if (message) {
			store.dispatch(addNotification(message, type));
		}
	}

	return result;
};

export default notificationMiddleware;
