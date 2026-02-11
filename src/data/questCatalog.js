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
};

export const metadata = {
	version: "1.0.0",
	lastUpdated: "2026-02-11",
};

