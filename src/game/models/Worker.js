class Worker {
  constructor(id, name, avatar) {
    this.id = id;
    this.name = name;
    this.assignedBuildingId = null;
    this.avatar = avatar;
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