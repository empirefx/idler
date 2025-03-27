class Building {
  constructor(id, name, description, productionType) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.productionType = productionType;
    this.assignedWorkerId = null;
    this.baseProductionRate = 1; // Base production rate per second
  }

  // Calculate production for this building
  calculateProduction() {
    // Only produce if there's an assigned worker
    return this.hasAssignedWorker() ? this.baseProductionRate : 0;
  }

  // Assign a worker to this building
  assignWorker(workerId) {
    if (this.assignedWorkerId) {
      throw new Error('Building already has an assigned worker');
    }
    this.assignedWorkerId = workerId;
  }

  // Unassign a worker from this building
  unassignWorker(workerId) {
    if (this.assignedWorkerId === workerId) {
      this.assignedWorkerId = null;
    }
  }

  // Check if building has an assigned worker
  hasAssignedWorker() {
    return this.assignedWorkerId !== null;
  }

  // Get the assigned worker ID
  getAssignedWorkerId() {
    return this.assignedWorkerId;
  }
}

export default Building;