class Building {
  constructor(id, name, description, productionType) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.productionType = productionType;
    this.quantity = 0;
  }

  // Calculate production for this building
  calculateProduction() {
    // Base production logic will go here
    return this.quantity;
  }

  // Add a building
  add(amount = 1) {
    this.quantity += amount;
  }

  // Remove a building
  remove(amount = 1) {
    this.quantity = Math.max(0, this.quantity - amount);
  }
}

export default Building; 