import Worker from './Worker';

class Player {
  constructor() {
    this.workers = new Map();
    this.MAX_WORKERS = 5;
    this.currentLocation = 'village_center';
    this.resources = {
      gold: 0,
      food: 0,
      materials: 0
    };
  }

  addResource(resource, amount) {
    if (this.resources[resource] === undefined) {
      this.resources[resource] = 0;
    }
    this.resources[resource] += amount;
  }

  removeResource(resource, amount) {
    if (this.resources[resource] === undefined) {
      this.resources[resource] = 0;
    }
    this.resources[resource] -= amount;
  }

  getAvailableResources() {
    return this.resources;
  }

  addWorker(name) {
    if (this.workers.size >= this.MAX_WORKERS) {
      throw new Error('Maximum number of workers reached (5)');
    }

    const id = `worker_${this.workers.size + 1}`;
    const worker = new Worker(id, name);
    this.workers.set(id, worker);
    return worker;
  }

  removeWorker(workerId) {
    const worker = this.workers.get(workerId);
    if (worker) {
      worker.unassign();
      this.workers.delete(workerId);
    }
  }

  getWorker(workerId) {
    return this.workers.get(workerId);
  }

  loadFromData(data) {
    this.MAX_WORKERS = data.MAX_WORKERS;
    this.currentLocation = data.currentLocation;

    data.workers.forEach(worker => {
      this.addWorker(worker.name);
    });

    data.resources.forEach(resource => {
      this.addResource(resource.name, resource.amount);
    });
  }

  getAllWorkers() {
    return Array.from(this.workers.values());
  }

  assignWorkerToBuilding(workerId, buildingId) {
    const worker = this.getWorker(workerId);
    if (worker) {
      worker.assignToBuilding(buildingId);
    }
  }

  unassignWorker(workerId) {
    const worker = this.getWorker(workerId);
    if (worker) {
      worker.unassign();
    }
  }

  getAssignedWorkers(buildingId) {
    return this.getAllWorkers().filter(worker => worker.assignedBuildingId === buildingId);
  }

  getCurrentLocation() {
    return this.currentLocation;
  }

  setCurrentLocation(locationId) {
    this.currentLocation = locationId;
  }
}

export default Player;