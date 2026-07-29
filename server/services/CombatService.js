// server/services/CombatService.js
import { PlayerState } from "../state/PlayerState.js";
import { EnemyState } from "../state/EnemyState.js";

export class CombatService {
  constructor(redis, playerState, inventoryState, enemyState, enemyAttackQueue, broadcaster) {
    this.redis = redis;
    this.playerState = playerState || new PlayerState(redis);
    this.inventoryState = inventoryState;
    this.enemyState = enemyState || new EnemyState(redis);
    this.enemyAttackQueue = enemyAttackQueue;
    this.broadcaster = broadcaster;
  }

  calculateDamage(attackerStats, defenderStats, weapon) {
    const baseDamage = weapon
      ? weapon.damage.min + Math.random() * (weapon.damage.max - weapon.damage.min)
      : 5 + Math.random() * 5;
    const attackStat = attackerStats.strength || 10;
    const defense = defenderStats.defense || 0;
    const rawDamage = baseDamage + attackStat * 0.5;
    const mitigated = rawDamage * (1 - defense / (defense + 50));
    return Math.max(1, Math.round(mitigated));
  }

  rollHit(attackerAgility, defenderAgility) {
    const hitChance = Math.min(0.95, 0.8 + (attackerAgility - defenderAgility) * 0.01);
    return Math.random() < hitChance;
  }

  rollCrit(agility) {
    return Math.random() < Math.min(0.3, agility * 0.005);
  }

  async handlePlayerAttack(sessionId, enemyId) {
    const stats = await this.playerState.load(sessionId);
    if (!stats) return { error: "Player not found" };

    const enemy = await this.enemyState.load(sessionId, enemyId);
    if (!enemy || enemy.hp <= 0) return { error: "Enemy not found or already dead" };

    const weapon = null;
    if (!this.rollHit(stats.agility || 10, enemy.agility || 5)) {
      return { damageDealt: 0, hit: false };
    }

    const crit = this.rollCrit(stats.agility || 10);
    let damage = this.calculateDamage(stats, enemy, weapon);
    if (crit) damage = Math.round(damage * 1.5);

    enemy.hp -= damage;
    await this.enemyState.save(sessionId, enemyId, enemy);

    const result = { damageDealt: damage, hit: true, crit };

    if (enemy.hp <= 0) {
      const expGained = enemy.exp || 10;
      const goldGained = enemy.gold || 0;
      stats.exp = (stats.exp || 0) + expGained;
      stats.gold = (stats.gold || 0) + goldGained;
      await this.playerState.save(sessionId, { exp: stats.exp, gold: stats.gold });
      await this.enemyState.delete(sessionId, enemyId);
      result.enemyDead = true;
      result.expGained = expGained;
      result.goldGained = goldGained;
      result.playerStats = { exp: stats.exp, gold: stats.gold };
    }

    return result;
  }

  async handleEnemyAttack(sessionId, enemyId) {
    const stats = await this.playerState.load(sessionId);
    if (!stats) return { error: "Player not found" };

    const enemy = await this.enemyState.load(sessionId, enemyId);
    if (!enemy || enemy.hp <= 0) return { error: "Enemy gone" };

    const damage = this.calculateDamage(enemy, stats, null);
    stats.hp = Math.max(0, (stats.hp || 100) - damage);
    await this.playerState.save(sessionId, { hp: stats.hp });

    return { enemyId, damageDealt: damage, playerHp: stats.hp };
  }
}
