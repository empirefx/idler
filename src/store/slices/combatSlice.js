import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isInCombat: false,
  targetEnemyId: null
};

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    startCombat: state => { state.isInCombat = true; },
    stopCombat: state => {
      state.isInCombat = false;
    },
    setTarget: (state, action) => {
      state.targetEnemyId = action.payload;
    },
    clearTarget: state => {
      state.targetEnemyId = null;
    }
  }
});

export const { startCombat, stopCombat, setTarget, clearTarget } = combatSlice.actions;

export const selectIsInCombat = state => state.combat.isInCombat;
export const selectTargetEnemyId = state => state.combat.targetEnemyId;

export default combatSlice.reducer;
