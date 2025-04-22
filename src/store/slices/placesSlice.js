import { createSlice } from '@reduxjs/toolkit';
import placesData from '../../data/places.json';

const initialPlacesMap = Object.entries(placesData.places).reduce((acc, [id, place]) => {
  acc[id] = {
    ...place,
    visited: id === 'village_center', // Start with only village_center as visited
    features: place.features || {},
    buildings: place.buildings || [],
    resources: place.resources || {}
  };
  return acc;
}, {});

const initialState = {
  // Store places directly in the state object instead of nested
  ...initialPlacesMap,
  currentPlaceId: 'village_center', // Start at village center
  previousPlaceId: null,
  availableConnections: [], // Will be populated in extraReducers
  discoveredPlaces: ['village_center'], // Start with only village center discovered
  metadata: placesData.metadata || { version: '1.0.0' }
};

// Helper function to update available connections
const updateAvailableConnections = (state) => {
  const currentPlace = state[state.currentPlaceId];
  if (currentPlace && currentPlace.connections) {
    state.availableConnections = currentPlace.connections.map(placeId => ({
      id: placeId,
      ...state[placeId]  // Include all properties from the connected place
    }));
  } else {
    state.availableConnections = [];
  }
};

export const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    navigateToPlace: (state, action) => {
      const placeId = action.payload;
      // Make sure the place exists and is connected to current place
      if (state[placeId] &&
          (state[state.currentPlaceId].connections.includes(placeId) ||
           placeId === state.currentPlaceId)) {
        // Save previous place
        state.previousPlaceId = state.currentPlaceId;
        // Update current place
        state.currentPlaceId = placeId;
        // Mark as visited
        state[placeId].visited = true;
        // Update available connections
        updateAvailableConnections(state);
      }
    },
    // Set entire places state (used for loading saved state)
    setPlaces: (state, action) => action.payload
  },
  
  extraReducers: (builder) => {
    // This will run when the reducer is first created
    builder.addCase('@@INIT', (state) => {
      updateAvailableConnections(state);
    }),
    builder.addMatcher(
      (action) => action.type === 'places/navigateToPlace',
      (state) => {
        // Ensure available connections are updated after navigation
        updateAvailableConnections(state);
      }
    );
  }
});

export const { navigateToPlace, setPlaces } = placesSlice.actions;

// Essential selectors
export const selectCurrentPlace = (state) => state.places[state.places.currentPlaceId];
export const selectAvailableConnections = (state) => state.places.availableConnections;
export const selectBackgroundImage = (state) => {
  const currentPlace = state.places[state.places.currentPlaceId];
  return currentPlace ? currentPlace['background-image'] : null;
};
export const selectCurrentPlaceBuildings = (state) => {
  const currentPlace = state.places[state.places.currentPlaceId];
  return currentPlace ? currentPlace.buildings : [];
};

export default placesSlice.reducer;