import { describe, it, expect, vi, beforeAll } from "vitest";
import { SessionManager } from "../../server/session.js";
import { InventoryHandler } from "../../server/inventory.js";
import { createServerLogger } from "../../server/logger.js";

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
