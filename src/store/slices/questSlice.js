import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activeById: {},
	completedIds: [],
};

const questSlice = createSlice({
	name: "quests",
	initialState,
	reducers: {
		questAccepted: (state, action) => {
			const questId = action.payload;
			if (!questId) return;

			// Do not re-add if already active or completed
			if (state.activeById[questId]) return;
			if (state.completedIds.includes(questId)) return;

			state.activeById[questId] = {
				questId,
				acceptedAt: Date.now(),
			};
		},

		questCompleted: (state, action) => {
			const questId = action.payload;
			if (!questId) return;

			if (!state.completedIds.includes(questId)) {
				state.completedIds.push(questId);
			}

			if (state.activeById[questId]) {
				delete state.activeById[questId];
			}
		},

		questAbandoned: (state, action) => {
			const questId = action.payload;
			if (!questId) return;

			if (state.activeById[questId]) {
				delete state.activeById[questId];
			}
		},
	},
});

export const { questAccepted, questCompleted, questAbandoned } = questSlice.actions;

// Selectors
export const selectQuestState = (state) => state.quests;

export const selectActiveQuestIds = (state) =>
	Object.keys(state.quests.activeById || {});

export const selectIsQuestActive =
	(questId) =>
	(state) =>
		Boolean(state.quests.activeById?.[questId]);

export const selectIsQuestCompleted =
	(questId) =>
	(state) =>
		Boolean(state.quests.completedIds?.includes(questId));

export default questSlice.reducer;

