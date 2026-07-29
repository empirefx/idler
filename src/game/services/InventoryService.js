const EQUIPMENT_SLOTS = [
  "head", "body", "pants", "boots", "hands",
  "main-weapon", "second-weapon",
];

const TYPE_TO_SLOT = {
  "body": "body",
  "head": "head",
  "pants": "pants",
  "boots": "boots",
  "hands": "hands",
  "main-weapon": "main-weapon",
  "second-weapon": "second-weapon",
};

const canItemsStack = (a, b) =>
  a.type === b.type &&
  a.name === b.name &&
  !a.stats && !b.stats;

const getInventorySummary = (inventory) => {
  if (!inventory) return null;
  return {
    itemCount: inventory.items?.length || 0,
    slotsUsed: inventory.items?.length || 0,
    maxSlots: inventory.maxSlots,
  };
};

const validateItemExists = (inventory, itemId) => {
  if (!inventory) return { isValid: false, error: "ITEM_NOT_FOUND" };
  const index = inventory.items?.findIndex((i) => i.id === itemId) ?? -1;
  if (index === -1) return { isValid: false, error: "ITEM_NOT_FOUND" };
  return { isValid: true, itemIndex: index };
};

const validateSlotLimit = (inventory, _needed) => {
  if (!inventory) return { isValid: false, error: "ITEM_NOT_FOUND" };
  return { isValid: true };
};

const validateWeightLimit = (_inventory, _weight) => {
  return { isValid: true };
};

const validateMoveQuantity = (item, quantity) => {
  if (!item) return { isValid: false, error: "ITEM_NOT_FOUND" };
  const qty = quantity || item.quantity || 1;
  const available = item.quantity || 1;
  if (qty > available) return { isValid: false, error: "INSUFFICIENT_QUANTITY" };
  return { isValid: true, moveQuantity: qty };
};

const validateEquipmentSlot = (item, slot) => {
  if (!item || !item.type) return { isValid: false, error: "INVALID_ITEM_TYPE" };
  if (!EQUIPMENT_SLOTS.includes(slot)) return { isValid: false, error: "EQUIPMENT_SLOT_INVALID" };
  return { isValid: true };
};

