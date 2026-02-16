export const questCatalog = {
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
	blacksmith_iron_ore: {
		id: "blacksmith_iron_ore",
		title: "Grum's Request: Iron Ore",
		description:
			"Grum the Blacksmith needs iron ore to forge better equipment. Bring him 5 iron ore.",
		giverNpcId: "blacksmith",
		requirementSummary: "Speak to Grum the Blacksmith in the village center.",
		requirements: {
			minLevel: 1,
			requiredPlaceId: "village_center",
			requiredQuestIds: [],
		},
		objectives: {
			collectIronOre: {
				type: "collect",
				target: "iron-ore",
				required: 5,
				progressKey: "ironOreCollected",
			},
		},
		acceptMessage: "You agree to bring iron ore to Grum.",
		conversation: [
			{
				npcText:
					"I'm running low on iron ore. Can't forge good equipment without it.",
				playerText: "What do you need?",
			},
			{
				npcText:
					"Bring me 5 iron ore from the mines. The harder the ore, the better the gear I can make.",
				playerText: "I can help with that. Where can I find iron ore?",
			},
			{
				npcText:
					"The mines to the north have plenty. Bring me 5 pieces and I'll reward you well. Will you take on this task?",
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

