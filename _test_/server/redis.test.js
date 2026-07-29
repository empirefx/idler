import { describe, it, expect, vi, beforeEach } from "vitest";

const mockRedis = {
	on: vi.fn(),
	connect: vi.fn().mockResolvedValue(undefined),
	get: vi.fn(),
	set: vi.fn(),
	hget: vi.fn(),
	hset: vi.fn(),
	hdel: vi.fn(),
	hgetall: vi.fn(),
	hkeys: vi.fn(),
	smembers: vi.fn(),
	sadd: vi.fn(),
	del: vi.fn(),
	expire: vi.fn(),
	exists: vi.fn(),
	quit: vi.fn(),
};

vi.mock("ioredis", () => ({
	default: vi.fn(() => mockRedis),
}));

import { RedisClient } from "../../server/redis.js";

describe("RedisClient", () => {
	let client;

	beforeEach(() => {
		vi.clearAllMocks();
		client = new RedisClient({ host: "127.0.0.1", port: 6379, sessionTtl: 2592000 });
	});

	it("should connect and set up handlers", async () => {
		await client.connect();
		expect(mockRedis.connect).toHaveBeenCalled();
		expect(mockRedis.on).toHaveBeenCalledWith("error", expect.any(Function));
	});

	it("should get a value", async () => {
		mockRedis.get.mockResolvedValue("value");
		const result = await client.get("key");
		expect(result).toBe("value");
		expect(mockRedis.get).toHaveBeenCalledWith("key");
	});

	it("should set a value with TTL", async () => {
		await client.set("key", "value");
		expect(mockRedis.set).toHaveBeenCalledWith("key", "value", "EX", 2592000);
	});

	it("should set a value with custom TTL", async () => {
		await client.set("key", "value", 3600);
		expect(mockRedis.set).toHaveBeenCalledWith("key", "value", "EX", 3600);
	});

	it("should hget a field", async () => {
		mockRedis.hget.mockResolvedValue("fieldValue");
		const result = await client.hget("hash", "field");
		expect(result).toBe("fieldValue");
	});

	it("should hset a field", async () => {
		await client.hset("hash", "field", "value");
		expect(mockRedis.hset).toHaveBeenCalledWith("hash", "field", "value");
	});

	it("should hdel a field", async () => {
		await client.hdel("hash", "field");
		expect(mockRedis.hdel).toHaveBeenCalledWith("hash", "field");
	});

	it("should delete keys", async () => {
		await client.del("key");
		expect(mockRedis.del).toHaveBeenCalledWith("key");
	});

	it("should expire keys", async () => {
		await client.expire("key", 100);
		expect(mockRedis.expire).toHaveBeenCalledWith("key", 100);
	});

	it("should check existence", async () => {
		mockRedis.exists.mockResolvedValue(1);
		const result = await client.exists("key");
		expect(result).toBe(true);
	});

	it("should hgetall a hash", async () => {
		mockRedis.hgetall.mockResolvedValue({ field1: "val1", field2: "val2" });
		const result = await client.hgetall("hash");
		expect(result).toEqual({ field1: "val1", field2: "val2" });
		expect(mockRedis.hgetall).toHaveBeenCalledWith("hash");
	});

	it("should hkeys a hash", async () => {
		mockRedis.hkeys.mockResolvedValue(["field1", "field2"]);
		const result = await client.hkeys("hash");
		expect(result).toEqual(["field1", "field2"]);
		expect(mockRedis.hkeys).toHaveBeenCalledWith("hash");
	});

	it("should smembers a set", async () => {
		mockRedis.smembers.mockResolvedValue(["a", "b"]);
		const result = await client.smembers("set");
		expect(result).toEqual(["a", "b"]);
		expect(mockRedis.smembers).toHaveBeenCalledWith("set");
	});

	it("should sadd a value to a set", async () => {
		mockRedis.sadd.mockResolvedValue(1);
		const result = await client.sadd("set", "value");
		expect(result).toBe(1);
		expect(mockRedis.sadd).toHaveBeenCalledWith("set", "value");
	});

	it("should disconnect", async () => {
		await client.disconnect();
		expect(mockRedis.quit).toHaveBeenCalled();
	});
});
