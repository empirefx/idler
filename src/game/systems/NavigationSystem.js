class NavigationSystem {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
  }

  getCurrentPlace() {
    return this.gameEngine.player.currentLocation;
  }

  getBackgroundImage() {
    const currentPlaceData = this.gameEngine.places.get(this.getCurrentPlace());
    return currentPlaceData?.['background-image'] || '';
  }

  getAvailableConnections() {
    const currentPlaceData = this.gameEngine.places.get(this.getCurrentPlace());
    if (!currentPlaceData || !currentPlaceData.connections) {
      return [];
    }
    return currentPlaceData.connections.map(placeId => ({
      id: placeId,
      ...this.gameEngine.places.get(placeId)
    }));
  }

  moveToPlace(placeId) {
    const currentPlaceData = this.gameEngine.places.get(this.getCurrentPlace());
    if (!currentPlaceData || !currentPlaceData.connections.includes(placeId)) {
      throw new Error('Cannot move to disconnected place');
    }
    // Update player's current location
    this.gameEngine.player.currentLocation = placeId;
    return this.gameEngine.places.get(placeId);
  }
}

export default NavigationSystem;
