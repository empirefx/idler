import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isInCombat: false
};

const combatSlice = createSlice({
  name: 'combat',
  initialState,
  reducers: {
    startCombat: state => { state.isInCombat = true; },
    stopCombat: state => { state.isInCombat = false; }
  }
});

export const { startCombat, stopCombat } = combatSlice.actions;

// Selectors
export const selectIsInCombat = state => state.combat.isInCombat;

export default combatSlice.reducer;
