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
    setTarget(state, action) {
      state.targetEnemyId = action.payload;
    },
  },
});

export const { setCombatState, startCombat, stopCombat, setTarget } = combatSlice.actions;
export default combatSlice.reducer;
