import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './slices/playerSlice';
import buildingsReducer from './slices/buildingsSlice';
import placesReducer from './slices/placesSlice';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    buildings: buildingsReducer,
    places: placesReducer
  },
});

export default store;
