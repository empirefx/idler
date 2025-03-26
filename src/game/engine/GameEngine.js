import Building from '../models/Building';
import Player from '../models/Player';

class GameEngine {
  constructor() {
    console.log('Creating new GameEngine instance');
    this.buildings = new Map();
    this.player = new Player();
    this.resources = {
      food: 0,
      resources: 0
    };
    this.lastUpdate = Date.now();
    this.isRunning = false;
    this.tickInterval = null;
  }

  // Initialize the game with building data and workers
  initializeBuildings(buildingData) {
    try {
      console.log('Starting building initialization with data:', buildingData);
      
      if (!buildingData || !buildingData.buildings) {
        throw new Error('Invalid building data format');
      }

      // Clear existing buildings
      this.buildings.clear();

      // Initialize buildings
      Object.entries(buildingData.buildings).forEach(([id, data]) => {
        console.log(`Initializing building: ${id}`, data);
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

      console.log('Buildings initialized successfully:', Array.from(this.buildings.keys()));

      // Initialize workers only after buildings are set up
      console.log('Initializing workers...');
      try {
        // Clear any existing workers first
        this.player.workers.clear();
        
        // Add initial workers (exactly two)
        const worker1 = this.player.addWorker('John');
        console.log('Added worker 1:', worker1);
        const worker2 = this.player.addWorker('Sarah');
        console.log('Added worker 2:', worker2);
      } catch (error) {
        console.error('Failed to initialize workers:', error);
        // Log the error but don't throw it
        // This allows the game to continue even if worker initialization fails
        return;
      }
    } catch (error) {
      console.error('Failed to initialize buildings:', error);
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
      resources: { ...this.resources },
      buildings: Array.from(this.buildings.entries()).map(([id, building]) => ({
        id,
        quantity: building.quantity,
        name: building.name,
        description: building.description,
        productionType: building.productionType,
        assignedWorkerId: building.getAssignedWorkerId()
      })),
      workers: this.player.getAllWorkers(),
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
      // Don't save workers to maintain exactly two workers
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
      console.error('Failed to add worker:', error);
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
    console.log('Game cache cleared');
  }
}

export default GameEngine; 