import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  present: [],
  pokedBy: { nickname: null, key: 0 },
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    setPresent(state, action) {
      state.present = action.payload || [];
    },
    setPokedBy(state, action) {
      const nickname = action.payload;
      state.pokedBy = { nickname, key: state.pokedBy.key + 1 };
    },
  },
});

export const { setPresent, setPokedBy } = playersSlice.actions;
export default playersSlice.reducer;

export const selectPresentPlayers = createSelector(
  (state) => state.players.present,
  (present) => present,
);
export const selectPokedBy = createSelector(
  (state) => state.players.pokedBy,
  (pokedBy) => pokedBy,
);
