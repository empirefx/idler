import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { WaveSpawner } from '../src/game/services/spawnService';
import { enemyCatalog } from '../src/data/enemyCatalog';
import { placesData } from '../src/data/places';

describe('WaveSpawner Staggered Attack Tests', () => {
  let eventBusService;
  let spawner;
  let placeId;

  beforeEach(() => {
    // Mock event bus service
    eventBusService = {
      emit: vi.fn(),
      on: vi.fn(),
      handlers: {}
    };

    placeId = 'ancient_ruins';
    const config = placesData[placeId].spawn;
    spawner = new WaveSpawner(placeId, config, eventBusService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Enemy Type Selection from Pool', () => {
    it('should select enemy types from pool array', () => {
      const config = { pool: ['forest_beast', 'woodland_predator'] };
      spawner.config = config;
      
      const selectedTypes = [];
      for (let i = 0; i < 10; i++) {
        selectedTypes.push(spawner.selectEnemyFromPool());
      }

      // Should only contain enemies from pool
      selectedTypes.forEach(type => {
        expect(['forest_beast', 'woodland_predator']).toContain(type);
      });
    });

    it('should handle single enemy type pool', () => {
      const config = { pool: 'forest_beast' };
      spawner.config = config;
      
      const selectedType = spawner.selectEnemyFromPool();
      expect(selectedType).toBe('forest_beast');
    });
  });

  describe('Random Delay Generation', () => {
    it('should generate delays within specified range', () => {
      const minDelay = 2000;
      const maxDelay = 5000;
      
      for (let i = 0; i < 100; i++) {
        const delay = spawner.randomBetween(minDelay, maxDelay);
        expect(delay).toBeGreaterThanOrEqual(minDelay);
        expect(delay).toBeLessThanOrEqual(maxDelay);
      }
    });
  });

  describe('Initial Attack Delay Calculation', () => {
    beforeEach(() => {
      spawner.config = {
        waveSize: [3, 6],
        attackPattern: {
          type: 'staggered',
          minDelay: 2000,
          maxDelay: 5000
        }
      };
    });

    it('should calculate staggered initial attack times', () => {
      // Mock current time for predictable results
      const mockTime = 1000000000000;
      const originalDateNow = Date.now;
      Date.now = vi.fn(() => mockTime);

      try {
        const enemyIndices = [0, 1, 2];
        const attackTimes = enemyIndices.map(i => spawner.calculateInitialAttackDelay(i));
        
        // Should be different for each enemy index
        expect(attackTimes[0]).not.toBe(attackTimes[1]);
        expect(attackTimes[1]).not.toBe(attackTimes[2]);
        
        // Should be greater than or equal to mock time
        attackTimes.forEach(time => {
          expect(time).toBeGreaterThanOrEqual(mockTime);
        });
      } finally {
        Date.now = originalDateNow;
      }
    });

    it('should return 0 for non-staggered patterns', () => {
      spawner.config.attackPattern = { type: 'normal' };
      const delay = spawner.calculateInitialAttackDelay(0);
      expect(delay).toBe(0);
    });
  });

  describe('Enemy Creation with Staggered Configuration', () => {
    beforeEach(() => {
      // Reset spawner config with simple single type for basic tests
      spawner.config = {
        pool: 'forest_beast',
        waveSize: [1, 1]
      };
    });

    it('should create enemies with catalog-based defaults', () => {
      const enemyType = 'forest_beast';
      const enemy = spawner.createEnemy(enemyType);

      const catalogEntry = enemyCatalog[enemyType];
      
      expect(enemy.attackDelayRange).toEqual(catalogEntry.attackDelayRange);
      expect(enemy.attackPattern).toBe(catalogEntry.attackPattern);
    });
  });
});