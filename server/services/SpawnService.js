// server/services/SpawnService.js
import { randomUUID } from "node:crypto";

export class SpawnService {
  constructor(redis, enemyState, spawnQueue, broadcaster) {
    this.redis = redis;
    this.enemyState = enemyState;
    this.spawnQueue = spawnQueue;
    this.broadcaster = broadcaster;
  }

  async triggerSpawn(sessionId, placeId) {
    const placeKey = `player:${sessionId}:places`;
    const placeRaw = await this.redis.hget(placeKey, placeId);
    const enemies = this._createEnemyWave(placeId);
    for (const enemy of enemies) {
      await this.enemyState.save(sessionId, enemy.id, enemy);
    }
    this.broadcaster.broadcast("ENEMY_SPAWN", { enemies, placeId });
  }

  _createEnemyWave(placeId) {
    const count = 3;
    const enemies = [];
    for (let i = 0; i < count; i++) {
      enemies.push({
        id: randomUUID(),
        placeId,
        name: "Goblin",
        hp: 30,
        maxHp: 30,
        agility: 5,
        strength: 5,
        defense: 2,
        exp: 15,
        gold: 3,
        attackDelayRange: [1000, 3000],
        isDead: false,
      });
    }
    return enemies;
  }
}
