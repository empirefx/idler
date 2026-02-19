import {
	validateSlotLimit,
	validateWeightLimit,
	validateItemExists,
	validateMoveQuantity,
	validateEquipmentSlot,
} from "../../store/slices/inventory/inventoryValidators.js";
import {
	canItemsStack,
	cloneItem,
	calculateWeight,
	calculateTotalPlayerWeight,
	getInventorySummary,
} from "../../store/slices/inventory/inventoryUtils.js";
import { EQUIPMENT_SLOTS, TYPE_TO_SLOT } from "../../store/slices/inventory/inventoryTypes.js";

export const InventoryService = {
	getInventory(state, inventoryId) {
		const inventories = state.inventory;
		return inventories?.[inventoryId];
	},

	canAddItem(inventory, item, quantity = 1) {
		if (!inventory) {
			return { valid: false, error: "INVENTORY_NOT_FOUND" };
		}

		const itemWeight = (item.weight || 0) * quantity;
		const needsSlot = !inventory.items?.some((i) => canItemsStack(i, item));

		if (needsSlot) {
			const slotCheck = validateSlotLimit(inventory, 1);
			if (!slotCheck.isValid) {
				return { valid: false, error: slotCheck.error, message: slotCheck.message };
			}
		}

		if (inventory.type === "player") {
			const weightCheck = validateWeightLimit(inventory, itemWeight);
			if (!weightCheck.isValid) {
				return { valid: false, error: weightCheck.error, message: weightCheck.message };
			}
		}

		return { valid: true };
	},

	canRemoveItem(inventory, itemId, quantity = 1) {
		if (!inventory) {
			return { valid: false, error: "INVENTORY_NOT_FOUND" };
		}

		const itemCheck = validateItemExists(inventory, itemId);
		if (!itemCheck.isValid) {
			return { valid: false, error: itemCheck.error, message: itemCheck.message };
		}

		const item = inventory.items[itemCheck.itemIndex];
		const quantityCheck = validateMoveQuantity(item, quantity);

		return quantityCheck;
	},

	canMoveItem(fromInventory, toInventory, itemId, quantity = 1) {
		if (!fromInventory || !toInventory) {
			return { valid: false, error: "INVENTORY_NOT_FOUND" };
		}

		const itemCheck = validateItemExists(fromInventory, itemId);
		if (!itemCheck.isValid) {
			return { valid: false, error: itemCheck.error, message: itemCheck.message };
		}

		const item = fromInventory.items[itemCheck.itemIndex];
		const moveQty = quantity || item.quantity || 1;

		const quantityCheck = validateMoveQuantity(item, moveQty);
		if (!quantityCheck.isValid) {
			return { valid: false, error: quantityCheck.error, message: quantityCheck.message };
		}

		const needsSlot = !toInventory.items?.some((i) => canItemsStack(i, item));
		if (needsSlot) {
			const slotCheck = validateSlotLimit(toInventory, 1);
			if (!slotCheck.isValid) {
				return { valid: false, error: slotCheck.error, message: slotCheck.message };
			}
		}

		if (toInventory.type === "player") {
			const weightCheck = validateWeightLimit(toInventory, item.weight * moveQty);
			if (!weightCheck.isValid) {
				return { valid: false, error: weightCheck.error, message: weightCheck.message };
			}
		}

		return { valid: true, item, itemIndex: itemCheck.itemIndex, moveQuantity: moveQty };
	},

	canEquipItem(inventory, itemId, slot) {
		if (!inventory || inventory.type !== "player") {
			return { valid: false, error: "INVALID_INVENTORY" };
		}

		const itemCheck = validateItemExists(inventory, itemId);
		if (!itemCheck.isValid) {
			return { valid: false, error: itemCheck.error, message: itemCheck.message };
		}

		const item = inventory.items[itemCheck.itemIndex];
		const slotValidation = validateEquipmentSlot(item, slot);

		if (!slotValidation.isValid) {
			return { valid: false, error: slotValidation.error, message: slotValidation.message };
		}

		return { valid: true, item, itemIndex: itemCheck.itemIndex, slot };
	},

	canUnequipItem(inventory, slot) {
		if (!inventory || inventory.type !== "player") {
			return { valid: false, error: "INVALID_INVENTORY" };
		}

		if (!EQUIPMENT_SLOTS.includes(slot)) {
			return { valid: false, error: "INVALID_SLOT" };
		}

		const equippedItem = inventory.equipment?.[slot];
		if (!equippedItem) {
			return { valid: false, error: "NO_EQUIPPED_ITEM" };
		}

		const slotCheck = validateSlotLimit(inventory, 1);
		if (!slotCheck.isValid) {
			return { valid: false, error: slotCheck.error, message: slotCheck.message };
		}

		const weightCheck = validateWeightLimit(inventory, equippedItem.weight);
		if (!weightCheck.isValid) {
			return { valid: false, error: weightCheck.error, message: weightCheck.message };
		}

		return { valid: true, item: equippedItem };
	},

	getSlotForItem(item) {
		return TYPE_TO_SLOT[item.type];
	},

	addItem(inventoryId, item) {
		return {
			type: "inventory/addItem",
			payload: { inventoryId, item },
		};
	},

	removeItem(inventoryId, itemId, quantity) {
		return {
			type: "inventory/removeItem",
			payload: { inventoryId, itemId, quantity },
		};
	},

	moveItem(fromId, toId, itemId, quantity) {
		return {
			type: "inventory/moveItem",
			payload: { fromId, toId, itemId, quantity },
		};
	},

	equipItem(inventoryId, itemId) {
		return {
			type: "inventory/equipItem",
			payload: { inventoryId, itemId, typeToSlot: TYPE_TO_SLOT },
		};
	},

	unequipItem(inventoryId, slot) {
		return {
			type: "inventory/unequipItem",
			payload: { inventoryId, slot },
		};
	},

	mergeInventories(fromInventoryId, toInventoryId) {
		return {
			type: "inventory/mergeInventories",
			payload: { fromInventoryId, toInventoryId },
		};
	},

	updateConfiguration(inventoryId, config) {
		return {
			type: "inventory/updateConfiguration",
			payload: { inventoryId, ...config },
		};
	},

	dispatchAddItem(store, inventoryId, item) {
		const inventory = this.getInventory(store.getState(), inventoryId);
		const check = this.canAddItem(inventory, item, item.quantity || 1);

		if (!check.valid) {
			console.warn(check.message || check.error);
			return null;
		}

		store.dispatch(this.addItem(inventoryId, item));
	},

	dispatchRemoveItem(store, inventoryId, itemId, quantity) {
		const inventory = this.getInventory(store.getState(), inventoryId);
		const check = this.canRemoveItem(inventory, itemId, quantity);

		if (!check.valid) {
			console.warn(check.message || check.error);
			return null;
		}

		store.dispatch(this.removeItem(inventoryId, itemId, quantity));
	},

	dispatchMoveItem(store, fromId, toId, itemId, quantity) {
		const fromInventory = this.getInventory(store.getState(), fromId);
		const toInventory = this.getInventory(store.getState(), toId);
		const check = this.canMoveItem(fromInventory, toInventory, itemId, quantity);

		if (!check.valid) {
			console.warn(check.message || check.error);
			return null;
		}

		store.dispatch(this.moveItem(fromId, toId, itemId, quantity));
	},

	dispatchEquipItem(store, inventoryId, itemId) {
		const inventory = this.getInventory(store.getState(), inventoryId);
		const slot = this.getSlotForItem(inventory?.items?.find((i) => i.id === itemId));

		if (!slot) {
			console.warn("Cannot determine equipment slot for item");
			return null;
		}

		const check = this.canEquipItem(inventory, itemId, slot);

		if (!check.valid) {
			console.warn(check.message || check.error);
			return null;
		}

		store.dispatch(this.equipItem(inventoryId, itemId));
	},

	dispatchUnequipItem(store, inventoryId, slot) {
		const inventory = this.getInventory(store.getState(), inventoryId);
		const check = this.canUnequipItem(inventory, slot);

		if (!check.valid) {
			console.warn(check.message || check.error);
			return null;
		}

		store.dispatch(this.unequipItem(inventoryId, slot));
	},

	addItemToInventory(store, inventoryId, item) {
		const inventory = this.getInventory(store.getState(), inventoryId);
		const check = this.canAddItem(inventory, item, item.quantity || 1);

		if (!check.valid) {
			console.warn(check.message || check.error);
			return false;
		}

		store.dispatch(this.addItem(inventoryId, item));
		return true;
	},

	getInventorySummary(inventory) {
		return getInventorySummary(inventory);
	},
};
