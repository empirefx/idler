// server/state/PlayerState.js
export class PlayerState {
  constructor(redis) {
    this.redis = redis;
  }

  _statsKey(sessionId) { return `player:${sessionId}:stats`; }
  _skillsKey(sessionId) { return `player:${sessionId}:skills`; }
  _recipesKey(sessionId) { return `player:${sessionId}:recipes`; }

  async load(sessionId) {
    const raw = await this.redis.hgetall(this._statsKey(sessionId));
    if (!raw || Object.keys(raw).length === 0) return null;
    const parsed = {};
    for (const [k, v] of Object.entries(raw)) {
      try { parsed[k] = JSON.parse(v); } catch { parsed[k] = v; }
    }
    return parsed;
  }

  async save(sessionId, data) {
    for (const [k, v] of Object.entries(data)) {
      await this.redis.hset(this._statsKey(sessionId), k, JSON.stringify(v));
    }
  }

  async loadSkills(sessionId) {
    const raw = await this.redis.hgetall(this._skillsKey(sessionId));
    if (!raw || Object.keys(raw).length === 0) return null;
    return Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, JSON.parse(v)])
    );
  }

  async saveSkills(sessionId, skills) {
    for (const [k, v] of Object.entries(skills)) {
      await this.redis.hset(this._skillsKey(sessionId), k, JSON.stringify(v));
    }
  }

  async loadRecipes(sessionId) {
    return this.redis.smembers(this._recipesKey(sessionId));
  }

  async addRecipe(sessionId, recipeId) {
    await this.redis.sadd(this._recipesKey(sessionId), recipeId);
  }
}
