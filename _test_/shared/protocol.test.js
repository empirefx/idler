import { describe, it, expect } from "vitest";
import { encode, decode, PROTOCOL_VERSION } from "../../shared/protocol.js";

const roundTrip = (type, payload) => decode(encode(type, payload)).data;

describe("codec envelope", () => {
	it("returns {type, data} on decode", () => {
		const out = decode(encode("TOGGLE_AUTO_COMBAT", {}));
		expect(out.type).toBe("TOGGLE_AUTO_COMBAT");
		expect(out.data).toBeDefined();
	});
});

describe("client -> server round trips", () => {
	it("JOIN", () => {
		expect(roundTrip("JOIN", { nickname: "tester", protocolVersion: PROTOCOL_VERSION })).toMatchObject({ nickname: "tester" });
	});
	it("RESUME", () => {
		expect(roundTrip("RESUME", { sessionId: "s1", nickname: "t", protocolVersion: PROTOCOL_VERSION }).nickname).toBe("t");
	});
	it("NAVIGATE", () => {
		expect(roundTrip("NAVIGATE", { placeId: "farmlands" }).placeId).toBe("farmlands");
	});
	it("BUILD", () => {
		expect(roundTrip("BUILD", { placeId: "farmlands", socketIndex: 0, buildingId: "farm" })).toMatchObject({
			placeId: "farmlands",
			socketIndex: 0,
			buildingId: "farm",
		});
	});
	it("ASSIGN_WORKER", () => {
		expect(roundTrip("ASSIGN_WORKER", { placeId: "v", socketIndex: 1, workerId: "w1", material: "wheat" })).toMatchObject({
			placeId: "v",
			socketIndex: 1,
			workerId: "w1",
			material: "wheat",
		});
	});
	it("SET_TARGET", () => {
		expect(roundTrip("SET_TARGET", { enemyId: "e1" })).toMatchObject({ enemyId: "e1" });
	});
	it("SET_TARGET is a registered client message", () => {
		expect(decode(encode("SET_TARGET", { enemyId: "e1" })).type).toBe("SET_TARGET");
	});
	it("POKE", () => {
		expect(roundTrip("POKE", { targetNickname: "Hero" }).targetNickname).toBe("Hero");
	});
	it("LEVEL_UP with bonuses", () => {
		const data = roundTrip("LEVEL_UP", { bonuses: { strength: 1, defense: 0, agility: 2, vitality: 0, intelligence: 0, wisdom: 0 } });
		expect(data.bonuses).toMatchObject({ strength: 1, agility: 2, defense: 0 });
	});
	it("MOVE_ITEM", () => {
		expect(roundTrip("MOVE_ITEM", { fromInventoryId: "player", toInventoryId: "place-x", itemId: "1", quantity: 2 })).toMatchObject({
			fromInventoryId: "player",
			quantity: 2,
		});
	});
	it("BUY_ITEM", () => {
		expect(roundTrip("BUY_ITEM", { itemId: "1", quantity: 5, npcId: "trader" })).toMatchObject({ itemId: "1", quantity: 5, npcId: "trader" });
	});
	it("BUY_ITEM coerces a numeric itemId to string", () => {
		expect(roundTrip("BUY_ITEM", { itemId: 90, quantity: 1, npcId: "w" }).itemId).toBe("90");
	});
	it("SELL_ITEM coerces a numeric itemId to string", () => {
		expect(roundTrip("SELL_ITEM", { itemId: 200, quantity: 1 }).itemId).toBe("200");
	});
	it("MOVE_ITEM coerces a numeric itemId to string", () => {
		expect(roundTrip("MOVE_ITEM", { fromInventoryId: "player", toInventoryId: "place-x", itemId: 200, quantity: 1 }).itemId).toBe("200");
	});
	it("EQUIP_ITEM coerces a numeric itemId to string", () => {
		expect(roundTrip("EQUIP_ITEM", { inventoryId: "player", itemId: 200 }).itemId).toBe("200");
	});
	it("USE_ITEM coerces a numeric itemId to string", () => {
		expect(roundTrip("USE_ITEM", { itemId: 90 }).itemId).toBe("90");
	});
	it("empty payloads", () => {
		for (const t of ["TOGGLE_AUTO_COMBAT", "REVIVE", "REROLL_WORKERS", "BUY_WORKER_SLOT"]) {
			expect(decode(encode(t, {})).type).toBe(t);
		}
	});
});

