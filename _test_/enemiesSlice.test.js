import { describe, it, expect } from 'vitest';
import enemiesReducer, { addEnemy, removeEnemy, removeEnemiesByPlace, damageEnemy, selectAllEnemies, selectEnemiesForCurrentPlace } from '../src/store/slices/enemiesSlice';

describe('enemiesSlice reducer and selectors', () => {
  let state;
  beforeEach(() => {
    state = enemiesReducer(undefined, { type: '' });
  });

  it('should initialize with empty state', () => {
    expect(state.byId).toEqual({});
    expect(state.allIds).toEqual([]);
  });

  it('should handle addEnemy', () => {
    const placeId = 'place1';
    const enemy = { id: 'e1', health: 10 };
    const newState = enemiesReducer(state, addEnemy({ placeId, enemy }));
    expect(newState.byId['e1']).toEqual({ ...enemy, placeId });
    expect(newState.allIds).toContain('e1');
  });

  it('should handle removeEnemy', () => {
    let s = enemiesReducer(state, addEnemy({ placeId: 'p', enemy: { id: 'e1', health: 5 } }));
    s = enemiesReducer(s, removeEnemy({ id: 'e1' }));
    expect(s.byId).not.toHaveProperty('e1');
    expect(s.allIds).not.toContain('e1');
  });

  it('should handle removeEnemiesByPlace', () => {
    let s = enemiesReducer(state, addEnemy({ placeId: 'p1', enemy: { id: 'e1', health: 1 } }));
    s = enemiesReducer(s, addEnemy({ placeId: 'p2', enemy: { id: 'e2', health: 1 } }));
    s = enemiesReducer(s, removeEnemiesByPlace('p1'));
    expect(s.byId).not.toHaveProperty('e1');
    expect(s.allIds).not.toContain('e1');
    expect(s.byId).toHaveProperty('e2');
    expect(s.allIds).toContain('e2');
  });

  it('should handle damageEnemy and remove on zero health', () => {
    let s = enemiesReducer(state, addEnemy({ placeId: 'p', enemy: { id: 'e1', health: 5 } }));
    s = enemiesReducer(s, damageEnemy({ id: 'e1', amount: 3 }));
    expect(s.byId['e1'].health).toBe(2);
    s = enemiesReducer(s, damageEnemy({ id: 'e1', amount: 5 }));
    expect(s.byId).not.toHaveProperty('e1');
    expect(s.allIds).not.toContain('e1');
  });

  it('selectAllEnemies returns list', () => {
    const s = enemiesReducer(state, addEnemy({ placeId: 'p', enemy: { id: 'e1', health: 1 } }));
    const list = selectAllEnemies({ enemies: s });
    expect(list).toEqual([s.byId['e1']]);
  });

  it('selectEnemiesForCurrentPlace filters by currentPlaceId', () => {
    let s = enemiesReducer(state, addEnemy({ placeId: 'p1', enemy: { id: 'e1', health: 1 } }));
    s = enemiesReducer(s, addEnemy({ placeId: 'p2', enemy: { id: 'e2', health: 1 } }));
    const globalState = { enemies: s, places: { currentPlaceId: 'p1' } };
    const list = selectEnemiesForCurrentPlace(globalState);
    expect(list).toEqual([s.byId['e1']]);
  });
});
