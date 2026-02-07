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
				id: "leather-hood",
				name: "rusty armor",
				description: "A sturdy piece of armor",
				type: "equipment",
				piece: "body",
				quantity: 1,
				stats: { defense: 10 },
				weight: 15,
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
			{
				id: "leather-hood",
				name: "rusty armor",
				description: "A sturdy piece of armor",
				type: "equipment",
				piece: "body",
				quantity: 1,
				stats: { defense: 12 },
				weight: 18,
			},
		],
	},
};

export const metadata = {
	version: "1.0.9",
	lastUpdated: "2025-04-23",
};
