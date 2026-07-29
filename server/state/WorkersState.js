// server/state/WorkersState.js
export class WorkersState {
  constructor(redis) {
    this.redis = redis;
  }

  _key(sessionId) { return `player:${sessionId}:workers`; }

  async load(sessionId) {
    const raw = await this.redis.get(this._key(sessionId));
    if (!raw) return null;
    return JSON.parse(raw);
  }

  async save(sessionId, data) {
    await this.redis.set(this._key(sessionId), JSON.stringify(data));
  }
}
