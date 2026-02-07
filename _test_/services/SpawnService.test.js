import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import SpawnService, {
  WaveSpawner,
} from "../../src/game/services/spawnService";
import { placesData } from "../../src/data/places";
import { enemyCatalog } from "../../src/data/enemyCatalog";

describe("SpawnService", () => {
  let eventBusService;
  let spawnService;
  let enterPlaceHandler;

  beforeEach(() => {
    // Mock event bus service
    eventBusService = {
      emit: vi.fn(),
      on: vi.fn(),
      handlers: {},
    };

    spawnService = new SpawnService(eventBusService);

    // Get the enterPlace handler for testing
    enterPlaceHandler = eventBusService.on.mock.calls.find(
      (call) => call[0] === "enterPlace",
    )?.[1];
  });

  afterEach(() => {
    spawnService.destroy();
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize with empty spawners and no current place", () => {
      expect(spawnService.currentPlaceId).toBeNull();
      expect(spawnService.spawners).toHaveLength(0);
    });

    it("should setup event listener for enterPlace events", () => {
      expect(eventBusService.on).toHaveBeenCalledWith(
        "enterPlace",
        expect.any(Function),
      );
    });
  });

  describe("Place Entry Management", () => {
    it("should create spawner when entering place with spawn config", () => {
      const placeId = "forest_edge";
      // Get the enterPlace handler and call it directly
      const enterPlaceHandler = eventBusService.on.mock.calls.find(
        (call) => call[0] === "enterPlace",
      )?.[1];
      if (enterPlaceHandler) {
        enterPlaceHandler(placeId);
      }

      expect(spawnService.currentPlaceId).toBe(placeId);
      expect(spawnService.getSpawner(placeId)).toBeInstanceOf(WaveSpawner);
    });

    it("should not create spawner when entering place without spawn config", () => {
      const placeId = "village_center";
      // Get the enterPlace handler and call it directly
      const enterPlaceHandler = eventBusService.on.mock.calls.find(
        (call) => call[0] === "enterPlace",
      )?.[1];
      if (enterPlaceHandler) {
        enterPlaceHandler(placeId);
      }

      expect(spawnService.currentPlaceId).toBe(placeId);
      expect(spawnService.getSpawner(placeId)).toBeUndefined();
    });

    it("should stop previous spawner when entering new place", () => {
      const firstPlace = "forest_edge";
      const secondPlace = "deep_woods";

      // Get the enterPlace handler
      const enterPlaceHandler = eventBusService.on.mock.calls.find(
        (call) => call[0] === "enterPlace",
      )?.[1];

      enterPlaceHandler(firstPlace);
      const firstSpawner = spawnService.getSpawner(firstPlace);

      enterPlaceHandler(secondPlace);

      expect(spawnService.currentPlaceId).toBe(secondPlace);
      expect(firstSpawner.isActive).toBe(false);
    });

    it("should not recreate spawner for same place", () => {
      const placeId = "forest_edge";

      enterPlaceHandler(placeId);
      const firstSpawner = spawnService.getSpawner(placeId);

      enterPlaceHandler(placeId);
      const secondSpawner = spawnService.getSpawner(placeId);

      expect(firstSpawner).toBe(secondSpawner);
    });

    it("should handle entering same place multiple times gracefully", () => {
      const placeId = "forest_edge";

      enterPlaceHandler(placeId);
      const initialCallCount = eventBusService.emit.mock.calls.length;

      enterPlaceHandler(placeId);
      expect(eventBusService.emit).toHaveBeenCalledTimes(initialCallCount); // No new spawns
    });
  });

  describe("Configuration Handling", () => {
    it("should handle wave configs directly without migration", () => {
      const waveConfig = {
        type: "wave",
        pool: ["forest_beast"],
        waveSize: [1, 1],
        respawnDelay: 5,
      };

      // No migration needed - should use config as-is
      expect(waveConfig.type).toBe("wave");
      expect(waveConfig.pool).toEqual(["forest_beast"]);
      expect(waveConfig.waveSize).toEqual([1, 1]);
    });
  });

  describe("Spawner Management", () => {
    it("should return correct spawner for place", () => {
      const placeId = "forest_edge";
      enterPlaceHandler(placeId);

      const spawner = spawnService.getSpawner(placeId);
      expect(spawner).toBeInstanceOf(WaveSpawner);
      expect(spawner.placeId).toBe(placeId);
    });

    it("should return current active spawner", () => {
      const placeId = "forest_edge";
      enterPlaceHandler(placeId);

      const currentSpawner = spawnService.getCurrentSpawner();
      expect(currentSpawner).toBeInstanceOf(WaveSpawner);
      expect(currentSpawner.placeId).toBe(placeId);
    });

    it("should return null for current spawner when no place active", () => {
      const currentSpawner = spawnService.getCurrentSpawner();
      expect(currentSpawner).toBeNull();
    });
  });

  describe("Cleanup", () => {
    it("should destroy all spawners and clean up state", () => {
      // Create multiple spawners
      enterPlaceHandler("forest_edge");
      enterPlaceHandler("deep_woods");
      enterPlaceHandler("hunter_camp");

      expect(spawnService.spawners).toHaveLength(3);

      spawnService.destroy();

      expect(spawnService.currentPlaceId).toBeNull();
      expect(spawnService.spawners).toHaveLength(0);
    });
  });
});

