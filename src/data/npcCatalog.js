export const npcCatalog = {
	village_elder: {
		id: "village_elder",
		name: "Village Elder",
		description:
			"The wise leader of the settlement, with years of knowledge about the region.",
		avatar: 1,
		location: "village_center",
		hasQuestToGive: true,
		dialogue: {
			initial:
				"Welcome, traveler. Our village has seen better days, but we endure.",
			options: [
				{
					text: "What can you tell me about this place?",
					response:
						"We are a small settlement on the edge of the wilderness. To the east lies the forest, where resources are plentiful but danger lurks. To the west, the river provides life and trade routes.",
				},
				{
					text: "How can I help the village?",
					response:
						"Clear out the monsters that threaten us, and build structures to strengthen our community.",
				},
				{
					text: "I can help clear out the monsters.",
					response:
						"That would be a great help to our village. Many creatures have been seen near our borders.",
					startsQuestId: "help_village_kill_monsters",
				},
			],
		},
	},
	blacksmith: {
		id: "blacksmith",
		name: "Grum the Blacksmith",
		description: "A burly man with soot-covered hands and a warm heart.",
		avatar: 47,
		location: "village_center",
		hasInventory: true,
		hasQuestToGive: true,
		dialogue: {
			initial:
				"Need some equipment forged? I can work with any materials you bring me.",
			options: [
				{
					text: "What materials do you need?",
					response:
						"I can work with or from the mines. The harder the or, the better the equipment I can forge.",
				},
				{
					text: "Can you upgrade my gear?",
					response:
						"Bring me better materials and enough gold, and I'll improve whatever you have.",
				},
				{
					text: "I can bring you some iron or.",
					response:
						"Aye, I'm running low on iron or. Bring me 5 pieces and I'll reward you well.",
					startsQuestId: "blacksmith_iron_ore",
				},
			],
		},
	},
	trader: {
		id: "trader",
		name: "Traveling Merchant",
		description: "A well-traveled merchant with goods from distant lands.",
		avatar: 3,
		location: "river_crossing",
		hasInventory: true,
		dialogue: {
			initial:
				"Ah, a customer! I have goods from all over the realm. Take a look!",
			options: [
				{
					text: "Show me your wares",
					response:
						"I have consumables, materials, and rare artifacts. Prices vary by availability.",
				},
				{
					text: "Any news from other settlements?",
					response:
						"Rumors speak of troubles in the northern mountains and treasures in the eastern caves. But be careful - these lands are dangerous.",
				},
			],
		},
	},
	hunter_leader: {
		id: "hunter_leader",
		name: "Captain Vorn",
		description: "Leader of hunting party, skilled in tracking and survival.",
		avatar: 4,
		location: "hunter_camp",
		dialogue: {
			initial:
				"We've been tracking beasts in these woods for years. What brings you here?",
			options: [
				{
					text: "What dangers lurk in the forest?",
					response:
						"The forest is home to forest beasts and woodland predators. Further in, you'll find more dangerous creatures. Stay on your guard.",
				},
				{
					text: "Can you teach me anything?",
					response:
						"I can share knowledge about tracking enemies and finding resources. Experience is the best teacher though - get out there and hunt!",
				},
			],
		},
	},
	hermit: {
		id: "hermit",
		name: "Old Hermit",
		description: "A mysterious figure who lives in solitude by the ruins.",
		avatar: 5,
		location: "ancient_ruins",
		dialogue: {
			initial:
				"Few venture this far into the ruins. You either seek knowledge or treasure.",
			options: [
				{
					text: "What do you know about these ruins?",
					response:
						"These are the remains of an ancient civilization that fell to darkness. Powerful artifacts remain here, but so do the undead guardians.",
				},
				{
					text: "Is there treasure here?",
					response:
						"Yes, but it comes at a price. The deeper you go, the more dangerous it becomes. Prepare well before venturing further.",
				},
			],
		},
	},
	weapon_merchant: {
		id: "weapon_merchant",
		name: "Kael the Wanderer",
		description:
			"A traveling weapons merchant with a collection of basic arms for aspiring adventurers.",
		avatar: 10,
		location: "village_center",
		hasInventory: true,
		dialogue: {
			initial:
				"Welcome, adventurer! I travel these lands collecting and trading weapons. Whether you're just starting out or need a reliable backup, I've got something for you.",
			options: [
				{
					text: "What weapons do you have?",
					response:
						"I specialize in basic but reliable weapons - swords, daggers, axes, bows, and staves. Nothing fancy, just solid gear that won't fail you when it matters most.",
				},
			],
		},
	},
	grocer: {
		id: "grocer",
		name: "Martha the Grocer",
		description:
			"A friendly woman selling basic food supplies and ingredients.",
		avatar: 15,
		location: "village_center",
		hasInventory: true,
		dialogue: {
			initial:
				"Welcome! I've got fresh supplies for any aspiring baker or cook. Flour, water, and more!",
			options: [
				{
					text: "What do you have for sale?",
					response:
						"I sell flour, water, and other basic ingredients. Perfect for baking bread or making pies!",
				},
			],
		},
	},
	worker_supervisor: {
		id: "worker_supervisor",
		name: "Mira the Overseer",
		description:
			"The village's workforce manager. She handles hiring workers.",
		avatar: 42,
		location: "village_center",
		hasWorkerManager: true,
		dialogue: {
			initial:
				"Looking to expand your workforce? I can help you hire new workers.",
			options: [
				{
					text: "I want to hire workers.",
					response:
						"Excellent! I can show you the available workers looking for employment. Each hire costs gold based on how many workers you already have.",
					opensWorkerManager: true,
				},
			],
		},
	},
};

export const metadata = {
	version: "1.0.1",
	lastUpdated: "2026-02-11",
};
