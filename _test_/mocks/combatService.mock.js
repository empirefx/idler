// Mock CombatService for testing
export const createMockCombatService = () => ({
  startCombat: vi.fn(),
  stopCombat: vi.fn(),
  _reset: () => {
    createMockCombatService().startCombat.mockReset();
    createMockCombatService().stopCombat.mockReset();
  }
});