// server/services/CraftingService.js
import { INVENTORY_ERRORS } from "../../shared/constants.js";
import { validateSlotLimit, validateWeightLimit, applyAddItem, applyRemoveItem } from "../../shared/inventory.js";

export class CraftingService {
  constructor(redis, playerState, inventoryState, broadcaster) {
    this.redis = redis;
    this.playerState = playerState;
    this.inventoryState = inventoryState;
    this.broadcaster = broadcaster;
  }

  async craft(sessionId, recipeId) {
    const recipes = await this.playerState.loadRecipes(sessionId);
    if (!recipes.includes(recipeId)) return { error: "Recipe not known" };

    const inventory = await this.inventoryState.load(sessionId, "player");
    if (!inventory) return { error: INVENTORY_ERRORS.SESSION_NOT_FOUND };

    this.broadcaster.broadcast(sessionId, "DIFF", { path: "inventory.player", data: inventory });
    return { success: true };
  }
}
