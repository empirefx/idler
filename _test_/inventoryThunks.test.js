import { describe, it, expect, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import playerInventoryReducer from "../src/store/slices/playerInventorySlice.js";
import placeInventoryReducer from "../src/store/slices/placeInventorySlice.js";
import {
  moveItemBetweenInventories,
  removeItemFromInventory,
} from "../src/store/slices/inventoryThunks.js";

// Helper to create a test store with both inventory slices
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      playerInventory: playerInventoryReducer,
      placeInventory: placeInventoryReducer,
    },
    preloadedState: initialState,
  });
};

describe("inventoryThunks", () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
    vi.clearAllMocks();
  });

  describe("moveItemBetweenInventories", () => {
    it("should move item from player inventory to place inventory", () => {
      // Setup: Player has an apple
      const playerState = {
        playerInventory: {
          player: {
            id: "player",
            type: "player",
            maxSlots: 20,
            maxWeight: 100,
            items: [
              {
                id: "apple1",
                name: "apple",
                type: "consumable",
                quantity: 5,
                weight: 0.5,
              },
            ],
            equipment: {
              head: null,
              body: null,
              pants: null,
              "main-weapon": null,
              "second-weapon": null,
            },
          },
        },
        placeInventory: {
          village_center: {
            id: "village_center",
            type: "place",
            maxSlots: 30,
            items: [],
          },
        },
      };

      const testStore = createTestStore(playerState);

      // Action: Move 2 apples from player to village center
      const result = testStore.dispatch(
        moveItemBetweenInventories("player", "village_center", "apple1", 2),
      );

      expect(result).toBe(true);

      // Verify state after move
      const state = testStore.getState();

      // Player should have 3 apples left
      const playerApples = state.playerInventory.player.items.find(
        (item) => item.id === "apple1",
      );
      expect(playerApples.quantity).toBe(3);

      // Village center should have 2 apples
      const villageApples = state.placeInventory.village_center.items.find(
        (item) => item.name === "apple",
      );
      expect(villageApples.quantity).toBe(2);
    });

    it("should move item from place inventory to player inventory", () => {
      // Setup: Place has an item
      const placeState = {
        playerInventory: {
          player: {
            id: "player",
            type: "player",
            maxSlots: 20,
            maxWeight: 100,
            items: [],
            equipment: {
              head: null,
              body: null,
              pants: null,
              "main-weapon": null,
              "second-weapon": null,
            },
          },
        },
        placeInventory: {
          village_center: {
            id: "village_center",
            type: "place",
            maxSlots: 30,
            items: [
              {
                id: "sword1",
                name: "iron sword",
                type: "equipment",
                piece: "main-weapon",
                quantity: 1,
                weight: 5,
              },
            ],
          },
        },
      };

      const testStore = createTestStore(placeState);

      // Action: Move sword from village center to player
      const result = testStore.dispatch(
        moveItemBetweenInventories("village_center", "player", "sword1", 1),
      );

      expect(result).toBe(true);

      // Verify state after move
      const state = testStore.getState();

      // Village center should be empty
      expect(state.placeInventory.village_center.items).toHaveLength(0);

      // Player should have the sword
      const playerSword = state.playerInventory.player.items.find(
        (item) => item.id === "sword1",
      );
      expect(playerSword).toBeDefined();
      expect(playerSword.name).toBe("iron sword");
    });

    it("should handle partial stack moves correctly", () => {
      // Setup: Player has 10 of an item
      const partialState = {
        playerInventory: {
          player: {
            id: "player",
            type: "player",
            maxSlots: 20,
            maxWeight: 100,
            items: [
              {
                id: "berries1",
                name: "berries",
                type: "consumable",
                quantity: 10,
                weight: 0.1,
              },
            ],
            equipment: {
              head: null,
              body: null,
              pants: null,
              "main-weapon": null,
              "second-weapon": null,
            },
          },
        },
        placeInventory: {
          village_center: {
            id: "village_center",
            type: "place",
            maxSlots: 30,
            items: [],
          },
        },
      };

      const testStore = createTestStore(partialState);

      // Action: Move 3 berries (partial stack)
      const result = testStore.dispatch(
        moveItemBetweenInventories("player", "village_center", "berries1", 3),
      );

      expect(result).toBe(true);

      // Verify state after move
      const state = testStore.getState();

      // Player should have 7 berries left
      const playerBerries = state.playerInventory.player.items.find(
        (item) => item.id === "berries1",
      );
      expect(playerBerries.quantity).toBe(7);

      // Village center should have 3 berries
      const villageBerries = state.placeInventory.village_center.items.find(
        (item) => item.name === "berries",
      );
      expect(villageBerries.quantity).toBe(3);

      // Should be separate item with different ID
      expect(villageBerries.id).not.toBe("berries1");
    });

    it("should return false when source inventory does not exist", () => {
      const result = store.dispatch(
        moveItemBetweenInventories("nonexistent", "village_center", "item1", 1),
      );

      expect(result).toBe(false);
    });

    it("should return false when target inventory does not exist", () => {
      const result = store.dispatch(
        moveItemBetweenInventories("player", "nonexistent", "apple1", 1),
      );

      expect(result).toBe(false);
    });

    it("should return false when item not found in source inventory", () => {
      const result = store.dispatch(
        moveItemBetweenInventories(
          "player",
          "village_center",
          "nonexistent_item",
          1,
        ),
      );

      expect(result).toBe(false);
    });

    it("should return false when target inventory is full", () => {
      // Setup: Full target inventory
      const fullTargetState = {
        playerInventory: {
          player: {
            id: "player",
            type: "player",
            maxSlots: 20,
            maxWeight: 100,
            items: [
              {
                id: "item1",
                name: "test item",
                type: "material",
                quantity: 1,
                weight: 1,
              },
            ],
            equipment: {
              head: null,
              body: null,
              pants: null,
              "main-weapon": null,
              "second-weapon": null,
            },
          },
        },
        placeInventory: {
          village_center: {
            id: "village_center",
            type: "place",
            maxSlots: 1, // Only 1 slot
            items: [
              {
                id: "filler",
                name: "filler",
                type: "material",
                quantity: 1,
                weight: 1,
              },
            ],
          },
        },
      };

      const testStore = createTestStore(fullTargetState);

      const result = testStore.dispatch(
        moveItemBetweenInventories("player", "village_center", "item1", 1),
      );

      expect(result).toBe(false);
    });

    it("should return false when player weight limit exceeded", () => {
      // Setup: Player overweight if item added
      const overweightState = {
        playerInventory: {
          player: {
            id: "player",
            type: "player",
            maxSlots: 20,
            maxWeight: 10, // Very low weight limit
            items: [],
            equipment: {
              head: null,
              body: null,
              pants: null,
              "main-weapon": null,
              "second-weapon": null,
            },
          },
        },
        placeInventory: {
          village_center: {
            id: "village_center",
            type: "place",
            maxSlots: 30,
            items: [
              {
                id: "heavy",
                name: "heavy item",
                type: "material",
                quantity: 1,
                weight: 100,
              },
            ],
          },
        },
      };

      const testStore = createTestStore(overweightState);

      const result = testStore.dispatch(
        moveItemBetweenInventories("village_center", "player", "heavy", 1),
      );

      expect(result).toBe(false);
    });
  });

  describe("removeItemFromInventory", () => {
    it("should remove item from player inventory", () => {
      // Setup: Player has an item
      const playerState = {
        playerInventory: {
          player: {
            id: "player",
            type: "player",
            maxSlots: 20,
            maxWeight: 100,
            items: [
              {
                id: "apple1",
                name: "apple",
                type: "consumable",
                quantity: 5,
                weight: 0.5,
              },
            ],
            equipment: {
              head: null,
              body: null,
              pants: null,
              "main-weapon": null,
              "second-weapon": null,
            },
          },
        },
        placeInventory: {},
      };

      const testStore = createTestStore(playerState);

      // Action: Remove 2 apples
      const result = testStore.dispatch(
        removeItemFromInventory("player", "apple1", 2),
      );

      expect(result).toBe(true);

      // Verify state after removal
      const state = testStore.getState();
      const playerApples = state.playerInventory.player.items.find(
        (item) => item.id === "apple1",
      );
      expect(playerApples.quantity).toBe(3);
    });

    it("should remove item from place inventory", () => {
      // Setup: Place has an item
      const placeState = {
        playerInventory: {},
        placeInventory: {
          village_center: {
            id: "village_center",
            type: "place",
            maxSlots: 30,
            items: [
              {
                id: "berry1",
                name: "berries",
                type: "consumable",
                quantity: 10,
                weight: 0.1,
              },
            ],
          },
        },
      };

      const testStore = createTestStore(placeState);

      // Action: Remove all berries
      const result = testStore.dispatch(
        removeItemFromInventory("village_center", "berry1", 10),
      );

      expect(result).toBe(true);

      // Verify state after removal
      const state = testStore.getState();
      expect(state.placeInventory.village_center.items).toHaveLength(0);
    });

    it("should remove entire item when quantity not specified", () => {
      const state = {
        playerInventory: {
          player: {
            id: "player",
            type: "player",
            maxSlots: 20,
            maxWeight: 100,
            items: [
              {
                id: "single1",
                name: "single item",
                type: "material",
                quantity: 1,
                weight: 1,
              },
            ],
            equipment: {
              head: null,
              body: null,
              pants: null,
              "main-weapon": null,
              "second-weapon": null,
            },
          },
        },
        placeInventory: {},
      };

      const testStore = createTestStore(state);

      // Action: Remove without specifying quantity
      const result = testStore.dispatch(
        removeItemFromInventory("player", "single1"),
      );

      expect(result).toBe(true);

      // Verify item is completely removed
      const finalState = testStore.getState();
      expect(finalState.playerInventory.player.items).toHaveLength(0);
    });

    it("should return false when inventory does not exist", () => {
      const result = store.dispatch(
        removeItemFromInventory("nonexistent", "item1", 1),
      );

      expect(result).toBe(false);
    });

    it("should return false when item not found", () => {
      const result = store.dispatch(
        removeItemFromInventory("player", "nonexistent_item", 1),
      );

      expect(result).toBe(false);
    });

    it("should handle place inventory by placeId", () => {
      // Setup inventory that can be found by placeId
      const placeState = {
        playerInventory: {},
        placeInventory: {
          some_place_id: {
            id: "some_place_id",
            placeId: "village_center", // Different placeId
            type: "place",
            maxSlots: 30,
            items: [
              {
                id: "test",
                name: "test",
                type: "material",
                quantity: 1,
                weight: 1,
              },
            ],
          },
        },
      };

      const testStore = createTestStore(placeState);

      // Action: Remove using placeId instead of inventoryId
      const result = testStore.dispatch(
        removeItemFromInventory(
          "village_center", // Using placeId
          "test",
          1,
        ),
      );

      expect(result).toBe(true);

      // Verify item removed
      const state = testStore.getState();
      expect(state.placeInventory.some_place_id.items).toHaveLength(0);
    });
  });

  describe("error handling", () => {
    it("should handle console.error for move failures", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = store.dispatch(
        moveItemBetweenInventories("nonexistent", "village_center", "item1", 1),
      );

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Source or target inventory not found",
      );

      consoleSpy.mockRestore();
    });

    it("should handle console.error for remove failures", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = store.dispatch(
        removeItemFromInventory("player", "nonexistent_item", 1),
      );

      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});
