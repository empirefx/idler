export const canItemsStack = (item1, item2) => {
	const stackableTypes = ["consumable", "material"];
	if (
		!stackableTypes.includes(item1.type) ||
		!stackableTypes.includes(item2.type)
	) {
		return false;
	}

	if (item1.type !== item2.type) return false;
	if (item1.name !== item2.name) return false;

	if (item1.stats && item2.stats) {
		return JSON.stringify(item1.stats) === JSON.stringify(item2.stats);
	}
	return !item1.stats && !item2.stats;
};

export const calculateWeight = (items) => {
	if (!Array.isArray(items)) return 0;
	return items.reduce(
		(total, item) => total + item.weight * (item.quantity || 1),
		0,
	);
};

export const calculateTotalPlayerWeight = (playerInventory) => {
	if (!playerInventory) return 0;

	let total = calculateWeight(playerInventory.items || []);

	if (playerInventory.equipment) {
		for (const slot of Object.keys(playerInventory.equipment)) {
			const equipment = playerInventory.equipment[slot];
			if (equipment?.weight) {
				total += equipment.weight;
			}
		}
	}

	return total;
};

export const countSlots = (items) => {
	if (!Array.isArray(items)) return 0;
	return items.length;
};

export const findItemById = (inventory, itemId) => {
	if (!inventory || !Array.isArray(inventory.items)) return null;
	return inventory.items.find((item) => item.id === itemId) || null;
};

export const getItemIndex = (inventory, itemId) => {
	if (!inventory || !Array.isArray(inventory.items)) return -1;
	return inventory.items.findIndex((item) => item.id === itemId);
};

export const cloneItem = (item) => {
	return JSON.parse(JSON.stringify(item));
};

export const getInventorySummary = (inventory) => {
	if (!inventory) return null;

	const items = inventory.items || [];
	const slotsUsed = countSlots(items);
	const totalWeight = calculateWeight(items);

	const summary = {
		slotsUsed,
		slotsAvailable: inventory.maxSlots - slotsUsed,
		totalWeight,
		itemCount: items.length,
		stackCount: items.filter((item) => item.quantity > 1).length,
	};

	if (inventory.type === "player" && inventory.equipment) {
		const equipmentWeight = Object.values(inventory.equipment)
			.filter((equipment) => equipment?.weight)
			.reduce((total, equipment) => total + equipment.weight, 0);

		summary.totalWeightWithEquipment = totalWeight + equipmentWeight;
		summary.equipmentWeight = equipmentWeight;
	}

	return summary;
};
