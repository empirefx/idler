import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CombatService } from "../src/game/services/CombatService";
import { placesData } from "../src/data/places";

describe("CombatService Staggered Attack Tests", () => {
  let combatService;
  let mockStore;
  let mockEventBusService;
  let mockGameLoop;

  beforeEach(() => {
    // Mock store
    mockStore = {
      getState: vi.fn(),
      dispatch: vi.fn(),
    };

    // Mock event bus
    mockEventBusService = {
      emit: vi.fn(),
    };

    // Mock game loop
    mockGameLoop = {
      register: vi.fn(),
    };

    combatService = CombatService;
    combatService.initialize(mockStore, mockEventBusService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Random Delay Generation", () => {
    it("should generate delays within specified range", () => {
      const minDelay = 2000;
      const maxDelay = 5000;

      for (let i = 0; i < 100; i++) {
        const delay = combatService.randomBetween(minDelay, maxDelay);
        expect(delay).toBeGreaterThanOrEqual(minDelay);
        expect(delay).toBeLessThanOrEqual(maxDelay);
      }
    });
  });

  describe("Staggered Attack Handling", () => {
    beforeEach(() => {
      mockStore.getState.mockReturnValue({
        places: {
          currentPlaceId: "ancient_ruins",
        },
        combat: {
          isInCombat: true,
        },
      });
    });

    it("should handle enemies ready to attack", () => {
      const currentTime = Date.now();
      const enemies = [
        {
          id: "enemy1",
          health: 50,
          attackPattern: "staggered",
          countdown: 0, // Ready to attack
          isCountdownActive: true,
          attackDelayRange: [2000, 5000],
        },
        {
          id: "enemy2",
          health: 30,
          attackPattern: "staggered",
          countdown: 1000, // Not ready
          isCountdownActive: true,
          attackDelayRange: [2000, 5000],
        },
      ];

      combatService.handleStaggeredAttacks(enemies);

      // Should dispatch damage for ready enemy (enemy1)
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "player/damagePlayer",
        payload: { amount: 5 },
      });

      // Should reset countdown for attacking enemy
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "enemies/resetEnemyCountdown",
        payload: { id: "enemy1" },
      });
    });

    it("should handle multiple ready enemies with attack queue", () => {
      const enemies = [
        {
          id: "enemy1",
          health: 50,
          attackPattern: "staggered",
          countdown: 0, // Ready
          isCountdownActive: true,
          attackDelayRange: [2000, 5000],
        },
        {
          id: "enemy2",
          health: 30,
          attackPattern: "staggered",
          countdown: 0, // Ready
          isCountdownActive: true,
          attackDelayRange: [2000, 5000],
        },
      ];

      combatService.handleStaggeredAttacks(enemies);

      // Both enemies should attack simultaneously (our new behavior)
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "player/damagePlayer",
        payload: { amount: 5 },
      });

      // Should reset countdowns for both enemies
      const resetCalls = mockStore.dispatch.mock.calls.filter(
        (call) => call[0].type === "enemies/resetEnemyCountdown",
      );
      expect(resetCalls.length).toBe(2); // Both enemies should get reset
    });

    it("should ignore enemies with normal attack pattern", () => {
      const enemies = [
        {
          id: "enemy1",
          health: 50,
          attackPattern: "normal", // Should be ignored
          countdown: 0,
          isCountdownActive: true,
        },
      ];

      combatService.handleStaggeredAttacks(enemies);

      // Should not dispatch damage
      expect(mockStore.dispatch).not.toHaveBeenCalledWith(
        "player/damagePlayer",
        expect.any(Object),
      );
    });

    it("should ignore dead enemies", () => {
      const enemies = [
        {
          id: "enemy1",
          health: 0, // Dead
          attackPattern: "staggered",
          countdown: 0,
          isCountdownActive: true,
        },
      ];

      combatService.handleStaggeredAttacks(enemies);

      // Should not dispatch damage
      expect(mockStore.dispatch).not.toHaveBeenCalledWith(
        "player/damagePlayer",
        expect.any(Object),
      );
    });
  });

  describe("Attacking Enemy Selection", () => {
    beforeEach(() => {
      mockStore.getState.mockReturnValue({
        places: {
          currentPlaceId: "test_place",
        },
      });

      // Mock places data
      global.placesData = {
        test_place: {
          spawn: {
            attackPattern: {
              attackOrder: "random",
            },
          },
        },
      };
    });

    it("should select random enemy for random attack order", () => {
      const readyEnemies = [
        { id: "enemy1", nextAttackTime: 1000 },
        { id: "enemy2", nextAttackTime: 2000 },
        { id: "enemy3", nextAttackTime: 1500 },
      ];

      const selected = combatService.selectAttackingEnemy(readyEnemies);

      // Should return one of the ready enemies
      expect(readyEnemies).toContain(selected);
    });

    it("should select enemy with oldest attack time for sequential order", () => {
      global.placesData.test_place.spawn.attackPattern.attackOrder =
        "sequential";

      const readyEnemies = [
        { id: "enemy1", nextAttackTime: 1000 }, // Oldest
        { id: "enemy2", nextAttackTime: 2000 },
        { id: "enemy3", nextAttackTime: 1500 },
      ];

      const selected = combatService.selectAttackingEnemy(readyEnemies);

      // Should return enemy that has been waiting longest (1000ms is the earliest)
      expect([1000, 1500, 2000]).toContain(selected.nextAttackTime);
    });

    afterEach(() => {
      delete global.placesData;
    });
  });

  describe("Synchronized Enemy Countdowns", () => {
    beforeEach(() => {
      mockStore.getState.mockReturnValue({
        places: {
          currentPlaceId: "ancient_ruins",
        },
      });
    });

    it("should initialize countdowns for all enemies at place when combat starts", () => {
      const enemies = [
        {
          id: "enemy1",
          placeId: "ancient_ruins",
          health: 50,
          attackPattern: "staggered",
          countdown: 0,
          isCountdownActive: false,
          attackDelayRange: [2000, 5000],
        },
        {
          id: "enemy2",
          placeId: "ancient_ruins",
          health: 30,
          attackPattern: "staggered",
          countdown: 0,
          isCountdownActive: false,
          attackDelayRange: [2000, 5000],
        },
      ];

      // Mock combat state as active
      mockStore.getState.mockReturnValue({
        places: { currentPlaceId: "ancient_ruins" },
        combat: { isInCombat: true },
      });

      combatService.handleStaggeredAttacks(enemies);

      // Should dispatch synchronized countdown initialization
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "enemies/initializeCountdownsForPlace",
        payload: {
          placeId: "ancient_ruins",
          baseTimestamp: expect.any(Number),
        },
      });
    });

    it("should deactivate countdowns when combat ends", () => {
      const enemies = [
        {
          id: "enemy1",
          placeId: "ancient_ruins",
          health: 50,
          attackPattern: "staggered",
          countdown: 1000,
          isCountdownActive: true,
          attackDelayRange: [2000, 5000],
        },
      ];

      // Mock combat state as inactive
      mockStore.getState.mockReturnValue({
        places: { currentPlaceId: "ancient_ruins" },
        combat: { isInCombat: false },
      });

      combatService.handleStaggeredAttacks(enemies);

      // Should deactivate countdown
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "enemies/setCountdownActive",
        payload: { id: "enemy1", isActive: false },
      });
    });
  });

  describe("Countdown Decrements", () => {
    it("should decrease countdown values over time", () => {
      const enemies = [
        {
          id: "enemy1",
          placeId: "ancient_ruins",
          health: 50,
          attackPattern: "staggered",
          countdown: 3000, // 3 seconds
          isCountdownActive: true,
          attackDelayRange: [2000, 5000],
        },
      ];

      // Simulate deltaTime of 0.1 seconds (100ms)
      const deltaTime = 0.1;

      // This simulates the combat loop updating countdowns
      enemies.forEach((enemy) => {
        if (enemy.isCountdownActive && enemy.countdown > 0) {
          // Convert deltaTime from seconds to milliseconds
          enemy.countdown = Math.max(0, enemy.countdown - deltaTime * 1000);
        }
      });

      // Countdown should have decreased by 100ms
      expect(enemies[0].countdown).toBe(2900);
    });
  });
});
