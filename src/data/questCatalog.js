export const questCatalog = {
	help_village_gather_wood: {
		id: "help_village_gather_wood",
		title: "Help the Village: Gather Wood",
		description:
			"The village needs extra firewood and building materials. Gather wood to support the settlement.",
		giverNpcId: "village_elder",
		requirementSummary: "Be at least level 1 and speak to the Village Elder in the village center.",
		requirements: {
			minLevel: 1,
			requiredPlaceId: "village_center",
			requiredQuestIds: [],
		},
		acceptMessage: "You agree to help gather wood for the village.",
		conversation: [
			{
				npcText:
					"Our wood stores are running low, and winter nights grow colder.",
				playerText: "Is there something I can do to help?",
			},
			{
				npcText:
					"If you could gather extra wood from the nearby forest, the villagers would be grateful.",
				playerText: "I can help with that. What exactly do you need?",
			},
			{
				npcText:
					"Bring back enough good wood so our fires keep burning and repairs can continue. Will you take on this task?",
				playerText: "Let me think about it for a moment.",
				final: true,
			},
		],
	},
	help_village_kill_monsters: {
		id: "help_village_kill_monsters",
		title: "Help the Village: Clear the Threats",
		description:
			"Monsters have been threatening the village outskirts. Eliminate any monsters to help protect the settlement.",
		giverNpcId: "village_elder",
		requirementSummary: "Be at least level 1 and speak to the Village Elder in the village center.",
		requirements: {
			minLevel: 1,
			requiredPlaceId: "village_center",
			requiredQuestIds: [],
		},
		objectives: {
			killAnyMonster: {
				type: "kill",
				target: "any",
				required: 5,
				progressKey: "monstersKilled",
			},
		},
		acceptMessage: "You agree to help clear the monsters threatening the village.",
		conversation: [
			{
				npcText:
					"Monsters have been seen near our borders, and the villagers are growing fearful.",
				playerText: "What kind of monsters?",
			},
			{
				npcText:
					"Various creatures - wolves, goblins, and worse. We need someone brave enough to face them.",
				playerText: "I can help with that. How many do you need eliminated?",
			},
			{
				npcText:
					"If you can eliminate five of these threats, the village will be much safer. Will you take on this task?",
				playerText: "Let me think about it for a moment.",
				final: true,
			},
		],
	},
};

export const metadata = {
	version: "1.0.1",
	lastUpdated: "2026-02-11",
};

