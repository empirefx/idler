import { DAMAGE_TYPES, SKILL_TYPES } from "./combatTypes";

export const skillsCatalog = {
	warCry: {
		id: "warCry",
		name: "War Cry",
		description: "Increases strength for a few attacks",
		damageType: DAMAGE_TYPES.PHYSICAL,
		type: SKILL_TYPES.ACTIVE_BUFF,
		cooldown: 15000,
		activationOrder: 1,
		ranks: [
			{ rank: 1, statBonus: { stat: "strength", value: 8 }, duration: 2 },
			{ rank: 2, statBonus: { stat: "strength", value: 12 }, duration: 3 },
			{ rank: 3, statBonus: { stat: "strength", value: 18 }, duration: 4 },
		],
	},
	shieldBash: {
		id: "shieldBash",
		name: "Shield Bash",
		description: "Active damage skill with cooldown",
		damageType: DAMAGE_TYPES.PHYSICAL,
		type: SKILL_TYPES.ACTIVE_DAMAGE,
		cooldown: 8000,
		activationOrder: 2,
		ranks: [
			{ rank: 1, damageMultiplier: 1.0 },
			{ rank: 2, damageMultiplier: 1.5 },
			{ rank: 3, damageMultiplier: 2.0 },
		],
	},
	ironSkin: {
		id: "ironSkin",
		name: "Iron Skin",
		description: "Passive: Increases defense permanently",
		damageType: DAMAGE_TYPES.PHYSICAL,
		type: SKILL_TYPES.PASSIVE,
		cooldown: 0,
		activationOrder: 0,
		ranks: [
			{ rank: 1, statBonus: { stat: "defense", value: 2 } },
			{ rank: 2, statBonus: { stat: "defense", value: 4 } },
			{ rank: 3, statBonus: { stat: "defense", value: 7 } },
		],
	},
	fireball: {
		id: "fireball",
		name: "Fireball",
		description: "Launch a fireball dealing magic damage",
		damageType: DAMAGE_TYPES.MAGIC,
		type: SKILL_TYPES.ACTIVE_DAMAGE,
		cooldown: 10000,
		activationOrder: 1,
		ranks: [
			{ rank: 1, damageMultiplier: 1.0 },
			{ rank: 2, damageMultiplier: 1.5 },
			{ rank: 3, damageMultiplier: 2.0 },
		],
	},
	frostNova: {
		id: "frostNova",
		name: "Frost Nova",
		description: "Freezes enemies briefly",
		damageType: DAMAGE_TYPES.MAGIC,
		type: SKILL_TYPES.ACTIVE_DAMAGE,
		cooldown: 15000,
		activationOrder: 2,
		ranks: [
			{ rank: 1, damageMultiplier: 0.8 },
			{ rank: 2, damageMultiplier: 1.2 },
			{ rank: 3, damageMultiplier: 1.6 },
		],
	},
	manaShield: {
		id: "manaShield",
		name: "Mana Shield",
		description: "Creates a protective magic barrier",
		damageType: DAMAGE_TYPES.MAGIC,
		type: SKILL_TYPES.ACTIVE_BUFF,
		cooldown: 20000,
		activationOrder: 3,
		ranks: [
			{ rank: 1, statBonus: { stat: "wisdom", value: 5 }, duration: 3 },
			{ rank: 2, statBonus: { stat: "wisdom", value: 8 }, duration: 4 },
			{ rank: 3, statBonus: { stat: "wisdom", value: 12 }, duration: 5 },
		],
	},
	quickShot: {
		id: "quickShot",
		name: "Quick Shot",
		description: "Fast ranged attack",
		damageType: DAMAGE_TYPES.RANGED,
		type: SKILL_TYPES.ACTIVE_DAMAGE,
		cooldown: 5000,
		activationOrder: 1,
		ranks: [
			{ rank: 1, damageMultiplier: 0.8 },
			{ rank: 2, damageMultiplier: 1.2 },
			{ rank: 3, damageMultiplier: 1.6 },
		],
	},
	poisonArrow: {
		id: "poisonArrow",
		name: "Poison Arrow",
		description: "Apply poison damage over time",
		damageType: DAMAGE_TYPES.RANGED,
		type: SKILL_TYPES.ACTIVE_DAMAGE,
		cooldown: 12000,
		activationOrder: 2,
		ranks: [
			{ rank: 1, damageMultiplier: 0.6 },
			{ rank: 2, damageMultiplier: 1.0 },
			{ rank: 3, damageMultiplier: 1.4 },
		],
	},
	evade: {
		id: "evade",
		name: "Evade",
		description: "Passive: Increases agility",
		damageType: DAMAGE_TYPES.RANGED,
		type: SKILL_TYPES.PASSIVE,
		cooldown: 0,
		activationOrder: 0,
		ranks: [
			{ rank: 1, statBonus: { stat: "agility", value: 2 } },
			{ rank: 2, statBonus: { stat: "agility", value: 4 } },
			{ rank: 3, statBonus: { stat: "agility", value: 7 } },
		],
	},
};

export const SKILL_COLUMNS = {
	[DAMAGE_TYPES.PHYSICAL]: ["warCry", "shieldBash", "ironSkin"],
	[DAMAGE_TYPES.MAGIC]: ["fireball", "frostNova", "manaShield"],
	[DAMAGE_TYPES.RANGED]: ["quickShot", "poisonArrow", "evade"],
};

export const getSkillById = (skillId) => {
	return skillsCatalog[skillId] || null;
};

export const getSkillRank = (playerSkills, skillId) => {
	return playerSkills?.[skillId] || 0;
};

export const getMaxSkillRank = (_skillId) => {
	return 3;
};

export const getSkillsByColumn = (damageType) => {
	return SKILL_COLUMNS[damageType] || [];
};

export const metadata = {
	version: "1.0.0",
	lastUpdated: "2026-03-12",
};
