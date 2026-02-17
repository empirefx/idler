// Inventory constants and types
export const EQUIPMENT_SLOTS = [
	"head",
	"body",
	"pants",
	"boots",
	"hands",
	"main-weapon",
	"second-weapon",
];

// Inventory types
export const INVENTORY_TYPES = {
	PLAYER: "player",
	PLACE: "place",
};

// Item types
export const ITEM_TYPES = {
	CONSUMABLE: "consumable",
	EQUIPMENT: "equipment",
	MATERIAL: "material",
	WEAPON: "weapon",
};

// Equipment piece types
export const EQUIPMENT_PIECES = {
	HEAD: "head",
	BODY: "body",
	PANTS: "pants",
	BOOTS: "boots",
	HANDS: "hands",
	MAIN_WEAPON: "main-weapon",
	SECOND_WEAPON: "second-weapon",
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
