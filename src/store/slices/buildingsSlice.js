import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const buildingsSlice = createSlice({
  name: "buildings",
  initialState,
  reducers: {
    setBuildings(state, action) {
      return action.payload;
    },
    updateBuilding(state, action) {
      const { id, data } = action.payload;
      if (state[id]) {
        state[id] = { ...state[id], ...data };
      }
    },
  },
});

export const { setBuildings, updateBuilding } = buildingsSlice.actions;
export default buildingsSlice.reducer;
