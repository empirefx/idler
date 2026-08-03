import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = { byId: {}, allIds: [] };

const enemiesSlice = createSlice({
  name: "enemies",
  initialState,
  reducers: {
    setEnemies(state, action) {
      state.byId = action.payload.byId || {};
      state.allIds = action.payload.allIds || [];
    },
    addEnemy(state, action) {
      const enemy = action.payload;
      if (!state.byId[enemy.id]) {
        state.byId[enemy.id] = { ...enemy, isDead: false };
        state.allIds.push(enemy.id);
      }
    },
    removeEnemy(state, action) {
      const { id } = action.payload;
      if (state.byId[id]) {
        delete state.byId[id];
        state.allIds = state.allIds.filter(eid => eid !== id);
      }
    },
    damageEnemy(state, action) {
      const { id, amount } = action.payload;
      const enemy = state.byId[id];
      if (enemy && !enemy.isDead) {
        enemy.hp = Math.max(0, (enemy.hp || enemy.maxHp || 0) - amount);
        if (enemy.hp <= 0) enemy.isDead = true;
      }
    },
  },
});

export const { setEnemies, addEnemy, removeEnemy, damageEnemy } = enemiesSlice.actions;
export default enemiesSlice.reducer;

const selectEnemiesById = (state) => state.enemies.byId;
const selectCurrentPlaceIdRef = (state) => state.places?.currentPlaceId;
export const selectEnemiesForCurrentPlace = createSelector(
  [selectEnemiesById, selectCurrentPlaceIdRef],
  (byId, placeId) => Object.values(byId).filter((e) => e.placeId === placeId),
);
