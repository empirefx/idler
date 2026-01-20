// Mock InventoryService for testing
export const createMockInventoryService = () => ({
  addItemToInventory: vi.fn(),
  getInventoryForPlace: vi.fn(),
  _reset: () => {
    createMockInventoryService().addItemToInventory.mockReset();
    createMockInventoryService().getInventoryForPlace.mockReset();
  }
});