import { createSlice, createSelector } from '@reduxjs/toolkit';

import {playerData} from '../../data/player';

const initialState = { ...playerData };

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
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
    // Apply damage to player health
    damagePlayer: (state, action) => {
      const { amount } = action.payload;
      state.health = Math.max(0, state.health - amount);
    },
    // Heal player health
    healPlayer: (state, action) => {
      const { amount } = action.payload;
      state.health = Math.min(state.baseHealth, state.health + amount);
    },
    setPlayerState: (state, action) => {
      // This will replace the entire player state with the saved one
      // Only for loading saved states!
      return action.payload; // Replace entire state with payload
    },
    gainExp: (state, action) => {
      const { amount } = action.payload;
      state.exp += amount;
    },
    levelUp: (state, action) => {
      const required = state.level * 100;
      if (state.exp < required) return;
      state.exp -= required;
      state.level += 1;
      const { strength = 0, defense = 0, agility = 0, vitality = 0 } = action.payload;
      state.stats.strength += strength;
      state.stats.defense += defense;
      state.stats.agility += agility;
      state.stats.vitality += vitality;
    }
  },
});

// Action creators
export const { 
  unassignWorker,
  assignWorkerToBuilding,
  damagePlayer,
  healPlayer,
  setPlayerState,
  gainExp,
  levelUp
} = playerSlice.actions;

// Selectors
export const selectWorkers = state => state.player.workers;
export const selectResources = state => state.player.resources;

// Memoized selectors
export const selectPlayer = createSelector(
  state => state.player,
  player => ({
    id: player.id,
    avatar: player.avatar,
    name: player.name,
    stats: player.stats,
    health: player.health,
    maxHealth: player.baseHealth,
    attack: player.baseAttack,
    level: player.level,
    exp: player.exp,
    expToNext: player.level * 100
  })
);
export const listBuildingsWithAssignedWorkers = createSelector(
  [selectWorkers],
  (workers) => workers.filter(worker => worker.assignedBuildingId).map(worker => worker.assignedBuildingId)
);
export const selectAssignedWorkers = createSelector(
  [selectWorkers],
  (workers) => workers.filter(worker => worker.assignedBuildingId)
);
export const selectUnassignedWorkers = createSelector(
  [selectWorkers],
  workers => workers.filter(worker => !worker.assignedBuildingId)
);

// Centralized selectors for player resources and workers
export const selectGold = createSelector(
  [selectResources],
  resources => resources.find(r => r.name === 'gold')?.amount || 0
);
export const selectWorkerCount = createSelector(
  [selectWorkers],
  workers => workers.length
);
export const selectMaxWorkers = state => state.player.MAX_WORKERS;

export default playerSlice.reducer;
