// server/state/InventoryState.js
import { DEFAULT_CONFIG } from "../../shared/constants.js";

export class InventoryState {
  constructor(redis) {
    this.redis = redis;
  }

  _key(sessionId) { return `player:${sessionId}:inventory`; }

  async loadAll(sessionId) {
    const raw = await this.redis.hgetall(this._key(sessionId));
    if (!raw || Object.keys(raw).length === 0) return null;
    const parsed = {};
    for (const [field, value] of Object.entries(raw)) {
      parsed[field] = typeof value === "string" ? JSON.parse(value) : value;
    }
    return parsed;
  }

  async load(sessionId, field) {
    const raw = await this.redis.hget(this._key(sessionId), field);
    if (!raw) return null;
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  }

  async save(sessionId, field, inventory) {
    await this.redis.hset(this._key(sessionId), field, JSON.stringify(inventory));
  }

  async initialize(sessionId) {
    const playerInv = {
      id: "player",
      type: "player",
      maxSlots: DEFAULT_CONFIG.PLAYER_MAX_SLOTS,
      maxWeight: DEFAULT_CONFIG.PLAYER_MAX_WEIGHT,
      items: [],
      equipment: {},
    };
    await this.save(sessionId, "player", playerInv);
  }

  async delete(sessionId) {
    await this.redis.del(this._key(sessionId));
  }
}
