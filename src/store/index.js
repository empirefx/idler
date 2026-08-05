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
import { setPlayerGold, setPlayerHp, setPlayerExp, setPlayerLevel, setCurrentPlace, setPlayerState } from "./slices/playerSlice";
import { setEnemies } from "./slices/enemiesSlice";
import { setPlaces, setCurrentPlaceId, updateSocket } from "./slices/placesSlice";
import { setQuests, questAccepted, questCompleted } from "./slices/questSlice";
import { setCombatState } from "./slices/combatSlice";
import { addNotification } from "./slices/notificationSlice";

export const diffMiddleware = (store) => (next) => (action) => {
  if (action.type === "APPLY_DIFF") {
    const { path, data, value } = action.payload;
    const val = data !== undefined ? data : value;
    if (path === "player.gold") store.dispatch(setPlayerGold(val));
    else if (path === "player.hp") store.dispatch(setPlayerHp(val));
    else if (path === "player.exp") store.dispatch(setPlayerExp(val));
    else if (path === "player.level") store.dispatch(setPlayerLevel(val));
    else if (path === "player.currentPlaceId") {
      store.dispatch(setCurrentPlace(val));
      store.dispatch(setCurrentPlaceId(val));
    }
    else if (path === "player.derivedStats") store.dispatch(setPlayerState({ derivedStats: val }));
    else if (path === "player.activeBuffs") store.dispatch(setPlayerState({ activeBuffs: val }));
    else if (path === "player.activeCooldowns") store.dispatch(setPlayerState({ activeCooldowns: val }));
    else if (path === "player.pausedCooldowns") store.dispatch(setPlayerState({ pausedCooldowns: val }));
    else if (path === "player.skills") store.dispatch(setPlayerState({ skills: val }));
    else if (path === "player.skillPoints") store.dispatch(setPlayerState({ skillPoints: val }));
    else if (path === "player.stats") store.dispatch(setPlayerState({ stats: val }));
    else if (path === "player.lastAttackTime") store.dispatch(setPlayerState({ lastAttackTime: val }));
    else if (path === "player.autoCombat") store.dispatch(setPlayerState({ autoCombat: val }));
    else if (path === "player.isDead") store.dispatch(setPlayerState({ isDead: val }));
    else if (path === "player.maxHp") store.dispatch(setPlayerState({ maxHp: val }));
    else if (path === "player.expToNext") store.dispatch(setPlayerState({ expToNext: val }));
    else if (path === "player") store.dispatch(setPlayerState(val));
    else if (path === "players.workers") store.dispatch(setPlayerState({ workers: val?.hired || [], workerSlots: val?.workerSlots || 0, availablePool: val?.available || [] }));
    else if (path.startsWith("enemies")) store.dispatch(setEnemies(val));
    else if (path === "sockets") store.dispatch(updateSocket({ placeId: val.placeId, socketIndex: val.socketIndex, data: val }));
    else if (path.startsWith("places")) store.dispatch(setPlaces(val));
    else if (path.startsWith("quests")) store.dispatch(setQuests(val));
    else if (path.startsWith("combat")) store.dispatch(setCombatState(val));
    else if (path.startsWith("notifications")) store.dispatch(addNotification(val));
    return;
  }
  if (action.type === "ACCEPT_QUEST") {
    store.dispatch(questAccepted(action.payload));
    return;
  }
  if (action.type === "COMPLETE_QUEST") {
    store.dispatch(questCompleted(action.payload));
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
