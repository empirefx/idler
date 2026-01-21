import { 
  WORKER_CREATED_ITEM, 
  ENEMY_ATTACKED, 
  WORKER_ASSIGNED, 
  WORKER_UNASSIGNED, 
  LOCATION_CHANGED, 
  PLAYER_DAMAGED 
} from '../../game/events';
import { addLog } from '../slices/logSlice';

const logMiddleware = store => next => action => {
  // Don't process log actions to prevent recursion
  if (action.type && action.type.startsWith('logs/')) {
    return next(action);
  }
  
  const result = next(action);
  
  switch (action.type) {
    case WORKER_CREATED_ITEM:
      store.dispatch(
        addLog(
          `Worker ${action.payload.workerId} made a ${action.payload.itemType}`
        )
      );
      break;
      
    case ENEMY_ATTACKED:
      store.dispatch(
        addLog(
          `Enemy ${action.payload.attackerId} hit ${action.payload.targetId} for ${action.payload.damage} HP`
        )
      );
      break;
      
    case WORKER_ASSIGNED:
      store.dispatch(
        addLog(
          `Worker ${action.payload.workerName} assigned to ${action.payload.buildingName || action.payload.buildingId}`
        )
      );
      break;
      
    case WORKER_UNASSIGNED:
      store.dispatch(
        addLog(
          `Worker ${action.payload.workerName} unassigned from ${action.payload.buildingName || action.payload.buildingId}`
        )
      );
      break;
      
    case LOCATION_CHANGED:
      store.dispatch(
        addLog(
          `Moved from ${action.payload.fromPlace} to ${action.payload.toPlace}`
        )
      );
      break;
      
    case PLAYER_DAMAGED:
      const { attackerId, attackerType, targetId, damage, damageType } = action.payload;
      if (damageType === 'dealt') {
        store.dispatch(
          addLog(
            `Player dealt ${damage} damage to ${attackerType} ${targetId}`
          )
        );
      } else if (damageType === 'received') {
        store.dispatch(
          addLog(
            `Player received ${damage} damage from ${attackerType} ${attackerId}`
          )
        );
      }
      break;
      
    default:
      break;
  }
  
  return result;
};

export default logMiddleware;
