import { describe, it, expect } from "vitest";
import { loadConfig } from "../../server/config.js";

describe("loadConfig", () => {
	it("returns defaults from server.config.json when env is empty", () => {
		const config = loadConfig({});

		expect(config.server.port).toBe(3001);
		expect(config.server.host).toBe("0.0.0.0");
		expect(config.server.debug).toBe(false);
		expect(config.redis.host).toBe("127.0.0.1");
		expect(config.redis.port).toBe(6379);
		expect(config.redis.sessionTtl).toBe(2592000);
		expect(config.game.maxPlayers).toBe(100);
		expect(config.game.sessionInactiveDays).toBe(30);
		expect(config.game.tickRate).toBe(1000);
	});

	it("overrides values from env", () => {
		const config = loadConfig({
			SERVER_PORT: "4000",
			SERVER_HOST: "0.0.0.0",
			REDIS_HOST: "redis.internal",
			REDIS_PORT: "6380",
			REDIS_SESSION_TTL: "3600",
			GAME_MAX_PLAYERS: "50",
			GAME_SESSION_INACTIVE_DAYS: "3",
			GAME_TICK_RATE: "500",
			WS_PORT: "4000",
		});

		expect(config.server.port).toBe(4000);
		expect(config.redis.host).toBe("redis.internal");
		expect(config.redis.port).toBe(6380);
		expect(config.redis.sessionTtl).toBe(3600);
		expect(config.game.maxPlayers).toBe(50);
		expect(config.game.sessionInactiveDays).toBe(3);
		expect(config.game.tickRate).toBe(500);
		expect(config.ws.port).toBe(4000);
	});

	it("coerces debug as boolean and falls back on invalid ints", () => {
		expect(loadConfig({ SERVER_DEBUG: "true" }).server.debug).toBe(true);
		expect(loadConfig({ SERVER_DEBUG: "1" }).server.debug).toBe(true);
		expect(loadConfig({ REDIS_PORT: "not-a-number" }).redis.port).toBe(6379);
		expect(loadConfig({ GAME_TICK_RATE: "" }).game.tickRate).toBe(1000);
	});
});
