import {
	INVENTORY_ERRORS,
	INVENTORY_TYPES,
	EQUIPMENT_SLOTS,
	TYPE_TO_SLOT,
} from "./inventoryTypes.js";
import { calculateWeight, countSlots } from "./inventoryUtils.js";

export const validateSlotLimit = (inventory, additionalItemCount = 0) => {
	if (!inventory)
		return { isValid: false, error: INVENTORY_ERRORS.ITEM_NOT_FOUND };

	const currentSlots = countSlots(inventory.items || []);
	const requiredSlots = additionalItemCount;

	if (currentSlots + requiredSlots > inventory.maxSlots) {
		return {
			isValid: false,
			error: INVENTORY_ERRORS.INVENTORY_FULL,
			message: `Inventory ${inventory.id} is full (${inventory.maxSlots} slots)`,
		};
	}

	return { isValid: true };
};

export const validateWeightLimit = (inventory, additionalWeight = 0) => {
	if (!inventory)
		return { isValid: false, error: INVENTORY_ERRORS.ITEM_NOT_FOUND };
	if (inventory.type !== INVENTORY_TYPES.PLAYER) return { isValid: true };

	const currentWeight = calculateWeight(inventory.items || []);

	if (currentWeight + additionalWeight > inventory.maxWeight) {
		return {
			isValid: false,
			error: INVENTORY_ERRORS.WEIGHT_LIMIT_EXCEEDED,
			message: `Player ${inventory.id} cannot carry more weight`,
		};
	}

	return { isValid: true };
};

export const validateMoveQuantity = (item, quantity) => {
	if (!item) return { isValid: false, error: INVENTORY_ERRORS.ITEM_NOT_FOUND };

	const availableQuantity = item.quantity || 1;
	const moveQuantity = quantity || availableQuantity;

	if (moveQuantity > availableQuantity) {
		return {
			isValid: false,
			error: INVENTORY_ERRORS.INVALID_QUANTITY,
			message: `Cannot move ${moveQuantity} of item ${item.id}, only ${availableQuantity} available`,
		};
	}

	if (moveQuantity <= 0) {
		return {
			isValid: false,
			error: INVENTORY_ERRORS.INVALID_QUANTITY,
			message: `Quantity must be greater than 0`,
		};
	}

	return { isValid: true };
};

export const validateItemExists = (inventory, itemId) => {
	if (!inventory)
		return { isValid: false, error: INVENTORY_ERRORS.ITEM_NOT_FOUND };

	const itemIndex = inventory.items.findIndex((item) => item.id === itemId);
	if (itemIndex === -1) {
		return {
			isValid: false,
			error: INVENTORY_ERRORS.ITEM_NOT_FOUND,
			message: `Item ${itemId} not found in inventory ${inventory.id}`,
		};
	}

	return { isValid: true, itemIndex };
};

export const validateEquipmentSlot = (item, slot) => {
	const equipableTypes = Object.keys(TYPE_TO_SLOT);
	if (!item || !equipableTypes.includes(item.type)) {
		return {
			isValid: false,
			error: INVENTORY_ERRORS.INVALID_ITEM_TYPE,
			message: "Only equipment items can be equipped",
		};
	}

	const expectedSlot = TYPE_TO_SLOT[item.type] || item.piece;

	if (!EQUIPMENT_SLOTS.includes(slot)) {
		return {
			isValid: false,
			error: INVENTORY_ERRORS.EQUIPMENT_SLOT_INVALID,
			message: `Invalid equipment slot: ${slot}`,
		};
	}

	if (expectedSlot && slot !== expectedSlot) {
		return {
			isValid: false,
			error: INVENTORY_ERRORS.EQUIPMENT_SLOT_INVALID,
			message: `Item ${item.id} belongs to slot ${expectedSlot}, not ${slot}`,
		};
	}

	return { isValid: true };
};
