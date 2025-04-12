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
        
        // If not already discovered, add to discovered places
        if (!state.discoveredPlaces.includes(placeId)) {
          state.discoveredPlaces.push(placeId);
        }
        
        // Update available connections
        updateAvailableConnections(state);
      }
    },
    
    returnToPreviousPlace: (state) => {
      if (state.previousPlaceId) {
        // Swap current and previous
        const temp = state.currentPlaceId;
        state.currentPlaceId = state.previousPlaceId;
        state.previousPlaceId = temp;
        
        // Update available connections
        updateAvailableConnections(state);
      }
    },
    
    discoverPlace: (state, action) => {
      const placeId = action.payload;
      
      if (state[placeId] && !state.discoveredPlaces.includes(placeId)) {
        state.discoveredPlaces.push(placeId);
      }
    },
    
    addBuildingToPlace: (state, action) => {
      const { placeId, buildingId } = action.payload;
      
      if (state[placeId] && !state[placeId].buildings.includes(buildingId)) {
        state[placeId].buildings.push(buildingId);
      }
    },
    
    removeBuildingFromPlace: (state, action) => {
      const { placeId, buildingId } = action.payload;
      
      if (state[placeId]) {
        state[placeId].buildings = state[placeId].buildings.filter(id => id !== buildingId);
      }
    },
    
    updatePlaceResources: (state, action) => {
      const { placeId, resources } = action.payload;
      
      if (state[placeId]) {
        state[placeId].resources = {
          ...state[placeId].resources,
          ...resources
        };
      }
    },
    
    addFeatureToPlace: (state, action) => {
      const { placeId, featureId, feature } = action.payload;
      
      if (state[placeId]) {
        state[placeId].features = {
          ...state[placeId].features,
          [featureId]: feature
        };
      }
    },
    
    removeFeatureFromPlace: (state, action) => {
      const { placeId, featureId } = action.payload;
      
      if (state[placeId] && state[placeId].features) {
        const { [featureId]: removed, ...remainingFeatures } = state[placeId].features;
        state[placeId].features = remainingFeatures;
      }
    },
    
    updatePlaceMetadata: (state, action) => {
      state.metadata = {
        ...state.metadata,
        ...action.payload,
        lastUpdated: new Date().toISOString()
      };
    }
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

// Export actions
export const {
  navigateToPlace,
  returnToPreviousPlace,
  discoverPlace,
  addBuildingToPlace,
  removeBuildingFromPlace,
  updatePlaceResources,
  addFeatureToPlace,
  removeFeatureFromPlace,
  updatePlaceMetadata
} = placesSlice.actions;

// Updated selectors to work with the flattened state
export const selectAllPlaces = (state) => {
  const { currentPlaceId, previousPlaceId, availableConnections, discoveredPlaces, metadata, ...places } = state.places;
  return places;
};
export const selectCurrentPlace = (state) => state.places[state.places.currentPlaceId];
export const selectCurrentPlaceId = (state) => state.places.currentPlaceId;
export const selectAvailableConnections = (state) => state.places.availableConnections;
export const selectDiscoveredPlaces = (state) => state.places.discoveredPlaces;
export const selectPlaceById = (state, placeId) => state.places[placeId];
export const selectBackgroundImage = (state) => {
  const currentPlace = state.places[state.places.currentPlaceId];
  return currentPlace ? currentPlace['background-image'] : null;
};
export const selectCurrentPlaceBuildings = (state) => {
  const currentPlace = state.places[state.places.currentPlaceId];
  return currentPlace ? currentPlace.buildings : [];
};
export const selectCurrentPlaceFeatures = (state) => {
  const currentPlace = state.places[state.places.currentPlaceId];
  return currentPlace ? currentPlace.features : {};
};
export const selectCurrentPlaceResources = (state) => {
  const currentPlace = state.places[state.places.currentPlaceId];
  return currentPlace ? currentPlace.resources : {};
};

export default placesSlice.reducer;