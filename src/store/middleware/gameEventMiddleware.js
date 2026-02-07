import { selectIsReadyToLevelUp } from "../slices/playerSlice";
import { selectIsInCombat } from "../slices/combatSlice";
import { addNotification } from "../slices/notificationSlice";
import { NOTIFICATION_TYPES } from "../slices/notificationSlice";

const gameEventMiddleware = (store) => (next) => (action) => {
  const prevState = store.getState();

  // Get previous states
  const wasReadyToLevelUp = selectIsReadyToLevelUp(prevState);
  const prevLevel = prevState.player.level;
  const wasInCombat = selectIsInCombat(prevState);

  const result = next(action);

  // Get next states after action
  const nextState = store.getState();

  // Combat start notification
  if (!wasInCombat && selectIsInCombat(nextState)) {
    store.dispatch(
      addNotification("Combat started! Be careful!", NOTIFICATION_TYPES.INFO),
    );
  }

  // Level-up ready notification (only when reaching threshold)
  if (!wasReadyToLevelUp && selectIsReadyToLevelUp(nextState)) {
    store.dispatch(
      addNotification(
        `You're ready to level up! You have enough experience for level ${nextState.player.level + 1}.`,
        NOTIFICATION_TYPES.SUCCESS,
      ),
    );
  }

  // Actual level-up notification
  if (nextState.player.level > prevLevel) {
    store.dispatch(
      addNotification(
        `Congratulations! You've reached level ${nextState.player.level}!`,
        NOTIFICATION_TYPES.SUCCESS,
      ),
    );
  }

  return result;
};

export default gameEventMiddleware;
