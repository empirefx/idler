export const TYPE_TO_SLOT = {
	head: "head",
	body: "body",
	pants: "pants",
	boots: "boots",
	hands: "hands",
	"main-weapon": "main-weapon",
	"second-weapon": "second-weapon",
};

export const EQUIPMENT_SLOTS = Object.keys(TYPE_TO_SLOT);

export const INVENTORY_TYPES = {
	PLAYER: "player",
	PLACE: "place",
	NPC: "npc",
};

export const ITEM_TYPES = {
	CONSUMABLE: "consumable",
	EQUIPMENT: "equipment",
	MATERIAL: "material",
	WEAPON: "weapon",
};

export const INVENTORY_ERRORS = {
	INVENTORY_FULL: "INVENTORY_FULL",
	WEIGHT_LIMIT_EXCEEDED: "WEIGHT_LIMIT_EXCEEDED",
	ITEM_NOT_FOUND: "ITEM_NOT_FOUND",
	INVALID_QUANTITY: "INVALID_QUANTITY",
	INVALID_ITEM_TYPE: "INVALID_ITEM_TYPE",
	EQUIPMENT_SLOT_INVALID: "EQUIPMENT_SLOT_INVALID",
	EQUIPMENT_SLOT_OCCUPIED: "EQUIPMENT_SLOT_OCCUPIED",
	INVENTORY_NOT_FOUND: "INVENTORY_NOT_FOUND",
	INVALID_ACTION: "INVALID_ACTION",
	SESSION_NOT_FOUND: "SESSION_NOT_FOUND",
	NICKNAME_INVALID: "NICKNAME_INVALID",
	NICKNAME_TAKEN: "NICKNAME_TAKEN",
};

export const NICKNAME_MIN = 4;
export const NICKNAME_MAX = 15;
export const NICKNAME_REGEX = /^[a-zA-Z]{4,15}$/;

export const WORKER_REROLL_COST = 25;
export const WORKER_BASE_COST = 50;
export const WORKER_COST_MULTIPLIER = 25;
export const WORKER_SLOT_COST = 200;
export const MAX_WORKER_SLOTS = 5;
export const DEFAULT_WORKER_SLOTS = 0;

export const DEFAULT_CONFIG = {
	PLAYER_MAX_SLOTS: 20,
	PLAYER_MAX_WEIGHT: 100,
	PLACE_MAX_SLOTS: 30,
};
