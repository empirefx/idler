import Gameplay from "../../game/core/Gameplay";
import { PLAYER_INTENT_ACCEPT_QUEST } from "../../game/events";

let gameplayInstance = null;

const gameplayMiddleware = (store) => (next) => (action) => {
	if (!gameplayInstance) {
		gameplayInstance = new Gameplay(store, store.dispatch);
	}

	if (action.type === PLAYER_INTENT_ACCEPT_QUEST) {
		// Handle high-level player intent via Gameplay and do not forward
		gameplayInstance.handleQuestAcceptIntent(action.payload || {});
		return;
	}

	return next(action);
};

export default gameplayMiddleware;

