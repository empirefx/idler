import { createSlice } from '@reduxjs/toolkit';
import playerData from '../../src/data/player.json';

const initialState = {
  id: playerData.id,
  name: playerData.name,
  MAX_WORKERS: playerData.MAX_WORKERS,
  currentLocation: playerData.currentLocation,
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
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    getWorker: (state, action) => {
      const { workerId } = action.payload;
      return state.workers.find(worker => worker.id === workerId);
    },
    getAssignedWorkers: (state, action) => {
      const { buildingId } = action.payload;
      return state.workers.filter(worker => worker.assignedBuildingId === buildingId);
    },
    unassignWorker: (state, action) => {
      const { workerId } = action.payload;
      state.workers = state.workers.filter(worker => worker.id !== workerId);
    },
    assignWorkerToBuilding: (state, action) => {
      const { workerId, buildingId } = action.payload;
      const worker = state.workers.find(worker => worker.id === workerId);
      if (worker) {
        worker.assignedBuildingId = buildingId;
      }
    },
    getAvailableWorkers: (state) => {
      return state.workers.filter(worker => !worker.assignedBuildingId);
    },
    getAvailableResources: (state) => {
      return state.resources;
    },
  },
});

export const { addResource, removeResource, addWorker, removeWorker, setCurrentLocation, getWorker, getAssignedWorkers, unassignWorker, assignWorkerToBuilding, getAvailableWorkers, getAvailableResources } = playerSlice.actions;
export default playerSlice.reducer;
