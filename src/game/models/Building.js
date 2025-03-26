class Building {
  constructor(id, name, description, productionType) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.productionType = productionType;
    this.quantity = 0;
    this.assignedWorkerId = null;
  }

  // Calculate production for this building
  calculateProduction() {
    // Base production logic will go here
    return this.quantity;
  }

  // Assign a worker to this building
  assignWorker(workerId) {
    if (this.assignedWorkerId) {
      throw new Error('Building already has an assigned worker');
    }
    this.assignedWorkerId = workerId;
    this.quantity += 1;
  }

  // Unassign a worker from this building
  unassignWorker(workerId) {
    if (this.assignedWorkerId === workerId) {
      this.assignedWorkerId = null;
      this.quantity = Math.max(0, this.quantity - 1);
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