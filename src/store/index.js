import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import buildingsReducer from './slices/buildingsSlice';
import placesReducer from './slices/placesSlice';
import playerInventoryReducer from './slices/playerInventorySlice';
import placeInventoryReducer from './slices/placeInventorySlice';
import enemiesReducer from './slices/enemiesSlice';
import combatReducer from './slices/combatSlice';
import logReducer from './slices/logSlice';
import logMiddleware from './middleware/logMiddleware';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    buildings: buildingsReducer,
    places: placesReducer,
    playerInventory: playerInventoryReducer,
    placeInventory: placeInventoryReducer,
    enemies: enemiesReducer,
    combat: combatReducer,
    logs: logReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logMiddleware)
});

export default store;
