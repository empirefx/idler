// Strategies and operations for managing places (inventory, production, etc.)
export const PlaceSelector = {
  
  // Find first place with hasInventory:true
  findFirstWithInventory(state) {
    const places = Object.values(state.places || {});
    return places.find(p => p.hasInventory);
  },
};
