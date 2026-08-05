import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeById: {}, completedQuests: {} };

const questSlice = createSlice({
  name: "quests",
  initialState,
  reducers: {
    setQuests(state, action) {
      const { active, completed, activeById, completedQuests } = action.payload || {};
      return {
        ...state,
        activeById: activeById || active || {},
        completedQuests: completedQuests || completed || {},
      };
    },
    updateQuest(state, action) {
      const { questId, data } = action.payload;
      if (state.activeById[questId]) {
        state.activeById[questId] = { ...state.activeById[questId], ...data };
      }
    },
    questAccepted(state, action) {
      const { questId, progress } = action.payload;
      if (questId && !state.activeById[questId]) {
        state.activeById[questId] = progress || { questId, startedAt: Date.now(), objectives: {} };
      }
    },
    questCompleted(state, action) {
      const { questId } = action.payload;
      if (state.activeById[questId]) {
        const completed = state.activeById[questId];
        delete state.activeById[questId];
        state.completedQuests[questId] = { ...completed, completedAt: Date.now() };
      }
    },
  },
});

export const { setQuests, updateQuest, questAccepted, questCompleted } = questSlice.actions;
export default questSlice.reducer;

export const selectActiveQuestIds = (state) =>
  Object.keys(state.quests.activeById || {});

export const selectCompletedQuestIds = (state) =>
  Object.keys(state.quests.completedQuests || {});
