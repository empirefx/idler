// Mock SpawnService for testing
export const createMockSpawnService = () => ({
  // SpawnService constructor takes eventBus, but we mock the instance
  _reset: () => {
    // Reset mock state if needed
  }
});