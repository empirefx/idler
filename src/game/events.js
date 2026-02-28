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

// Building events
export const PLAYER_INTENT_BUY_SOCKET = "game/PLAYER_INTENT_BUY_SOCKET";
export const PLAYER_INTENT_BUILD = "game/PLAYER_INTENT_BUILD";
export const PLAYER_INTENT_UPGRADE = "game/PLAYER_INTENT_UPGRADE";
export const PLAYER_INTENT_DEMOLISH = "game/PLAYER_INTENT_DEMOLISH";
export const BUILD_SUCCESS = "game/BUILD_SUCCESS";
export const BUILD_FAILED = "game/BUILD_FAILED";

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

// Building action creators
export const playerIntentBuySocket = (placeId, socketIndex) => ({
	type: PLAYER_INTENT_BUY_SOCKET,
	payload: { placeId, socketIndex },
});

export const playerIntentBuild = (placeId, socketIndex, buildingId) => ({
	type: PLAYER_INTENT_BUILD,
	payload: { placeId, socketIndex, buildingId },
});

export const playerIntentUpgrade = (placeId, socketIndex) => ({
	type: PLAYER_INTENT_UPGRADE,
	payload: { placeId, socketIndex },
});

export const playerIntentDemolish = (placeId, socketIndex) => ({
	type: PLAYER_INTENT_DEMOLISH,
	payload: { placeId, socketIndex },
});

export const buildSuccess = (action, placeId, socketIndex, details) => ({
	type: BUILD_SUCCESS,
	payload: { action, placeId, socketIndex, ...details },
});

export const buildFailed = (action, placeId, socketIndex, error) => ({
	type: BUILD_FAILED,
	payload: { action, placeId, socketIndex, error },
});

// Worker management events
export const PLAYER_INTENT_HIRE_WORKER = "game/PLAYER_INTENT_HIRE_WORKER";
export const PLAYER_INTENT_REROLL_WORKERS = "game/PLAYER_INTENT_REROLL_WORKERS";
export const PLAYER_INTENT_BUY_WORKER_SLOT = "game/PLAYER_INTENT_BUY_WORKER_SLOT";
export const PLAYER_INTENT_FIRE_WORKER = "game/PLAYER_INTENT_FIRE_WORKER";
export const WORKER_HIRED = "game/WORKER_HIRED";
export const WORKER_REROLLED = "game/WORKER_REROLLED";
export const WORKER_SLOT_PURCHASED = "game/WORKER_SLOT_PURCHASED";
export const WORKER_FIRED = "game/WORKER_FIRED";
export const WORKER_HIRE_FAILED = "game/WORKER_HIRE_FAILED";
export const WORKER_REROLL_FAILED = "game/WORKER_REROLL_FAILED";
export const WORKER_SLOT_FAILED = "game/WORKER_SLOT_FAILED";
export const WORKER_FIRE_FAILED = "game/WORKER_FIRE_FAILED";

// Action creators for worker management
export const playerIntentHireWorker = (workerId) => ({
	type: PLAYER_INTENT_HIRE_WORKER,
	payload: { workerId },
});

export const playerIntentRerollWorkers = () => ({
	type: PLAYER_INTENT_REROLL_WORKERS,
	payload: {},
});

export const playerIntentBuyWorkerSlot = () => ({
	type: PLAYER_INTENT_BUY_WORKER_SLOT,
	payload: {},
});

export const playerIntentFireWorker = (workerId) => ({
	type: PLAYER_INTENT_FIRE_WORKER,
	payload: { workerId },
});

export const workerHired = (worker) => ({
	type: WORKER_HIRED,
	payload: { worker },
});

export const workerRerolled = (availableWorkers) => ({
	type: WORKER_REROLLED,
	payload: { availableWorkers },
});

export const workerSlotPurchased = (newSlotCount) => ({
	type: WORKER_SLOT_PURCHASED,
	payload: { newSlotCount },
});

export const workerFired = (workerId, workerName) => ({
	type: WORKER_FIRED,
	payload: { workerId, workerName },
});

export const workerHireFailed = (error) => ({
	type: WORKER_HIRE_FAILED,
	payload: { error },
});

export const workerRerollFailed = (error) => ({
	type: WORKER_REROLL_FAILED,
	payload: { error },
});

export const workerSlotFailed = (error) => ({
	type: WORKER_SLOT_FAILED,
	payload: { error },
});

export const workerFireFailed = (error) => ({
	type: WORKER_FIRE_FAILED,
	payload: { error },
});
