import {
  INVENTORY_ERRORS,
  INVENTORY_TYPES,
  EQUIPMENT_SLOTS,
} from "./inventoryTypes.js";
import {
  calculateWeight,
  countSlots,
  canItemsStack,
} from "./inventoryUtils.js";

// Validation functions for inventory operations

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
  if (inventory.type !== INVENTORY_TYPES.PLAYER) return { isValid: true }; // Only player inventories have weight limits

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
  if (!item || item.type !== "equipment") {
    return {
      isValid: false,
      error: INVENTORY_ERRORS.INVALID_ITEM_TYPE,
      message: "Only equipment items can be equipped",
    };
  }

  if (!item.piece) {
    return {
      isValid: false,
      error: INVENTORY_ERRORS.INVALID_ITEM_TYPE,
      message: "Equipment item must specify a piece",
    };
  }

  if (!EQUIPMENT_SLOTS.includes(slot)) {
    return {
      isValid: false,
      error: INVENTORY_ERRORS.EQUIPMENT_SLOT_INVALID,
      message: `Invalid equipment slot: ${slot}`,
    };
  }

  if (item.piece !== slot) {
    return {
      isValid: false,
      error: INVENTORY_ERRORS.EQUIPMENT_SLOT_INVALID,
      message: `Item ${item.id} belongs to slot ${item.piece}, not ${slot}`,
    };
  }

  return { isValid: true };
};

export const validateInventoryExists = (state, inventoryId) => {
  const inventory = state[inventoryId];
  if (!inventory) {
    return {
      isValid: false,
      error: INVENTORY_ERRORS.ITEM_NOT_FOUND,
      message: `Inventory ${inventoryId} not found`,
    };
  }
  return { isValid: true, inventory };
};

export const validateItemMove = (
  fromInventory,
  toInventory,
  itemId,
  quantity,
) => {
  // Validate inventories exist
  if (!fromInventory || !toInventory) {
    return {
      isValid: false,
      error: INVENTORY_ERRORS.ITEM_NOT_FOUND,
      message: "Source or target inventory not found",
    };
  }

  // Find item in source inventory
  const itemIndex = fromInventory.items.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) {
    return {
      isValid: false,
      error: INVENTORY_ERRORS.ITEM_NOT_FOUND,
      message: `Item ${itemId} not found in source inventory`,
    };
  }

  const item = fromInventory.items[itemIndex];
  const moveQuantity = quantity || item.quantity || 1;

  // Validate move quantity
  const quantityValidation = validateMoveQuantity(item, moveQuantity);
  if (!quantityValidation.isValid) {
    return quantityValidation;
  }

  // Check if target inventory can accept the item
  const itemWeight = item.weight * moveQuantity;
  const willNeedNewSlot = !toInventory.items.some((existingItem) =>
    canItemsStack(existingItem, item),
  );

  // Validate slot limit
  if (willNeedNewSlot) {
    const slotValidation = validateSlotLimit(toInventory, 1);
    if (!slotValidation.isValid) {
      return {
        isValid: false,
        error: INVENTORY_ERRORS.INVENTORY_FULL,
        message: `Target inventory ${toInventory.id} is full (${toInventory.maxSlots} slots)`,
      };
    }
  }

  // Validate weight limit for player inventories
  const weightValidation = validateWeightLimit(toInventory, itemWeight);
  if (!weightValidation.isValid) {
    return weightValidation;
  }

  return { isValid: true, item, itemIndex, moveQuantity };
};
