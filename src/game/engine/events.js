// Define semantic game events
export const WORKER_CREATED_ITEM = 'game/WORKER_CREATED_ITEM';
export const ENEMY_ATTACKED      = 'game/ENEMY_ATTACKED';

// Action creators
export const workerCreatedItem = (workerId, itemType) => ({
  type: WORKER_CREATED_ITEM,
  payload: { workerId, itemType }
});

export const enemyAttacked = (attackerId, targetId, damage) => ({
  type: ENEMY_ATTACKED,
  payload: { attackerId, targetId, damage }
});
