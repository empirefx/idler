// Inventory utility functions

// Check if two items can stack together
export const canItemsStack = (item1, item2) => {
  // Stackable items must have the same type and name
  if (item1.type !== item2.type) return false;
  if (item1.name !== item2.name) return false;

  // Non-stackable items (e.g., armor) only stack if stats are identical
  if (item1.stats && item2.stats) {
    return JSON.stringify(item1.stats) === JSON.stringify(item2.stats);
  }
  return !item1.stats && !item2.stats;
};

// Calculate total weight of items
export const calculateWeight = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => total + item.weight * (item.quantity || 1), 0);
};

// Calculate total carried weight (inventory + equipped items)
export const calculateTotalPlayerWeight = (playerInventory) => {
  if (!playerInventory) return 0;
  
  let total = calculateWeight(playerInventory.items || []);
  
  if (playerInventory.equipment) {
    for (const slot of Object.keys(playerInventory.equipment)) {
      const equipment = playerInventory.equipment[slot];
      if (equipment && equipment.weight) {
        total += equipment.weight;
      }
    }
  }
  
  return total;
};

// Count the number of slots used (each item/stack takes one slot)
export const countSlots = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.length;
};

// Find item in inventory by ID
export const findItemById = (inventory, itemId) => {
  if (!inventory || !Array.isArray(inventory.items)) return null;
  return inventory.items.find(item => item.id === itemId) || null;
};

// Get item index in inventory by ID
export const getItemIndex = (inventory, itemId) => {
  if (!inventory || !Array.isArray(inventory.items)) return -1;
  return inventory.items.findIndex(item => item.id === itemId);
};

// Create a deep copy of an item
export const cloneItem = (item) => {
  return JSON.parse(JSON.stringify(item));
};

// Generate unique ID for items
export const generateItemId = (baseId = null) => {
  return baseId ? `${baseId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` 
                : `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Validate item structure
export const isValidItem = (item) => {
  return item && 
         typeof item === 'object' &&
         typeof item.id !== 'undefined' &&
         typeof item.name === 'string' &&
         typeof item.type === 'string' &&
         typeof item.weight === 'number';
};

// Sort items by name and type
export const sortItems = (items, sortBy = 'name') => {
  if (!Array.isArray(items)) return [];
  
  return [...items].sort((a, b) => {
    switch (sortBy) {
      case 'type':
        if (a.type !== b.type) {
          return a.type.localeCompare(b.type);
        }
        return a.name.localeCompare(b.name);
      case 'weight':
        const weightA = a.weight * (a.quantity || 1);
        const weightB = b.weight * (b.quantity || 1);
        return weightA - weightB;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });
};

// Filter items by type
export const filterItemsByType = (items, itemType) => {
  if (!Array.isArray(items)) return [];
  return items.filter(item => item.type === itemType);
};

// Get total value of items (if items have value property)
export const calculateTotalValue = (items) => {
  if (!Array.isArray(items)) return 0;
  return items.reduce((total, item) => {
    return total + (item.value || 0) * (item.quantity || 1);
  }, 0);
};

// Check if inventory has space for additional items
export const hasSpaceForItems = (inventory, additionalItemCount = 1) => {
  if (!inventory) return false;
  const currentSlots = countSlots(inventory.items || []);
  return currentSlots + additionalItemCount <= inventory.maxSlots;
};

// Check if player can carry additional weight
export const canCarryWeight = (playerInventory, additionalWeight = 0) => {
  if (!playerInventory || playerInventory.type !== 'player') return true;
  const currentWeight = calculateTotalPlayerWeight(playerInventory);
  return currentWeight + additionalWeight <= playerInventory.maxWeight;
};

// Get inventory summary information
export const getInventorySummary = (inventory) => {
  if (!inventory) return null;
  
  const items = inventory.items || [];
  const slotsUsed = countSlots(items);
  const totalWeight = calculateWeight(items);
  const totalValue = calculateTotalValue(items);
  
  const summary = {
    slotsUsed,
    slotsAvailable: inventory.maxSlots - slotsUsed,
    totalWeight,
    totalValue,
    itemCount: items.length,
    stackCount: items.filter(item => item.quantity > 1).length
  };
  
  // Add equipment weight for player inventories
  if (inventory.type === 'player' && inventory.equipment) {
    const equipmentWeight = Object.values(inventory.equipment)
      .filter(equipment => equipment && equipment.weight)
      .reduce((total, equipment) => total + equipment.weight, 0);
    
    summary.totalWeightWithEquipment = totalWeight + equipmentWeight;
    summary.equipmentWeight = equipmentWeight;
  }
  
  return summary;
};