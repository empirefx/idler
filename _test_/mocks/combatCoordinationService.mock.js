// Mock CombatCoordinationService for testing
export const createMockCombatCoordinationService = () => ({
  handleCombatStateChange: vi.fn(),
  startCombat: vi.fn(),
  stopCombat: vi.fn(),
  handleEnemyDrops: vi.fn(),
  handleEnemyExpGain: vi.fn(),
  subscribeToCombatChanges: vi.fn(),
  _reset: () => {
    createMockCombatCoordinationService().handleCombatStateChange.mockReset();
    createMockCombatCoordinationService().startCombat.mockReset();
    createMockCombatCoordinationService().stopCombat.mockReset();
    createMockCombatCoordinationService().handleEnemyDrops.mockReset();
    createMockCombatCoordinationService().handleEnemyExpGain.mockReset();
    createMockCombatCoordinationService().subscribeToCombatChanges.mockReset();
  }
});