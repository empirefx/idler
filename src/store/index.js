import { configureStore } from "@reduxjs/toolkit";
import logMiddleware from "./middleware/logMiddleware";
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
import { setPlayerGold, setPlayerHp, setPlayerExp, setPlayerLevel, setCurrentPlace } from "./slices/playerSlice";
import { setEnemies } from "./slices/enemiesSlice";
import { setPlaces, setCurrentPlaceId } from "./slices/placesSlice";
import { setBuildings } from "./slices/buildingsSlice";
import { setQuests } from "./slices/questSlice";
import { setCombatState } from "./slices/combatSlice";
import { addNotification } from "./slices/notificationSlice";

const diffMiddleware = (store) => (next) => (action) => {
  if (action.type === "APPLY_DIFF") {
    const { path, data } = action.payload;
    if (path === "player.gold") store.dispatch(setPlayerGold(data));
    else if (path === "player.hp") store.dispatch(setPlayerHp(data));
    else if (path === "player.exp") store.dispatch(setPlayerExp(data));
    else if (path === "player.level") store.dispatch(setPlayerLevel(data));
    else if (path === "player.currentPlaceId") store.dispatch(setCurrentPlace(data));
    else if (path === "player") store.dispatch({ type: "player/setPlayerState", payload: data });
    else if (path.startsWith("enemies")) store.dispatch(setEnemies(data));
    else if (path.startsWith("buildings")) store.dispatch(setBuildings(data));
    else if (path.startsWith("places")) store.dispatch(setPlaces(data));
    else if (path.startsWith("quests")) store.dispatch(setQuests(data));
    else if (path.startsWith("combat")) store.dispatch(setCombatState(data));
    return;
  }
  return next(action);
};

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
    getDefaultMiddleware().concat(logMiddleware, diffMiddleware),
});

export default store;
