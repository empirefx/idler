// Map item type to equipment slot
export const TYPE_TO_SLOT = {
	head: "head",
	body: "body",
	pants: "pants",
	boots: "boots",
	hands: "hands",
	"main-weapon": "main-weapon",
	"second-weapon": "second-weapon"
};

// Inventory slots (keys of TYPE_TO_SLOT)
export const EQUIPMENT_SLOTS = Object.keys(TYPE_TO_SLOT);

// Inventory types
export const INVENTORY_TYPES = {
	PLAYER: "player",
	PLACE: "place",
	NPC: "npc",
};

// Item types
export const ITEM_TYPES = {
	CONSUMABLE: "consumable",
	EQUIPMENT: "equipment",
	MATERIAL: "material",
	WEAPON: "weapon",
};

// Error types
export const INVENTORY_ERRORS = {
	INVENTORY_FULL: "INVENTORY_FULL",
	WEIGHT_LIMIT_EXCEEDED: "WEIGHT_LIMIT_EXCEEDED",
	ITEM_NOT_FOUND: "ITEM_NOT_FOUND",
	INVALID_QUANTITY: "INVALID_QUANTITY",
	INVALID_ITEM_TYPE: "INVALID_ITEM_TYPE",
	EQUIPMENT_SLOT_INVALID: "EQUIPMENT_SLOT_INVALID",
	EQUIPMENT_SLOT_OCCUPIED: "EQUIPMENT_SLOT_OCCUPIED",
};

// Inventory configuration defaults
export const DEFAULT_CONFIG = {
	PLAYER_MAX_SLOTS: 20,
	PLAYER_MAX_WEIGHT: 100,
	PLACE_MAX_SLOTS: 30,
};
