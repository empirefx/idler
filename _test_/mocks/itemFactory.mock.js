// Mock ItemFactory for testing
export const createMockItemFactory = () => ({
  create: vi.fn((type, quantity) => ({
    id: `${type}-${Date.now()}`,
    name: type,
    type: "material",
    quantity: Math.max(1, Math.floor(quantity || 1)),
    weight: 1,
  })),
  _reset: () => {
    createMockItemFactory().create.mockReset();
  },
});
