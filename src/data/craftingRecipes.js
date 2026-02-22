export const craftingGroups = {
	FOOD: "food",
	MATERIAL: "material",
	WEAPON: "weapon",
	ARMOR: "armor",
	SHIELD: "shield",
};

export const craftingRecipes = {
	// FOOD RECIPES
	"apple-pie": {
		id: "apple-pie",
		name: "Apple Pie",
		group: craftingGroups.FOOD,
		output: { itemKey: "apple-pie", name: "Apple Pie" },
		materials: [
			{ itemKey: "apple", quantity: 3 },
			{ itemKey: "flour", quantity: 2 },
		],
	},
	"bread": {
		id: "bread",
		name: "Bread",
		group: craftingGroups.FOOD,
		output: { itemKey: "bread", name: "Bread" },
		materials: [
			{ itemKey: "flour", quantity: 2 },
			{ itemKey: "water", quantity: 1 },
		],
	},
	"meat-stew": {
		id: "meat-stew",
		name: "Meat Stew",
		group: craftingGroups.FOOD,
		output: { itemKey: "meat-stew", name: "Meat Stew" },
		materials: [
			{ itemKey: "meat", quantity: 2 },
			{ itemKey: "water", quantity: 1 },
			{ itemKey: "flour", quantity: 1 },
		],
	},

	// MATERIAL RECIPES
	"iron-ingot": {
		id: "iron-ingot",
		name: "Iron Ingot",
		group: craftingGroups.MATERIAL,
		output: { itemKey: "iron-ingot", name: "Iron Ingot" },
		materials: [
			{ itemKey: "iron-ore", quantity: 2 },
		],
	},
	"leather": {
		id: "leather",
		name: "Leather",
		group: craftingGroups.MATERIAL,
		output: { itemKey: "leather", name: "Leather" },
		materials: [
			{ itemKey: "animal-hide", quantity: 2 },
		],
	},
	"wood-plank": {
		id: "wood-plank",
		name: "Wood Plank",
		group: craftingGroups.MATERIAL,
		output: { itemKey: "wood-plank", name: "Wood Plank" },
		materials: [
			{ itemKey: "wood", quantity: 2 },
		],
	},

	// WEAPON RECIPES (1 recipe = multiple variants)
	dagger: {
		id: "dagger",
		name: "Dagger",
		group: craftingGroups.WEAPON,
		output: { itemKey: "dagger", name: "Dagger", variants: ["dagger1", "dagger2", "dagger3", "dagger4", "dagger5"] },
		materials: [
			{ itemKey: "iron-ingot", quantity: 1 },
			{ itemKey: "leather", quantity: 1 },
		],
	},
	sword: {
		id: "sword",
		name: "Sword",
		group: craftingGroups.WEAPON,
		output: { itemKey: "sword", name: "Sword", variants: ["sword1", "sword2", "sword3", "sword4", "sword5"] },
		materials: [
			{ itemKey: "iron-ingot", quantity: 3 },
			{ itemKey: "leather", quantity: 1 },
			{ itemKey: "wood-plank", quantity: 1 },
		],
	},
	axe: {
		id: "axe",
		name: "Axe",
		group: craftingGroups.WEAPON,
		output: { itemKey: "axe", name: "Axe", variants: ["axe1", "axe2", "axe3", "axe4"] },
		materials: [
			{ itemKey: "iron-ingot", quantity: 2 },
			{ itemKey: "wood-plank", quantity: 2 },
		],
	},

	// ARMOR RECIPES (1 recipe = full set)
	"leather-armor-set": {
		id: "leather-armor-set",
		name: "Leather Armor Set",
		group: craftingGroups.ARMOR,
		output: { 
			itemKey: "leather-armor-set", 
			name: "Leather Armor Set", 
			set: "leather",
			items: ["leather-armor", "leather-hood", "leather-mail", "leather-pants", "leather-boots", "leather-gloves", "leather-bracer"]
		},
		materials: [
			{ itemKey: "leather", quantity: 5 },
			{ itemKey: "iron-ingot", quantity: 1 },
		],
	},
	"studded-armor-set": {
		id: "studded-armor-set",
		name: "Studded Armor Set",
		group: craftingGroups.ARMOR,
		output: { 
			itemKey: "studded-armor-set", 
			name: "Studded Armor Set",
			set: "studded",
			items: ["studded-armor", "studded-hood", "studded-mail", "studded-pants", "studded-boots", "studded-gloves"]
		},
		materials: [
			{ itemKey: "leather", quantity: 4 },
			{ itemKey: "iron-ingot", quantity: 3 },
		],
	},
	"plate-armor-set": {
		id: "plate-armor-set",
		name: "Plate Armor Set",
		group: craftingGroups.ARMOR,
		output: { 
			itemKey: "plate-armor-set", 
			name: "Plate Armor Set",
			set: "plate",
			items: ["plate-armor", "plate-helmet", "plate-mail", "plate-pants", "plate-boots", "plate-gloves"]
		},
		materials: [
			{ itemKey: "iron-ingot", quantity: 6 },
			{ itemKey: "leather", quantity: 2 },
		],
	},
	"heavy-armor-set": {
		id: "heavy-armor-set",
		name: "Heavy Armor Set",
		group: craftingGroups.ARMOR,
		output: { 
			itemKey: "heavy-armor-set", 
			name: "Heavy Armor Set",
			set: "heavy",
			items: ["heavy-armor", "heavy-helmet", "heavy-mail", "heavy-pants", "heavy-boots", "heavy-gloves"]
		},
		materials: [
			{ itemKey: "iron-ingot", quantity: 8 },
			{ itemKey: "leather", quantity: 3 },
			{ itemKey: "gold", quantity: 1 },
		],
	},

	// SHIELD RECIPES
	buckler: {
		id: "buckler",
		name: "Buckler",
		group: craftingGroups.SHIELD,
		output: { itemKey: "buckler", name: "Buckler", variants: ["buckler-1", "wooden-buckler-shield", "metal-buckler-shield"] },
		materials: [
			{ itemKey: "wood-plank", quantity: 2 },
			{ itemKey: "iron-ingot", quantity: 1 },
		],
	},
	"tower-shield": {
		id: "tower-shield",
		name: "Tower Shield",
		group: craftingGroups.SHIELD,
		output: { itemKey: "tower-shield", name: "Tower Shield", variants: ["medium-wooden-shield", "medium-metal-shield", "metal-tower-shield"] },
		materials: [
			{ itemKey: "wood-plank", quantity: 4 },
			{ itemKey: "iron-ingot", quantity: 2 },
		],
	},
};

export const metadata = {
	version: "1.0.1",
	lastUpdated: "2026-02-22",
};
