import { createSlice, createSelector } from '@reduxjs/toolkit';

import inventoryData from '../../data/inventory.json';

// Create a flattened object structure for the initial state
const initialStateInventories = Object.entries(inventoryData.inventory).reduce((acc, [id, inventory]) => {
  acc[id] = {
    ...inventory,
    id
  };
  return acc;
}, {});

const initialState = {
  ...initialStateInventories
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    updateInventory(state, action) {
      state.inventory = action.payload;
    },
  },
});

export const { updateInventory } = inventorySlice.actions;

// Selectors
export const selectInventory = (state) => state.inventory;
export const selectPlayerInventory = (state) => state.inventory.player;

// Memoized selectors
export const selectVaultByPlaceId = createSelector(
  [selectInventory, (state, placeId) => placeId],
  (inventory, placeId) => (inventory ? inventory[placeId] : undefined)
);
export default inventorySlice.reducer;