// Define semantic game events
export const WORKER_CREATED_ITEM = 'game/WORKER_CREATED_ITEM';
export const ENEMY_ATTACKED      = 'game/ENEMY_ATTACKED';
export const WORKER_ASSIGNED     = 'game/WORKER_ASSIGNED';
export const WORKER_UNASSIGNED   = 'game/WORKER_UNASSIGNED';
export const LOCATION_CHANGED    = 'game/LOCATION_CHANGED';
export const PLAYER_DAMAGED      = 'game/PLAYER_DAMAGED';

// Action creators
export const workerCreatedItem = (workerId, itemType) => ({
  type: WORKER_CREATED_ITEM,
  payload: { workerId, itemType }
});

export const enemyAttacked = (attackerId, targetId, damage) => ({
  type: ENEMY_ATTACKED,
  payload: { attackerId, targetId, damage }
});

export const workerAssigned = (workerId, workerName, buildingId, buildingName) => ({
  type: WORKER_ASSIGNED,
  payload: { workerId, workerName, buildingId, buildingName }
});

export const workerUnassigned = (workerId, workerName, buildingId, buildingName) => ({
  type: WORKER_UNASSIGNED,
  payload: { workerId, workerName, buildingId, buildingName }
});

export const locationChanged = (fromPlace, toPlace) => ({
  type: LOCATION_CHANGED,
  payload: { fromPlace, toPlace }
});

export const playerDamaged = (attackerId, attackerType, targetId, damage, damageType) => ({
  type: PLAYER_DAMAGED,
  payload: { attackerId, attackerType, targetId, damage, damageType }
});
