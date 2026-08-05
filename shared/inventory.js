import { INVENTORY_ERRORS, TYPE_TO_SLOT } from "./constants.js";
import { itemCatalog } from "./data/itemCatalog.js";

export function materializeItem(item) {
	if (!item || !item.icon) return item;
	const catalogItem = itemCatalog[item.icon];
	if (!catalogItem) return item;
	return { ...catalogItem, ...item };
}

export function validateSlotLimit(inventory, newSlots) {
	const currentSlots = inventory.items.length;
	if (currentSlots + newSlots > inventory.maxSlots) {
		return { isValid: false, error: INVENTORY_ERRORS.INVENTORY_FULL };
	}
	return { isValid: true };
}

export function validateWeightLimit(inventory, additionalWeight) {
	if (inventory.type !== "player") {
		return { isValid: true };
	}
	const currentWeight = calculateWeight(inventory.items);
	if (currentWeight + additionalWeight > inventory.maxWeight) {
		return { isValid: false, error: INVENTORY_ERRORS.WEIGHT_LIMIT_EXCEEDED };
	}
	return { isValid: true };
}

export function validateMoveQuantity(item, requestedQty) {
	if (requestedQty > item.quantity) {
		return { isValid: false, error: INVENTORY_ERRORS.INVALID_QUANTITY };
	}
	return { isValid: true };
}

export function validateItemExists(inventory, itemId) {
	const index = inventory.items.findIndex((i) => i.id === itemId);
	if (index === -1) {
		return { isValid: false, error: INVENTORY_ERRORS.ITEM_NOT_FOUND };
	}
	return { isValid: true, itemIndex: index };
}

export function validateEquipmentSlot(item, slotKey) {
	if (!TYPE_TO_SLOT[item.type]) {
		return { isValid: false, error: INVENTORY_ERRORS.INVALID_ITEM_TYPE };
	}
	if (TYPE_TO_SLOT[item.type] !== slotKey) {
		return { isValid: false, error: INVENTORY_ERRORS.EQUIPMENT_SLOT_INVALID };
	}
	return { isValid: true };
}

export function canItemsStack(a, b) {
	if (a.type !== b.type) return false;
	if (a.name !== b.name) return false;
	return JSON.stringify(a.stats ?? null) === JSON.stringify(b.stats ?? null);
}

export function calculateWeight(items) {
	return items.reduce((sum, item) => sum + item.weight * item.quantity, 0);
}

export function countSlots(items) {
	return items.length;
}

export function cloneItem(item) {
	return JSON.parse(JSON.stringify(item));
}

const STACKABLE_TYPES = ["consumable", "material"];

export function applyAddItem(inventory, item) {
	const existing = STACKABLE_TYPES.includes(item.type) ? inventory.items.find(
		(i) =>
			i.id === item.id ||
			(i.name === item.name && i.type === item.type && JSON.stringify(i.stats ?? null) === JSON.stringify(item.stats ?? null)),
	) : null;
	if (existing) {
		existing.quantity += item.quantity;
	} else {
		inventory.items.push(item);
	}
}

export function applyRemoveItem(inventory, itemId, quantity) {
	const idx = inventory.items.findIndex((i) => i.id === itemId);
	if (idx === -1) return;
	const item = inventory.items[idx];
	item.quantity -= quantity;
	if (item.quantity <= 0) {
		inventory.items.splice(idx, 1);
	}
}

export function applyMoveItem(fromInventory, toInventory, itemId, quantity) {
	const idx = fromInventory.items.findIndex((i) => i.id === itemId);
	if (idx === -1) return;
	const fromItem = fromInventory.items[idx];
	const movedItem = cloneItem({ ...fromItem, quantity });
	applyRemoveItem(fromInventory, itemId, quantity);
	applyAddItem(toInventory, movedItem);
}

export function canAddItems(inventory, newItems) {
	const candidate = cloneItem(inventory);
	for (const newItem of newItems) {
		const slotsBefore = candidate.items.length;
		applyAddItem(candidate, newItem);
		const slotDelta = candidate.items.length - slotsBefore;
		if (slotDelta > 0 && candidate.items.length > candidate.maxSlots) {
			return { isValid: false, error: INVENTORY_ERRORS.INVENTORY_FULL };
		}
		const weightCheck = validateWeightLimit(candidate, 0);
		if (!weightCheck.isValid) return weightCheck;
	}
	return { isValid: true };
}

export function applyEquipItem(inventory, itemId, typeToSlot) {
	const idx = inventory.items.findIndex((i) => i.id === itemId);
	if (idx === -1) return;
	const item = inventory.items[idx];
	const slot = typeToSlot[item.type];
	if (!slot) return;
	inventory.equipment[slot] = item;
	inventory.items.splice(idx, 1);
}

export function applyUnequipItem(inventory, slotKey) {
	const item = inventory.equipment[slotKey];
	if (!item) return;
	inventory.equipment[slotKey] = null;
	inventory.items.push(item);
}
