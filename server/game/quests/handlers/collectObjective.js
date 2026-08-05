import { applyRemoveItem } from "../../../../shared/inventory.js";

const itemMatches = (item, target) =>
  item.icon === target || String(item.id) === String(target);

export const collectObjective = {
  type: "collect",

  applyProgress() {
    return null;
  },

  getProgress({ objective, ctx }) {
    const items = ctx?.inventory?.items || [];
    return items.reduce((total, item) => {
      if (itemMatches(item, objective.target)) {
        return total + (item.quantity || 1);
      }
      return total;
    }, 0);
  },

  isComplete({ objective, ctx }) {
    return this.getProgress({ objective, ctx }) >= objective.required;
  },

  consume({ objective, ctx }) {
    const inventory = ctx?.inventory;
    if (!inventory) return;
    let remaining = objective.required;
    for (const item of [...inventory.items]) {
      if (remaining <= 0) break;
      if (!itemMatches(item, objective.target)) continue;
      const take = Math.min(item.quantity, remaining);
      applyRemoveItem(inventory, item.id, take);
      remaining -= take;
    }
  },
};
