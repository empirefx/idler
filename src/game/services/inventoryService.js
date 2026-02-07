// Handles inventory logic for places
export const InventoryService = {
  // Get the inventory object for a given place
  getInventoryForPlace(state, placeId) {
    const inventories = state.placeInventory;
    return inventories && placeId ? inventories[placeId] : undefined;
  },

  // Add an item to a place's inventory (dispatch must be provided)
  addItemToInventory(store, placeId, item) {
    store.dispatch({
      type: "placeInventory/addItem",
      payload: {
        inventoryId: placeId,
        item,
      },
    });
  },
};
