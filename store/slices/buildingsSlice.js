import { createSlice } from '@reduxjs/toolkit';
import buildingsData from '../../src/data/buildings.json';

// Create a flattened object structure for the initial state
// https://redux.js.org/style-guide/#do-not-put-non-serializable-values-in-state-or-actions
const initialStateBuildings = Object.entries(buildingsData.buildings).reduce((acc, [id, building]) => {
  acc[id] = {
    ...building,
    id,
    assignedWorkerId: null
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
    assignWorker: (state, action) => {
      const { buildingId, workerId } = action.payload;
      if (state[buildingId]) {
        state[buildingId].assignedWorkerId = workerId;
      }
    },
    unassignWorker: (state, action) => {
      const { buildingId } = action.payload;
      if (state[buildingId]) {
        state[buildingId].assignedWorkerId = null;
      }
    },
    updateBuilding: (state, action) => {
      const { buildingId, data } = action.payload;
      if (state[buildingId]) {
        state[buildingId] = {
          ...state[buildingId],
          ...data
        };
      }
    }
  },
});

export const { assignWorker, unassignWorker, updateBuilding } = buildingsSlice.actions;

// Selectors
export const selectAllBuildings = (state) => state.buildings;
export const selectBuildingById = (state, buildingId) => state.buildings[buildingId];
export const selectAssignedBuildings = (state) => {
  return Object.values(state.buildings)
    .filter(building => building.assignedWorkerId !== null);
};

export default buildingsSlice.reducer;