describe("server -> client round trips", () => {
	it("ERROR", () => {
		expect(roundTrip("ERROR", { code: "PROTOCOL_MISMATCH", message: "nope" })).toMatchObject({ message: "nope" });
	});
	it("NOTIFICATION", () => {
		expect(roundTrip("NOTIFICATION", { message: "hi", type: "success" })).toMatchObject({ message: "hi", type: "success" });
	});
	it("TRADE_RESULT", () => {
		expect(roundTrip("TRADE_RESULT", { success: true, message: "ok" })).toMatchObject({ success: true, message: "ok" });
	});
	it("USE_RESULT", () => {
		expect(roundTrip("USE_RESULT", { success: true, message: "used" })).toMatchObject({ success: true });
	});
	it("PRESENCE_UPDATE", () => {
		const data = roundTrip("PRESENCE_UPDATE", {
			placeId: "village_center",
			players: [{ nickname: "Hero", level: 1, avatar: "1.png", enteredAt: 1234 }],
		});
		expect(data.placeId).toBe("village_center");
		expect(data.players[0]).toMatchObject({ nickname: "Hero", level: 1, avatar: "1.png", enteredAt: 1234 });
	});
	it("PRESENCE_UPDATE empty players", () => {
		expect(roundTrip("PRESENCE_UPDATE", { placeId: "village_center", players: [] }).players).toEqual([]);
	});
	it("POKED", () => {
		expect(roundTrip("POKED", { fromNickname: "Hero", fromAvatar: "1.png" })).toMatchObject({
			fromNickname: "Hero",
			fromAvatar: "1.png",
		});
	});
	it("POKE_ACK success", () => {
		expect(roundTrip("POKE_ACK", { ok: true, targetNickname: "Hero" })).toMatchObject({ ok: true, targetNickname: "Hero" });
	});
	it("POKE_ACK failure", () => {
		expect(roundTrip("POKE_ACK", { ok: false, reason: "RATE_LIMITED" })).toMatchObject({ ok: false, reason: "RATE_LIMITED" });
	});
	it("ENEMY_ATTACK", () => {
		expect(
			roundTrip("ENEMY_ATTACK", {
				enemyId: "e1",
				damageDealt: 5,
				hit: true,
				crit: false,
				damageType: "physical",
				playerHp: 50,
				playerDead: false,
				nextAttackAt: 1234,
				nextAttackDelay: 900,
			}),
		).toMatchObject({ enemyId: "e1", damageDealt: 5, hit: true, playerHp: 50, nextAttackAt: 1234, nextAttackDelay: 900 });
	});
	it("ENEMY_ATTACK decode without countdown fields defaults to 0", () => {
		const out = roundTrip("ENEMY_ATTACK", { enemyId: "e1", damageDealt: 1, playerHp: 50 });
		expect(out.nextAttackAt).toBe(0);
		expect(out.nextAttackDelay).toBe(0);
	});
	it("COMBAT_DIFF basic", () => {
		expect(
			roundTrip("COMBAT_DIFF", { enemyId: "e1", hit: true, damageDealt: 8, crit: false, damageType: "physical", skillId: null, enemyHp: 42, enemyDead: false }),
		).toMatchObject({ enemyId: "e1", damageDealt: 8, enemyHp: 42 });
	});
	it("COMBAT_DIFF kill with stats", () => {
		const data = roundTrip("COMBAT_DIFF", {
			enemyId: "e1",
			hit: true,
			damageDealt: 8,
			crit: true,
			damageType: "physical",
			enemyDead: true,
			expGained: 12,
			goldGained: 3,
			playerStats: { exp: 100, gold: 50 },
		});
		expect(data).toMatchObject({ enemyDead: true, expGained: 12, goldGained: 3 });
		expect(data.playerStats).toMatchObject({ exp: 100, gold: 50 });
	});
	it("COMBAT_DIFF buff", () => {
		expect(
			roundTrip("COMBAT_DIFF", {
				enemyId: "e1",
				skillId: "warCry",
				skillType: "active_buff",
				buff: { skillId: "warCry", stat: "strength", value: 10, duration: 5000, expiresAt: 123 },
			}),
		).toMatchObject({ skillType: "active_buff", buff: { skillId: "warCry", value: 10 } });
	});
	it("ENEMY_SPAWN", () => {
		const data = roundTrip("ENEMY_SPAWN", {
			placeId: "forest",
			enemies: [
				{ id: "e1", name: "Beast", hp: 50, maxHp: 50, exp: 10, gold: 5, attackDelayRange: [100, 200], nextAttackAt: 1234, nextAttackDelay: 150 },
			],
		});
		expect(data.enemies[0]).toMatchObject({
			id: "e1",
			name: "Beast",
			hp: 50,
			attackDelayRange: [100, 200],
			nextAttackAt: 1234,
			nextAttackDelay: 150,
		});
	});
	it("PRODUCTION_TICK", () => {
		expect(
			roundTrip("PRODUCTION_TICK", {
				placeId: "farmlands",
				socketIndex: 0,
				targetPlaceId: "village_center",
				workerId: "w1",
				workerName: "Bob",
				item: { id: 200, name: "wheat", type: "material", quantity: 1 },
			}),
		).toMatchObject({ workerId: "w1", item: { id: 200, name: "wheat" } });
	});
	it("QUEST_UPDATE accepted", () => {
		expect(
			roundTrip("QUEST_UPDATE", { questId: "q1", accepted: true, progress: { questId: "q1", startedAt: 1, progress: { monstersKilled: 0 } } }),
		).toMatchObject({ questId: "q1", accepted: true, progress: { progress: { monstersKilled: 0 } } });
	});
	it("QUEST_UPDATE completed", () => {
		expect(roundTrip("QUEST_UPDATE", { questId: "q1", completed: true })).toMatchObject({ questId: "q1", completed: true });
	});
	it("INVENTORY_UPDATE", () => {
		const data = roundTrip("INVENTORY_UPDATE", {
			inventories: {
				player: {
					id: "player",
					type: "player",
					maxSlots: 20,
					maxWeight: 100,
					items: [{ id: 1, name: "apple", quantity: 5 }],
					equipment: {},
				},
			},
		});
		expect(data.inventories.player.items[0]).toMatchObject({ id: 1, name: "apple", quantity: 5 });
	});
	it("STATE_SYNC full", () => {
		const payload = {
			sessionId: "abc",
			skills: { warCry: 1 },
			player: {
				level: 1,
				gold: 10,
				exp: 5,
				expToNext: 100,
				hp: 50,
				maxHp: 50,
				avatar: "1.png",
				stats: { strength: 10, defense: 0, agility: 10, vitality: 10, intelligence: 10, wisdom: 0 },
				skillPoints: 0,
				currentPlaceId: "village_center",
				lastSeenAt: 1,
				attackCooldown: 2000,
				lastAttackTime: 0,
				activeBuffs: [],
				activeCooldowns: {},
				pausedCooldowns: {},
				skillJobIds: {},
				autoCombat: false,
				isDead: false,
				targetEnemyId: "e1",
			},
			workers: {
				hired: [{ id: "w1", firstName: "Bob", name: "Bob", gender: "male", avatar: "worker_m.jpg", assignment: { placeId: "farmlands", socketIndex: 0, material: "wheat" } }],
				available: [],
				workerSlots: 1,
			},
			quests: { active: {}, completed: {} },
			recipes: ["bread"],
			enemies: {},
		};
		const data = roundTrip("STATE_SYNC", payload);
		expect(data.sessionId).toBe("abc");
		expect(data.player).toMatchObject({ level: 1, gold: 10, exp: 5, expToNext: 100 });
		expect(data.player.autoCombat).toBe(false);
		expect(data.player.isDead).toBe(false);
		expect(data.player.targetEnemyId).toBe("e1");
		expect(data.player.stats).toMatchObject({ strength: 10, agility: 10 });
		expect(data.workers.hired[0]).toMatchObject({ id: "w1", assignment: { placeId: "farmlands", socketIndex: 0, material: "wheat" } });
		expect(data.skills.warCry).toBe(1);
		expect(data.recipes).toEqual(["bread"]);
	});
	it("STATE_SYNC worker with null assignment decodes as null", () => {
		const data = roundTrip("STATE_SYNC", {
			workers: { hired: [{ id: "w1", firstName: "Bob", name: "Bob", gender: "male", avatar: "worker_m.jpg", assignment: null }], available: [], workerSlots: 0 },
		});
		expect(data.workers.hired[0].assignment).toBe(null);
	});
});

