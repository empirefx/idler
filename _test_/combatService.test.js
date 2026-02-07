// Test CombatService functionality
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CombatService } from "../src/game/services/CombatService";
import { addItem } from "../src/store/slices/playerInventorySlice";
import { gainExp } from "../src/store/slices/playerSlice";

describe("CombatService", () => {
  let mockStore;
  let mockGameLoop;
  let mockEventBus;
  let mockState;

  beforeEach(() => {
    mockState = {
      places: {
        currentPlaceId: "village_center",
        village_center: {
          spawn: {
            drops: [
              { itemId: "apple", dropRate: 0.5 },
              { itemId: "wood", dropRate: 0.3 },
            ],
          },
        },
      },
      enemies: {
        byId: {
          enemy1: {
            id: "enemy1",
            placeId: "village_center",
          },
        },
      },
    };

    mockStore = {
      dispatch: vi.fn(),
      getState: vi.fn(() => mockState),
      subscribe: vi.fn(() => vi.fn()),
    };

    mockGameLoop = {
      register: vi.fn((name, callback, options) => {
        return { name, callback, options };
      }),
      unregister: vi.fn(),
    };

    mockEventBus = {
      emit: vi.fn(),
    };

    // Initialize service BEFORE each test
    CombatService.initialize(mockStore, mockEventBus);

    // Reset state before each test
    CombatService.store = mockStore;
    CombatService.eventBusService = mockEventBus;
  });

  it("should initialize with store and eventBus", () => {
    expect(CombatService.store).toBe(mockStore);
    expect(CombatService.eventBusService).toBe(mockEventBus);
  });

  it("should start combat when state changes to true", () => {
    const wasInCombat = false;
    const isInCombat = true;

    CombatService.handleCombatStateChange(
      wasInCombat,
      isInCombat,
      mockGameLoop,
    );

    expect(mockGameLoop.register).toHaveBeenCalledWith(
      "combat",
      expect.any(Function),
      {
        priority: 0, // Highest priority
        interval: 100, // Every 100ms
      },
    );
  });

  it("should stop combat when state changes to false", () => {
    const wasInCombat = true;
    const isInCombat = false;

    CombatService.handleCombatStateChange(
      wasInCombat,
      isInCombat,
      mockGameLoop,
    );

    expect(mockGameLoop.unregister).toHaveBeenCalledWith("combat");
  });

  it("should handle enemy experience gain correctly", () => {
    const enemy = {
      id: "enemy1",
      maxHealth: 10,
    };

    CombatService.handleEnemyExpGain(enemy);

    expect(mockStore.dispatch).toHaveBeenCalledWith(gainExp({ amount: 10 }));
  });

  it("should handle empty drops array", () => {
    mockState.places.village_center.spawn.drops = [];

    const enemy = {
      id: "enemy1",
      maxHealth: 10,
    };

    CombatService.handleEnemyDrops(enemy);

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      addItem(expect.any(Object)),
    );
  });

  it("should handle missing spawn info", () => {
    mockState.places.village_center.spawn = null;

    const enemy = {
      id: "enemy1",
      maxHealth: 10,
    };

    CombatService.handleEnemyDrops(enemy);

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      addItem(expect.any(Object)),
    );
  });

  it("should register combat system with correct configuration", () => {
    const wasInCombat = false;
    const isInCombat = true;

    CombatService.handleCombatStateChange(
      wasInCombat,
      isInCombat,
      mockGameLoop,
    );

    expect(mockGameLoop.register).toHaveBeenCalledWith(
      "combat",
      expect.any(Function),
      {
        priority: 0, // Highest priority
        interval: 100, // Every 100ms
      },
    );
  });

  describe("Player Attack Cooldown", () => {
    beforeEach(() => {
      mockStore.getState.mockReturnValue({
        places: {
          currentPlaceId: "village_center",
          village_center: {
            spawn: {
              drops: [
                { itemId: "apple", dropRate: 0.5 },
                { itemId: "wood", dropRate: 0.3 },
              ],
            },
          },
        },
        enemies: {
          byId: {
            enemy1: {
              id: "enemy1",
              placeId: "village_center",
            },
          },
        },
        player: {
          baseAttack: 16,
          attackCooldown: 1000,
          lastAttackTime: 0,
        },
      });
    });

    it("should respect attack cooldown", () => {
      const now = Date.now();

      // Update mock to return player with recent attack time
      mockStore.getState.mockReturnValue({
        player: {
          baseAttack: 16,
          attackCooldown: 1000,
          lastAttackTime: now - 500, // 500ms ago (less than 1000ms cooldown)
        },
      });

      const enemies = [{ id: "enemy1", placeId: "village_center", health: 50 }];

      CombatService.handlePlayerAttack(enemies);

      // Should not attack since cooldown hasn't elapsed
      expect(mockStore.dispatch).not.toHaveBeenCalledWith(
        "enemies/damageEnemy",
        expect.any(Object),
      );
    });

    it("should attack when cooldown has elapsed", () => {
      const now = Date.now();

      // Update mock to return player with old attack time
      mockStore.getState.mockReturnValue({
        player: {
          baseAttack: 16,
          attackCooldown: 1000,
          lastAttackTime: now - 1500, // 1500ms ago (more than 1000ms cooldown)
        },
      });

      const enemies = [{ id: "enemy1", placeId: "village_center", health: 50 }];

      CombatService.handlePlayerAttack(enemies);

      // Should attack since cooldown has elapsed
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: "enemies/damageEnemy",
        payload: { id: "enemy1", amount: 16 },
      });

      // Should update last attack time
      const updateCalls = mockStore.dispatch.mock.calls.filter(
        (call) => call[0].type === "player/updateLastAttackTime",
      );
      expect(updateCalls.length).toBe(1);
    });

    it("should not attack when no enemies present", () => {
      const enemies = [];

      CombatService.handlePlayerAttack(enemies);

      expect(mockStore.dispatch).not.toHaveBeenCalledWith(
        "enemies/damageEnemy",
        expect.any(Object),
      );
    });
  });
});