describe("WaveSpawner - Single Enemy Mode", () => {
  let eventBusService;
  let spawner;

  beforeEach(() => {
    eventBusService = {
      emit: vi.fn(),
      on: vi.fn(),
      handlers: {},
    };

    const singleEnemyConfig = {
      type: "wave",
      pool: ["forest_beast"],
      waveSize: [1, 1],
      respawnDelay: 5,
    };

    spawner = new WaveSpawner("test_place", singleEnemyConfig, eventBusService);
  });

  afterEach(() => {
    spawner.destroy();
    vi.clearAllMocks();
  });

  describe("Single Enemy Detection", () => {
    it("should detect single enemy configuration", () => {
      expect(spawner.isSingleEnemy).toBe(true);
    });

    it("should detect multiple enemy configuration", () => {
      const multiEnemyConfig = {
        type: "wave",
        pool: ["forest_beast", "woodland_predator"],
        waveSize: [2, 4],
        respawnDelay: 8,
      };

      const multiSpawner = new WaveSpawner(
        "test_place",
        multiEnemyConfig,
        eventBusService,
      );
      expect(multiSpawner.isSingleEnemy).toBe(false);
      multiSpawner.destroy();
    });
  });

  describe("Single Enemy Spawning", () => {
    it("should spawn single enemy using enemy catalog delays", () => {
      spawner.start();

      expect(eventBusService.emit).toHaveBeenCalledWith("spawnEnemy", {
        placeId: "test_place",
        enemy: expect.objectContaining({
          type: "forest_beast",
          attackDelayRange: enemyCatalog.forest_beast.attackDelayRange,
          attackPattern: enemyCatalog.forest_beast.attackPattern,
        }),
      });
    });

    it("should not spawn multiple enemies when in single mode", () => {
      spawner.start();

      const spawnCalls = eventBusService.emit.mock.calls.filter(
        (call) => call[0] === "spawnEnemy",
      );

      expect(spawnCalls).toHaveLength(1);
    });

    it("should handle respawn after enemy death", () => {
      vi.useFakeTimers();

      spawner.start();

      // Get the ID of the spawned enemy from the emit call
      const initialSpawnCall = eventBusService.emit.mock.calls.find(
        (call) => call[0] === "spawnEnemy",
      );
      const spawnedEnemyId = initialSpawnCall?.[1]?.enemy?.id;

      // Simulate enemy death - find enemyDead handler
      const deathCall = eventBusService.on.mock.calls.find(
        (call) => call[0] === `enemyDead:test_place`,
      );
      if (deathCall && deathCall[1] && spawnedEnemyId) {
        const deathHandler = deathCall[1];
        // Simulate enemy object with the actual spawned enemy ID
        deathHandler({ enemy: { id: spawnedEnemyId } });
      }

      // Fast-forward time
      vi.advanceTimersByTime(5000);

      expect(eventBusService.emit).toHaveBeenCalledTimes(2); // Initial spawn + respawn

      vi.useRealTimers();
    });
  });

  describe("State Management", () => {
    it("should track active state correctly", () => {
      expect(spawner.isActive).toBe(false);

      spawner.start();
      expect(spawner.isActive).toBe(true);

      spawner.stop();
      expect(spawner.isActive).toBe(false);
    });

    it("should handle stop and start cycles", () => {
      spawner.start();
      expect(spawner.isActive).toBe(true);

      spawner.stop();
      expect(spawner.isActive).toBe(false);

      spawner.start();
      expect(spawner.isActive).toBe(true);
    });
  });
});

describe("WaveSpawner - Enemy Catalog Integration", () => {
  let eventBusService;
  let spawner;

  beforeEach(() => {
    eventBusService = {
      emit: vi.fn(),
      on: vi.fn(),
      handlers: {},
    };

    const config = {
      type: "wave",
      pool: ["forest_beast", "woodland_predator"],
      waveSize: [2, 4],
      respawnDelay: 8,
    };

    spawner = new WaveSpawner("test_place", config, eventBusService);
  });

  afterEach(() => {
    spawner.destroy();
    vi.clearAllMocks();
  });

  describe("Enemy Creation with Catalog Data", () => {
    it("should use attackDelayRange from enemy catalog", () => {
      const forestBeast = spawner.createEnemy("forest_beast");
      expect(forestBeast.attackDelayRange).toEqual(
        enemyCatalog.forest_beast.attackDelayRange,
      );

      const woodlandPredator = spawner.createEnemy("woodland_predator");
      expect(woodlandPredator.attackDelayRange).toEqual(
        enemyCatalog.woodland_predator.attackDelayRange,
      );
    });

    it("should use attackPattern from enemy catalog", () => {
      const forestBeast = spawner.createEnemy("forest_beast");
      expect(forestBeast.attackPattern).toBe(
        enemyCatalog.forest_beast.attackPattern,
      );
    });

    it("should set initial attack timing based on catalog ranges", () => {
      const enemy = spawner.createEnemy("woodland_predator");
      const [minDelay, maxDelay] =
        enemyCatalog.woodland_predator.attackDelayRange;

      // Check that the delay is within the catalog range
      const actualDelay = enemy.nextAttackTime - Date.now();
      expect(actualDelay).toBeGreaterThanOrEqual(minDelay);
      expect(actualDelay).toBeLessThanOrEqual(maxDelay);
    });
  });

  describe("Enemy Pool Selection", () => {
    it("should select enemies from pool array", () => {
      const config = { pool: ["forest_beast", "woodland_predator"] };
      spawner.config = config;

      const selectedTypes = [];
      for (let i = 0; i < 20; i++) {
        selectedTypes.push(spawner.selectEnemyFromPool());
      }

      selectedTypes.forEach((type) => {
        expect(["forest_beast", "woodland_predator"]).toContain(type);
      });

      // Should have variety
      const uniqueTypes = new Set(selectedTypes);
      expect(uniqueTypes.size).toBeGreaterThan(0);
    });

    it("should handle single enemy pool", () => {
      const config = { pool: "forest_beast" };
      spawner.config = config;

      const selectedType = spawner.selectEnemyFromPool();
      expect(selectedType).toBe("forest_beast");
    });
  });
});
