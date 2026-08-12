// server/messages/registry.js
import { sessionHandlers } from "./handlers/session.js";
import { combatHandlers } from "./handlers/combat.js";
import { buildingHandlers } from "./handlers/building.js";
import { productionHandlers } from "./handlers/production.js";
import { craftingHandlers } from "./handlers/crafting.js";
import { tradeHandlers } from "./handlers/trade.js";
import { questHandlers } from "./handlers/quests.js";
import { inventoryHandlers } from "./handlers/inventory.js";

export function createMessageRegistry() {
  const handlers = new Map();
  return {
    register(type, handler) {
      handlers.set(type, handler);
      return this;
    },
    get(type) {
      return handlers.get(type) || null;
    },
    has(type) {
      return handlers.has(type);
    },
  };
}

export const messageRegistry = createMessageRegistry();

for (const { type, handler } of [
  ...sessionHandlers,
  ...combatHandlers,
  ...buildingHandlers,
  ...productionHandlers,
  ...craftingHandlers,
  ...tradeHandlers,
  ...questHandlers,
  ...inventoryHandlers,
]) {
  messageRegistry.register(type, handler);
}
