import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPlaceId: "village_center",
  previousPlaceId: null,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    setPlaces(state, action) {
      return { ...state, ...action.payload };
    },
    setCurrentPlaceId(state, action) {
      state.currentPlaceId = action.payload;
    },
    updateSocket(state, action) {
      const { placeId, socketIndex, data } = action.payload;
      if (state[placeId]?.sockets?.[socketIndex]) {
        state[placeId].sockets[socketIndex] = { ...state[placeId].sockets[socketIndex], ...data };
      }
    },
  },
});

export const { setPlaces, setCurrentPlaceId, updateSocket } = placesSlice.actions;
export default placesSlice.reducer;
