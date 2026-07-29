import { describe, it, expect, vi, beforeEach } from "vitest";
import { SessionManager } from "../../server/session.js";

describe("SessionManager", () => {
	let mockRedis;
	let mockLogger;
	let manager;

	beforeEach(() => {
		mockRedis = {
			exists: vi.fn(),
			set: vi.fn(),
			get: vi.fn(),
			del: vi.fn(),
			expire: vi.fn(),
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
		mockRedis.exists.mockResolvedValue(false);
		mockRedis.set.mockResolvedValue(undefined);
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

	it("should disconnect session", async () => {
		await manager.disconnectSession("Hero");
		expect(mockRedis.del).toHaveBeenCalledWith("session:Hero");
	});
});
