import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getWs } from "../ws";

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

export const selectCurrentPlace = (state) => {
  const place = state.places[state.places.currentPlaceId];
  return place || null;
};

export const selectCurrentPlaceId = (state) => state.places.currentPlaceId;
export const selectPreviousPlaceId = (state) => state.places.previousPlaceId;

export const selectCurrentPlaceSockets = (state) => {
  const place = selectCurrentPlace(state);
  return place?.sockets || [];
};

const selectPlacesState = (state) => state.places;
export const selectAvailableConnections = createSelector(
  [selectCurrentPlace, selectPlacesState],
  (place, places) => {
    const connections = place?.connections || [];
    return connections.map((id) => places[id]).filter(Boolean);
  },
);

export const selectBackgroundImage = (state) => {
  const place = selectCurrentPlace(state);
  return place?.["background-image"] || place?.backgroundImage || null;
};

export const navigateToPlace = (placeId) => (dispatch) => {
  const ws = getWs();
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: "NAVIGATE", placeId }));
  }
};
