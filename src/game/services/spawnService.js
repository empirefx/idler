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

  createEnemy(enemyType = null) {
    // Unique ID: pool + timestamp + random suffix
    const suffix = Math.random().toString(36).substring(2, 8);
    const poolType = enemyType || this.config.pool;
    const id = `${poolType}-${Date.now()}-${suffix}`;

    // Build stats from EnemyFactory, fallback to minimal if missing
    const baseStats = EnemyFactory.create(poolType);

    if (!baseStats) {
      Logger.log(`Failed to create enemy of type: ${poolType}`, 2, 'spawn');
      return {
        id,
        type: poolType,
        name: 'Unknown Enemy',
        avatar: 'default.png',
        health: 50,
        maxHealth: 50,
        attack: 5,
        speed: 1.0
      };
    }

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

  // Select enemy type from pool configuration
  selectEnemyFromPool() {
    if (Array.isArray(this.config.pool)) {
      // Support multiple enemy types (pool concept)
      return this.config.pool[Math.floor(Math.random() * this.config.pool.length)];
    }
    // Fallback to single pool type
    return this.config.pool;
  }

  // Calculate initial attack delay for staggered enemies (random between 2-5 seconds)
  calculateInitialAttackDelay(index) {
    if (!this.config.attackPattern || this.config.attackPattern.type !== 'staggered') {
      return 0;
    }

    // Generate random delay between minDelay and maxDelay (2-5 seconds default)
    const [minDelay, maxDelay] = [
      this.config.attackPattern.minDelay || 2000,
      this.config.attackPattern.maxDelay || 5000
    ];

    // Random delay for each enemy
    return Math.random() * (maxDelay - minDelay) + minDelay;
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
      // Support multiple enemy types from pool
      const enemyType = this.selectEnemyFromPool();
      const enemy = this.createEnemy(enemyType);

      // Initialize staggered attack timing
      if (this.config.attackPattern?.type === 'staggered') {
        const initialDelay = this.calculateInitialAttackDelay(i);
        enemy.nextAttackTime = Date.now() + initialDelay;
        enemy.countdown = initialDelay;
        enemy.initialAttackDelay = initialDelay;

        // Store attack delay range for staggered attacks
        // These values determine the random delay between enemy attacks (in milliseconds)
        // CombatService will read these values to generate random attack timings
        enemy.attackDelayRange = [
          this.config.attackPattern.minDelay || 2000,
          this.config.attackPattern.maxDelay || 5000
        ];
        enemy.attackPattern = 'staggered';
        enemy.isCountdownActive = false; // Will be activated when combat starts
      }

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
    Logger.log(`Entering place ${placeId}`, 0, 'spawn');
    if (placeId === this.currentPlaceId) return;          // No-op if same place
    // Stop previous place spawner
    if (this.currentPlaceId && this.spawners[this.currentPlaceId]) {
      this.spawners[this.currentPlaceId].stop();
    }
    this.currentPlaceId = placeId;
    const config = placesData[placeId]?.spawn;
    if (!config) {
      Logger.log(`No spawn config found for place ${placeId}`, 0, 'spawn');
      return;
    }
    Logger.log(`Creating spawner for place ${placeId} with config:`, 0, 'spawn', config);
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