describe("DIFF round trips", () => {
	const cases = [
		["player.gold", 150],
		["player.hp", 42],
		["player.isDead", true],
		["player.autoCombat", false],
		["player.currentPlaceId", "forest"],
		["player.level", 2],
		["player.exp", 55],
		["player.expToNext", 120],
		["player.skillPoints", 3],
		["player.maxHp", 60],
		["player.lastAttackTime", 12345],
		["player.targetEnemyId", "e1"],
		["player.stats", { strength: 11, defense: 1, agility: 10, vitality: 10, intelligence: 10, wisdom: 0 }],
		["player.derivedStats", { defense: 2, damageType: "physical", damage: 9, hitChance: 0.8, critChance: 0.1, equipmentBonus: { attack: 2 } }],
		["player.skills", { warCry: 1, fireball: 0 }],
		["player.activeBuffs", [{ skillId: "warCry", stat: "strength", value: 10, duration: 5000, expiresAt: 999 }]],
		["player.activeCooldowns", { warCry: 1234 }],
		["player.pausedCooldowns", { fireball: 500 }],
		["players.workers", { hired: [], available: [{ id: "w2", name: "Alice", gender: "female", avatar: "worker_f.jpg", assignment: null }], workerSlots: 2 }],
		["sockets", { placeId: "farmlands", socketIndex: 0, status: "occupied", buildingId: "farm", level: 1 }],
		["inventory.player", { id: "player", type: "player", maxSlots: 20, maxWeight: 100, items: [], equipment: {} }],
	];
	for (const [path, value] of cases) {
		it(`path ${path}`, () => {
			const out = decode(encode("DIFF", { path, data: value }));
			expect(out.data).toMatchObject({ path });
			if (typeof value === "object" && value !== null) {
				expect(out.data.data).toMatchObject(value);
			} else {
				expect(out.data.data).toEqual(value);
			}
		});
	}
	it("accepts {path, value} input shape", () => {
		const out = decode(encode("DIFF", { path: "player.currentPlaceId", value: "forest" }));
		expect(out.data).toEqual({ path: "player.currentPlaceId", data: "forest" });
	});
});

describe("equipment null handling", () => {
	it("strips null equipment slots on encode", () => {
		const data = roundTrip("INVENTORY_UPDATE", {
			inventories: {
				player: { id: "player", type: "player", maxSlots: 20, maxWeight: 100, items: [], equipment: { head: null, chest: { id: 4, name: "Light Armor", type: "body", quantity: 1 } } },
			},
		});
		expect(data.inventories.player.equipment.head).toBeUndefined();
		expect(data.inventories.player.equipment.chest).toMatchObject({ id: 4, name: "Light Armor", type: "body", quantity: 1 });
	});
});
