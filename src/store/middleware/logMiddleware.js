import { WORKER_CREATED_ITEM, ENEMY_ATTACKED } from '../../game/engine/events';
import { addLog } from '../slices/logSlice';
import { WORKER_CREATED_ITEM, ENEMY_ATTACKED } from '../../game/engine/events';

const logMiddleware = store => next => action => {
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
    default:
      break;
  }
  return result;
};

export default logMiddleware;
