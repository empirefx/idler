// Mock SpawnService for testing
export const createMockSpawnService = () => {
  const mockInstance = {
    _reset: () => {
      // Reset mock state if needed
    },
    currentPlaceId: null,
    get spawners() {
      return [];
    },
    getSpawner: vi.fn(() => null),
    getCurrentSpawner: vi.fn(() => null),
    destroy: vi.fn(),
    // Backward compatibility
    onEnterPlace: vi.fn(),
  };

  // Mock constructor
  const MockSpawnService = vi.fn(() => mockInstance);

  return MockSpawnService;
};