export const InventoryService = {
	getInventory(state, inventoryId) {
		const inventories = state.inventory;
		return inventories?.[inventoryId];
	},

	_findItem(inventory, itemId) {
		if (!inventory) {
			return { valid: false, error: "INVENTORY_NOT_FOUND" };
		}
		const itemCheck = validateItemExists(inventory, itemId);
		if (!itemCheck.isValid) {
			return {
				valid: false,
				error: itemCheck.error,
				message: itemCheck.message,
			};
		}
		return {
			valid: true,
			item: inventory.items[itemCheck.itemIndex],
			itemIndex: itemCheck.itemIndex,
		};
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
				return {
					valid: false,
					error: slotCheck.error,
					message: slotCheck.message,
				};
			}
		}

		if (inventory.type === "player") {
			const weightCheck = validateWeightLimit(inventory, itemWeight);
			if (!weightCheck.isValid) {
				return {
					valid: false,
					error: weightCheck.error,
					message: weightCheck.message,
				};
			}
		}

		return { valid: true };
	},

	canRemoveItem(inventory, itemId, quantity = 1) {
		const found = this._findItem(inventory, itemId);
		if (!found.valid) return found;

		const quantityCheck = validateMoveQuantity(found.item, quantity);
		return quantityCheck;
	},

	canMoveItem(fromInventory, toInventory, itemId, quantity = 1) {
		if (!fromInventory || !toInventory) {
			return { valid: false, error: "INVENTORY_NOT_FOUND" };
		}

		const itemCheck = validateItemExists(fromInventory, itemId);
		if (!itemCheck.isValid) {
			return {
				valid: false,
				error: itemCheck.error,
				message: itemCheck.message,
			};
		}

		const item = fromInventory.items[itemCheck.itemIndex];
		const moveQty = quantity || item.quantity || 1;

		const quantityCheck = validateMoveQuantity(item, moveQty);
		if (!quantityCheck.isValid) {
			return {
				valid: false,
				error: quantityCheck.error,
				message: quantityCheck.message,
			};
		}

		const needsSlot = !toInventory.items?.some((i) => canItemsStack(i, item));
		if (needsSlot) {
			const slotCheck = validateSlotLimit(toInventory, 1);
			if (!slotCheck.isValid) {
				return {
					valid: false,
					error: slotCheck.error,
					message: slotCheck.message,
				};
			}
		}

		if (toInventory.type === "player") {
			const weightCheck = validateWeightLimit(
				toInventory,
				item.weight * moveQty,
			);
			if (!weightCheck.isValid) {
				return {
					valid: false,
					error: weightCheck.error,
					message: weightCheck.message,
				};
			}
		}

		return {
			valid: true,
			item,
			itemIndex: itemCheck.itemIndex,
			moveQuantity: moveQty,
		};
	},

	canEquipItem(inventory, itemId, slot) {
		if (inventory?.type !== "player") {
			return { valid: false, error: "INVALID_INVENTORY" };
		}

		const found = this._findItem(inventory, itemId);
		if (!found.valid) return found;

		const slotValidation = validateEquipmentSlot(found.item, slot);

		if (!slotValidation.isValid) {
			return {
				valid: false,
				error: slotValidation.error,
				message: slotValidation.message,
			};
		}

		return { valid: true, item: found.item, itemIndex: found.itemIndex, slot };
	},

	canUnequipItem(inventory, slot) {
		if (inventory?.type !== "player") {
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
			return {
				valid: false,
				error: slotCheck.error,
				message: slotCheck.message,
			};
		}

		const weightCheck = validateWeightLimit(inventory, equippedItem.weight);
		if (!weightCheck.isValid) {
			return {
				valid: false,
				error: weightCheck.error,
				message: weightCheck.message,
			};
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
		this._sendAction("ADD", { inventory_id: inventoryId, item });
	},

	dispatchRemoveItem(store, inventoryId, itemId, quantity) {
		const inventory = this.getInventory(store.getState(), inventoryId);
		const check = this.canRemoveItem(inventory, itemId, quantity);

		if (!check.valid) {
			console.warn(check.message || check.error);
			return null;
		}

		store.dispatch(this.removeItem(inventoryId, itemId, quantity));
		this._sendAction("REMOVE", { inventory_id: inventoryId, item_id: itemId, quantity });
	},

	dispatchMoveItem(store, fromId, toId, itemId, quantity) {
		const fromInventory = this.getInventory(store.getState(), fromId);
		const toInventory = this.getInventory(store.getState(), toId);
		const check = this.canMoveItem(
			fromInventory,
			toInventory,
			itemId,
			quantity,
		);

		if (!check.valid) {
			console.warn(check.message || check.error);
			return null;
		}

		store.dispatch(this.moveItem(fromId, toId, itemId, quantity));
		this._sendAction("MOVE", { from_id: fromId, to_id: toId, item_id: itemId, quantity });
	},

	dispatchEquipItem(store, inventoryId, itemId) {
		const inventory = this.getInventory(store.getState(), inventoryId);
		const slot = this.getSlotForItem(
			inventory?.items?.find((i) => i.id === itemId),
		);

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
		this._sendAction("EQUIP", { inventory_id: inventoryId, item_id: itemId });
	},

	dispatchUnequipItem(store, inventoryId, slot) {
		const inventory = this.getInventory(store.getState(), inventoryId);
		const check = this.canUnequipItem(inventory, slot);

		if (!check.valid) {
			console.warn(check.message || check.error);
			return null;
		}

		store.dispatch(this.unequipItem(inventoryId, slot));
		this._sendAction("UNEQUIP", { inventory_id: inventoryId, slot });
	},

	addItemToInventory(store, inventoryId, item) {
		const result = this.dispatchAddItem(store, inventoryId, item);
		return result !== null;
	},

	setWSClient(wsClient) {
		this._wsClient = wsClient;
	},

	_sendAction(actionType, payload) {
		if (!this._wsClient) return;
		this._wsClient.sendAction({ action_type: actionType, ...payload });
	},

	getInventorySummary(inventory) {
		return getInventorySummary(inventory);
	},
};
