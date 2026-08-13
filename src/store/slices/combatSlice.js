import { createSlice } from "@reduxjs/toolkit";

const initialState = { isInCombat: false, targetEnemyId: null };

const combatSlice = createSlice({
  name: "combat",
  initialState,
  reducers: {
    setCombatState(state, action) {
      return { ...state, ...action.payload };
    },
    startCombat(state) {
      state.isInCombat = true;
    },
    stopCombat(state) {
      state.isInCombat = false;
    },
  },
});

export const { setCombatState, startCombat, stopCombat } = combatSlice.actions;
export default combatSlice.reducer;

export const selectIsInCombat = (state) => state.combat.isInCombat;
