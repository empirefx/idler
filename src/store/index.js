import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./slices/playerSlice";
import buildingsReducer from "./slices/buildingsSlice";
import placesReducer from "./slices/placesSlice";
import playerInventoryReducer from "./slices/playerInventorySlice";
import placeInventoryReducer from "./slices/placeInventorySlice";
import npcInventoryReducer from "./slices/npcInventorySlice";
import npcReducer from "./slices/npcSlice";
import enemiesReducer from "./slices/enemiesSlice";
import combatReducer from "./slices/combatSlice";
import logReducer from "./slices/logSlice";
import notificationReducer from "./slices/notificationSlice";
import logMiddleware from "./middleware/logMiddleware";
import gameEventMiddleware from "./middleware/gameEventMiddleware";

export const store = configureStore({
	reducer: {
		player: playerReducer,
		buildings: buildingsReducer,
		places: placesReducer,
		playerInventory: playerInventoryReducer,
		placeInventory: placeInventoryReducer,
		npcInventory: npcInventoryReducer,
		npcs: npcReducer,
		enemies: enemiesReducer,
		combat: combatReducer,
		logs: logReducer,
		notifications: notificationReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(logMiddleware, gameEventMiddleware),
});

export default store;
