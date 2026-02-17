import { questCatalog } from "../../data/questCatalog";

export const QUEST_ELIGIBILITY_REASONS = {
	QUEST_NOT_FOUND: "QUEST_NOT_FOUND",
	WRONG_NPC: "WRONG_NPC",
	ALREADY_ACCEPTED: "ALREADY_ACCEPTED",
	ALREADY_COMPLETED: "ALREADY_COMPLETED",
	LEVEL_TOO_LOW: "LEVEL_TOO_LOW",
	WRONG_LOCATION: "WRONG_LOCATION",
	MISSING_PREREQUISITES: "MISSING_PREREQUISITES",
};

export const getQuestDefinition = (questId) => questCatalog[questId] || null;

export const checkQuestEligibility = (state, questId, npcId = null) => {
	const quest = getQuestDefinition(questId);

	if (!quest) {
		return {
			canAccept: false,
			reasonCode: QUEST_ELIGIBILITY_REASONS.QUEST_NOT_FOUND,
			message: "This quest does not exist.",
		};
	}

	const questsState = state.quests;

	// Ensure the quest is actually offered by this NPC (if both ids are known)
	if (npcId && quest.giverNpcId && quest.giverNpcId !== npcId) {
		return {
			canAccept: false,
			reasonCode: QUEST_ELIGIBILITY_REASONS.WRONG_NPC,
			message: "This character is not offering that quest.",
		};
	}

	// Already active
	if (questsState?.activeById?.[questId]) {
		return {
			canAccept: false,
			reasonCode: QUEST_ELIGIBILITY_REASONS.ALREADY_ACCEPTED,
			message: "You have already accepted this quest.",
		};
	}

	// Already completed
	if (questsState?.completedQuests?.[questId]) {
		return {
			canAccept: false,
			reasonCode: QUEST_ELIGIBILITY_REASONS.ALREADY_COMPLETED,
			message: "You have already completed this quest.",
		};
	}

	const playerLevel = state.player?.level ?? 1;
	const currentPlaceId = state.places?.currentPlaceId ?? null;

	// Level requirement
	if (quest.requirements?.minLevel && playerLevel < quest.requirements.minLevel) {
		return {
			canAccept: false,
			reasonCode: QUEST_ELIGIBILITY_REASONS.LEVEL_TOO_LOW,
			message: `You must be at least level ${quest.requirements.minLevel} to accept this quest.`,
		};
	}

	// Location requirement
	if (
		quest.requirements?.requiredPlaceId &&
		currentPlaceId &&
		currentPlaceId !== quest.requirements.requiredPlaceId
	) {
		return {
			canAccept: false,
			reasonCode: QUEST_ELIGIBILITY_REASONS.WRONG_LOCATION,
			message: "You must be in the right location to accept this quest.",
		};
	}

	// Prerequisite quests requirement (basic check only)
	if (
		Array.isArray(quest.requirements?.requiredQuestIds) &&
		quest.requirements.requiredQuestIds.length > 0
	) {
		const completedQuests = questsState?.completedQuests || {};
		const missing = quest.requirements.requiredQuestIds.filter(
			(id) => !completedQuests[id],
		);

		if (missing.length > 0) {
			return {
				canAccept: false,
				reasonCode: QUEST_ELIGIBILITY_REASONS.MISSING_PREREQUISITES,
				message: "You must complete other tasks before taking this quest.",
			};
		}
	}

	return {
		canAccept: true,
		reasonCode: null,
		message: quest.acceptMessage || `Quest accepted: ${quest.title}`,
	};
};

