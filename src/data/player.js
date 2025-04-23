export const playerData = {
  id: 1,
  name: 'John Doe',
  MAX_WORKERS: 5,
  avatar: '1.png',
  baseHealth: 120,
  baseAttack: 16,
  health: 120,
  attack: 16,
  level: 1,
  exp: 0,
  stats: {
    strength: 10,
    defense: 5,
    agility: 7,
    vitality: 12
  },
  resources: [
    { name: 'gold', amount: 0 }
  ],
  workers: [
    { id: 1, name: 'Milo Bladovan', avatar: 'worker_m.jpg', assignedBuildingId: null },
    { id: 2, name: 'Silik Ludorin', avatar: 'worker_f.jpg', assignedBuildingId: null },
    { id: 3, name: 'Kresibrin Dobronimir', avatar: 'worker_m.jpg', assignedBuildingId: null }
  ]
};

export const metadata = {
  version: '1.0.12',
  lastUpdated: '2025-04-23'
}
