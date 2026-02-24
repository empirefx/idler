// Define semantic game events
export const WORKER_CREATED_ITEM = "game/WORKER_CREATED_ITEM";
export const ENEMY_ATTACKED = "game/ENEMY_ATTACKED";
export const WORKER_ASSIGNED = "game/WORKER_ASSIGNED";
export const WORKER_UNASSIGNED = "game/WORKER_UNASSIGNED";
export const LOCATION_CHANGED = "game/LOCATION_CHANGED";
export const PLAYER_DAMAGED = "game/PLAYER_DAMAGED";
export const ENEMY_DEAD = "game/ENEMY_DEAD";
export const PLAYER_INTENT_ACCEPT_QUEST = "game/PLAYER_INTENT_ACCEPT_QUEST";
export const PLAYER_INTENT_COMPLETE_QUEST = "game/PLAYER_INTENT_COMPLETE_QUEST";
export const QUEST_PROGRESS_UPDATED = "game/QUEST_PROGRESS_UPDATED";
export const QUEST_OBJECTIVE_COMPLETED = "game/QUEST_OBJECTIVE_COMPLETED";
export const PLAYER_INTENT_CRAFT = "game/PLAYER_INTENT_CRAFT";
export const PLAYER_INTENT_LEARN_RECIPE = "game/PLAYER_INTENT_LEARN_RECIPE";
export const CRAFT_SUCCESS = "game/CRAFT_SUCCESS";
export const CRAFT_FAILED = "game/CRAFT_FAILED";
export const RECIPE_LEARNED = "game/RECIPE_LEARNED";

// Action creators
export const workerCreatedItem = (workerId, itemType) => ({
	type: WORKER_CREATED_ITEM,
	payload: { workerId, itemType },
});

export const enemyAttacked = (
	attackerId,
	targetId,
	damage,
	attackerName = null,
	targetName = null,
) => ({
	type: ENEMY_ATTACKED,
	payload: { attackerId, targetId, damage, attackerName, targetName },
});

export const workerAssigned = (
	workerId,
	workerName,
	buildingId,
	buildingName,
) => ({
	type: WORKER_ASSIGNED,
	payload: { workerId, workerName, buildingId, buildingName },
});

export const workerUnassigned = (
	workerId,
	workerName,
	buildingId,
	buildingName,
) => ({
	type: WORKER_UNASSIGNED,
	payload: { workerId, workerName, buildingId, buildingName },
});

export const locationChanged = (fromPlace, toPlace) => ({
	type: LOCATION_CHANGED,
	payload: { fromPlace, toPlace },
});

export const playerIntentAcceptQuest = (questId, npcId) => ({
	type: PLAYER_INTENT_ACCEPT_QUEST,
	payload: { questId, npcId },
});

export const playerIntentCompleteQuest = (questId, npcId) => ({
	type: PLAYER_INTENT_COMPLETE_QUEST,
	payload: { questId, npcId },
});

export const questProgressUpdated = (
	questId,
	objectiveKey,
	progress,
	required,
) => ({
	type: QUEST_PROGRESS_UPDATED,
	payload: { questId, objectiveKey, progress, required },
});

export const questObjectiveCompleted = (questId, objectiveKey) => ({
	type: QUEST_OBJECTIVE_COMPLETED,
	payload: { questId, objectiveKey },
});

export const playerDamaged = (
	attackerId,
	attackerType,
	targetId,
	damage,
	damageType,
	targetName = null,
) => ({
	type: PLAYER_DAMAGED,
	payload: {
		attackerId,
		attackerType,
		targetId,
		damage,
		damageType,
		targetName,
	},
});

export const enemyDead = (enemyId, placeId, enemy) => ({
	type: ENEMY_DEAD,
	payload: { enemyId, placeId, enemy },
});

export const playerIntentCraft = (recipeId, outputItemId) => ({
	type: PLAYER_INTENT_CRAFT,
	payload: { recipeId, outputItemId },
});

export const playerIntentLearnRecipe = (recipeId, itemId) => ({
	type: PLAYER_INTENT_LEARN_RECIPE,
	payload: { recipeId, itemId },
});

export const craftSuccess = (recipeId, outputItemId, outputItemName) => ({
	type: CRAFT_SUCCESS,
	payload: { recipeId, outputItemId, outputItemName },
});

export const craftFailed = (recipeId, error) => ({
	type: CRAFT_FAILED,
	payload: { recipeId, error },
});

export const recipeLearned = (recipeId) => ({
	type: RECIPE_LEARNED,
	payload: { recipeId },
});
