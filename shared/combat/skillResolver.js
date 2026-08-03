// shared/combat/skillResolver.js
import { DAMAGE_TYPES, SKILL_TYPES } from "../data/combatTypes.js";
import { SKILL_COLUMNS, skillsCatalog } from "../data/skillsData.js";
import { itemCatalog } from "../data/itemCatalog.js";

export function getWeaponDamageType(weapon) {
	return (
		weapon?.damageType ||
		(weapon?.icon && itemCatalog[weapon.icon]?.damageType) ||
		DAMAGE_TYPES.PHYSICAL
	);
}

export function getActiveSkillsForWeapon(weapon) {
	const damageType = getWeaponDamageType(weapon);
	const skillIds = SKILL_COLUMNS[damageType] || [];

	return skillIds
		.map((id) => skillsCatalog[id])
		.filter((skill) => skill?.type !== SKILL_TYPES.PASSIVE);
}

export function getRankedActiveSkills(weapon, playerSkills = {}) {
	return getActiveSkillsForWeapon(weapon).filter(
		(skill) => (playerSkills?.[skill.id] || 0) > 0,
	);
}

export function getSkillCooldownRemaining(skillId, activeCooldowns) {
	const timestamp = activeCooldowns?.[skillId];
	if (!timestamp) return 0;
	return Math.max(0, timestamp - Date.now());
}

export function isSkillOnCooldown(skill, playerSkills, activeCooldowns) {
	const rank = playerSkills?.[skill.id] || 0;
	if (rank === 0) return true;
	const remaining = getSkillCooldownRemaining(skill.id, activeCooldowns);
	return remaining > 0;
}

export function isSkillReady(skill, playerSkills, activeCooldowns) {
	const rank = playerSkills?.[skill.id] || 0;
	if (rank === 0) return false;
	return !isSkillOnCooldown(skill, playerSkills, activeCooldowns);
}

export function getRankData(skill, playerSkills) {
	const rank = playerSkills?.[skill.id] || 0;
	if (rank === 0 || !skill.ranks) return null;
	return skill.ranks[rank - 1] || null;
}
