import { INVENTORY_ERRORS, TYPE_TO_SLOT } from "../shared/constants.js";
import {
	validateSlotLimit,
	validateWeightLimit,
	validateMoveQuantity,
	validateItemExists,
	validateEquipmentSlot,
	applyAddItem,
	applyRemoveItem,
	applyMoveItem,
	applyEquipItem,
	applyUnequipItem,
} from "../shared/inventory.js";

function ensureObject(raw) {
	if (typeof raw === "string") {
		try { return JSON.parse(raw); } catch { return null; }
	}
	return raw;
}

export class InventoryHandler {
	constructor(redis, logger) {
		this.redis = redis;
		this.logger = logger;
	}

	_invKey(sessionId) {
		return `player:${sessionId}:inventory`;
	}

	_getAffectedInventories(action) {
		const ids = [action.inventory_id];
		if (action.action_type === "MOVE" && action.to_inventory_id) {
			ids.push(action.to_inventory_id);
		}
		return ids;
	}

	async _saveAll(invKey, inventories) {
		for (const [field, value] of Object.entries(inventories)) {
			await this.redis.hset(invKey, field, JSON.stringify(value));
		}
	}

	async handleAction(sessionId, action) {
		const invKey = this._invKey(sessionId);
		const affectedIds = this._getAffectedInventories(action);

		const inventories = {};
		for (const id of affectedIds) {
			const raw = await this.redis.hget(invKey, id);
			if (!raw) {
				return { success: false, error: INVENTORY_ERRORS.SESSION_NOT_FOUND };
			}
			inventories[id] = ensureObject(raw);
		}

		switch (action.action_type) {
			case "ADD":
				return this._handleAdd(inventories, action, invKey);
			case "REMOVE":
				return this._handleRemove(inventories, action, invKey);
			case "MOVE":
				return this._handleMove(inventories, action, invKey);
			case "EQUIP":
				return this._handleEquip(inventories, action, invKey);
			case "UNEQUIP":
				return this._handleUnequip(inventories, action, invKey);
			default:
				return { success: false, error: INVENTORY_ERRORS.INVALID_ACTION };
		}
	}

	async _handleAdd(inventories, action, invKey) {
		const inv = inventories[action.inventory_id];
		const item = action.item;

		const slotCheck = validateSlotLimit(inv, 1);
		if (!slotCheck.isValid) return { success: false, error: slotCheck.error };

		const weightCheck = validateWeightLimit(inv, item.weight * item.quantity);
		if (!weightCheck.isValid) return { success: false, error: weightCheck.error };

		applyAddItem(inv, item);
		await this._saveAll(invKey, inventories);
		return { success: true, diff: { action: action.action_type } };
	}

	async _handleRemove(inventories, action, invKey) {
		const inv = inventories[action.inventory_id];

		const itemCheck = validateItemExists(inv, action.item_id);
		if (!itemCheck.isValid) return { success: false, error: itemCheck.error };

		const qtyCheck = validateMoveQuantity(inv.items[itemCheck.itemIndex], action.quantity);
		if (!qtyCheck.isValid) return { success: false, error: qtyCheck.error };

		applyRemoveItem(inv, action.item_id, action.quantity);
		await this._saveAll(invKey, inventories);
		return { success: true, diff: { action: action.action_type } };
	}

	async _handleMove(inventories, action, invKey) {
		const fromInv = inventories[action.inventory_id];
		const toInv = inventories[action.to_inventory_id];

		const itemCheck = validateItemExists(fromInv, action.item_id);
		if (!itemCheck.isValid) return { success: false, error: itemCheck.error };

		const fromItem = fromInv.items[itemCheck.itemIndex];
		const qtyCheck = validateMoveQuantity(fromItem, action.quantity);
		if (!qtyCheck.isValid) return { success: false, error: qtyCheck.error };

		const slotCheck = validateSlotLimit(toInv, 1);
		if (!slotCheck.isValid) return { success: false, error: slotCheck.error };

		const weightCheck = validateWeightLimit(toInv, fromItem.weight * action.quantity);
		if (!weightCheck.isValid) return { success: false, error: weightCheck.error };

		applyMoveItem(fromInv, toInv, action.item_id, action.quantity);
		await this._saveAll(invKey, inventories);
		return { success: true, diff: { action: action.action_type } };
	}

	async _handleEquip(inventories, action, invKey) {
		const inv = inventories[action.inventory_id];

		const itemCheck = validateItemExists(inv, action.item_id);
		if (!itemCheck.isValid) return { success: false, error: itemCheck.error };

		const item = inv.items[itemCheck.itemIndex];
		const equipCheck = validateEquipmentSlot(item, TYPE_TO_SLOT[item.type]);
		if (!equipCheck.isValid) return { success: false, error: equipCheck.error };

		const slot = TYPE_TO_SLOT[item.type];
		if (inv.equipment[slot]) {
			return { success: false, error: INVENTORY_ERRORS.EQUIPMENT_SLOT_OCCUPIED };
		}

		applyEquipItem(inv, action.item_id, TYPE_TO_SLOT);
		await this._saveAll(invKey, inventories);
		return { success: true, diff: { action: action.action_type } };
	}

	async _handleUnequip(inventories, action, invKey) {
		const inv = inventories[action.inventory_id];

		if (!inv.equipment[action.slot]) {
			return { success: false, error: INVENTORY_ERRORS.ITEM_NOT_FOUND };
		}

		const slotCheck = validateSlotLimit(inv, 1);
		if (!slotCheck.isValid) return { success: false, error: slotCheck.error };

		applyUnequipItem(inv, action.slot);
		await this._saveAll(invKey, inventories);
		return { success: true, diff: { action: action.action_type } };
	}
}
