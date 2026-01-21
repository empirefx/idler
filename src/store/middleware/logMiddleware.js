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
        addLog({
          message: `Worker ${action.payload.workerId} made a ${action.payload.itemType}`,
          category: 'worker'
        })
      );
      break;
      
    case ENEMY_ATTACKED:
      store.dispatch(
        addLog({
          message: `Enemy ${action.payload.attackerId} hit ${action.payload.targetId} for ${action.payload.damage} HP`,
          category: 'combat'
        })
      );
      break;
      
    case WORKER_ASSIGNED:
      store.dispatch(
        addLog({
          message: `Worker ${action.payload.workerName} assigned to ${action.payload.buildingName || action.payload.buildingId}`,
          category: 'worker'
        })
      );
      break;
      
    case WORKER_UNASSIGNED:
      store.dispatch(
        addLog({
          message: `Worker ${action.payload.workerName} unassigned from ${action.payload.buildingName || action.payload.buildingId}`,
          category: 'worker'
        })
      );
      break;
      
    case LOCATION_CHANGED:
      store.dispatch(
        addLog({
          message: `Moved from ${action.payload.fromPlace} to ${action.payload.toPlace}`,
          category: 'movement'
        })
      );
      break;
      
    case PLAYER_DAMAGED:
      const { attackerId, attackerType, targetId, damage, damageType } = action.payload;
      if (damageType === 'dealt') {
        store.dispatch(
          addLog({
            message: `Player dealt ${damage} damage to ${attackerType} ${targetId}`,
            category: 'combat'
          })
        );
      } else if (damageType === 'received') {
        store.dispatch(
          addLog({
            message: `Player received ${damage} damage from ${attackerType} ${attackerId}`,
            category: 'combat'
          })
        );
      }
      break;
      
    default:
      break;
  }
  
  return result;
};

export default logMiddleware;
