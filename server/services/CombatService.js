// server/services/CombatService.js
import { PlayerState } from "../state/PlayerState.js";
import { EnemyState } from "../state/EnemyState.js";
import { SKILL_TYPES } from "../../shared/data/combatTypes.js";
import { placesData } from "../../shared/data/places.js";
import { skillsCatalog } from "../../shared/data/skillsData.js";
import {
	derivePlayerStats,
	getMaxHealth,
	resolveAttack,
	resolveEnemyAttack,
	resolveStats,
} from "../../shared/combat/combatCalculator.js";
import { createBuff, pruneExpiredBuffs } from "../../shared/combat/combatResolvers.js";
import {
	getRankData,
	getRankedActiveSkills,
	getWeaponDamageType,
} from "../../shared/combat/skillResolver.js";

export class CombatService {
  constructor(redis, playerState, inventoryState, enemyState, enemyAttackQueue, playerAttackQueue, spawnQueue, broadcaster, questService) {
    this.redis = redis;
    this.playerState = playerState || new PlayerState(redis);
    this.inventoryState = inventoryState;
    this.enemyState = enemyState || new EnemyState(redis);
    this.enemyAttackQueue = enemyAttackQueue;
    this.playerAttackQueue = playerAttackQueue;
    this.spawnQueue = spawnQueue;
    this.broadcaster = broadcaster;
    this.questService = questService;
  }

  async getEquippedLoadout(sessionId) {
    const inv = await this.inventoryState.load(sessionId, "player");
    const equipment = inv?.equipment || {};
    const weapon = equipment["main-weapon"] || null;
    const armor = Object.values(equipment).filter(
      (item) => item && item.type !== "main-weapon" && item.type !== "second-weapon",
    );
    return { weapon, armor };
  }

  async recomputeDerivedStats(sessionId) {
    const player = await this.playerState.load(sessionId);
    if (!player) return { error: "Player not found" };
    const { weapon, armor } = await this.getEquippedLoadout(sessionId);
    const skills = (await this.playerState.loadSkills(sessionId)) || {};
    const equipment = {};
    if (weapon) equipment["main-weapon"] = weapon;
    for (const a of armor) equipment[a.type] = a;
    const derivedStats = derivePlayerStats(player, equipment, skills, pruneExpiredBuffs(player.activeBuffs || []));
    await this.playerState.save(sessionId, { derivedStats });
    return derivedStats;
  }

  async computeAndBroadcastDerivedStats(sessionId) {
    const derivedStats = await this.recomputeDerivedStats(sessionId);
    if (derivedStats.error) return derivedStats;
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.derivedStats", data: derivedStats });
    return { success: true };
  }

  async startAutoCombat(sessionId) {
    const player = await this.playerState.load(sessionId);
    if (!player) return { error: "Player not found" };
    if (player.isDead) return { error: "Player is dead" };
    if (player.autoCombat) return { success: true, alreadyActive: true };

    await this.playerState.save(sessionId, { autoCombat: true });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.autoCombat", data: true });

    await this.resumeSkillCooldowns(sessionId);

    const job = await this.playerAttackQueue.add(
      "player-attack",
      { sessionId },
      { delay: 0, jobId: `player-attack-${sessionId}-${Date.now()}`, removeOnComplete: true },
    );
    await this.playerState.save(sessionId, { attackJobId: job.id });
    await this.scheduleSkillJobs(sessionId);
    return { success: true };
  }

  async scheduleSkillJobs(sessionId) {
    const player = await this.playerState.load(sessionId);
    if (!player || !player.autoCombat) return { success: true, skipped: true };

    const { weapon } = await this.getEquippedLoadout(sessionId);
    const playerSkills = (await this.playerState.loadSkills(sessionId)) || {};
    const activeSkills = getRankedActiveSkills(weapon, playerSkills);
    if (activeSkills.length === 0) return { success: true, count: 0 };

    const activeCooldowns = { ...(player.activeCooldowns || {}) };
    const skillJobIds = { ...(player.skillJobIds || {}) };
    const now = Date.now();

    for (const skill of activeSkills) {
      const remaining = Math.max(0, (activeCooldowns[skill.id] || now) - now);
      const job = await this.playerAttackQueue.add(
        "skill-activation",
        { sessionId, skillId: skill.id },
        { delay: remaining, jobId: `skill-activation-${sessionId}-${skill.id}-${now}`, removeOnComplete: true },
      );
      skillJobIds[skill.id] = job.id;
    }

    await this.playerState.save(sessionId, { skillJobIds });
    return { success: true, count: activeSkills.length };
  }

