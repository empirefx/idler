export const itemCatalog = {
  apple: {
    id: 1,
    type: 'consumable',
    name: 'apple',
    description: 'A fresh apple',
    quantity: 0,
    weight: 0.5,
    consumable: { heal: 10 }
  },
  banana: {
    id: 2,
    type: 'consumable',
    name: 'banana',
    description: 'A ripe banana',
    quantity: 0,
    weight: 0.5,
    consumable: { heal: 12 }
  },
  ore: {
    id: 3,
    type: 'material',
    name: 'ore',
    description: 'A piece of ore',
    quantity: 0,
    weight: 2
  },
};

export const metadata = {
  version: "1.0.6",
  lastUpdated: "2025-04-23"
};
