import { itemCatalog } from "../../data/itemCatalog";

// Handles item creation logic, including randomization, upgrades, etc.
export class ItemFactory {
  // Create an item object for production, using the itemCatalog and optional randomization
  static create(productionType, quantity, options = {}) {
    const itemDef = itemCatalog[productionType];
    if (!itemDef) return null;
    // Example: add random quality if requested
    const item = {
      ...itemDef,
      quantity,
    };
    if (options.randomQuality) {
      item.quality = Math.floor(Math.random() * 5) + 1; // 1-5
    }
    // More randomization/logic can be added here
    return item;
  }
}
