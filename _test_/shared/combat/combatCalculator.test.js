import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
	getMaxHealth,
	getPassiveSkillBonus,
	resolveStats,
	rollHit,
	rollCrit,
	calculateDamage,
	resolveAttack,
	resolveEnemyAttack,
	derivePlayerStats,
} from "../../../shared/combat/combatCalculator.js";
import { DAMAGE_TYPES, SKILL_TYPES } from "../../../shared/data/combatTypes.js";

const basePlayer = () => ({
	stats: { strength: 10, defense: 2, agility: 10, vitality: 10, intelligence: 5, wisdom: 0 },
});

describe("getMaxHealth", () => {
	it("computes vitality * 10", () => {
		expect(getMaxHealth(10)).toBe(100);
		expect(getMaxHealth(13)).toBe(130);
		expect(getMaxHealth(0)).toBe(0);
		expect(getMaxHealth()).toBe(0);
	});
});

describe("getPassiveSkillBonus", () => {
	it("applies passive stat bonus for the weapon column only", () => {
		const bonus = getPassiveSkillBonus(
			{ damageType: DAMAGE_TYPES.PHYSICAL },
			{ ironSkin: 2 },
		);
		expect(bonus).toEqual({ defense: 4 });
	});

	it("ignores passives outside the weapon column", () => {
		const bonus = getPassiveSkillBonus(
			{ damageType: DAMAGE_TYPES.PHYSICAL },
			{ manaShield: 3 },
		);
		expect(bonus).toEqual({});
	});
});

describe("resolveStats", () => {
	it("combines base, equipment, buffs, and passive bonuses", () => {
		const stats = resolveStats(
			basePlayer(),
			{ damageType: DAMAGE_TYPES.PHYSICAL, stats: { attack: 4, strength: 1 } },
			[{ type: "body", stats: { defense: 3 } }],
			[{ stat: "strength", value: 8 }],
			{ ironSkin: 1 },
		);
		expect(stats.strength).toBe(19); // 10 + 1 (weapon) + 8 (buff)
		expect(stats.defense).toBe(7); // 2 + 3 (armor) + 2 (ironSkin rank 1)
	});

	it("ignores expired buffs", () => {
		const stats = resolveStats(
			basePlayer(),
			{ damageType: DAMAGE_TYPES.PHYSICAL, stats: { attack: 4, strength: 1 } },
			[],
			[
				{ stat: "strength", value: 8, expiresAt: Date.now() - 1000 },
				{ stat: "strength", value: 5, expiresAt: Date.now() + 10000 },
			],
			{},
		);
		expect(stats.strength).toBe(16); // 10 + 1 (weapon) + 5 (unexpired buff)
	});
});

describe("rollHit / rollCrit", () => {
	it("rollHit clamps chance between HIT_MIN and HIT_MAX", () => {
		expect(rollHit(100, 0).hitChance).toBe(95);
		expect(rollHit(0, 100).hitChance).toBe(20);
		expect(rollHit(0, 0).hitChance).toBe(45);
	});

	it("rollHit misses when the roll exceeds the clamped hit chance", () => {
		vi.spyOn(Math, "random").mockReturnValue(0.99);
		expect(rollHit(0, 100).hit).toBe(false);
		vi.restoreAllMocks();
	});

	it("rollCrit scales with agility", () => {
		vi.spyOn(Math, "random").mockReturnValue(0);
		expect(rollCrit(100).isCrit).toBe(true);
		vi.restoreAllMocks();
	});
});