  async _reenqueueSkillJob(sessionId, skillId, delay) {
    const player = await this.playerState.load(sessionId);
    if (!player || !player.autoCombat || player.isDead) return;
    const job = await this.playerAttackQueue.add(
      "skill-activation",
      { sessionId, skillId },
      { delay, jobId: `skill-activation-${sessionId}-${skillId}-${Date.now()}`, removeOnComplete: true },
    );
    const skillJobIds = { ...(player.skillJobIds || {}) };
    skillJobIds[skillId] = job.id;
    await this.playerState.save(sessionId, { skillJobIds });
  }

  async removeSkillJobs(skillJobIds) {
    for (const jobId of Object.values(skillJobIds || {})) {
      try {
        await this.playerAttackQueue.remove(jobId);
      } catch {
        // job may already be processed; ignore
      }
    }
  }

  async stopAutoCombat(sessionId) {
    const player = await this.playerState.load(sessionId);
    const pendingJobId = player?.attackJobId;
    const skillJobIds = player?.skillJobIds || {};
    await this.playerState.save(sessionId, { autoCombat: false, attackJobId: null, skillJobIds: {} });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.autoCombat", data: false });
    if (pendingJobId) {
      try {
        await this.playerAttackQueue.remove(pendingJobId);
      } catch {
        // job may already be processed; ignore
      }
    }
    await this.removeSkillJobs(skillJobIds);
    await this.pauseSkillCooldowns(sessionId);
    return { success: true };
  }

