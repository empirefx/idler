import { skillsCatalog, SKILL_COLUMNS } from "../../data/skillsData";
import { DAMAGE_TYPES, SKILL_TYPES } from "../../data/combatTypes";

let lastActivatedOrder = 0;

export function getWeaponDamageType(weapon) {
	if (!weapon) return DAMAGE_TYPES.PHYSICAL;
	return weapon.damageType || DAMAGE_TYPES.PHYSICAL;
}

export function getActiveSkillsForWeapon(weapon) {
	const damageType = getWeaponDamageType(weapon);
	const skillIds = SKILL_COLUMNS[damageType] || [];

	return skillIds
		.map((id) => skillsCatalog[id])
		.filter((skill) => skill?.type !== SKILL_TYPES.PASSIVE);
}

export function getNextSkillToActivate(
	weapon,
	playerSkills,
	activeCooldowns = {},
) {
	const activeSkills = getActiveSkillsForWeapon(weapon);

	const availableSkills = activeSkills
		.filter((skill) => {
			const rank = playerSkills?.[skill.id] || 0;
			if (rank === 0) return false;
			const remaining = getSkillCooldownRemaining(skill.id, activeCooldowns);
			return remaining <= 0;
		})
		.sort((a, b) => a.activationOrder - b.activationOrder);

	if (availableSkills.length === 0) return null;

	const nextSkill = availableSkills.find(
		(skill) => skill.activationOrder > lastActivatedOrder,
	);

	return nextSkill || availableSkills[0];
}

export function markSkillActivated(skill) {
	if (skill && skill.activationOrder > 0) {
		lastActivatedOrder = skill.activationOrder;
	}
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

export function resetSkillRotation() {
	lastActivatedOrder = 0;
}

export function getLastActivatedOrder() {
	return lastActivatedOrder;
}
