import Worker from './Worker';

class Player {
  constructor() {
    this.workers = new Map();
    this.MAX_WORKERS = 5;
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
}

export default Player; 