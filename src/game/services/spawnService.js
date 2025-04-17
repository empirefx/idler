import Logger from '../engine/Logger';
import placesData from '../../data/places.json';

// Handles events for spawn service
export class EventBus {
  constructor() {
    this.handlers = {};
  }
  on(event, handler) {
    (this.handlers[event] = this.handlers[event] || []).push(handler);
  }
  emit(event, data) {
    (this.handlers[event] || []).forEach((h) => h(data));
  }
}

// Base spawner class for all spawner types
// Handles the creation and management of enemies
class BaseSpawner {
  constructor(placeId, config, eventBus) {
    this.placeId = placeId;
    this.config = config;
    this.eventBus = eventBus;
  }
  createEnemy() {
    // Unique ID: pool + timestamp + random suffix
    const suffix = Math.random().toString(36).substring(2, 8);
    return {
      id: `${this.config.pool}-${Date.now()}-${suffix}`,
      type: this.config.pool
    };
  }
}

// Single spawner class for single enemy spawns
// Handles the creation and management of a single enemy
export class SingleSpawner extends BaseSpawner {
  start() {
    this.spawnOne();
  }
  spawnOne() {
    const enemy = this.createEnemy();
    Logger.log(`Spawned enemy ${enemy.id} at ${this.placeId}`, 0, 'spawn');
    this.eventBus.emit('spawnEnemy', { placeId: this.placeId, enemy });
    this.eventBus.on(`enemyDead:${this.placeId}`, () => {
      setTimeout(() => this.spawnOne(), this.config.respawnDelay * 1000);
    });
  }
  stop() {
    // No-op; setTimeout handles scheduling
  }
}

// Wave spawner class for wave enemy spawns
// Handles the creation and management of a wave of enemies
export class WaveSpawner extends BaseSpawner {
  start() {
    this.spawnWave();
  }
  spawnWave() {
    const [min, max] = this.config.waveSize;
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    let killed = 0;
    for (let i = 0; i < count; i++) {
      const enemy = this.createEnemy();
      Logger.log(`Spawned enemy ${enemy.id} at ${this.placeId}`, 0, 'spawn');
      this.eventBus.emit('spawnEnemy', { placeId: this.placeId, enemy });
      this.eventBus.on(`enemyDead:${this.placeId}`, () => {
        killed++;
        if (killed >= count) {
          setTimeout(() => this.spawnWave(), this.config.respawnDelay * 1000);
        }
      });
    }
  }
  stop() {
    // No-op
  }
}

// Spawn service class for managing enemy spawns
// Handles the creation and management of enemy spawns
export default class SpawnService {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.currentSpawner = null;
    this.eventBus.on('enterPlace', (placeId) => this.onEnterPlace(placeId));
  }
  onEnterPlace(placeId) {
    const config = placesData.places[placeId]?.spawn;
    if (!config) {
      if (this.currentSpawner) {
        this.currentSpawner.stop();
        this.currentSpawner = null;
      }
      return;
    }
    if (this.currentSpawner) {
      this.currentSpawner.stop();
    }
    if (config.type === 'single') {
      this.currentSpawner = new SingleSpawner(placeId, config, this.eventBus);
    } else {
      this.currentSpawner = new WaveSpawner(placeId, config, this.eventBus);
    }
    this.currentSpawner.start();
  }
}
