import Building from '../models/Building';

class GameEngine {
  constructor() {
    this.buildings = new Map();
    this.resources = {
      worker: 0,
      food: 0,
      resources: 0
    };
    this.lastUpdate = Date.now();
    this.isRunning = false;
    this.tickInterval = null;
  }

  // Initialize the game with building data
  initializeBuildings(buildingData) {
    Object.entries(buildingData.buildings).forEach(([id, data]) => {
      this.buildings.set(id, new Building(
        id,
        data.name,
        data.description,
        data.productionType
      ));
    });
  }

  // Start the game loop
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastUpdate = Date.now();
    this.tickInterval = setInterval(() => this.tick(), 1000); // Update every second
  }

  // Stop the game loop
  stop() {
    this.isRunning = false;
    if (this.tickInterval) {
      clearInterval(this.tickInterval);
      this.tickInterval = null;
    }
  }

  // Game tick
  tick() {
    if (!this.isRunning) return;

    const now = Date.now();
    const deltaTime = (now - this.lastUpdate) / 1000; // Convert to seconds
    this.lastUpdate = now;

    this.update(deltaTime);
  }

  // Update game state
  update(deltaTime) {
    // Update resources based on building production
    this.buildings.forEach(building => {
      const production = building.calculateProduction();
      this.resources[building.productionType] += production * deltaTime;
    });
  }

  // Get current game state
  getState() {
    return {
      resources: { ...this.resources },
      buildings: Array.from(this.buildings.entries()).map(([id, building]) => ({
        id,
        quantity: building.quantity,
        name: building.name,
        description: building.description,
        productionType: building.productionType
      }))
    };
  }

  // Save game state
  save() {
    const state = {
      resources: { ...this.resources },
      buildings: Array.from(this.buildings.entries()).map(([id, building]) => ({
        id,
        quantity: building.quantity
      }))
    };
    localStorage.setItem('gameState', JSON.stringify(state));
  }

  // Load game state
  load() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.resources = state.resources;
      state.buildings.forEach(({ id, quantity }) => {
        const building = this.buildings.get(id);
        if (building) {
          building.quantity = quantity;
        }
      });
    }
  }
}

export default GameEngine; 