import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { SessionManager } from "../../server/session.js";
import { InventoryHandler } from "../../server/inventory.js";
import { createServerLogger } from "../../server/logger.js";
import { PresenceService } from "../../server/services/PresenceService.js";
import { presenceHandlers } from "../../server/messages/handlers/presence.js";

const mockRedis = () => {
	const store = {};
	return {
		get: vi.fn((key) => Promise.resolve(store[key] || null)),
		set: vi.fn((key, value) => { store[key] = value; return Promise.resolve(); }),
		hget: vi.fn((key, field) => {
			const hash = store[key] || {};
			return Promise.resolve(hash[field] || null);
		}),
		hset: vi.fn((key, field, value) => {
			if (!store[key]) store[key] = {};
			store[key][field] = value;
			return Promise.resolve();
		}),
		hdel: vi.fn((key, field) => {
			if (store[key]) delete store[key][field];
			return Promise.resolve();
		}),
		del: vi.fn((key) => { delete store[key]; return Promise.resolve(); }),
		expire: vi.fn(() => Promise.resolve()),
		exists: vi.fn((key) => Promise.resolve(!!store[key] ? 1 : 0)),
		disconnect: vi.fn(),
	};
};

describe("Multiplayer Integration: Session + Inventory", () => {
	let redis;
	let logger;
	let sessionManager;
	let inventoryHandler;

	beforeAll(() => {
		redis = mockRedis();
		logger = createServerLogger({ debug: true });
		sessionManager = new SessionManager(redis, logger, { sessionTtl: 2592000 });
		inventoryHandler = new InventoryHandler(redis, logger);
	});

	it("full flow: join -> inventory add -> diff", async () => {
		const join = await sessionManager.createSession("Hero");
		expect(join.accepted).toBe(true);
		expect(join.session_id).toBeTruthy();

		const dup = await sessionManager.createSession("Hero");
		expect(dup.accepted).toBe(false);
		expect(dup.error).toBe("NICKNAME_TAKEN");

		const sessionId = join.session_id;

		await inventoryHandler.initializePlayerInventory(sessionId);

		const addResult = await inventoryHandler.handleAction(sessionId, {
			action_type: "ADD",
			inventory_id: "player",
			item: { id: "ore_1", template_id: "iron-ore", type: "material", name: "iron-ore", quantity: 5, weight: 2 },
		});
		expect(addResult.success).toBe(true);
		expect(addResult.diff.action).toBe("ADD");

		const invKey2 = `player:${sessionId}:inventory`;
		const inv = await redis.hget(invKey2, "player");
		expect(inv).toBeTruthy();
		const data = typeof inv === "string" ? JSON.parse(inv) : inv;
		expect(data.items).toHaveLength(1);
		expect(data.items[0].id).toBe("ore_1");

		const removeResult = await inventoryHandler.handleAction(sessionId, {
			action_type: "REMOVE", inventory_id: "player", item_id: "ore_1", quantity: 3,
		});
		expect(removeResult.success).toBe(true);

		const inv2 = await redis.hget(invKey2, "player");
		const data2 = typeof inv2 === "string" ? JSON.parse(inv2) : inv2;
		expect(data2.items[0].quantity).toBe(2);

		await sessionManager.disconnectSession("Hero");
	});
});

describe("Multiplayer Integration: Presence + Poke", () => {
	let presenceService;
	let sent;
	const broadcaster = {
		broadcast: (sessionId, type, payload) => {
			if (!sent[sessionId]) sent[sessionId] = [];
			sent[sessionId].push({ type, payload });
		},
	};
	const playerState = {
		load: vi.fn(async () => ({ avatar: "1.png" })),
	};
	const pokeHandler = presenceHandlers.find((h) => h.type === "POKE").handler;

	beforeEach(() => {
		sent = {};
		presenceService = new PresenceService();
	});

	it("pokes deliver a POKED to the target and a POKE_ACK to the sender", async () => {
		presenceService.register("s1", "Hero", "village_center");
		presenceService.register("s2", "Mage", "village_center");

		await pokeHandler({ sessionId: "s1", broadcaster, presenceService, playerState }, { targetNickname: "Mage" });

		expect(sent.s2).toEqual([{ type: "POKED", payload: { fromNickname: "Hero", fromAvatar: "1.png" } }]);
		expect(sent.s1).toEqual([{ type: "POKE_ACK", payload: { ok: true, targetNickname: "Mage" } }]);
	});

	it("rejects the fourth poke within the rate limit window", async () => {
		presenceService.register("s1", "Hero", "village_center");
		presenceService.register("s2", "Mage", "village_center");

		await pokeHandler({ sessionId: "s1", broadcaster, presenceService, playerState }, { targetNickname: "Mage" });
		await pokeHandler({ sessionId: "s1", broadcaster, presenceService, playerState }, { targetNickname: "Mage" });
		await pokeHandler({ sessionId: "s1", broadcaster, presenceService, playerState }, { targetNickname: "Mage" });
		await pokeHandler({ sessionId: "s1", broadcaster, presenceService, playerState }, { targetNickname: "Mage" });

		expect(sent.s1).toHaveLength(4);
		expect(sent.s1[3]).toEqual({ type: "POKE_ACK", payload: { ok: false, reason: "RATE_LIMITED" } });
	});

	it("rejects pokes to a player in a different place", async () => {
		presenceService.register("s1", "Hero", "village_center");
		presenceService.register("s2", "Mage", "forest_edge");

		await pokeHandler({ sessionId: "s1", broadcaster, presenceService, playerState }, { targetNickname: "Mage" });

		expect(sent.s1).toEqual([{ type: "POKE_ACK", payload: { ok: false, reason: "NOT_IN_PLACE" } }]);
		expect(sent.s2).toBeUndefined();
	});

	it("rejects pokes to a player that is gone", async () => {
		presenceService.register("s1", "Hero", "village_center");

		await pokeHandler({ sessionId: "s1", broadcaster, presenceService, playerState }, { targetNickname: "Mage" });

		expect(sent.s1).toEqual([{ type: "POKE_ACK", payload: { ok: false, reason: "NOT_IN_PLACE" } }]);
	});

	it("rejects pokes from a session that is not present", async () => {
		await pokeHandler({ sessionId: "ghost", broadcaster, presenceService, playerState }, { targetNickname: "Mage" });

		expect(sent.ghost).toEqual([{ type: "POKE_ACK", payload: { ok: false, reason: "TARGET_GONE" } }]);
	});
});
