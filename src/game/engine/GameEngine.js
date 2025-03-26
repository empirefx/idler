import Building from '../models/Building';
import Player from '../models/Player';
import placesData from '../../data/places.json';
import NavigationSystem from '../systems/NavigationSystem';

class GameEngine {
  constructor() {
    this.buildings = new Map();
    this.player = new Player();
    this.resources = {
      food: 0,
      materials: 0
    };
    this.places = new Map(
      Object.entries(placesData.places)
    );
    this.navigation = new NavigationSystem(this);
    this.lastUpdate = Date.now();
    this.isRunning = false;
    this.tickInterval = null;
  }

  // Initialize the game with building data and workers
  initializeBuildings(buildingData) {
    try {
      if (!buildingData || !buildingData.buildings) {
        throw new Error('Invalid building data format');
      }

      // Clear existing buildings
      this.buildings.clear();

      // Initialize buildings
      Object.entries(buildingData.buildings).forEach(([id, data]) => {
        if (!id || !data.name || !data.description || !data.productionType) {
          throw new Error(`Invalid building data for building ${id}`);
        }
        this.buildings.set(id, new Building(
          id,
          data.name,
          data.description,
          data.productionType
        ));
      });

      // Initialize workers
      try {
        // Clear any existing workers first
        this.player.workers.clear();
        
        // Add initial workers (exactly two)
        this.player.addWorker('John');
        this.player.addWorker('Sarah');
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    }
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
      resources: {
        food: this.resources.food,
        materials: this.resources.materials
      },
      buildings: Array.from(this.buildings.values()),
      workers: Array.from(this.player.workers.values()),
      places: Array.from(this.places.values()),
      player: this.player
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
      
      // Load buildings
      state.buildings.forEach(({ id, quantity }) => {
        const building = this.buildings.get(id);
        if (building) {
          building.quantity = quantity;
        }
      });

      // Don't load workers from saved state to maintain exactly two workers
      // Workers will be reinitialized with the default two workers
    }
  }

  // Worker management methods
  assignWorkerToBuilding(workerId, buildingId) {
    const building = this.buildings.get(buildingId);
    if (!building) {
      throw new Error('Building not found');
    }

    // If building already has a worker, unassign it first
    if (building.hasAssignedWorker()) {
      const currentWorkerId = building.getAssignedWorkerId();
      this.player.unassignWorker(currentWorkerId);
    }

    // Assign the new worker
    building.assignWorker(workerId);
    this.player.assignWorkerToBuilding(workerId, buildingId);
    this.save();
  }

  unassignWorker(workerId) {
    const worker = this.player.getWorker(workerId);
    if (!worker) {
      throw new Error('Worker not found');
    }

    if (worker.isAssigned()) {
      const building = this.buildings.get(worker.assignedBuildingId);
      if (building) {
        building.unassignWorker(workerId);
      }
    }

    this.player.unassignWorker(workerId);
    this.save();
  }

  addWorker(name) {
    try {
      this.player.addWorker(name);
      this.save();
    } catch (error) {
      throw error;
    }
  }

  removeWorker(workerId) {
    this.player.removeWorker(workerId);
    this.save();
  }

  // Clear game cache
  clearCache() {
    localStorage.removeItem('gameState');
  }
}

export default GameEngine;