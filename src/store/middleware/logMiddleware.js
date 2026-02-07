import {
  WORKER_CREATED_ITEM,
  ENEMY_ATTACKED,
  WORKER_ASSIGNED,
  WORKER_UNASSIGNED,
  LOCATION_CHANGED,
  PLAYER_DAMAGED,
} from "../../game/events";
import { addLog } from "../slices/logSlice";
import {
  getEnemyDisplayName,
  getEnemyTypeDisplayName,
} from "../../utils/enemyUtils";

const logMiddleware = (store) => (next) => (action) => {
  // Don't process log actions to prevent recursion
  if (action.type && action.type.startsWith("logs/")) {
    return next(action);
  }

  const result = next(action);

  switch (action.type) {
    case WORKER_CREATED_ITEM:
      store.dispatch(
        addLog({
          message: `Worker ${action.payload.workerId} made a ${action.payload.itemType}`,
          category: "worker",
        }),
      );
      break;

    case ENEMY_ATTACKED: {
      const state = store.getState();
      const {
        attackerId,
        targetId,
        damage: enemyDamage,
        attackerName,
        targetName: enemyTargetName,
      } = action.payload;

      // Use pre-captured names or fallback to state lookup
      const finalAttackerName =
        attackerName || getEnemyDisplayName(state, attackerId);
      const finalTargetName =
        enemyTargetName || getEnemyDisplayName(state, targetId);

      store.dispatch(
        addLog({
          message: `${finalAttackerName} hit ${finalTargetName} for ${enemyDamage} damage`,
          category: "combat",
        }),
      );
      break;
    }

    case WORKER_ASSIGNED:
      store.dispatch(
        addLog({
          message: `Worker ${action.payload.workerName} assigned to ${action.payload.buildingName || action.payload.buildingId}`,
          category: "worker",
        }),
      );
      break;

    case WORKER_UNASSIGNED:
      store.dispatch(
        addLog({
          message: `Worker ${action.payload.workerName} unassigned from ${action.payload.buildingName || action.payload.buildingId}`,
          category: "worker",
        }),
      );
      break;

    case LOCATION_CHANGED:
      store.dispatch(
        addLog({
          message: `Moved from ${action.payload.fromPlace} to ${action.payload.toPlace}`,
          category: "movement",
        }),
      );
      break;

    case PLAYER_DAMAGED: {
      const {
        attackerId: playerAttackerId,
        attackerType,
        targetId: playerTargetId,
        damage,
        damageType,
        targetName: playerTargetName,
      } = action.payload;
      const currentState = store.getState();

      if (damageType === "dealt") {
        // Use pre-captured name or fallback to state lookup
        const finalTargetName =
          playerTargetName || getEnemyDisplayName(currentState, playerTargetId);
        store.dispatch(
          addLog({
            message: `Player dealt ${damage} damage to ${finalTargetName}`,
            category: "combat",
          }),
        );
      } else if (damageType === "received") {
        const attackerName = getEnemyDisplayName(
          currentState,
          playerAttackerId,
        );
        // do nothing for now...
      }
      break;
    }

    default:
      break;
  }

  return result;
};

export default logMiddleware;
