import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { WaveSpawner } from "../src/game/services/spawnService";
import { enemyCatalog } from "../src/data/enemyCatalog";
import { placesData } from "../src/data/places";

describe("WaveSpawner Staggered Attack Tests", () => {
  let eventBusService;
  let spawner;
  let placeId;

  beforeEach(() => {
    // Mock event bus service
    eventBusService = {
      emit: vi.fn(),
      on: vi.fn(),
      handlers: {},
    };

    placeId = "ancient_ruins";
    const config = placesData[placeId].spawn;
    spawner = new WaveSpawner(placeId, config, eventBusService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Enemy Type Selection from Pool", () => {
    it("should select enemy types from pool array", () => {
      const config = { pool: ["forest_beast", "woodland_predator"] };
      spawner.config = config;

      const selectedTypes = [];
      for (let i = 0; i < 10; i++) {
        selectedTypes.push(spawner.selectEnemyFromPool());
      }

      // Should only contain enemies from pool
      selectedTypes.forEach((type) => {
        expect(["forest_beast", "woodland_predator"]).toContain(type);
      });
    });

    it("should handle single enemy type pool", () => {
      const config = { pool: "forest_beast" };
      spawner.config = config;

      const selectedType = spawner.selectEnemyFromPool();
      expect(selectedType).toBe("forest_beast");
    });
  });

  describe("Enemy Catalog Delay Integration", () => {
    it("should use enemy catalog attackDelayRange instead of config values", () => {
      const enemy = spawner.createEnemy("forest_beast");

      // Should use catalog values, not places.js attackPattern values
      expect(enemy.attackDelayRange).toEqual(
        enemyCatalog.forest_beast.attackDelayRange,
      );
      expect(enemy.attackDelayRange).toEqual([100, 200]);
    });

    it("should calculate initial delays using enemy catalog ranges", () => {
      vi.useFakeTimers({ now: 1000000 });

      const enemy = spawner.createEnemy("woodland_predator");
      const [minDelay, maxDelay] =
        enemyCatalog.woodland_predator.attackDelayRange;

      expect(enemy.nextAttackTime).toBeGreaterThanOrEqual(1000000 + minDelay);
      expect(enemy.nextAttackTime).toBeLessThanOrEqual(1000000 + maxDelay);

      vi.useRealTimers();
    });
  });

  describe("Attack Delay Calculation with Enemy Catalog", () => {
    it("should calculate delays based on enemy catalog ranges", () => {
      vi.useFakeTimers({ now: 1000000 });

      // Test forest_beast delays
      const forestBeast = spawner.createEnemy("forest_beast");
      const [fbMin, fbMax] = enemyCatalog.forest_beast.attackDelayRange;
      expect(forestBeast.nextAttackTime).toBeGreaterThanOrEqual(
        1000000 + fbMin,
      );
      expect(forestBeast.nextAttackTime).toBeLessThanOrEqual(1000000 + fbMax);

      // Test woodland_predator delays
      const woodlandPredator = spawner.createEnemy("woodland_predator");
      const [wpMin, wpMax] = enemyCatalog.woodland_predator.attackDelayRange;
      expect(woodlandPredator.nextAttackTime).toBeGreaterThanOrEqual(
        1000000 + wpMin,
      );
      expect(woodlandPredator.nextAttackTime).toBeLessThanOrEqual(
        1000000 + wpMax,
      );

      vi.useRealTimers();
    });

    it("should not override enemy catalog values", () => {
      const enemy = spawner.createEnemy("forest_beast");

      // Should maintain catalog values, not fallback defaults
      expect(enemy.attackDelayRange).not.toEqual([2000, 5000]);
      expect(enemy.attackDelayRange).toEqual(
        enemyCatalog.forest_beast.attackDelayRange,
      );
    });

    it("should handle enemies without staggered pattern", () => {
      // Create an enemy without staggered pattern if available
      const enemy = spawner.createEnemy("forest_beast");

      if (enemy.attackPattern !== "staggered") {
        expect(enemy.nextAttackTime).toBeUndefined();
        expect(enemy.countdown).toBeUndefined();
      } else {
        // For staggered enemies, timing should be set
        expect(enemy.nextAttackTime).toBeDefined();
        expect(enemy.countdown).toBeDefined();
      }
    });
  });

  describe("Enemy Creation with Enemy Catalog Integration", () => {
    beforeEach(() => {
      // Reset spawner config with simple single type for basic tests
      spawner.config = {
        pool: "forest_beast",
        waveSize: [1, 1],
      };
    });

    it("should create enemies with catalog-based defaults", () => {
      const enemyType = "forest_beast";
      const enemy = spawner.createEnemy(enemyType);

      const catalogEntry = enemyCatalog[enemyType];

      expect(enemy.attackDelayRange).toEqual(catalogEntry.attackDelayRange);
      expect(enemy.attackPattern).toBe(catalogEntry.attackPattern);
    });

    it("should not use places.js attackPattern overrides", () => {
      // Ancient ruins used to have minDelay: 200, maxDelay: 700
      // but now should use enemy catalog values
      const enemy = spawner.createEnemy("ruins_undead");

      // Should use catalog values (200-600) not old places.js values (200-700)
      expect(enemy.attackDelayRange).toEqual(
        enemyCatalog.ruins_undead.attackDelayRange,
      );
      expect(enemy.attackDelayRange).toEqual([200, 600]);
    });

    it("should handle single enemy mode correctly", () => {
      // Test with single enemy pool
      spawner.config = {
        pool: ["trained_hunters"],
        waveSize: [1, 1],
      };

      expect(spawner.isSingleEnemy).toBe(true);

      const enemy = spawner.createEnemy("trained_hunters");
      expect(enemy.type).toBe("trained_hunters");
      expect(enemy.attackDelayRange).toEqual(
        enemyCatalog.trained_hunters.attackDelayRange,
      );
    });

    it("should handle multiple enemy mode correctly", () => {
      // Test with multiple enemy pool
      spawner.config = {
        pool: ["forest_beast", "woodland_predator"],
        waveSize: [2, 4],
      };

      expect(spawner.isSingleEnemy).toBe(false);

      const enemy1 = spawner.createEnemy("forest_beast");
      const enemy2 = spawner.createEnemy("woodland_predator");

      expect(enemy1.attackDelayRange).toEqual(
        enemyCatalog.forest_beast.attackDelayRange,
      );
      expect(enemy2.attackDelayRange).toEqual(
        enemyCatalog.woodland_predator.attackDelayRange,
      );
    });
  });
});
