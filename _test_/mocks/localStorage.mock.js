// Mock localStorage for testing
export const createMockLocalStorage = () => {
  let store = {};

  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    // Helper for testing
    _getStore: () => ({ ...store }),
    _setStore: (newStore) => {
      store = { ...newStore };
    },
    _reset: () => {
      store = {};
      createMockLocalStorage().getItem.mockReset();
      createMockLocalStorage().setItem.mockReset();
      createMockLocalStorage().removeItem.mockReset();
      createMockLocalStorage().clear.mockReset();
    },
  };
};
