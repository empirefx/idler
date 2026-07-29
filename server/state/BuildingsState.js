// server/state/BuildingsState.js
export class BuildingsState {
  constructor(redis) {
    this.redis = redis;
  }

  _key(sessionId) { return `player:${sessionId}:buildings`; }

  async loadAll(sessionId) {
    const raw = await this.redis.hgetall(this._key(sessionId));
    if (!raw || Object.keys(raw).length === 0) return {};
    const parsed = {};
    for (const [field, value] of Object.entries(raw)) {
      parsed[field] = typeof value === "string" ? JSON.parse(value) : value;
    }
    return parsed;
  }

  async save(sessionId, field, building) {
    await this.redis.hset(this._key(sessionId), field, JSON.stringify(building));
  }

  async delete(sessionId, field) {
    await this.redis.hdel(this._key(sessionId), field);
  }
}