describe("calculateDamage", () => {
	beforeEach(() => {
		vi.spyOn(Math, "random").mockReturnValue(0.5); // variance factor = 1.0
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("physical damage = strength * 2 + flat, mitigated by defense", () => {
		const dmg = calculateDamage(
			DAMAGE_TYPES.PHYSICAL,
			{ strength: 10 },
			{ defense: 0, wisdom: 0 },
			4,
		);
		expect(dmg).toBe(24);
	});

	it("magic damage uses intelligence vs wisdom", () => {
		const dmg = calculateDamage(
			DAMAGE_TYPES.MAGIC,
			{ intelligence: 10 },
			{ defense: 0, wisdom: 0 },
			0,
		);
		expect(dmg).toBe(20);
	});

	it("ranged damage uses agility with 0.6 mitigation factor", () => {
		const dmg = calculateDamage(
			DAMAGE_TYPES.RANGED,
			{ agility: 10 },
			{ defense: 0, wisdom: 0 },
			0,
		);
		expect(dmg).toBe(20);
	});
});

describe("resolveAttack", () => {
	it("returns a miss with zero damage when rollHit fails", () => {
		vi.spyOn(Math, "random").mockReturnValue(0.99);
		const result = resolveAttack(
			basePlayer(),
			{ agility: 99, defense: 0, wisdom: 0 },
			{ damageType: DAMAGE_TYPES.PHYSICAL, stats: { attack: 4 } },
			[],
			[],
			{},
		);
		expect(result.hit).toBe(false);
		expect(result.damage).toBe(0);
		vi.restoreAllMocks();
	});

	it("deals damage with correct damageType on hit", () => {
		vi.spyOn(Math, "random").mockReturnValue(0);
		const result = resolveAttack(
			basePlayer(),
			{ agility: 0, defense: 0, wisdom: 0 },
			{ damageType: DAMAGE_TYPES.PHYSICAL, stats: { attack: 4 } },
			[],
			[],
			{},
		);
		expect(result.hit).toBe(true);
		expect(result.damage).toBeGreaterThan(0);
		expect(result.damageType).toBe(DAMAGE_TYPES.PHYSICAL);
		expect(result).toHaveProperty("hitChance");
		expect(result).toHaveProperty("critChance");
		vi.restoreAllMocks();
	});

	it("applies damageMultiplier to the damage", () => {
		vi.spyOn(Math, "random").mockReturnValue(0);
		const base = resolveAttack(
			basePlayer(),
			{ agility: 0, defense: 0, wisdom: 0 },
			{ damageType: DAMAGE_TYPES.PHYSICAL, stats: { attack: 0 } },
			[],
			[],
			{},
		);
		const boosted = resolveAttack(
			basePlayer(),
			{ agility: 0, defense: 0, wisdom: 0 },
			{ damageType: DAMAGE_TYPES.PHYSICAL, stats: { attack: 0 } },
			[],
			[],
			{},
			2,
		);
		expect(boosted.damage).toBe(base.damage * 2);
		vi.restoreAllMocks();
	});
});

describe("resolveEnemyAttack", () => {
	it("enemy deals damage to the player", () => {
		vi.spyOn(Math, "random").mockReturnValue(0);
		const result = resolveEnemyAttack(
			{ damageType: DAMAGE_TYPES.PHYSICAL, strength: 8, agility: 3, attack: 0 },
			{ defense: 2, agility: 10, wisdom: 0 },
		);
		expect(result.hit).toBe(true);
		expect(result.damage).toBeGreaterThan(0);
		vi.restoreAllMocks();
	});
});

describe("derivePlayerStats", () => {
	it("reports defense, damageType, damage, hit/crit chance, equipmentBonus", () => {
		const stats = derivePlayerStats(
			basePlayer(),
			{
				"main-weapon": { damageType: DAMAGE_TYPES.MAGIC, stats: { attack: 6, intelligence: 2 } },
				body: { type: "body", stats: { defense: 4 } },
			},
			{ manaShield: 1 },
			[],
		);
		expect(stats.maxHealth).toBeUndefined();
		expect(stats.damageType).toBe(DAMAGE_TYPES.MAGIC);
		expect(stats.defense).toBe(6);
		expect(stats.damage).toBeGreaterThan(0);
		expect(stats.equipmentBonus).toMatchObject({ intelligence: 2, defense: 4 });
		expect(stats.hitChance).toBeGreaterThan(0);
		expect(stats.critChance).toBeGreaterThan(0);
	});
});
