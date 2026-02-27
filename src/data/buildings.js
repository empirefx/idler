export const buildingsData = {
	farm: {
		id: "farm",
		name: "Farm",
		description: "Produces food for your population",
		icon: "farm.jpg",
		buildCost: 50,
		baseProductionRate: 1,
		upgrades: {
			level1: { material: "wheat" },
			level2: { cost: 150, material: "apple" },
			level3: { cost: 400, material: "golden-apple" },
		},
	},
	mine: {
		id: "mine",
		name: "Mine",
		description: "Extracts valuable resources from the earth",
		icon: "mine.jpg",
		buildCost: 75,
		baseProductionRate: 1,
		upgrades: {
			level1: { material: "stone" },
			level2: { cost: 200, material: "iron-ore" },
			level3: { cost: 500, material: "gold-ore" },
			level4: { cost: 1000, material: "diamond" },
			level5: { cost: 2000, material: "mythril" },
		},
	},
	lumber_mill: {
		id: "lumber_mill",
		name: "Lumber Mill",
		description: "Processes wood from the forest",
		icon: "lumber.jpg",
		buildCost: 60,
		baseProductionRate: 1,
		upgrades: {
			level1: { material: "wood" },
			level2: { cost: 180, material: "plank" },
			level3: { cost: 450, material: "hardwood" },
		},
	},
};

export const metadata = {
	version: "1.0.11",
	lastUpdated: "2026-02-11",
};
