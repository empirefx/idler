import { describe, it, expect } from 'vitest';
import combatReducer, { startCombat, stopCombat, selectIsInCombat } from '../src/store/slices/combatSlice';

describe('combatSlice', () => {
  it('should have initial isInCombat false', () => {
    const initialState = combatReducer(undefined, { type: '' });
    expect(initialState.isInCombat).toBe(false);
  });

  it('should handle startCombat', () => {
    const prevState = { isInCombat: false };
    const nextState = combatReducer(prevState, startCombat());
    expect(nextState.isInCombat).toBe(true);
  });

  it('should handle stopCombat', () => {
    const prevState = { isInCombat: true };
    const nextState = combatReducer(prevState, stopCombat());
    expect(nextState.isInCombat).toBe(false);
  });

  it('selectIsInCombat returns state.combat.isInCombat', () => {
    const globalState = { combat: { isInCombat: true } };
    expect(selectIsInCombat(globalState)).toBe(true);
  });
});
