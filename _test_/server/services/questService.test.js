import { describe, it, expect, vi, beforeEach } from "vitest";
import { QuestService } from "../../../server/services/QuestService.js";

function makeInventory(items, overrides = {}) {
  return {
    id: "player",
    type: "player",
    maxSlots: 20,
    maxWeight: 100,
    items,
    equipment: {},
    ...overrides,
  };
}

describe("QuestService", () => {
  let playerState, questState, broadcaster, inventoryState, qs;

  beforeEach(() => {
    playerState = { load: vi.fn().mockResolvedValue({ gold: 0, exp: 0 }), save: vi.fn() };
    questState = { saveActive: vi.fn(), loadActive: vi.fn().mockResolvedValue({}), deleteActive: vi.fn(), saveCompleted: vi.fn(), loadCompleted: vi.fn().mockResolvedValue({}) };
    broadcaster = { broadcast: vi.fn() };
    inventoryState = { load: vi.fn().mockResolvedValue(null), loadAll: vi.fn().mockResolvedValue({}), save: vi.fn() };
    qs = new QuestService(null, playerState, questState, broadcaster, inventoryState);
  });

  it("accept saves active quest and broadcasts", async () => {
    const result = await qs.accept("s1", "quest_1");
    expect(result.success).toBe(true);
    expect(questState.saveActive).toHaveBeenCalledWith("s1", "quest_1", expect.objectContaining({ questId: "quest_1" }));
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "QUEST_UPDATE", expect.objectContaining({ questId: "quest_1", accepted: true }));
  });

  it("accept returns error if quest already active", async () => {
    questState.loadActive.mockResolvedValue({ quest_1: { questId: "quest_1", startedAt: Date.now() } });
    questState.loadCompleted.mockResolvedValue({});
    const result = await qs.accept("s1", "quest_1");
    expect(result.error).toBe("Quest already active");
    expect(questState.saveActive).not.toHaveBeenCalled();
  });

  it("accept returns error if quest already completed", async () => {
    questState.loadActive.mockResolvedValue({});
    questState.loadCompleted.mockResolvedValue({ quest_1: { completedAt: Date.now() } });
    const result = await qs.accept("s1", "quest_1");
    expect(result.error).toBe("Quest already completed");
    expect(questState.saveActive).not.toHaveBeenCalled();
  });

  it("handleEvent increments matching kill objectives and broadcasts", async () => {
    questState.loadActive.mockResolvedValue({
      help_village_kill_monsters: { questId: "help_village_kill_monsters", startedAt: 1, progress: {} },
    });
    await qs.handleEvent("s1", { kind: "kill", data: { enemy: { id: "e1", name: "Forest Beast" } } });
    expect(questState.saveActive).toHaveBeenCalledWith("s1", "help_village_kill_monsters", {
      questId: "help_village_kill_monsters",
      startedAt: 1,
      progress: { monstersKilled: 1 },
    });
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "QUEST_UPDATE", {
      questId: "help_village_kill_monsters",
      progress: {
        questId: "help_village_kill_monsters",
        startedAt: 1,
        progress: { monstersKilled: 1 },
      },
    });
  });

  it("handleEvent caps progress at the objective requirement", async () => {
    let active = { help_village_kill_monsters: { questId: "help_village_kill_monsters", startedAt: 1, progress: { monstersKilled: 4 } } };
    questState.loadActive.mockImplementation(async () => ({ ...active, help_village_kill_monsters: { ...active.help_village_kill_monsters } }));
    questState.saveActive.mockImplementation(async (s, q, entry) => {
      active[q] = entry;
      return Promise.resolve();
    });
    await qs.handleEvent("s1", { kind: "kill", data: { enemy: { id: "e1" } } });
    expect(questState.saveActive).toHaveBeenCalledWith("s1", "help_village_kill_monsters", expect.objectContaining({
      progress: { monstersKilled: 5 },
    }));
    await qs.handleEvent("s1", { kind: "kill", data: { enemy: { id: "e1" } } });
    expect(questState.saveActive).toHaveBeenCalledTimes(1);
    expect(active.help_village_kill_monsters.progress.monstersKilled).toBe(5);
  });

  it("handleEvent does not touch collect objectives", async () => {
    questState.loadActive.mockResolvedValue({
      blacksmith_iron_ore: { questId: "blacksmith_iron_ore", startedAt: 1, progress: {} },
    });
    await qs.handleEvent("s1", { kind: "kill", data: { enemy: { id: "e1" } } });
    expect(questState.saveActive).not.toHaveBeenCalled();
    expect(broadcaster.broadcast).not.toHaveBeenCalled();
  });

  it("handleEvent ignores unknown objective types", async () => {
    const catalog = {
      custom_q: {
        id: "custom_q",
        objectives: { o1: { type: "explore", required: 1, progressKey: "x" } },
      },
    };
    const qs2 = new QuestService(null, playerState, questState, broadcaster, inventoryState, undefined, catalog);
    questState.loadActive.mockResolvedValue({ custom_q: { questId: "custom_q", progress: {} } });
    await qs2.handleEvent("s1", { kind: "kill", data: { enemy: {} } });
    expect(questState.saveActive).not.toHaveBeenCalled();
  });

  it("complete returns error if quest not active", async () => {
    questState.loadActive.mockResolvedValue({});
    const result = await qs.complete("s1", "quest_1");
    expect(result.error).toBe("Quest not active");
  });

  it("complete returns error if quest is unknown", async () => {
    questState.loadActive.mockResolvedValue({ no_such_quest: { questId: "no_such_quest", progress: {} } });
    const result = await qs.complete("s1", "no_such_quest");
    expect(result.error).toBe("Quest not found");
  });

  it("complete rejects when kill objectives are not complete", async () => {
    questState.loadActive.mockResolvedValue({
      help_village_kill_monsters: { questId: "help_village_kill_monsters", startedAt: 1, progress: { monstersKilled: 2 } },
    });
    inventoryState.load.mockResolvedValue(makeInventory([]));
    const result = await qs.complete("s1", "help_village_kill_monsters");
    expect(result.error).toBe("Quest objectives not complete");
    expect(questState.deleteActive).not.toHaveBeenCalled();
    expect(questState.saveCompleted).not.toHaveBeenCalled();
  });

  it("complete rejects when collect items are insufficient", async () => {
    questState.loadActive.mockResolvedValue({
      blacksmith_iron_ore: { questId: "blacksmith_iron_ore", startedAt: 1, progress: {} },
    });
    inventoryState.load.mockResolvedValue(makeInventory([{ id: "a", icon: "iron-ore", quantity: 3 }]));
    const result = await qs.complete("s1", "blacksmith_iron_ore");
    expect(result.error).toBe("Quest objectives not complete");
    expect(questState.deleteActive).not.toHaveBeenCalled();
  });

  it("complete grants gold and exp rewards for a kill quest", async () => {
    questState.loadActive.mockResolvedValue({
      help_village_kill_monsters: { questId: "help_village_kill_monsters", startedAt: 1, progress: { monstersKilled: 5 } },
    });
    inventoryState.load.mockResolvedValue(makeInventory([]));
    const result = await qs.complete("s1", "help_village_kill_monsters");
    expect(result.success).toBe(true);
    expect(playerState.save).toHaveBeenCalledWith("s1", { gold: 50, exp: 100 });
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.gold", data: 50 });
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.exp", data: 100 });
    expect(questState.deleteActive).toHaveBeenCalledWith("s1", "help_village_kill_monsters");
    expect(questState.saveCompleted).toHaveBeenCalled();
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "QUEST_UPDATE", { questId: "help_village_kill_monsters", completed: true });
  });

  it("complete deducts collected items and grants rewards for a collect quest", async () => {
    const inventory = makeInventory([{ id: "a", icon: "iron-ore", quantity: 7 }]);
    questState.loadActive.mockResolvedValue({
      blacksmith_iron_ore: { questId: "blacksmith_iron_ore", startedAt: 1, progress: {} },
    });
    inventoryState.load.mockResolvedValue(inventory);
    inventoryState.loadAll.mockResolvedValue({ player: inventory });
    const result = await qs.complete("s1", "blacksmith_iron_ore");
    expect(result.success).toBe(true);
    expect(inventory.items).toContainEqual(expect.objectContaining({ icon: "iron-ore", quantity: 2 }));
    expect(inventory.items).toContainEqual(expect.objectContaining({ icon: "light-gloves", quantity: 1 }));
    expect(inventoryState.save).toHaveBeenCalledWith("s1", "player", inventory);
    expect(inventoryState.loadAll).toHaveBeenCalledWith("s1");
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "INVENTORY_UPDATE", { inventories: { player: inventory } });
    expect(playerState.save).toHaveBeenCalledWith("s1", { gold: 30, exp: 50 });
  });

  it("complete blocks when reward items cannot fit the inventory", async () => {
    const catalog = {
      full_inv_quest: {
        id: "full_inv_quest",
        objectives: { collectIron: { type: "collect", target: "iron-ore", required: 1, progressKey: "x" } },
        rewards: {
          items: [{ icon: "light-gloves", quantity: 1 }, { icon: "wooden-buckler-shield", quantity: 1 }],
        },
      },
    };
    const qs2 = new QuestService(null, playerState, questState, broadcaster, inventoryState, undefined, catalog);
    const inventory = makeInventory([{ id: "a", icon: "iron-ore", quantity: 1 }], { maxSlots: 1 });
    questState.loadActive.mockResolvedValue({ full_inv_quest: { questId: "full_inv_quest", startedAt: 1, progress: {} } });
    inventoryState.load.mockResolvedValue(inventory);
    const result = await qs2.complete("s1", "full_inv_quest");
    expect(result.error).toBeTruthy();
    expect(inventoryState.save).not.toHaveBeenCalled();
    expect(questState.deleteActive).not.toHaveBeenCalled();
    expect(questState.saveCompleted).not.toHaveBeenCalled();
  });
});
