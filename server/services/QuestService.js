// server/services/QuestService.js
import { questCatalog } from "../../shared/data/questCatalog.js";
import { itemCatalog } from "../../shared/data/itemCatalog.js";
import { applyAddItem, canAddItems, cloneItem, materializeItem } from "../../shared/inventory.js";
import { objectiveRegistry } from "../game/quests/registry.js";

const EMPTY_INVENTORY = { id: "player", type: "player", maxSlots: 20, maxWeight: 100, items: [], equipment: {} };

export class QuestService {
  constructor(redis, playerState, questState, broadcaster, inventoryState, registry = objectiveRegistry, catalog = questCatalog) {
    this.redis = redis;
    this.playerState = playerState;
    this.questState = questState;
    this.broadcaster = broadcaster;
    this.inventoryState = inventoryState;
    this.registry = registry;
    this.catalog = catalog;
  }

  async accept(sessionId, questId) {
    const active = await this.questState.loadActive(sessionId);
    if (active[questId]) return { error: "Quest already active" };
    const completed = await this.questState.loadCompleted(sessionId);
    if (completed[questId]) return { error: "Quest already completed" };

    const progress = { questId, startedAt: Date.now(), progress: {} };
    await this.questState.saveActive(sessionId, questId, progress);
    this.broadcaster.broadcast(sessionId, "QUEST_UPDATE", { questId, progress, accepted: true });
    return { success: true };
  }

  async handleEvent(sessionId, event) {
    const active = await this.questState.loadActive(sessionId);
    for (const [questId, entry] of Object.entries(active)) {
      const def = this.catalog[questId];
      if (!def?.objectives) continue;

      const updated = {};
      for (const objective of Object.values(def.objectives)) {
        const handler = this.registry.get(objective.type);
        if (!handler?.applyProgress) continue;
        const patch = handler.applyProgress({ entry, objective, event });
        if (patch) Object.assign(updated, patch);
      }

      if (Object.keys(updated).length > 0) {
        const nextEntry = { ...entry, progress: { ...(entry?.progress || {}), ...updated } };
        await this.questState.saveActive(sessionId, questId, nextEntry);
        this.broadcaster.broadcast(sessionId, "QUEST_UPDATE", { questId, progress: nextEntry });
      }
    }
  }

  async complete(sessionId, questId) {
    const active = await this.questState.loadActive(sessionId);
    const entry = active[questId];
    if (!entry) return { error: "Quest not active" };

    const def = this.catalog[questId];
    if (!def) return { error: "Quest not found" };

    const inventory = (await this.inventoryState?.load(sessionId, "player")) || { ...EMPTY_INVENTORY };
    const ctx = { sessionId, inventory };

    for (const objective of Object.values(def.objectives || {})) {
      const handler = this.registry.get(objective.type);
      if (!handler) return { error: `Unknown objective type: ${objective.type}` };
      if (!handler.isComplete({ entry, objective, ctx })) {
        return { error: "Quest objectives not complete" };
      }
    }

    const projected = cloneItem(inventory);
    for (const objective of Object.values(def.objectives || {})) {
      const handler = this.registry.get(objective.type);
      if (handler.consume) handler.consume({ entry, objective, ctx: { inventory: projected } });
    }

    const rewards = def.rewards || {};
    if (rewards.items?.length) {
      const rewardItems = rewards.items.map((r) => this.buildRewardItem(r));
      const fit = canAddItems(projected, rewardItems);
      if (!fit.isValid) return { error: fit.error };
    }

    for (const objective of Object.values(def.objectives || {})) {
      const handler = this.registry.get(objective.type);
      if (handler.consume) {
        const result = await handler.consume({ entry, objective, ctx });
        if (result?.error) return result;
      }
    }

    await this.grantRewards(sessionId, def, inventory);

    await this.questState.deleteActive(sessionId, questId);
    await this.questState.saveCompleted(sessionId, questId, { completedAt: Date.now() });
    this.broadcaster.broadcast(sessionId, "QUEST_UPDATE", { questId, completed: true });
    return { success: true, rewards };
  }

  buildRewardItem(r) {
    const catalogItem = itemCatalog[r.icon];
    return materializeItem({
      icon: r.icon,
      id: catalogItem?.id ?? r.icon,
      type: catalogItem?.type ?? "material",
      quantity: r.quantity ?? 1,
    });
  }

  async grantRewards(sessionId, def, inventory) {
    const rewards = def.rewards || {};
    const player = (await this.playerState.load(sessionId)) || {};
    const updates = {};
    if (rewards.gold) updates.gold = (player.gold || 0) + rewards.gold;
    if (rewards.exp) updates.exp = (player.exp || 0) + rewards.exp;
    if (Object.keys(updates).length > 0) {
      await this.playerState.save(sessionId, updates);
      for (const [k, v] of Object.entries(updates)) {
        this.broadcaster.broadcast(sessionId, "DIFF", { path: `player.${k}`, data: v });
      }
    }

    if (rewards.items?.length && this.inventoryState) {
      for (const r of rewards.items) applyAddItem(inventory, this.buildRewardItem(r));
      await this.inventoryState.save(sessionId, "player", inventory);
      const allInv = await this.inventoryState.loadAll(sessionId);
      this.broadcaster.broadcast(sessionId, "INVENTORY_UPDATE", { inventories: allInv });
    }
  }
}
