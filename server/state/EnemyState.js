// server/state/EnemyState.js
export class EnemyState {
  constructor(redis) {
    this.redis = redis;
  }

  _key(sessionId) { return `player:${sessionId}:enemies`; }

  async loadAll(sessionId) {
    const raw = await this.redis.hgetall(this._key(sessionId));
    if (!raw || Object.keys(raw).length === 0) return {};
    return Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? JSON.parse(v) : v])
    );
  }

  async load(sessionId, enemyId) {
    const raw = await this.redis.hget(this._key(sessionId), enemyId);
    if (!raw) return null;
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  }

  async save(sessionId, enemyId, data) {
    await this.redis.hset(this._key(sessionId), enemyId, JSON.stringify(data));
  }

  async delete(sessionId, enemyId) {
    await this.redis.hdel(this._key(sessionId), enemyId);
  }
}
