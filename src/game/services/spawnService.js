import Logger from '../utils/Logger';
import EnemyFactory from '../factory/enemyFactory';
import { placesData } from '../../data/places';

// Base spawner class for all spawner types
// Handles the creation and management of enemies
class BaseSpawner {
  constructor(placeId, config, eventBusService) {
    this.placeId = placeId;
    this.config = config;
    this.eventBusService = eventBusService;
  }
  createEnemy() {
    // Unique ID: pool + timestamp + random suffix
    const suffix = Math.random().toString(36).substring(2, 8);
    const id = `${this.config.pool}-${Date.now()}-${suffix}`;
    // Build stats from EnemyFactory, fallback to minimal if missing
    const baseStats = EnemyFactory.create(this.config.pool) || { type: this.config.pool };
    return { ...baseStats, id };
  }
}

// Single spawner class for single enemy spawns
// Handles the creation and management of a single enemy
export class SingleSpawner extends BaseSpawner {
  constructor(placeId, config, eventBusService) {
    super(placeId, config, eventBusService);
    this.hasAlive = false;
  }

  start() {
    this.spawnOne();
  }

  spawnOne() {
    if (this.hasAlive) return;
    this.hasAlive = true;
    const enemy = this.createEnemy();
    Logger.log(`Spawned enemy ${enemy.id} at ${this.placeId}`, 0, 'spawn');
    this.eventBusService.emit('spawnEnemy', { placeId: this.placeId, enemy });
    const deathEvent = `enemyDead:${this.placeId}`;
    const handler = () => {
      this.eventBusService.handlers[deathEvent] = (this.eventBusService.handlers[deathEvent] || []).filter(h => h !== handler);
      this.hasAlive = false;
      setTimeout(() => this.spawnOne(), this.config.respawnDelay * 1000);
    };
    this.eventBusService.on(deathEvent, handler);
  }

  stop() {
    // Reset single-spawn flag and clear death handlers
    this.hasAlive = false;
    const deathEvent = `enemyDead:${this.placeId}`;
    // Remove all handlers for this event
    delete this.eventBusService.handlers[deathEvent];
  }
}

// Wave spawner class for wave enemy spawns
// Handles the creation and management of a wave of enemies
export class WaveSpawner extends BaseSpawner {
  constructor(placeId, config, eventBusService) {
    super(placeId, config, eventBusService);
    this.waveActive = false;
  }

  start() {
    this.spawnWave();
  }

  spawnWave() {
    if (this.waveActive) return;
    this.waveActive = true;
    const [min, max] = this.config.waveSize;
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    let killed = 0;
    const deathEvent = `enemyDead:${this.placeId}`;
    const handler = () => {
      killed++;
      if (killed >= count) {
        this.eventBusService.handlers[deathEvent] = (this.eventBusService.handlers[deathEvent] || []).filter(h => h !== handler);
        this.waveActive = false;
        setTimeout(() => this.spawnWave(), this.config.respawnDelay * 1000);
      }
    };
    this.eventBusService.on(deathEvent, handler);
    for (let i = 0; i < count; i++) {
      const enemy = this.createEnemy();
      Logger.log(`Spawned enemy ${enemy.id} at ${this.placeId}`, 0, 'spawn');
      this.eventBusService.emit('spawnEnemy', { placeId: this.placeId, enemy });
    }
  }

  stop() {
    // Reset wave state and clear death handlers
    this.waveActive = false;
    const deathEvent = `enemyDead:${this.placeId}`;
    delete this.eventBusService.handlers[deathEvent];
  }
}

// Spawn service class for managing enemy spawns
// Handles the creation and management of enemy spawns
export default class SpawnService {
  constructor(eventBusService) {
    this.eventBusService = eventBusService;
    this.spawners = {};        // Map placeId -> spawner
    this.currentPlaceId = null; // Track current place
    this.eventBusService.on('enterPlace', (placeId) => this.onEnterPlace(placeId));
  }
  onEnterPlace(placeId) {
    if (placeId === this.currentPlaceId) return;          // No-op if same place
    // Stop previous place spawner
    if (this.currentPlaceId && this.spawners[this.currentPlaceId]) {
      this.spawners[this.currentPlaceId].stop();
    }
    this.currentPlaceId = placeId;
    const config = placesData[placeId]?.spawn;
    if (!config) return;
    // Lazy-create per-place spawner
    if (!this.spawners[placeId]) {
      this.spawners[placeId] = config.type === 'single'
        ? new SingleSpawner(placeId, config, this.eventBusService)
        : new WaveSpawner(placeId, config, this.eventBusService);
    }
    // Start (will no-op if already active)
    this.spawners[placeId].start();
  }
}
