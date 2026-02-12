// Define semantic game events
export const WORKER_CREATED_ITEM = "game/WORKER_CREATED_ITEM";
export const ENEMY_ATTACKED = "game/ENEMY_ATTACKED";
export const WORKER_ASSIGNED = "game/WORKER_ASSIGNED";
export const WORKER_UNASSIGNED = "game/WORKER_UNASSIGNED";
export const LOCATION_CHANGED = "game/LOCATION_CHANGED";
export const PLAYER_DAMAGED = "game/PLAYER_DAMAGED";
export const ENEMY_DEAD = "game/ENEMY_DEAD";
export const PLAYER_INTENT_ACCEPT_QUEST = "game/PLAYER_INTENT_ACCEPT_QUEST";
export const QUEST_PROGRESS_UPDATED = "game/QUEST_PROGRESS_UPDATED";
export const QUEST_OBJECTIVE_COMPLETED = "game/QUEST_OBJECTIVE_COMPLETED";

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

export const questProgressUpdated = (questId, objectiveKey, progress, required) => ({
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
