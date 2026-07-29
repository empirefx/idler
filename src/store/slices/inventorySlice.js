import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {},
  reducers: {
    setInventory(state, action) {
      return action.payload;
    },
    updateInventory(state, action) {
      state[action.payload.id] = action.payload.data;
    },
  },
});

export const { setInventory, updateInventory } = inventorySlice.actions;
export default inventorySlice.reducer;
