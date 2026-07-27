import { configureStore } from "@reduxjs/toolkit";
import gameEventMiddleware from "./middleware/gameEventMiddleware";
import gameplayMiddleware from "./middleware/gameplayMiddleware";
import logMiddleware from "./middleware/logMiddleware";
import notificationMiddleware from "./middleware/notificationMiddleware";
import buildingsReducer from "./slices/buildingsSlice";
import combatReducer from "./slices/combatSlice";
import enemiesReducer from "./slices/enemiesSlice";
import inventoryReducer from "./slices/inventorySlice";
import logReducer from "./slices/logSlice";
import notificationReducer from "./slices/notificationSlice";
import npcReducer from "./slices/npcSlice";
import placesReducer from "./slices/placesSlice";
import playerReducer from "./slices/playerSlice";
import questsReducer from "./slices/questSlice";

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
			notificationMiddleware,
		),
});

export default store;
