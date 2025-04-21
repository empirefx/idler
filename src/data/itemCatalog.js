// Centralized item catalog for all produced items
export const itemCatalog = {
  apple:    { id: 1, type: 'consumable', name: 'Apple', description: 'A fresh apple', quantity: 0, weight: 0.5, consumable: { heal: 10 } },
  banana:   { id: 3, type: 'consumable', name: 'Banana', description: 'A ripe banana', quantity: 0, weight: 0.5, consumable: { heal: 12 } },
  ore:      { id: 2, type: 'material', name: 'Ore', description: 'A piece of ore', quantity: 0, weight: 2 },
};

export const itemCatalogMetadata = {
  version: "1.0.3",
  lastUpdated: "2025-04-21"
};
