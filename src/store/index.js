import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import buildingsReducer from "./slices/buildingsSlice";
import placesReducer from "./slices/placesSlice";
import inventoryReducer from "./slices/inventorySlice";
import npcReducer from "./slices/npcSlice";
import enemiesReducer from "./slices/enemiesSlice";
import combatReducer from "./slices/combatSlice";
import logReducer from "./slices/logSlice";
import notificationReducer from "./slices/notificationSlice";
import logMiddleware from "./middleware/logMiddleware";
import gameEventMiddleware from "./middleware/gameEventMiddleware";
import questsReducer from "./slices/questSlice";
import gameplayMiddleware from "./middleware/gameplayMiddleware";

export const store = configureStore({
	reducer: {
		player: playerReducer,
		buildings: buildingsReducer,
		places: placesReducer,
		inventory: inventoryReducer,
		npcs: npcReducer,
		enemies: enemiesReducer,
		combat: combatReducer,
		logs: logReducer,
		notifications: notificationReducer,
		quests: questsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			logMiddleware,
			gameEventMiddleware,
			gameplayMiddleware,
		),
});

export default store;
