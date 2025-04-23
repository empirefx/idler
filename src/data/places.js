export const placesData = {
  village_center: {
    id: 'village_center',
    name: 'Village Center',
    description: 'The heart of your small settlement. A humble gathering place where villagers meet.',
    type: 'settlement',
    hasInventory: true,
    connections: ['forest_edge', 'river_crossing', 'farmlands'],
    'background-image': 'village_center.jpg',
    buildings: ['farm']
  },
  forest_edge: {
    id: 'forest_edge',
    name: 'Forest Edge',
    description: 'The boundary between civilization and wilderness. Ancient trees loom ahead.',
    type: 'wilderness',
    connections: ['village_center', 'deep_woods', 'hunter_camp'],
    'background-image': 'forest_edge.jpg',
    buildings: [],
    spawn: {
      type: 'single',
      pool: 'forest_beast',
      respawnDelay: 5,
      drops: [
        { itemId: 'apple', dropRate: 0.1 }
      ]
    }
  },
  deep_woods: {
    id: 'deep_woods',
    name: 'Deep Woods',
    description: 'Dense forest where valuable resources can be found, but dangers lurk in the shadows.',
    type: 'wilderness',
    connections: ['forest_edge', 'ancient_ruins'],
    'background-image': 'deep_woods.jpg',
    buildings: [],
    spawn: {
      type: 'single',
      pool: 'woodland_predator',
      respawnDelay: 8,
      drops: [
        { itemId: 'ore', dropRate: 0.3 }
      ]
    }
  },
  river_crossing: {
    id: 'river_crossing',
    name: 'River Crossing',
    description: 'A shallow part of the river where traders often rest.',
    type: 'landmark',
    connections: ['village_center', 'farmlands', 'fishing_spot'],
    'background-image': 'river_crossing.jpg',
    buildings: ['mine']
  },
  farmlands: {
    id: 'farmlands',
    name: 'Fertile Farmlands',
    description: 'Rich soil and open fields perfect for cultivation.',
    type: 'settlement',
    connections: ['village_center', 'river_crossing'],
    'background-image': 'farmlands.jpg',
    buildings: []
  },
  hunter_camp: {
    id: 'hunter_camp',
    name: "Hunter's Camp",
    description: 'A rustic outpost where hunters gather and prepare for their expeditions.',
    type: 'outpost',
    connections: ['forest_edge'],
    'background-image': 'hunter_camp.jpg',
    buildings: [],
    spawn: {
      type: 'single',
      pool: 'trained_hunters',
      respawnDelay: 10,
      drops: []
    }
  },
  fishing_spot: {
    id: 'fishing_spot',
    name: 'Fishing Spot',
    description: 'A peaceful location by the water where fish are plentiful.',
    type: 'gathering',
    connections: ['river_crossing'],
    'background-image': 'fishing_spot.jpg',
    buildings: []
  },
  ancient_ruins: {
    id: 'ancient_ruins',
    name: 'Ancient Ruins',
    description: 'The remains of an ancient civilization, filled with mysterious artifacts and valuable resources.',
    type: 'ruins',
    connections: ['deep_woods'],
    'background-image': 'ancient_ruins.jpg',
    buildings: [],
    spawn: {
      type: 'wave',
      pool: 'ruins_undead',
      waveSize: [3, 6],
      respawnDelay: 15,
      drops: [
        { itemId: 'ore', dropRate: 0.5 },
        { itemId: 'apple', dropRate: 0.2 }
      ]
    }
  }
};

export const metadata = {
  version: '1.0.9',
  lastUpdated: '2025-04-23'
}
