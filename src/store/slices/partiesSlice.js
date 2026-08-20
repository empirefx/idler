import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partyList: [],
  currentParty: null,
};

const partiesSlice = createSlice({
  name: "parties",
  initialState,
  reducers: {
    setPartyList(state, action) {
      state.partyList = action.payload || [];
    },
    setCurrentParty(state, action) {
      state.currentParty = action.payload || null;
    },
    clearCurrentParty(state) {
      state.currentParty = null;
    },
  },
});

export const { setPartyList, setCurrentParty, clearCurrentParty } = partiesSlice.actions;
export default partiesSlice.reducer;
