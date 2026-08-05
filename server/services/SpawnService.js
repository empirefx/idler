// server/services/SpawnService.js
import { randomUUID } from "node:crypto";
import { enemyCatalog } from "../../shared/data/enemyCatalog.js";
import { placesData } from "../../shared/data/places.js";

export class SpawnService {
  constructor(redis, enemyState, spawnQueue, enemyAttackQueue, playerAttackQueue, playerState, broadcaster) {
    this.redis = redis;
    this.enemyState = enemyState;
    this.spawnQueue = spawnQueue;
    this.enemyAttackQueue = enemyAttackQueue;
    this.playerAttackQueue = playerAttackQueue;
    this.playerState = playerState;
    this.broadcaster = broadcaster;
  }

  async triggerSpawn(sessionId, placeId) {
    await this.enemyState.clearAll(sessionId);
    const player = await this.playerState.load(sessionId);
    if (!player || player.currentPlaceId !== placeId) return false;

    const enemies = this._createEnemyWave(placeId);
    if (enemies.length === 0) return false;

    for (const enemy of enemies) {
      await this.enemyState.save(sessionId, enemy.id, enemy);
      const [minDelay, maxDelay] = enemy.attackDelayRange || [1000, 3000];
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      await this.enemyAttackQueue.add(
        "enemy-attack",
        { sessionId, enemyId: enemy.id },
        { delay: Math.round(delay) },
      );
    }
    this.broadcaster.broadcast(sessionId, "ENEMY_SPAWN", { enemies, placeId });

    if (player.autoCombat) {
      const job = await this.playerAttackQueue.add(
        "player-attack",
        { sessionId },
        { delay: 0, jobId: `player-attack-${sessionId}-${Date.now()}`, removeOnComplete: true },
      );
      await this.playerState.save(sessionId, { attackJobId: job.id });
    }
    return true;
  }

  async resumeEnemyAttacks(sessionId, placeId) {
    const enemies = Object.values(await this.enemyState.loadAll(sessionId))
      .filter((e) => e && e.placeId === placeId && e.hp > 0);
    for (const enemy of enemies) {
      const [minDelay, maxDelay] = enemy.attackDelayRange || [1000, 3000];
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      await this.enemyAttackQueue.add(
        "enemy-attack",
        { sessionId, enemyId: enemy.id },
        { delay: Math.round(delay) },
      );
    }
    return enemies.length;
  }

  async cleanupPlace(sessionId, placeId) {
    if (!placeId) return false;

    // Pending enemy-attack jobs: at navigate time the player is at one place and
    // combat is stopped, so every pending job for the session belongs to the old place.
    const pendingAttacks = await this.enemyAttackQueue.getJobs(["waiting", "delayed"]);
    for (const job of pendingAttacks) {
      if (job.data?.sessionId !== sessionId) continue;
      try {
        await this.enemyAttackQueue.remove(job.id);
      } catch {
        // job may already be processed; ignore
      }
    }

    // Pending spawn jobs for the place being left.
    const pendingSpawns = await this.spawnQueue.getJobs(["waiting", "delayed"]);
    for (const job of pendingSpawns) {
      if (job.data?.sessionId !== sessionId || job.data?.placeId !== placeId) continue;
      try {
        await this.spawnQueue.remove(job.id);
      } catch {
        // job may already be processed; ignore
      }
    }

    // Enemy state at the place being left.
    const enemies = await this.enemyState.loadAll(sessionId);
    for (const enemy of Object.values(enemies)) {
      if (enemy && enemy.placeId === placeId) {
        try {
          await this.enemyState.delete(sessionId, enemy.id);
        } catch {
          // enemy may already be gone; ignore
        }
      }
    }

    return true;
  }

  _createEnemy(placeId, type) {
    const def = enemyCatalog[type];
    if (!def) return null;
    return {
      id: randomUUID(),
      placeId,
      type,
      name: def.name || "Unknown",
      avatar: def.avatar || "1.png",
      hp: def.baseHealth || 50,
      maxHp: def.baseHealth || 50,
      strength: def.baseAttack || 5,
      defense: def.defense || 0,
      agility: def.agility || 5,
      wisdom: def.wisdom || 0,
      intelligence: def.intelligence || 0,
      damageType: def.damageType || "physical",
      attack: def.baseAttack || 5,
      speed: def.speed || 1,
      attackPattern: def.attackPattern || "normal",
      attackDelayRange: [...(def.attackDelayRange || [2000, 5000])],
      exp: Math.round((def.baseHealth || 50) * 0.3),
      gold: Math.round((def.baseAttack || 5) * 0.6),
      isDead: false,
    };
  }

  _createEnemyWave(placeId) {
    const spawn = placesData[placeId]?.spawn;
    if (!spawn) return [];

    const pool = Array.isArray(spawn.pool) ? spawn.pool : [spawn.pool];
    const [min, max] = spawn.waveSize || [1, 1];
    const count = Math.floor(Math.random() * (max - min + 1)) + min;

    const enemies = [];
    for (let i = 0; i < count; i++) {
      const type = pool[Math.floor(Math.random() * pool.length)];
      const enemy = this._createEnemy(placeId, type);
      if (enemy) enemies.push(enemy);
    }
    return enemies;
  }
}
