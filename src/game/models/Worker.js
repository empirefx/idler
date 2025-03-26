class Worker {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.assignedBuildingId = null;
  }

  assignToBuilding(buildingId) {
    this.assignedBuildingId = buildingId;
  }

  unassign() {
    this.assignedBuildingId = null;
  }

  isAssigned() {
    return this.assignedBuildingId !== null;
  }
}

export default Worker; 