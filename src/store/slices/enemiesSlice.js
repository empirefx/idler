import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setEnemies, addEnemy, removeEnemy } = enemiesSlice.actions;
export default enemiesSlice.reducer;
