import { describe, it, expect } from "vitest";
import {
	getArmorProfile,
	getEquippedArmorSlots,
	getEquipmentStatBonus,
	getWeaponProfile,
	createBuff,
	pruneExpiredBuffs,
} from "../../../shared/combat/combatResolvers.js";
import { ARMOR_SLOTS, DAMAGE_TYPES } from "../../../shared/data/combatTypes.js";

describe("getWeaponProfile", () => {
	it("returns physical/strength defaults for null weapon", () => {
		const profile = getWeaponProfile(null);
		expect(profile).toEqual({
			damageType: DAMAGE_TYPES.PHYSICAL,
			primaryStat: "strength",
			flatDamage: 0,
			statBonus: {},
		});
	});

	it("uses explicit damageType and primaryStat from the item", () => {
		const profile = getWeaponProfile({
			name: "Fire Staff",
			damageType: DAMAGE_TYPES.MAGIC,
			primaryStat: "intelligence",
			stats: { attack: 12, intelligence: 3 },
		});
		expect(profile.damageType).toBe(DAMAGE_TYPES.MAGIC);
		expect(profile.primaryStat).toBe("intelligence");
		expect(profile.flatDamage).toBe(12);
		expect(profile.statBonus).toEqual({ intelligence: 3 });
	});

	it("infers damageType from weapon name for legacy items", () => {
		expect(getWeaponProfile({ name: "Rusty Shortblade", stats: { attack: 4 } }).damageType).toBe(
			DAMAGE_TYPES.PHYSICAL,
		);
		expect(getWeaponProfile({ name: "Shadow Dagger", stats: { attack: 6 } }).damageType).toBe(
			DAMAGE_TYPES.RANGED,
		);
	});
});

describe("getEquipmentStatBonus", () => {
	it("sums weapon and armor stat bonuses", () => {
		const weapon = { name: "Sword", stats: { attack: 5, strength: 1 } };
		const armor = [
			{ type: "head", stats: { defense: 2 } },
			{ type: "body", stats: { defense: 3, agility: 1 } },
		];
		expect(getEquipmentStatBonus(weapon, armor)).toEqual({
			strength: 1,
			defense: 5,
			agility: 1,
		});
	});

	it("returns empty bonus for no equipment", () => {
		expect(getEquipmentStatBonus(null, null)).toEqual({});
	});
});

describe("getEquippedArmorSlots", () => {
	it("maps armor types to slots and dedupes by slot (last equipped wins)", () => {
		const slots = getEquippedArmorSlots([
			{ type: "head", stats: { defense: 1 } },
			{ type: "head", stats: { defense: 9 } },
		]);
		expect(slots[ARMOR_SLOTS.HEAD]).toMatchObject({ stats: { defense: 9 } });
	});
});

describe("createBuff / pruneExpiredBuffs", () => {
	it("createBuff converts duration seconds to an expiresAt timestamp", () => {
		const now = 1_000_000;
		expect(createBuff({ skillId: "warCry", stat: "strength", value: 8, duration: 2 }, now)).toEqual({
			skillId: "warCry",
			stat: "strength",
			value: 8,
			duration: 2,
			expiresAt: now + 2000,
		});
	});

	it("pruneExpiredBuffs drops expired buffs and keeps fresh ones", () => {
		const now = 1_000_000;
		const remaining = pruneExpiredBuffs(
			[
				{ skillId: "warCry", expiresAt: now - 1 },
				{ skillId: "ironSkin", expiresAt: now + 5000 },
			],
			now,
		);
		expect(remaining).toEqual([{ skillId: "ironSkin", expiresAt: now + 5000 }]);
	});

	it("pruneExpiredBuffs keeps buffs without an expiry and guards non-array input", () => {
		expect(pruneExpiredBuffs([{ skillId: "warCry" }], 1_000_000)).toEqual([{ skillId: "warCry" }]);
		expect(pruneExpiredBuffs(undefined)).toEqual([]);
	});
});
