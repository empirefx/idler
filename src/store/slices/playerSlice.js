import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: 1, gold: 0, exp: 0, hp: 100, maxHp: 100,
  vitality: 10, agility: 10, strength: 10, intelligence: 10,
  skillPoints: 0, currentPlaceId: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerState(state, action) {
      return { ...state, ...action.payload };
    },
    setPlayerGold(state, action) {
      state.gold = action.payload;
    },
    setPlayerHp(state, action) {
      state.hp = action.payload;
    },
    setPlayerExp(state, action) {
      state.exp = action.payload;
    },
    setPlayerLevel(state, action) {
      state.level = action.payload;
    },
    setCurrentPlace(state, action) {
      state.currentPlaceId = action.payload;
    },
  },
});

export const { setPlayerState, setPlayerGold, setPlayerHp, setPlayerExp, setPlayerLevel, setCurrentPlace } = playerSlice.actions;
export default playerSlice.reducer;
