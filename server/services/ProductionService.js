// server/services/ProductionService.js
import { PRODUCTION_INTERVAL_MS } from "../../shared/constants.js";
import {
  materializeItem,
  validateSlotLimit,
  validateWeightLimit,
  applyAddItem,
} from "../../shared/inventory.js";
import { itemCatalog } from "../../shared/data/itemCatalog.js";
import { buildingsData } from "../../shared/data/buildings.js";
import { placesData } from "../../shared/data/places.js";

export class ProductionService {
  constructor(redis, workersState, inventoryState, productionQueue, broadcaster) {
    this.redis = redis;
    this.workersState = workersState;
    this.inventoryState = inventoryState;
    this.productionQueue = productionQueue;
    this.broadcaster = broadcaster;
  }

  _assignmentsKey(sessionId) {
    return `player:${sessionId}:production:assignments`;
  }

  _buildingsKey(sessionId) {
    return `player:${sessionId}:buildings`;
  }

  _connectedKey(sessionId) {
    return `player:${sessionId}:connected`;
  }

  _jobId(sessionId, placeId, socketIndex) {
    return `prod-${sessionId}-${placeId}-${socketIndex}`;
  }

  async assignWorker(sessionId, placeId, socketIndex, workerId, material) {
    const workersState =
      (await this.workersState.load(sessionId)) || { hired: [], available: [], workerSlots: 0 };
    const worker = workersState.hired.find((w) => w.id === workerId);
    if (!worker) return { error: "Worker not found" };

    const buildings = await this._loadHash(this._buildingsKey(sessionId));
    const building = buildings[`${placeId}:${socketIndex}`];
    if (!building) return { error: "No building at this location" };

    const buildingData = buildingsData[building.id];
    if (!buildingData?.upgrades) return { error: "This building cannot produce" };

    const allowed = this._allowedMaterials(buildingData, building.level);
    if (!allowed.includes(material)) {
      return { error: "Invalid material for this building level" };
    }

    if (worker.assignment) {
      await this.cleanupWorkerAssignment(sessionId, workerId);
    }

    const assignmentKey = this._jobId(sessionId, placeId, socketIndex);
    worker.assignment = { placeId, socketIndex, material };
    const record = { sessionId, placeId, socketIndex, workerId, material };
    await this.redis.hset(this._assignmentsKey(sessionId), assignmentKey, JSON.stringify(record));
    await this.workersState.save(sessionId, workersState);
    await this.productionQueue.add("produce", record, { jobId: this._jobId(sessionId, placeId, socketIndex), delay: PRODUCTION_INTERVAL_MS });

    return { workers: workersState, assigned: true };
  }

  async unassignWorker(sessionId, placeId, socketIndex, workerId) {
    const assignmentKey = this._jobId(sessionId, placeId, socketIndex);
    const raw = await this.redis.hget(this._assignmentsKey(sessionId), assignmentKey);
    const record = raw ? JSON.parse(raw) : null;
    if (!record) return { error: "No assignment found" };
    if (record.workerId !== workerId) return { error: "Assignment mismatch" };

    const workersState =
      (await this.workersState.load(sessionId)) || { hired: [], available: [], workerSlots: 0 };
    const worker = workersState.hired.find((w) => w.id === workerId);
    if (worker) {
      worker.assignment = null;
      await this.workersState.save(sessionId, workersState);
    }

    await this.redis.hdel(this._assignmentsKey(sessionId), assignmentKey);
    await this.productionQueue.remove(this._jobId(sessionId, placeId, socketIndex));
    return { workers: workersState, unassigned: true };
  }

