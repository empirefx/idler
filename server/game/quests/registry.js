import { killObjective } from "./handlers/killObjective.js";
import { collectObjective } from "./handlers/collectObjective.js";

export function createObjectiveRegistry() {
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

export const objectiveRegistry = createObjectiveRegistry()
  .register(killObjective.type, killObjective)
  .register(collectObjective.type, collectObjective);
