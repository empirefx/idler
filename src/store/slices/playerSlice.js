import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  level: 1, gold: 0, exp: 0, expToNext: 100, hp: 100, maxHp: 100,
  stats: { strength: 10, defense: 0, agility: 10, vitality: 10, intelligence: 10, wisdom: 0 },
  skillPoints: 0, currentPlaceId: null,
  skills: {}, workers: [], workerSlots: 0, knownRecipes: [],
  availablePool: [], resources: {},
  attackCooldown: 2000, lastAttackTime: 0,
  activeBuffs: [], activeCooldowns: {}, pausedCooldowns: {},
  autoCombat: false, isDead: false,
  derivedStats: null,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerState(state, action) {
      return { ...state, ...action.payload };
    },
    setPlayerGold(state, action) { state.gold = action.payload; },
    setPlayerHp(state, action) { state.hp = action.payload; },
    setPlayerExp(state, action) { state.exp = action.payload; },
    setPlayerLevel(state, action) { state.level = action.payload; },
    setCurrentPlace(state, action) { state.currentPlaceId = action.payload; },
    addGold(state, action) { state.gold += action.payload; },
    spendGold(state, action) { state.gold -= action.payload; },
    assignWorkerToSocketWithEvent(state, action) {
      const { workerId } = action.payload;
      const worker = state.workers?.find((w) => w.id === workerId);
      if (worker) worker.assigned = true;
    },
    unassignWorkerFromSocketWithEvent(state, action) {
      const { workerId } = action.payload;
      const worker = state.workers?.find((w) => w.id === workerId);
      if (worker) worker.assigned = false;
    },
  },
});

export const {
  setPlayerState, setPlayerGold, setPlayerHp, setPlayerExp,
  setPlayerLevel, setCurrentPlace, addGold, spendGold,
  assignWorkerToSocketWithEvent, unassignWorkerFromSocketWithEvent,
} = playerSlice.actions;
export default playerSlice.reducer;

export const selectPlayer = (state) => state.player;
export const selectGold = (state) => state.player.gold;
export const selectPlayerSkills = (state) => state.player.skills || {};
export const selectSkillPoints = (state) => state.player.skillPoints || 0;
export const selectKnownRecipes = (state) => state.player.knownRecipes || [];
export const selectWorkers = (state) => state.player.workers || [];
export const selectWorkerSlots = (state) => state.player.workerSlots || 0;
export const selectAvailableWorkers = createSelector(
  (state) => state.player.workers,
  (workers) => (workers || []).filter((w) => !w.assigned),
);
export const selectResources = (state) => state.player.resources || {};
export const selectActiveCooldowns = (state) => state.player.activeCooldowns || {};
export const selectPausedCooldowns = (state) => state.player.pausedCooldowns || {};
export const selectAutoCombat = (state) => state.player.autoCombat || false;
export const selectIsDead = (state) => state.player.isDead || false;
export const selectDerivedStats = (state) => state.player.derivedStats || null;
export const selectMaxHp = (state) => state.player.maxHp || 0;
export const selectStats = (state) => state.player.stats || {};
