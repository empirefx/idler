import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import buildingsReducer from './slices/buildingsSlice';
import placesReducer from './slices/placesSlice';
import inventoryReducer from './slices/inventorySlice';
import enemiesReducer from './slices/enemiesSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    buildings: buildingsReducer,
    places: placesReducer,
    inventory: inventoryReducer,
    enemies: enemiesReducer
  },
});

export default store;
