import { describe, it, expect } from 'vitest';
import playerReducer, {
  unassignWorker,
  assignWorkerToBuilding,
  damagePlayer,
  healPlayer,
  setPlayerState,
  gainExp,
  levelUp,
  selectWorkers,
  selectResources,
  selectPlayer,
  listBuildingsWithAssignedWorkers,
  selectAssignedWorkers,
  selectUnassignedWorkers,
  selectGold,
  selectWorkerCount,
  selectMaxWorkers,
} from '../src/store/slices/playerSlice';
import playerData from '../src/data/player.json';

describe('playerSlice reducer and selectors', () => {
  const initialState = playerReducer(undefined, { type: '' });

  it('should initialize state from playerData and selectors', () => {
    expect(initialState.id).toBe(playerData.id);
    expect(initialState.name).toBe(playerData.name);
    expect(initialState.stats).toEqual(playerData.stats);
    expect(selectWorkers({ player: initialState })).toEqual(initialState.workers);
    expect(selectResources({ player: initialState })).toEqual(initialState.resources);
    expect(selectGold({ player: initialState })).toBe(
      playerData.resources.find(r => r.name === 'gold').amount
    );
    expect(selectWorkerCount({ player: initialState })).toBe(initialState.workers.length);
    expect(selectMaxWorkers({ player: initialState })).toBe(playerData.MAX_WORKERS);
  });

  it('should assign and unassign worker', () => {
    const workerId = initialState.workers[0].id;
    let state = playerReducer(initialState, assignWorkerToBuilding({ workerId, buildingId: 'b1' }));
    expect(state.workers.find(w => w.id === workerId).assignedBuildingId).toBe('b1');
    state = playerReducer(state, unassignWorker({ workerId }));
    expect(state.workers.find(w => w.id === workerId).assignedBuildingId).toBe(null);
  });

  it('should damage and heal player health', () => {
    let state = playerReducer(initialState, damagePlayer({ amount: 10 }));
    const damagedHealth = state.health;
    expect(damagedHealth).toBe(Math.max(0, initialState.health - 10));
    state = playerReducer(state, healPlayer({ amount: 5 }));
    const healedHealth = state.health;
    expect(healedHealth).toBe(Math.min(initialState.baseHealth, damagedHealth + 5));
  });

  it('should handle experience gain and level up', () => {
    let state = playerReducer(initialState, gainExp({ amount: 150 }));
    expect(state.exp).toBe(initialState.exp + 150);
    // Level up if enough exp
    const required = initialState.level * 100;
    state = playerReducer(state, levelUp({ strength: 1, defense: 1, agility: 1, vitality: 1 }));
    if (initialState.exp + 150 >= required) {
      expect(state.level).toBe(initialState.level + 1);
      expect(state.exp).toBe(initialState.exp + 150 - required);
    }
  });

  it('should list assigned and unassigned workers', () => {
    const workerId = initialState.workers[0].id;
    let state = playerReducer(initialState, assignWorkerToBuilding({ workerId, buildingId: 'b1' }));
    expect(listBuildingsWithAssignedWorkers({ player: state })).toEqual(['b1']);
    expect(selectAssignedWorkers({ player: state }).length).toBeGreaterThan(0);
    expect(selectUnassignedWorkers({ player: initialState }).length).toBe(initialState.workers.length);
  });

  it('selectPlayer returns correct UI player object', () => {
    const ui = selectPlayer({ player: initialState });
    expect(ui).toHaveProperty('id', initialState.id);
    expect(ui).toHaveProperty('health', initialState.health);
    expect(ui).toHaveProperty('expToNext', initialState.level * 100);
  });
});
