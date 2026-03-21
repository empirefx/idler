import { DAMAGE_TYPES, WEAPON_SLOTS, ARMOR_SLOTS } from "../../data/combatTypes";

const WEAPON_TYPE_MAP = {
	sword: { damageType: DAMAGE_TYPES.PHYSICAL, primaryStat: "strength" },
	axe: { damageType: DAMAGE_TYPES.PHYSICAL, primaryStat: "strength" },
	mace: { damageType: DAMAGE_TYPES.PHYSICAL, primaryStat: "strength" },
	staff: { damageType: DAMAGE_TYPES.MAGIC, primaryStat: "intelligence" },
	wand: { damageType: DAMAGE_TYPES.MAGIC, primaryStat: "intelligence" },
	orb: { damageType: DAMAGE_TYPES.MAGIC, primaryStat: "intelligence" },
	bow: { damageType: DAMAGE_TYPES.RANGED, primaryStat: "agility" },
	dagger: { damageType: DAMAGE_TYPES.RANGED, primaryStat: "agility" },
};

const ITEM_TYPE_TO_ARMOR_SLOT = {
	head: ARMOR_SLOTS.HEAD,
	body: ARMOR_SLOTS.BODY,
	pants: ARMOR_SLOTS.LEGS,
	hands: ARMOR_SLOTS.HANDS,
	boots: ARMOR_SLOTS.FEET,
};

export function getWeaponProfile(weapon) {
	if (!weapon) {
		return {
			damageType: DAMAGE_TYPES.PHYSICAL,
			primaryStat: "strength",
			flatDamage: 0,
			statBonus: {},
		};
	}

	const weaponStats = weapon.stats || {};
	const itemType = weapon.type;

	let damageType = weapon.damageType;
	let primaryStat = weapon.primaryStat;

	if (!damageType || !primaryStat) {
		const iconLower = (weapon.icon || weapon.name || "").toLowerCase();
		for (const [typeKey, profile] of Object.entries(WEAPON_TYPE_MAP)) {
			if (iconLower.includes(typeKey)) {
				damageType = profile.damageType;
				primaryStat = profile.primaryStat;
				break;
			}
		}
	}

	if (!damageType) damageType = DAMAGE_TYPES.PHYSICAL;
	if (!primaryStat) primaryStat = "strength";

	const flatDamage = weaponStats.attack || 0;
	const statBonus = { ...weaponStats };
	delete statBonus.attack;

	return {
		damageType,
		primaryStat,
		flatDamage,
		statBonus,
	};
}

export function getArmorProfile(armorItem) {
	if (!armorItem) {
		return { slot: null, statBonus: {} };
	}

	const slot = ITEM_TYPE_TO_ARMOR_SLOT[armorItem.type] || armorItem.type;
	const statBonus = { ...(armorItem.stats || {}) };

	return { slot, statBonus };
}

export function getEquippedArmorSlots(equippedArmor) {
	const slots = {
		[ARMOR_SLOTS.HEAD]: null,
		[ARMOR_SLOTS.BODY]: null,
		[ARMOR_SLOTS.LEGS]: null,
		[ARMOR_SLOTS.HANDS]: null,
		[ARMOR_SLOTS.FEET]: null,
	};

	if (!Array.isArray(equippedArmor)) return slots;

	for (const armor of equippedArmor) {
		const profile = getArmorProfile(armor);
		if (profile.slot && slots.hasOwnProperty(profile.slot)) {
			slots[profile.slot] = {
				...armor,
				...profile,
			};
		}
	}

	return slots;
}

export function getEquipmentStatBonus(equippedWeapon, equippedArmor) {
	const bonus = {};

	const weaponProfile = getWeaponProfile(equippedWeapon);
	Object.entries(weaponProfile.statBonus).forEach(([stat, value]) => {
		bonus[stat] = (bonus[stat] || 0) + value;
	});

	const armorSlots = getEquippedArmorSlots(equippedArmor);
	Object.values(armorSlots).forEach((armor) => {
		if (armor?.statBonus) {
			Object.entries(armor.statBonus).forEach(([stat, value]) => {
				bonus[stat] = (bonus[stat] || 0) + value;
			});
		}
	});

	return bonus;
}

export function tickBuffs(activeBuffs) {
	if (!Array.isArray(activeBuffs)) return [];

	return activeBuffs
		.map((buff) => ({
			...buff,
			duration: buff.duration - 1,
		}))
		.filter((buff) => buff.duration > 0);
}

export function addBuff(activeBuffs, buff) {
	if (!Array.isArray(activeBuffs)) return [buff];
	return [...activeBuffs, buff];
}
