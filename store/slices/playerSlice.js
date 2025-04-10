import { createSlice, createSelector } from '@reduxjs/toolkit';
import playerData from '../../src/data/player.json';

const initialState = {
  id: playerData.id,
  name: playerData.name,
  MAX_WORKERS: playerData.MAX_WORKERS,
  // currentLocation: playerData.currentLocation,
  resources: playerData.resources,
  workers: playerData.workers,
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addResource: (state, action) => {
      const { resource, amount } = action.payload;
      state.resources[resource] = (state.resources[resource] || 0) + amount;
    },
    removeResource: (state, action) => {
      const { resource, amount } = action.payload;
      state.resources[resource] = (state.resources[resource] || 0) - amount;
    },
    addWorker: (state, action) => {
      const { worker } = action.payload;
      state.workers.push(worker);
    },
    removeWorker: (state, action) => {
      const { workerId } = action.payload;
      state.workers = state.workers.filter(worker => worker.id !== workerId);
    },
    // setCurrentLocation: (state, action) => {
    //   state.currentLocation = action.payload;
    // },
    unassignWorker: (state, action) => {
      const { workerId } = action.payload;
      const worker = state.workers.find(worker => worker.id === workerId);
      if (worker) {
        worker.assignedBuildingId = null; // Set to null rather than removing the worker
      }
    },
    assignWorkerToBuilding: (state, action) => {
      const { workerId, buildingId } = action.payload;
      const worker = state.workers.find(worker => worker.id === workerId);
      if (worker) {
        worker.assignedBuildingId = buildingId;
      }
    },
  },
});

// Action creators
export const { 
  addResource, 
  removeResource, 
  addWorker, 
  removeWorker, 
  // setCurrentLocation, 
  unassignWorker, 
  assignWorkerToBuilding 
} = playerSlice.actions;

// Selectors
// export const selectCurrentLocation = state => state.player.currentLocation;
export const selectWorkers = state => state.player.workers;
export const selectWorker = workerId => state => 
  state.player.workers.find(worker => worker.id === workerId);
export const selectAssignedWorkers = createSelector(
  [selectWorkers],
  (workers) => workers.filter(worker => worker.assignedBuildingId)
);
export const selectUnassignedWorkers = createSelector(
  [selectWorkers],
  workers => workers.filter(worker => !worker.assignedBuildingId)
);
export const selectResources = state => state.player.resources;

export default playerSlice.reducer;