  async produce(sessionId, placeId, socketIndex, material) {
    const connected = await this.redis.get(this._connectedKey(sessionId));
    if (connected !== "1") return { skipped: true };

    const assignmentKey = this._jobId(sessionId, placeId, socketIndex);
    const raw = await this.redis.hget(this._assignmentsKey(sessionId), assignmentKey);
    const record = raw ? JSON.parse(raw) : null;
    if (!record || !record.material) return { skipped: true };

    const workersState = (await this.workersState.load(sessionId)) || { hired: [] };
    const worker = workersState.hired.find((w) => w.id === record.workerId);
    if (
      !worker?.assignment ||
      worker.assignment.placeId !== placeId ||
      worker.assignment.socketIndex !== socketIndex
    ) {
      return { skipped: true };
    }

    const buildings = await this._loadHash(this._buildingsKey(sessionId));
    const building = buildings[`${placeId}:${socketIndex}`];
    if (!building) return { skipped: true };

    const buildingData = buildingsData[building.id];
    const catalogItem = itemCatalog[material];
    const item = materializeItem({
      icon: material,
      id: catalogItem?.id ?? material,
      template_id: material,
      type: "material",
      quantity: buildingData?.baseProductionRate || 1,
    });

    const targetPlaceId = this.findClosestPlaceWithInventory(placeId);
    const target = await this.inventoryState.load(sessionId, `place-${targetPlaceId}`);
    if (!target) return { skipped: true };

    const slotCheck = validateSlotLimit(target, 1);
    const weightCheck = validateWeightLimit(target, (item.weight || 1) * item.quantity);
    if (!slotCheck.isValid || !weightCheck.isValid) {
      await this.cleanupWorkerAssignment(sessionId, worker.id);
      this.broadcaster.broadcast(sessionId, "NOTIFICATION", {
        message: `Inventory full! ${worker.name} stopped producing ${item.name}`,
        type: "warning",
      });
      return { autoUnassigned: true };
    }

    applyAddItem(target, item);
    await this.inventoryState.save(sessionId, `place-${targetPlaceId}`, target);

    const allInv = await this.inventoryState.loadAll(sessionId);
    this.broadcaster.broadcast(sessionId, "INVENTORY_UPDATE", { inventories: allInv });
    this.broadcaster.broadcast(sessionId, "PRODUCTION_TICK", {
      item,
      placeId,
      socketIndex,
      targetPlaceId,
      workerId: worker.id,
      workerName: worker.name,
    });

    await this.productionQueue.add("produce", record, { jobId: this._jobId(sessionId, placeId, socketIndex), delay: PRODUCTION_INTERVAL_MS });
    return { item, targetPlaceId };
  }

  async cleanupWorkerAssignment(sessionId, workerId) {
    const workersState =
      (await this.workersState.load(sessionId)) || { hired: [], available: [], workerSlots: 0 };
    const worker = workersState.hired.find((w) => w.id === workerId);
    if (!worker?.assignment) return { cleared: false };

    const { placeId, socketIndex } = worker.assignment;
    const assignmentKey = this._jobId(sessionId, placeId, socketIndex);
    await this.redis.hdel(this._assignmentsKey(sessionId), assignmentKey);
    await this.productionQueue.remove(this._jobId(sessionId, placeId, socketIndex));
    worker.assignment = null;
    await this.workersState.save(sessionId, workersState);
    return { cleared: true };
  }

  findClosestPlaceWithInventory(currentPlaceId) {
    if (placesData[currentPlaceId]?.hasInventory) return currentPlaceId;
    const queue = [currentPlaceId];
    const visited = new Set([currentPlaceId]);
    while (queue.length > 0) {
      const placeId = queue.shift();
      const place = placesData[placeId];
      if (!place) continue;
      if (place.hasInventory) return placeId;
      for (const next of place.connections || []) {
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }
    return "village_center";
  }

  async pauseAll(sessionId) {
    await this.redis.set(this._connectedKey(sessionId), "0");
    const assignments = await this.redis.hgetall(this._assignmentsKey(sessionId));
    for (const raw of Object.values(assignments || {})) {
      const record = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (record?.placeId != null) {
        await this.productionQueue.remove(this._jobId(sessionId, record.placeId, record.socketIndex));
      }
    }
  }

  async resumeAll(sessionId) {
    await this.redis.set(this._connectedKey(sessionId), "1");
    const assignments = await this.redis.hgetall(this._assignmentsKey(sessionId));
    for (const [assignmentKey, raw] of Object.entries(assignments || {})) {
      const record = typeof raw === "string" ? JSON.parse(raw) : raw;
      await this.productionQueue.add("produce", record, { jobId: this._jobId(sessionId, record.placeId, record.socketIndex), delay: PRODUCTION_INTERVAL_MS });
    }
  }

  async _loadHash(key) {
    const raw = await this.redis.hgetall(key);
    if (!raw || Object.keys(raw).length === 0) return {};
    const parsed = {};
    for (const [field, value] of Object.entries(raw)) {
      parsed[field] = typeof value === "string" ? JSON.parse(value) : value;
    }
    return parsed;
  }

  _allowedMaterials(buildingData, level) {
    const material = buildingData.upgrades?.[`level${level}`]?.material;
    if (!material) return [];
    return Array.isArray(material) ? material : [material];
  }
}
