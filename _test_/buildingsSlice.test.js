import { describe, it, expect } from 'vitest';
import buildingsReducer, { updateBuilding, setBuildings, selectAllBuildings, selectBuildingById } from '../src/store/slices/buildingsSlice';
import buildingsData from '../src/data/buildings.json';

describe('buildingsSlice', () => {
  let initialState;
  beforeEach(() => {
    initialState = buildingsReducer(undefined, { type: 'init' });
  });

  it('should initialize state from buildingsData', () => {
    const expected = Object.entries(buildingsData.buildings).reduce((acc, [id, building]) => {
      acc[id] = { ...building, id };
      return acc;
    }, {});
    expect(initialState).toEqual(expected);
  });

  it('should handle updateBuilding', () => {
    const firstId = Object.keys(initialState)[0];
    const newState = buildingsReducer(initialState, updateBuilding({ buildingId: firstId, data: { baseProduction: 50 } }));
    expect(newState[firstId].baseProduction).toBe(50);
  });

  it('should handle setBuildings', () => {
    const payload = { foo: { id: 'foo', baseProduction: 10 } };
    const newState = buildingsReducer(initialState, setBuildings(payload));
    expect(newState).toEqual(payload);
  });

  it('selectAllBuildings and selectBuildingById selectors', () => {
    const global = { buildings: initialState };
    expect(selectAllBuildings(global)).toBe(initialState);
    const id = Object.keys(initialState)[0];
    expect(selectBuildingById(global, id)).toBe(initialState[id]);
  });
});
