import { createSlice } from '@reduxjs/toolkit';
import buildingsData from '../../data/buildings.json';

// Create a flattened object structure for the initial state
const initialStateBuildings = Object.entries(buildingsData.buildings).reduce((acc, [id, building]) => {
  acc[id] = {
    ...building,
    id
  };
  return acc;
}, {});

const initialState = {
  ...initialStateBuildings
};

export const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    updateBuilding: (state, action) => {
      const { buildingId, data } = action.payload;
      if (state[buildingId]) {
        state[buildingId] = {
          ...state[buildingId],
          ...data
        };
      }
    },
    calculateProduction: (state, action) => {
      const { buildingId } = action.payload;
      if (state[buildingId]) {
        state[buildingId].production = state[buildingId].baseProduction;
      }
    }
  },
});

export const { updateBuilding } = buildingsSlice.actions;

// Selectors
export const selectAllBuildings = (state) => state.buildings;
export const selectBuildingById = (state, buildingId) => state.buildings[buildingId];

// Memoized selectors

export default buildingsSlice.reducer;