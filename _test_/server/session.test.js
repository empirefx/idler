import { describe, it, expect, vi, beforeEach } from "vitest";
import { SessionManager } from "../../server/session.js";

describe("SessionManager", () => {
	let mockRedis;
	let mockLogger;
	let manager;

	beforeEach(() => {
		mockRedis = {
			exists: vi.fn().mockResolvedValue(false),
			set: vi.fn().mockResolvedValue("OK"),
			get: vi.fn().mockResolvedValue(null),
			del: vi.fn().mockResolvedValue(1),
			expire: vi.fn().mockResolvedValue(1),
			hgetall: vi.fn().mockResolvedValue({}),
			hset: vi.fn().mockResolvedValue(1),
			hget: vi.fn().mockResolvedValue(null),
			hdel: vi.fn().mockResolvedValue(1),
			sadd: vi.fn().mockResolvedValue(1),
			smembers: vi.fn().mockResolvedValue([]),
		};
		mockLogger = { log: vi.fn(), warn: vi.fn(), error: vi.fn() };
		manager = new SessionManager(mockRedis, mockLogger, { sessionTtl: 2592000 });
	});

	it("should reject invalid nicknames", () => {
		expect(manager.validateNickname("ab1").valid).toBe(false);
		expect(manager.validateNickname("a").valid).toBe(false);
		expect(manager.validateNickname("abc!@#").valid).toBe(false);
		expect(manager.validateNickname("").valid).toBe(false);
	});

	it("should accept valid nicknames", () => {
		expect(manager.validateNickname("Hero").valid).toBe(true);
		expect(manager.validateNickname("TestUser").valid).toBe(true);
		expect(manager.validateNickname("abcd").valid).toBe(true);
	});

	it("should reject duplicate nickname on createSession", async () => {
		mockRedis.exists.mockResolvedValue(true);
		const result = await manager.createSession("Hero");
		expect(result.accepted).toBe(false);
		expect(result.error).toBe("NICKNAME_TAKEN");
	});

	it("should create session for available nickname", async () => {
		const result = await manager.createSession("Hero");
		expect(result.accepted).toBe(true);
		expect(result.session_id).toBeTruthy();
		expect(mockRedis.set).toHaveBeenCalled();
	});

	it("should renew session TTL", async () => {
		mockRedis.get.mockResolvedValue(JSON.stringify({ nickname: "Hero", sessionId: "abc" }));
		await manager.renewSession("Hero");
		expect(mockRedis.expire).toHaveBeenCalled();
	});

	it("should disconnect session without deleting data", async () => {
		await manager.disconnectSession("Hero");
		expect(mockRedis.del).not.toHaveBeenCalled();
	});

	it("should initialize full state for a new session", async () => {
		const sessionId = "test-session-123";
		await manager.initializeFullState(sessionId);

		expect(mockRedis.hset).toHaveBeenCalledWith(
			`player:${sessionId}:inventory`, "player",
			expect.stringContaining("player")
		);

		expect(mockRedis.hset).toHaveBeenCalledWith(
			`player:${sessionId}:stats`, "level", expect.any(String)
		);

		expect(mockLogger.log).toHaveBeenCalledWith(
			expect.stringContaining("Full state initialized"), "SESSION"
		);
	});

	it("should load full state for an existing session", async () => {
		const sessionId = "test-session-456";

		mockRedis.hgetall.mockImplementation((key) => {
			if (key.includes("stats")) {
				return { level: "1", gold: "0", hp: "100", currentPlaceId: '"village"' };
			}
			if (key.includes("inventory")) {
				return { player: JSON.stringify({ id: "player", items: [] }) };
			}
			if (key.includes("buildings")) {
				return {};
			}
			if (key.includes("quests:active")) {
				return { quest_1: JSON.stringify({ progress: 0 }) };
			}
			if (key.includes("quests:completed")) {
				return {};
			}
			if (key.includes("skills")) {
				return { mining: JSON.stringify({ level: 1, exp: 0 }) };
			}
			return {};
		});
		mockRedis.get.mockResolvedValue(null);
		mockRedis.smembers.mockResolvedValue(["recipe_wood_sword"]);

		const state = await manager.loadFullState(sessionId);

		expect(state).toHaveProperty("player");
		expect(state).toHaveProperty("inventory");
		expect(state).toHaveProperty("buildings");
		expect(state).toHaveProperty("workers");
		expect(state).toHaveProperty("quests");
		expect(state).toHaveProperty("skills");
		expect(state).toHaveProperty("recipes");

		expect(state.player.level).toBe(1);
		expect(state.workers).toEqual({ hired: [], available: [] });
		expect(state.quests.active).toHaveProperty("quest_1");
		expect(state.recipes).toEqual(["recipe_wood_sword"]);
	});
});
