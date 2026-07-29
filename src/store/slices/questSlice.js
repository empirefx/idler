import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeById: {}, completedQuests: {} };

const questSlice = createSlice({
  name: "quests",
  initialState,
  reducers: {
    setQuests(state, action) {
      return { ...state, ...action.payload };
    },
    updateQuest(state, action) {
      const { questId, data } = action.payload;
      if (state.activeById[questId]) {
        state.activeById[questId] = { ...state.activeById[questId], ...data };
      }
    },
  },
});

export const { setQuests, updateQuest } = questSlice.actions;
export default questSlice.reducer;
