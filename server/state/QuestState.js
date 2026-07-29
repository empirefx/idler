// server/state/QuestState.js
export class QuestState {
  constructor(redis) {
    this.redis = redis;
  }

  _activeKey(sessionId) { return `player:${sessionId}:quests:active`; }
  _completedKey(sessionId) { return `player:${sessionId}:quests:completed`; }

  async loadActive(sessionId) {
    const raw = await this.redis.hgetall(this._activeKey(sessionId));
    if (!raw || Object.keys(raw).length === 0) return {};
    return Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? JSON.parse(v) : v])
    );
  }

  async saveActive(sessionId, questId, progress) {
    await this.redis.hset(this._activeKey(sessionId), questId, JSON.stringify(progress));
  }

  async deleteActive(sessionId, questId) {
    await this.redis.hdel(this._activeKey(sessionId), questId);
  }

  async loadCompleted(sessionId) {
    const raw = await this.redis.hgetall(this._completedKey(sessionId));
    if (!raw || Object.keys(raw).length === 0) return {};
    return Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, typeof v === "string" ? JSON.parse(v) : v])
    );
  }

  async saveCompleted(sessionId, questId, data) {
    await this.redis.hset(this._completedKey(sessionId), questId, JSON.stringify(data));
  }
}
