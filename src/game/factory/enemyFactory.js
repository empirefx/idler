import { enemyCatalog } from '../../data/enemyCatalog';

// Factory for creating enemy instances with base stats
export class EnemyFactory {
  static create(type, options = {}) {
    const def = enemyCatalog[type];
    if (!def) return null;
    // Clone base definition
    const enemy = {
      id: null,           // to be set by spawner
      type,
      name: def.name,
      avatar: def.avatar,
      health: def.baseHealth,
      maxHealth: def.baseHealth,
      attack: def.baseAttack,
      speed: def.speed,
      // additional properties can be added here
      ...options         // override or extend stats
    };
    return enemy;
  }
}

export default EnemyFactory;
