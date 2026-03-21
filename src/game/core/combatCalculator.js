import {
	MITIGATION_K,
	CRIT_BASE,
	CRIT_AGI_SCALE,
	HIT_BASE,
	HIT_MIN,
	HIT_MAX,
	CRIT_MULTIPLIER,
	DAMAGE_VARIANCE_MIN,
	DAMAGE_VARIANCE_MAX,
} from "../../data/combatTypes";
import { getEquipmentStatBonus } from "../utils/combatResolvers";

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
}

function applyVarianceFn(baseDamage) {
	const variance = randomInRange(DAMAGE_VARIANCE_MIN, DAMAGE_VARIANCE_MAX);
	return baseDamage * variance;
}

export function resolveStats(player, equippedWeapon, equippedArmor, activeBuffs) {
	const baseStats = { ...player.stats };

	const equipmentBonus = getEquipmentStatBonus(equippedWeapon, equippedArmor);
	Object.entries(equipmentBonus).forEach(([stat, value]) => {
		baseStats[stat] = (baseStats[stat] || 0) + value;
	});

	if (Array.isArray(activeBuffs)) {
		activeBuffs.forEach((buff) => {
			if (buff.stat && buff.value) {
				baseStats[buff.stat] = (baseStats[buff.stat] || 0) + buff.value;
			}
		});
	}

	return baseStats;
}

export function getMaxHealth(baseHealth, vitality) {
	return baseHealth + (vitality || 0) * 5;
}

export function rollHit(attackerAgility, defenderAgility) {
	const hitChance = clamp(
		HIT_BASE + (attackerAgility || 0) - (defenderAgility || 0),
		HIT_MIN,
		HIT_MAX,
	);
	const roll = Math.random() * 100;
	return {
		hit: roll < hitChance,
		hitChance,
	};
}

export function rollCrit(attackerAgility) {
	const critChance = CRIT_BASE + (attackerAgility || 0) * CRIT_AGI_SCALE;
	const roll = Math.random() * 100;
	return {
		isCrit: roll < critChance,
		critChance,
	};
}

export function calculatePhysicalDamage(attackerStats, defenderStats, flatDamage = 0, applyVariance = true) {
	const rawDamage = (attackerStats.strength || 0) * 2 + flatDamage;
	const defense = defenderStats.defense || 0;
	const mitigation = defense / (defense + MITIGATION_K);
	const damage = rawDamage * (1 - mitigation);
	if (applyVariance) {
		return Math.max(1, Math.round(applyVarianceFn(damage)));
	}
	return Math.max(1, Math.round(damage));
}

export function calculateMagicDamage(attackerStats, defenderStats, flatDamage = 0, applyVariance = true) {
	const rawDamage = (attackerStats.intelligence || 0) * 2 + flatDamage;
	const wisdom = defenderStats.wisdom || 0;
	const resistance = wisdom / (wisdom + MITIGATION_K);
	const damage = rawDamage * (1 - resistance);
	if (applyVariance) {
		return Math.max(1, Math.round(applyVarianceFn(damage)));
	}
	return Math.max(1, Math.round(damage));
}

export function calculateRangedDamage(attackerStats, defenderStats, flatDamage = 0, applyVariance = true) {
	const rawDamage = (attackerStats.agility || 0) * 2 + flatDamage;
	const defense = defenderStats.defense || 0;
	const mitigation = (defense / (defense + MITIGATION_K)) * 0.6;
	const damage = rawDamage * (1 - mitigation);
	if (applyVariance) {
		return Math.max(1, Math.round(applyVarianceFn(damage)));
	}
	return Math.max(1, Math.round(damage));
}

export function calculateDamage(damageType, attackerStats, defenderStats, flatDamage = 0) {
	switch (damageType) {
		case "magic":
			return calculateMagicDamage(attackerStats, defenderStats, flatDamage);
		case "ranged":
			return calculateRangedDamage(attackerStats, defenderStats, flatDamage);
		case "physical":
		default:
			return calculatePhysicalDamage(attackerStats, defenderStats, flatDamage);
	}
}

export function resolveAttack(
	player,
	enemy,
	equippedWeapon,
	equippedArmor,
	activeBuffs = [],
) {
	const finalStats = resolveStats(player, equippedWeapon, equippedArmor, activeBuffs);

	const enemyStats = {
		defense: enemy.defense || 0,
		agility: enemy.agility || 0,
		wisdom: enemy.wisdom || 0,
	};

	const weaponProfile = equippedWeapon || {};
	const damageType = weaponProfile.damageType || "physical";
	const flatDamage = weaponProfile.flatDamage || 0;

	const hitResult = rollHit(finalStats.agility, enemyStats.agility);
	if (!hitResult.hit) {
		return {
			hit: false,
			damage: 0,
			crit: false,
			damageType,
			hitChance: hitResult.hitChance,
		};
	}

	const critResult = rollCrit(finalStats.agility);
	let damage = calculateDamage(
		damageType,
		finalStats,
		enemyStats,
		flatDamage,
	);

	if (critResult.isCrit) {
		damage = Math.round(damage * CRIT_MULTIPLIER);
	}

	return {
		hit: true,
		damage,
		crit: critResult.isCrit,
		damageType,
		hitChance: hitResult.hitChance,
		critChance: critResult.critChance,
	};
}

export function resolveEnemyAttack(enemy, playerStats) {
	const enemyDamageType = enemy.damageType || "physical";
	const enemyFlatDamage = enemy.attack || 0;

	const attackerStats = {
		strength: enemy.strength || 0,
		agility: enemy.agility || 0,
		intelligence: enemy.intelligence || 0,
	};

	const defenderStats = {
		defense: playerStats.defense || 0,
		agility: playerStats.agility || 0,
		wisdom: playerStats.wisdom || 0,
	};

	const hitResult = rollHit(enemy.agility || 0, playerStats.agility || 0);
	if (!hitResult.hit) {
		return {
			hit: false,
			damage: 0,
			crit: false,
			damageType: enemyDamageType,
		};
	}

	const critResult = rollCrit(enemy.agility || 0);
	let damage = calculateDamage(
		enemyDamageType,
		attackerStats,
		defenderStats,
		enemyFlatDamage,
	);

	if (critResult.isCrit) {
		damage = Math.round(damage * CRIT_MULTIPLIER);
	}

	return {
		hit: true,
		damage,
		crit: critResult.isCrit,
		damageType: enemyDamageType,
	};
}
