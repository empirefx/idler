import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from '@reduxjs/toolkit';

const initialState = {
  byId: {},
  allIds: []
};

const enemiesSlice = createSlice({
  name: 'enemies',
  initialState,
  reducers: {
    addEnemy(state, action) {
      const { placeId, enemy } = action.payload;
      state.byId[enemy.id] = { ...enemy, placeId };
      state.allIds.push(enemy.id);
    },
    removeEnemy(state, action) {
      const { id } = action.payload;
      if (state.byId[id]) {
        delete state.byId[id];
        state.allIds = state.allIds.filter(eid => eid !== id);
      }
    }
  }
});

export const { addEnemy, removeEnemy } = enemiesSlice.actions;

// Basic state selectors
const selectEnemiesState = (state) => state.enemies;
const selectCurrentPlaceId = (state) => state.places.currentPlaceId;

// Memoized selectors
export const selectAllEnemies = createSelector(
  [selectEnemiesState],
  (enemiesState) => enemiesState.allIds.map((id) => enemiesState.byId[id])
);
export const selectEnemiesForCurrentPlace = createSelector(
  [selectAllEnemies, selectCurrentPlaceId],
  (enemiesList, currentPlaceId) =>
    enemiesList.filter((enemy) => enemy.placeId === currentPlaceId)
);

export default enemiesSlice.reducer;
