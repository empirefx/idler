import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = { byId: {}, allIds: [] };

function mergeEnemyOrder(prevAllIds, prevById, nextById, placeId) {
  const allIds = [];
  for (const id of prevAllIds) {
    const existing = prevById[id];
    if (!existing) continue;
    if (nextById[id]) {
      allIds.push(id);
    } else if (placeId && existing.isDead && existing.placeId === placeId) {
      allIds.push(id);
    }
  }
  for (const id of Object.keys(nextById)) {
    if (!prevById[id]) allIds.push(id);
  }
  const byId = {};
  for (const id of allIds) {
    byId[id] = nextById[id] || prevById[id];
  }
  return { byId, allIds };
}

const enemiesSlice = createSlice({
  name: "enemies",
  initialState,
  reducers: {
    setEnemies(state, action) {
      const payload = action.payload || {};
      const nextById = payload.byId || payload;
      const merged = mergeEnemyOrder(state.allIds, state.byId, nextById, payload.placeId);
      state.byId = merged.byId;
      state.allIds = merged.allIds;
    },
    spawnEnemies(state, action) {
      const { enemies, placeId } = action.payload;
      const nextById = {};
      for (const enemy of enemies) {
        nextById[enemy.id] = { ...enemy, isDead: false };
      }
      const merged = mergeEnemyOrder(state.allIds, state.byId, nextById, placeId);
      state.byId = merged.byId;
      state.allIds = merged.allIds;
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
    updateEnemy(state, action) {
      const { id, ...patch } = action.payload;
      const enemy = state.byId[id];
      if (enemy) {
        state.byId[id] = { ...enemy, ...patch };
      }
    },
  },
});

export const { setEnemies, addEnemy, removeEnemy, damageEnemy, updateEnemy, spawnEnemies } = enemiesSlice.actions;
export default enemiesSlice.reducer;

const selectEnemiesById = (state) => state.enemies.byId;
const selectCurrentPlaceIdRef = (state) => state.places?.currentPlaceId;
export const selectEnemiesForCurrentPlace = createSelector(
  [selectEnemiesById, selectCurrentPlaceIdRef],
  (byId, placeId) => Object.values(byId).filter((e) => e.placeId === placeId),
);
