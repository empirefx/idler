import { describe, it, expect } from "vitest";
import {
	getActiveSkillsForWeapon,
	getRankedActiveSkills,
	getRankData,
	getWeaponDamageType,
	isSkillReady,
} from "../../../shared/combat/skillResolver.js";
import { DAMAGE_TYPES, SKILL_TYPES } from "../../../shared/data/combatTypes.js";

describe("getWeaponDamageType", () => {
	it("returns physical when no weapon is equipped", () => {
		expect(getWeaponDamageType(null)).toBe(DAMAGE_TYPES.PHYSICAL);
		expect(getWeaponDamageType(undefined)).toBe(DAMAGE_TYPES.PHYSICAL);
	});

	it("prefers the weapon's explicit damageType", () => {
		expect(getWeaponDamageType({ damageType: DAMAGE_TYPES.MAGIC, icon: "sword1" }))
			.toBe(DAMAGE_TYPES.MAGIC);
	});

	it("resolves the column from the item catalog when the weapon lacks damageType", () => {
		expect(getWeaponDamageType({ icon: "staff1" })).toBe(DAMAGE_TYPES.MAGIC);
		expect(getWeaponDamageType({ icon: "sword1" })).toBe(DAMAGE_TYPES.PHYSICAL);
		expect(getWeaponDamageType({ icon: "bow1" })).toBe(DAMAGE_TYPES.RANGED);
	});

	it("falls back to physical for unknown icons", () => {
		expect(getWeaponDamageType({ icon: "mystery-weapon" })).toBe(DAMAGE_TYPES.PHYSICAL);
	});
});

describe("getActiveSkillsForWeapon", () => {
	it("returns active skills for the weapon damage type, excluding passives", () => {
		const skills = getActiveSkillsForWeapon({ damageType: DAMAGE_TYPES.PHYSICAL });
		const ids = skills.map((s) => s.id);
		expect(ids).toContain("warCry");
		expect(ids).toContain("shieldBash");
		expect(ids).not.toContain("ironSkin"); // passive
		expect(skills.every((s) => s.type !== SKILL_TYPES.PASSIVE)).toBe(true);
	});
});

describe("getRankedActiveSkills", () => {
	const weapon = { damageType: DAMAGE_TYPES.PHYSICAL };

	it("returns only ranked active skills for the weapon column, excluding passives", () => {
		const skills = getRankedActiveSkills(weapon, { warCry: 1, shieldBash: 0, ironSkin: 2 });
		const ids = skills.map((s) => s.id);
		expect(ids).toEqual(["warCry"]);
		expect(skills.every((s) => s.type !== SKILL_TYPES.PASSIVE)).toBe(true);
	});

	it("returns nothing when no skills are ranked", () => {
		expect(getRankedActiveSkills(weapon, {})).toEqual([]);
	});
});

describe("getRankData / isSkillReady", () => {
	it("getRankData returns rank data for ranked skills", () => {
		expect(getRankData({ id: "ironSkin", ranks: [{ rank: 1, statBonus: { stat: "defense", value: 2 } }] }, { ironSkin: 1 }))
			.toMatchObject({ statBonus: { stat: "defense", value: 2 } });
		expect(getRankData({ ranks: [{ rank: 1 }] }, {})).toBeNull();
	});

	it("isSkillReady is false when unranked or on cooldown", () => {
		const skill = { id: "warCry", cooldown: 1000 };
		expect(isSkillReady(skill, { warCry: 0 }, {})).toBe(false);
		expect(isSkillReady(skill, { warCry: 1 }, { warCry: Date.now() + 100 })).toBe(false);
		expect(isSkillReady(skill, { warCry: 1 }, {})).toBe(true);
	});
});
