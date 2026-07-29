import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { RedisClient } from "./redis.js";
import { SessionManager } from "./session.js";
import { InventoryHandler } from "./inventory.js";
import { startWebSocketServer } from "./ws.js";
import { createServerLogger } from "./logger.js";

const config = JSON.parse(readFileSync(new URL("../server.config.json", import.meta.url), "utf8"));
const logger = createServerLogger({ debug: config.server.debug });

async function main() {
	logger.log(`Starting server (debug=${config.server.debug})`, "BOOT");

	const redis = new RedisClient(config.redis);
	await redis.connect();
	logger.log("Redis connected", "BOOT");

	const sessionManager = new SessionManager(redis, logger, config.redis);
	const inventoryHandler = new InventoryHandler(redis, logger);

	const httpServer = createServer();
	startWebSocketServer({ server: httpServer, redis, sessionManager, inventoryHandler, logger });

	httpServer.listen(config.server.port, config.server.host, () => {
		logger.log(`Listening on ${config.server.host}:${config.server.port}`, "BOOT");
	});

	// Periodic session cleanup
	setInterval(() => {
		sessionManager.cleanupExpiredSessions();
	}, 3600000); // every hour

	// Graceful shutdown
	const shutdown = async () => {
		logger.log("Shutting down...", "BOOT");
		await redis.disconnect();
		process.exit(0);
	};
	process.on("SIGINT", shutdown);
	process.on("SIGTERM", shutdown);
}

main().catch((err) => {
	logger.error(`Fatal: ${err.message}`);
	process.exit(1);
});
