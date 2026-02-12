// Pre-normalized inventories and metadata
export const inventoryData = {
	player: {
		id: "player",
		type: "player",
		playerId: "1",
		maxSlots: 20,
		maxWeight: 100,
		items: [
			{
				id: 1,
				name: "apple",
				description: "A fresh apple",
				type: "consumable",
				quantity: 5,
				weight: 0.5,
				consumable: { heal: 10 },
			},
			{
				id: 2,
				name: "banana",
				description: "A ripe banana",
				type: "consumable",
				quantity: 3,
				weight: 0.5,
				consumable: { heal: 12 },
			},
		],
		equipment: {
			head: null,
			body: null,
			pants: null,
			"main-weapon": null,
			"second-weapon": null,
		},
	},
	village_center: {
		id: "village_center",
		placeId: "village_center",
		type: "place",
		maxSlots: 30,
		items: [
			{
				id: 1,
				name: "apple",
				description: "A fresh apple",
				type: "consumable",
				quantity: 10,
				weight: 0.5,
				consumable: { heal: 10 },
			},
		],
	},
	blacksmith: {
		id: "blacksmith",
		npcId: "blacksmith",
		type: "npc",
		maxSlots: 20,
		items: [],
	},
	trader: {
		id: "trader",
		npcId: "trader",
		type: "npc",
		maxSlots: 20,
		items: [],
	},
};

export const metadata = {
	version: "1.1.3",
	lastUpdated: "2026-02-12",
};
