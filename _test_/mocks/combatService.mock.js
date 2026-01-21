// Mock CombatService for testing
export const createMockCombatService = () => ({
  initialize: vi.fn(),
  handleCombatStateChange: vi.fn(),
  startCombat: vi.fn(),
  stopCombat: vi.fn(),
  handleEnemyDrops: vi.fn(),
  handleEnemyExpGain: vi.fn(),
  subscribeToCombatChanges: vi.fn(),
  _reset: () => {
    createMockCombatService().initialize.mockReset();
    createMockCombatService().handleCombatStateChange.mockReset();
    createMockCombatService().startCombat.mockReset();
    createMockCombatService().stopCombat.mockReset();
    createMockCombatService().handleEnemyDrops.mockReset();
    createMockCombatService().handleEnemyExpGain.mockReset();
    createMockCombatService().subscribeToCombatChanges.mockReset();
  }
});

