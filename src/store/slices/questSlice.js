import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
	activeById: {},
	completedQuests: {},
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
			if (state.completedQuests[questId]) return;

			state.activeById[questId] = {
				questId,
				acceptedAt: Date.now(),
				progress: {},
			};
		},

		questProgressUpdated: (state, action) => {
			const { questId, progressKey, value } = action.payload;
			if (!questId || !state.activeById[questId]) return;

			if (!state.activeById[questId].progress) {
				state.activeById[questId].progress = {};
			}

			state.activeById[questId].progress[progressKey] = value;
		},

		questCompleted: (state, action) => {
			const { questId, rewards } = action.payload;
			if (!questId) return;

			if (state.activeById[questId]) {
				delete state.activeById[questId];
			}

			state.completedQuests[questId] = {
				completedAt: Date.now(),
				rewardsClaimed: rewards || null,
			};
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

export const {
	questAccepted,
	questCompleted,
	questAbandoned,
	questProgressUpdated,
} = questSlice.actions;

// Selectors
export const selectQuestState = (state) => state.quests;

export const selectActiveQuestIds = createSelector(
	[selectQuestState],
	(questState) => Object.keys(questState.activeById || {}),
);

export const selectCompletedQuestIds = createSelector(
	[selectQuestState],
	(questState) => Object.keys(questState.completedQuests || {}),
);

export const selectIsQuestActive = (questId) => (state) =>
	Boolean(state.quests.activeById?.[questId]);

export const selectIsQuestCompleted = (questId) => (state) =>
	Boolean(state.quests.completedQuests?.[questId]);

export const selectQuestProgress = (questId, progressKey) => (state) =>
	state.quests.activeById?.[questId]?.progress?.[progressKey] ?? 0;

export default questSlice.reducer;