  async pauseSkillCooldowns(sessionId) {
    const player = await this.playerState.load(sessionId);
    if (!player) return { error: "Player not found" };

    const activeCooldowns = { ...(player.activeCooldowns || {}) };
    const hadActive = Object.keys(activeCooldowns).length > 0;
    if (!hadActive) return { success: true, pausedCooldowns: player.pausedCooldowns || {} };

    const paused = { ...(player.pausedCooldowns || {}) };
    const now = Date.now();
    for (const [skillId, timestamp] of Object.entries(activeCooldowns)) {
      const remaining = timestamp - now;
      if (remaining > 0) paused[skillId] = remaining;
    }

    await this.playerState.save(sessionId, {
      activeCooldowns: {},
      pausedCooldowns: paused,
    });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.activeCooldowns", data: {} });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.pausedCooldowns", data: paused });
    return { success: true, pausedCooldowns: paused };
  }

  async resumeSkillCooldowns(sessionId) {
    const player = await this.playerState.load(sessionId);
    if (!player) return { error: "Player not found" };

    const paused = { ...(player.pausedCooldowns || {}) };
    const active = { ...(player.activeCooldowns || {}) };
    const now = Date.now();
    for (const [skillId, remaining] of Object.entries(paused)) {
      if (remaining > 0) active[skillId] = now + remaining;
    }

    await this.playerState.save(sessionId, { activeCooldowns: active, pausedCooldowns: {} });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.activeCooldowns", data: active });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.pausedCooldowns", data: {} });
    return { success: true, activeCooldowns: active };
  }

  async resumePlayerAttackLoop(sessionId) {
    const player = await this.playerState.load(sessionId);
    if (!player || !player.autoCombat) return { success: true, skipped: true };
    await this.resumeSkillCooldowns(sessionId);
    const job = await this.playerAttackQueue.add(
      "player-attack",
      { sessionId },
      { delay: 0, jobId: `player-attack-${sessionId}-${Date.now()}`, removeOnComplete: true },
    );
    await this.playerState.save(sessionId, { attackJobId: job.id });
    await this.scheduleSkillJobs(sessionId);
    return { success: true };
  }

  async getAliveEnemiesAtPlace(sessionId, placeId) {
    const all = await this.enemyState.loadAll(sessionId);
    return Object.values(all).filter((e) => e && e.placeId === placeId && e.hp > 0);
  }

  async revive(sessionId) {
    const player = await this.playerState.load(sessionId);
    if (!player) return { error: "Player not found" };
    if (!player.isDead) return { error: "Player is not dead" };

    await this.playerState.save(sessionId, { hp: player.maxHp, isDead: false });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.hp", data: player.maxHp });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.isDead", data: false });

    // Enemies always attack: re-seed one job per alive enemy at the current place.
    const aliveEnemies = await this.getAliveEnemiesAtPlace(sessionId, player.currentPlaceId);
    for (const enemy of aliveEnemies) {
      const delay = (enemy.attackDelayRange?.[0] || 500) + Math.random() * ((enemy.attackDelayRange?.[1] || 1500) - (enemy.attackDelayRange?.[0] || 500));
      await this.enemyAttackQueue.add("enemy-attack", { sessionId, enemyId: enemy.id }, { delay: Math.round(delay) });
    }

    const fresh = await this.playerState.load(sessionId);
    if (fresh.autoCombat) {
      await this.resumePlayerAttackLoop(sessionId);
    }

    return { success: true };
  }

  async levelUp(sessionId, bonuses = {}) {
    const player = await this.playerState.load(sessionId);
    if (!player) return { error: "Player not found" };

    const expToNext = player.expToNext || player.level * 100;
    if ((player.exp || 0) < expToNext) return { error: "Not enough exp" };

    const LEVEL_UP_BONUS_CAPS = { strength: 1, defense: 2, agility: 1, vitality: 3 };
    const stats = { ...(player.stats || {}) };
    for (const [key, cap] of Object.entries(LEVEL_UP_BONUS_CAPS)) {
      const value = bonuses[key];
      if (Number.isFinite(value) && value > 0) {
        stats[key] = (stats[key] || 0) + Math.min(value, cap);
      }
    }

    const newLevel = player.level + 1;
    const newExpToNext = newLevel * 100;
    const newMaxHp = getMaxHealth(stats.vitality);

    await this.playerState.save(sessionId, {
      level: newLevel,
      expToNext: newExpToNext,
      exp: (player.exp || 0) - expToNext,
      skillPoints: (player.skillPoints || 0) + 1,
      stats,
      maxHp: newMaxHp,
    });

    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.level", data: newLevel });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.exp", data: (player.exp || 0) - expToNext });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.expToNext", data: newExpToNext });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.skillPoints", data: (player.skillPoints || 0) + 1 });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.stats", data: stats });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.maxHp", data: newMaxHp });

    await this.computeAndBroadcastDerivedStats(sessionId);
    return { success: true };
  }

  async handlePlayerAttackJob(sessionId) {
    const player = await this.playerState.load(sessionId);
    if (!player || player.isDead || !player.autoCombat) return { skipped: true };

    const placeId = player.currentPlaceId;
    const aliveEnemies = await this.getAliveEnemiesAtPlace(sessionId, placeId);
    if (aliveEnemies.length === 0) return { skipped: true }; // respawn job restarts the chain

    const target = aliveEnemies[0];
    const { weapon, armor } = await this.getEquippedLoadout(sessionId);
    const playerSkills = (await this.playerState.loadSkills(sessionId)) || {};
    const activeBuffs = pruneExpiredBuffs(Array.isArray(player.activeBuffs) ? player.activeBuffs : []);

    const atk = resolveAttack(player, target, weapon, armor, activeBuffs, playerSkills);
    const result = {
      enemyId: target.id,
      hit: atk.hit,
      damageDealt: atk.damage,
      crit: atk.crit,
      damageType: atk.damageType,
      skillId: null,
    };

    if (result.damageDealt > 0) {
      target.hp = Math.max(0, target.hp - result.damageDealt);
      result.enemyHp = target.hp;
      await this.enemyState.save(sessionId, target.id, target);
    }

    await this.playerState.save(sessionId, { lastAttackTime: Date.now(), activeBuffs });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.activeBuffs", data: activeBuffs });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.lastAttackTime", data: Date.now() });

    // Kill handling
    if (target.hp <= 0) {
      const expGained = target.exp || 10;
      const goldGained = target.gold || 0;
      const freshPlayer = await this.playerState.load(sessionId);
      freshPlayer.exp = (freshPlayer.exp || 0) + expGained;
      freshPlayer.gold = (freshPlayer.gold || 0) + goldGained;
      await this.playerState.save(sessionId, { exp: freshPlayer.exp, gold: freshPlayer.gold });
      await this.enemyState.delete(sessionId, target.id);
      if (this.questService) await this.questService.handleEvent(sessionId, { kind: "kill", data: { enemy: target } });

      result.enemyDead = true;
      result.expGained = expGained;
      result.goldGained = goldGained;
      result.playerStats = { exp: freshPlayer.exp, gold: freshPlayer.gold };

      const remaining = await this.getAliveEnemiesAtPlace(sessionId, placeId);
      if (remaining.length === 0) {
        this.broadcaster.broadcast(sessionId, "COMBAT_DIFF", result);
        const respawnDelay = placesData[placeId]?.spawn?.respawnDelay || 5;
        await this.spawnQueue.add(
          "enemy-spawn",
          { sessionId, placeId },
          { delay: respawnDelay * 1000 },
        );
        return result; // do not re-enqueue; respawn restarts the chain
      }
    }

    this.broadcaster.broadcast(sessionId, "COMBAT_DIFF", result);
    const nextJob = await this.playerAttackQueue.add(
      "player-attack",
      { sessionId },
      { delay: player.attackCooldown || 2000, jobId: `player-attack-${sessionId}-${Date.now()}`, removeOnComplete: true },
    );
    await this.playerState.save(sessionId, { attackJobId: nextJob.id });
    return result;
  }

  async handleSkillActivationJob(sessionId, skillId) {
    const player = await this.playerState.load(sessionId);
    if (!player || player.isDead || !player.autoCombat) return { skipped: true };

    const skill = skillsCatalog[skillId];
    if (!skill || skill.type === SKILL_TYPES.PASSIVE) return { skipped: true, reason: "invalid skill" };
    const playerSkills = (await this.playerState.loadSkills(sessionId)) || {};
    const rank = playerSkills[skillId] || 0;
    if (rank === 0) return { skipped: true, reason: "unranked" };

    const placeId = player.currentPlaceId;
    const aliveEnemies = await this.getAliveEnemiesAtPlace(sessionId, placeId);
    if (aliveEnemies.length === 0) {
      await this._reenqueueSkillJob(sessionId, skillId, skill.cooldown);
      return { skipped: true, reason: "no enemies" };
    }

    const { weapon, armor } = await this.getEquippedLoadout(sessionId);
    const activeBuffs = pruneExpiredBuffs(Array.isArray(player.activeBuffs) ? player.activeBuffs : []);
    const rankData = getRankData(skill, playerSkills);
    const now = Date.now();
    const result = {
      skillId: skill.id,
      skillType: skill.type,
      damageDealt: 0,
      hit: false,
      crit: false,
      damageType: getWeaponDamageType(weapon),
    };

    if (skill.type === SKILL_TYPES.ACTIVE_BUFF) {
      const buff = createBuff(
        {
          skillId: skill.id,
          stat: rankData.statBonus.stat,
          value: rankData.statBonus.value,
          duration: rankData.duration,
        },
        now,
      );
      activeBuffs.push(buff);
      result.buff = buff;
      await this.playerState.save(sessionId, { activeBuffs });
      this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.activeBuffs", data: activeBuffs });
    } else if (skill.type === SKILL_TYPES.ACTIVE_DAMAGE) {
      const target = aliveEnemies[0];
      const multiplier = rankData.damageMultiplier || 1;
      const atk = resolveAttack(player, target, weapon, armor, activeBuffs, playerSkills, multiplier);
      result.hit = atk.hit;
      result.crit = atk.crit;
      result.damageDealt = atk.damage;
      result.damageType = atk.damageType;
      result.enemyId = target.id;
      if (result.damageDealt > 0) {
        target.hp = Math.max(0, target.hp - result.damageDealt);
        result.enemyHp = target.hp;
        await this.enemyState.save(sessionId, target.id, target);
      }
    }

    const activeCooldowns = { ...(player.activeCooldowns || {}) };
    activeCooldowns[skill.id] = now + skill.cooldown;
    await this.playerState.save(sessionId, { activeCooldowns });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.activeCooldowns", data: activeCooldowns });

    // Kill handling for damage skills
    if (result.damageDealt > 0 && result.enemyId) {
      const target = await this.enemyState.load(sessionId, result.enemyId);
      if (target && target.hp <= 0) {
        const expGained = target.exp || 10;
        const goldGained = target.gold || 0;
        const freshPlayer = await this.playerState.load(sessionId);
        freshPlayer.exp = (freshPlayer.exp || 0) + expGained;
        freshPlayer.gold = (freshPlayer.gold || 0) + goldGained;
        await this.playerState.save(sessionId, { exp: freshPlayer.exp, gold: freshPlayer.gold });
        await this.enemyState.delete(sessionId, target.id);
        if (this.questService) await this.questService.handleEvent(sessionId, { kind: "kill", data: { enemy: target } });

        result.enemyDead = true;
        result.expGained = expGained;
        result.goldGained = goldGained;
        result.playerStats = { exp: freshPlayer.exp, gold: freshPlayer.gold };

        const remaining = await this.getAliveEnemiesAtPlace(sessionId, placeId);
        if (remaining.length === 0) {
          this.broadcaster.broadcast(sessionId, "COMBAT_DIFF", result);
          const respawnDelay = placesData[placeId]?.spawn?.respawnDelay || 5;
          await this.spawnQueue.add(
            "enemy-spawn",
            { sessionId, placeId },
            { delay: respawnDelay * 1000 },
          );
          await this._reenqueueSkillJob(sessionId, skillId, skill.cooldown);
          return result;
        }
      }
    }

    this.broadcaster.broadcast(sessionId, "COMBAT_DIFF", result);
    await this._reenqueueSkillJob(sessionId, skillId, skill.cooldown);
    return result;
  }

  async handleEnemyAttack(sessionId, enemyId) {
    const player = await this.playerState.load(sessionId);
    if (!player) return { error: "Player not found" };
    const enemy = await this.enemyState.load(sessionId, enemyId);
    if (!enemy || enemy.hp <= 0) return { error: "Enemy gone" };

    if (player.isDead) return { skipped: true };

    if (enemy.placeId !== player.currentPlaceId) {
      await this.enemyState.delete(sessionId, enemyId);
      return { skipped: true, reason: "player left place" };
    }

    const { weapon, armor } = await this.getEquippedLoadout(sessionId);
    const skills = (await this.playerState.loadSkills(sessionId)) || {};
    const finalStats = resolveStats(player, weapon, armor, player.activeBuffs || [], skills);

    const result = resolveEnemyAttack(enemy, {
      defense: finalStats.defense || 0,
      agility: finalStats.agility || 0,
      wisdom: finalStats.wisdom || 0,
    });

    const hp = Math.max(0, (player.hp || 100) - result.damage);
    const playerDead = hp <= 0;
    await this.playerState.save(sessionId, playerDead ? { hp: 0, isDead: true, autoCombat: false, attackJobId: null, skillJobIds: {} } : { hp });

    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.hp", data: hp });
    if (playerDead) {
      this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.isDead", data: true });
      this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.autoCombat", data: false });
      await this.pauseSkillCooldowns(sessionId);
      if (player.attackJobId) {
        try { await this.playerAttackQueue.remove(player.attackJobId); } catch { /* ignore */ }
      }
      await this.removeSkillJobs(player.skillJobIds || {});
    }

    return {
      enemyId,
      damageDealt: result.damage,
      hit: result.hit,
      crit: result.crit,
      damageType: result.damageType,
      playerHp: hp,
      playerDead,
    };
  }
}
