export const enemyCatalog = {
  forest_beast: {
    id: 'forest_beast',
    name: 'Forest Beast',
    avatar: '1.png',
    baseHealth: 50,
    baseAttack: 8,
    speed: 1.2,
    attackDelayRange: [100, 200],
    attackPattern: 'staggered'
  },
  woodland_predator: {
    id: 'woodland_predator',
    name: 'Woodland Predator',
    avatar: '2.png',
    baseHealth: 80,
    baseAttack: 12,
    speed: 1.5,
    attackDelayRange: [100, 600],
    attackPattern: 'staggered'
  },
  trained_hunters: {
    id: 'trained_hunters',
    name: 'Trained Hunters',
    avatar: '3.png',
    baseHealth: 60,
    baseAttack: 10,
    speed: 1.0,
    attackDelayRange: [300, 500],
    attackPattern: 'staggered'
  },
  ruins_undead: {
    id: 'ruins_undead',
    name: 'Ruins Undead',
    avatar: '4.png',
    baseHealth: 90,
    baseAttack: 20,
    speed: 0.8,
    attackDelayRange: [200, 600],
    attackPattern: 'staggered'
  }
};

export const metadata = {
  version: '1.0.3',
  lastUpdated: '2025-04-23'
}
