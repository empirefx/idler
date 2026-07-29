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
		output: { icon: "apple-pie", name: "Apple Pie" },
		materials: [
			{ icon: "apple", quantity: 3 },
			{ icon: "flour", quantity: 2 },
		],
	},
	bread: {
		id: "bread",
		name: "Bread",
		group: craftingGroups.FOOD,
		output: { icon: "bread", name: "Bread" },
		materials: [
			{ icon: "flour", quantity: 2 },
			{ icon: "water", quantity: 1 },
		],
	},
	"meat-stew": {
		id: "meat-stew",
		name: "Meat Stew",
		group: craftingGroups.FOOD,
		output: { icon: "meat-stew", name: "Meat Stew" },
		materials: [
			{ icon: "meat", quantity: 2 },
			{ icon: "water", quantity: 1 },
			{ icon: "flour", quantity: 1 },
		],
	},

	// MATERIAL RECIPES
	"iron-ingot": {
		id: "iron-ingot",
		name: "Iron Ingot",
		group: craftingGroups.MATERIAL,
		output: { icon: "iron-ingot", name: "Iron Ingot" },
		materials: [{ icon: "iron-ore", quantity: 2 }],
	},
	leather: {
		id: "leather",
		name: "Leather",
		group: craftingGroups.MATERIAL,
		output: { icon: "leather", name: "Leather" },
		materials: [{ icon: "animal-hide", quantity: 2 }],
	},
	"wood-plank": {
		id: "wood-plank",
		name: "Wood Plank",
		group: craftingGroups.MATERIAL,
		output: { icon: "wood-plank", name: "Wood Plank" },
		materials: [{ icon: "wood", quantity: 2 }],
	},

	// WEAPON RECIPES (1 recipe = multiple variants)
	dagger: {
		id: "dagger",
		name: "Dagger",
		group: craftingGroups.WEAPON,
		output: {
			icon: "dagger",
			name: "Dagger",
			variants: ["dagger1", "dagger2", "dagger3", "dagger4", "dagger5"],
		},
		materials: [
			{ icon: "iron-ingot", quantity: 1 },
			{ icon: "leather", quantity: 1 },
		],
	},
	sword: {
		id: "sword",
		name: "Sword",
		group: craftingGroups.WEAPON,
		output: {
			icon: "sword",
			name: "Sword",
			variants: ["sword1", "sword2", "sword3", "sword4", "sword5"],
		},
		materials: [
			{ icon: "iron-ingot", quantity: 3 },
			{ icon: "leather", quantity: 1 },
			{ icon: "wood-plank", quantity: 1 },
		],
	},
	axe: {
		id: "axe",
		name: "Axe",
		group: craftingGroups.WEAPON,
		output: {
			icon: "axe",
			name: "Axe",
			variants: ["axe1", "axe2", "axe3", "axe4"],
		},
		materials: [
			{ icon: "iron-ingot", quantity: 2 },
			{ icon: "wood-plank", quantity: 2 },
		],
	},

	// ARMOR RECIPES (1 recipe = full set)
	"leather-armor-set": {
		id: "leather-armor-set",
		name: "Leather Armor Set",
		group: craftingGroups.ARMOR,
		output: {
			icon: "leather-armor-set",
			name: "Leather Armor Set",
			set: "leather",
			items: [
				"leather-armor",
				"leather-hood",
				"leather-mail",
				"leather-pants",
				"leather-boots",
				"leather-gloves",
				"leather-bracer",
			],
		},
		materials: [
			{ icon: "leather", quantity: 5 },
			{ icon: "iron-ingot", quantity: 1 },
		],
	},
	"studded-armor-set": {
		id: "studded-armor-set",
		name: "Studded Armor Set",
		group: craftingGroups.ARMOR,
		output: {
			icon: "studded-armor-set",
			name: "Studded Armor Set",
			set: "studded",
			items: [
				"studded-armor",
				"studded-hood",
				"studded-mail",
				"studded-pants",
				"studded-boots",
				"studded-gloves",
			],
		},
		materials: [
			{ icon: "leather", quantity: 4 },
			{ icon: "iron-ingot", quantity: 3 },
		],
	},
	"plate-armor-set": {
		id: "plate-armor-set",
		name: "Plate Armor Set",
		group: craftingGroups.ARMOR,
		output: {
			icon: "plate-armor-set",
			name: "Plate Armor Set",
			set: "plate",
			items: [
				"plate-armor",
				"plate-helmet",
				"plate-mail",
				"plate-pants",
				"plate-boots",
				"plate-gloves",
			],
		},
		materials: [
			{ icon: "iron-ingot", quantity: 6 },
			{ icon: "leather", quantity: 2 },
		],
	},
	"heavy-armor-set": {
		id: "heavy-armor-set",
		name: "Heavy Armor Set",
		group: craftingGroups.ARMOR,
		output: {
			icon: "heavy-armor-set",
			name: "Heavy Armor Set",
			set: "heavy",
			items: [
				"heavy-armor",
				"heavy-helmet",
				"heavy-mail",
				"heavy-pants",
				"heavy-boots",
				"heavy-gloves",
			],
		},
		materials: [
			{ icon: "iron-ingot", quantity: 8 },
			{ icon: "leather", quantity: 3 },
			{ icon: "gold", quantity: 1 },
		],
	},

	// SHIELD RECIPES
	buckler: {
		id: "buckler",
		name: "Buckler",
		group: craftingGroups.SHIELD,
		output: {
			icon: "buckler",
			name: "Buckler",
			variants: ["buckler-1", "wooden-buckler-shield", "metal-buckler-shield"],
		},
		materials: [
			{ icon: "wood-plank", quantity: 2 },
			{ icon: "iron-ingot", quantity: 1 },
		],
	},
	"tower-shield": {
		id: "tower-shield",
		name: "Tower Shield",
		group: craftingGroups.SHIELD,
		output: {
			icon: "tower-shield",
			name: "Tower Shield",
			variants: [
				"medium-wooden-shield",
				"medium-metal-shield",
				"metal-tower-shield",
			],
		},
		materials: [
			{ icon: "wood-plank", quantity: 4 },
			{ icon: "iron-ingot", quantity: 2 },
		],
	},
};

export const metadata = {
	version: "1.0.1",
	lastUpdated: "2026-02-22",
};
