import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  npcs: {
    village_elder: {
      id: 'village_elder',
      name: 'Village Elder',
      description: 'The wise leader of the settlement, with years of knowledge about the region.',
      avatar: 1,
      location: 'village_center',
      hasInventory: false
    },
    blacksmith: {
      id: 'blacksmith',
      name: 'Grum the Blacksmith',
      description: 'A burly man with soot-covered hands and a warm heart.',
      avatar: 2,
      location: 'village_center',
      hasInventory: true
    },
    trader: {
      id: 'trader',
      name: 'Traveling Merchant',
      description: 'A well-traveled merchant with goods from distant lands.',
      avatar: 3,
      location: 'river_crossing',
      hasInventory: true
    },
    hunter_leader: {
      id: 'hunter_leader',
      name: 'Captain Vorn',
      description: 'Leader of the hunting party, skilled in tracking and survival.',
      avatar: 4,
      location: 'hunter_camp',
      hasInventory: false
    },
    hermit: {
      id: 'hermit',
      name: 'Old Hermit',
      description: 'A mysterious figure who lives in solitude by the ruins.',
      avatar: 5,
      location: 'ancient_ruins',
      hasInventory: false
    }
  }
};

const npcSlice = createSlice({
  name: 'npcs',
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
    }
  }
});

export const { addNPC, updateNPC, removeNPC } = npcSlice.actions;

// Select all NPCs
export const selectAllNPCs = createSelector(
  [(state) => state.npcs.npcs],
  (npcs) => Object.values(npcs)
);

// Select NPCs for current place
export const selectNPCsForCurrentPlace = createSelector(
  [selectAllNPCs, (state) => state.places.currentPlaceId],
  (npcs, currentPlaceId) => {
    if (!currentPlaceId) return [];
    return npcs.filter(npc => npc.location === currentPlaceId);
  }
);

// Select NPC by ID
export const selectNPCById = createSelector(
  [(state) => state.npcs.npcs, (state, npcId) => npcId],
  (npcs, npcId) => npcs[npcId] || null
);

export default npcSlice.reducer;
