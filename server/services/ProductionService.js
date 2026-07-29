// server/services/ProductionService.js
import { INVENTORY_ERRORS } from "../../shared/constants.js";
import { validateSlotLimit, validateWeightLimit, applyAddItem } from "../../shared/inventory.js";

export class ProductionService {
  constructor(redis, inventoryState, productionQueue, broadcaster) {
    this.redis = redis;
    this.inventoryState = inventoryState;
    this.productionQueue = productionQueue;
    this.broadcaster = broadcaster;
  }

  async assignWorker(sessionId, placeId, socketIndex, worker, building) {
    const jobId = `prod:${sessionId}:${placeId}:${socketIndex}`;
    const interval = building.productionInterval || 5000;

    const key = `player:${sessionId}:production:assignments`;
    await this.redis.hset(key, jobId, JSON.stringify({
      placeId, socketIndex, workerId: worker.id,
      buildingId: building.id,
    }));

    await this.productionQueue.add("produce", {
      sessionId, placeId, socketIndex, worker, building,
    }, { jobId, delay: interval });

    return { assigned: true };
  }

  async unassignWorker(sessionId, placeId, socketIndex) {
    const jobId = `prod:${sessionId}:${placeId}:${socketIndex}`;
    const key = `player:${sessionId}:production:assignments`;
    await this.redis.hdel(key, jobId);
    await this.productionQueue.remove(jobId);
    return { unassigned: true };
  }

  async produce(sessionId, placeId, socketIndex, worker, building) {
    const inventory = await this.inventoryState.load(sessionId, "player");
    if (!inventory) return { error: "Inventory not found" };

    const item = this._createProducedItem(building);
    const slotCheck = validateSlotLimit(inventory, 1);
    if (!slotCheck.isValid) return { error: INVENTORY_ERRORS.INVENTORY_FULL };

    applyAddItem(inventory, item);
    await this.inventoryState.save(sessionId, "player", inventory);

    const result = { item, placeId, socketIndex, workerId: worker.id };
    this.broadcaster.broadcast("PRODUCTION_TICK", result);

    const interval = building.productionInterval || 5000;
    await this.productionQueue.add("produce", {
      sessionId, placeId, socketIndex, worker, building,
    }, { jobId: `prod:${sessionId}:${placeId}:${socketIndex}`, delay: interval });

    return result;
  }

  _createProducedItem(building) {
    return {
      id: `${building.produces}_${Date.now()}`,
      template_id: building.produces,
      name: building.produces,
      type: "material",
      quantity: 1,
      weight: building.itemWeight || 1,
    };
  }
}
