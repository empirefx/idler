import Logger from '../utils/Logger';
import { enemyCatalog } from '../../data/enemyCatalog';

// Factory for creating enemy instances with base stats
export class EnemyFactory {
  static create(type, options = {}) {
    const def = enemyCatalog[type];

    if (!def) {
      Logger.log(`Enemy type not found in catalog: ${type}`, 2, 'factory');
      return null;
    }

    const enemy = {
      id: crypto.randomUUID(), // ALWAYS unique
      type,
      name: def.name || 'Unknown Enemy',
      avatar: def.avatar || 'default.png',
      health: def.baseHealth || 50,
      maxHealth: def.baseHealth || 50,
      attack: def.baseAttack || 5,
      speed: def.speed || 1.0,
      // Attack pattern and delay configuration
      attackPattern: def.attackPattern || 'normal',
      attackDelayRange: [...(def.attackDelayRange || [2000, 5000])],
      // additional properties can be added here
      ...options
    };

    Logger.log(`Creating enemy type: ${type}`, 0, 'factory');
    return enemy;
  }
}

export default EnemyFactory;
