import { createSlice, createSelector } from "@reduxjs/toolkit";
import { npcCatalog } from "../../data/npcCatalog";

// Merge catalog data with runtime state
const initialState = {
	npcs: Object.keys(npcCatalog).reduce((acc, npcId) => {
		acc[npcId] = {
			...npcCatalog[npcId],
			hasInventory: npcCatalog[npcId].hasInventory || false,
		};
		return acc;
	}, {}),
};

const npcSlice = createSlice({
	name: "npcs",
	initialState,
	reducers: {
		// Add new NPC
		addNPC(state, action) {
			const { npcId, npcData } = action.payload;
			state.npcs[npcId] = npcData;
		},

		// Update NPC
		updateNPC(state, action) {
			const { npcId, npcData } = action.payload;
			if (state.npcs[npcId]) {
				state.npcs[npcId] = { ...state.npcs[npcId], ...npcData };
			}
		},

		// Remove NPC
		removeNPC(state, action) {
			const { npcId } = action.payload;
			delete state.npcs[npcId];
		},
	},
});

export const { addNPC, updateNPC, removeNPC } = npcSlice.actions;

// Select all NPCs
export const selectAllNPCs = createSelector(
	[(state) => state.npcs.npcs],
	(npcs) => Object.values(npcs),
);

// Select NPCs for current place
export const selectNPCsForCurrentPlace = createSelector(
	[selectAllNPCs, (state) => state.places.currentPlaceId],
	(npcs, currentPlaceId) => {
		if (!currentPlaceId) return [];
		return npcs.filter((npc) => npc.location === currentPlaceId);
	},
);

// Select NPC by ID
export const selectNPCById = createSelector(
	[(state) => state.npcs.npcs, (_state, npcId) => npcId],
	(npcs, npcId) => npcs[npcId] || null,
);

export default npcSlice.reducer;
