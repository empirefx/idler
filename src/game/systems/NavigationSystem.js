class NavigationSystem {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.currentPlace = 'village_center'; // Default starting location
  }

  getCurrentPlace() {
    return this.currentPlace;
  }

  getAvailableConnections() {
    const currentPlaceData = this.gameEngine.places.get(this.currentPlace);
    if (!currentPlaceData || !currentPlaceData.connections) {
      return [];
    }
    return currentPlaceData.connections.map(placeId => ({
      id: placeId,
      ...this.gameEngine.places.get(placeId)
    }));
  }

  moveToPlace(placeId) {
    const currentPlaceData = this.gameEngine.places.get(this.currentPlace);
    if (!currentPlaceData || !currentPlaceData.connections.includes(placeId)) {
      throw new Error('Cannot move to disconnected place');
    }
    this.currentPlace = placeId;
    return this.gameEngine.places.get(placeId);
  }
}

export default NavigationSystem;
