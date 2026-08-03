import { createServer } from "node:http";
import { RedisClient } from "./redis.js";
import { loadConfig } from "./config.js";
import { SessionManager } from "./session.js";
import { startWebSocketServer } from "./ws.js";
import { createServerLogger } from "./logger.js";
import { PlayerState } from "./state/PlayerState.js";
import { InventoryState } from "./state/InventoryState.js";
import { BuildingsState } from "./state/BuildingsState.js";
import { WorkersState } from "./state/WorkersState.js";
import { QuestState } from "./state/QuestState.js";
import { EnemyState } from "./state/EnemyState.js";
import { createQueues } from "./queue.js";
import { createBroadcaster } from "./broadcast.js";
import { CombatService } from "./services/CombatService.js";
import { ProductionService } from "./services/ProductionService.js";
import { CraftingService } from "./services/CraftingService.js";
import { BuildingService } from "./services/BuildingService.js";
import { WorkerService } from "./services/WorkerService.js";
import { QuestService } from "./services/QuestService.js";
import { SkillsService } from "./services/SkillsService.js";
import { SpawnService } from "./services/SpawnService.js";
import { NavigationService } from "./services/NavigationService.js";
import { InventoryHandler } from "./inventory.js";
import { createProductionWorker } from "./processors/productionProcessor.js";
import { createEnemyAttackWorker } from "./processors/enemyAttackProcessor.js";
import { createPlayerAttackWorker } from "./processors/playerAttackProcessor.js";
import { createSpawnWorker } from "./processors/spawnProcessor.js";

const config = loadConfig();
const logger = createServerLogger({ debug: config.server.debug });

async function main() {
  logger.log(`Starting server (debug=${config.server.debug})`, "BOOT");

  const redis = new RedisClient(config.redis);
  await redis.connect();
  logger.log("Redis connected", "BOOT");

  const sessionManager = new SessionManager(redis, logger, config.redis);

  const playerState = new PlayerState(redis);
  const inventoryState = new InventoryState(redis);
  const buildingsState = new BuildingsState(redis);
  const workersState = new WorkersState(redis);
  const questState = new QuestState(redis);
  const enemyState = new EnemyState(redis);

  const queues = createQueues(config.redis);
  const broadcaster = createBroadcaster();

  const combatService = new CombatService(redis, playerState, inventoryState, enemyState, queues.enemyAttackQueue, queues.playerAttackQueue, queues.spawnQueue, broadcaster);
  const productionService = new ProductionService(redis, inventoryState, queues.productionQueue, broadcaster);
  const craftingService = new CraftingService(redis, playerState, inventoryState, broadcaster);
  const buildingService = new BuildingService(redis, buildingsState, broadcaster);
  const workerService = new WorkerService(redis, workersState, playerState, broadcaster);
  const questService = new QuestService(redis, playerState, questState, broadcaster);
  const skillsService = new SkillsService(redis, playerState, inventoryState, broadcaster);
  const spawnService = new SpawnService(redis, enemyState, queues.spawnQueue, queues.enemyAttackQueue, queues.playerAttackQueue, playerState, broadcaster);
  const navigationService = new NavigationService(redis);
  const inventoryHandler = new InventoryHandler(redis, logger);

  createProductionWorker(productionService, config.redis);
  createEnemyAttackWorker(combatService, broadcaster, queues.enemyAttackQueue, config.redis);
  createPlayerAttackWorker(combatService, config.redis);
  createSpawnWorker(spawnService, config.redis);

  const httpServer = createServer();
  startWebSocketServer({
    server: httpServer,
    sessionManager,
    combatService,
    productionService,
    craftingService,
    buildingService,
    workerService,
    questService,
    skillsService,
    spawnService,
    navigationService,
    inventoryHandler,
    playerState,
    inventoryState,
    broadcaster,
    logger,
  });

  httpServer.listen(config.server.port, config.server.host, () => {
    logger.log(`Listening on ${config.server.host}:${config.server.port}`, "BOOT");
  });

  setInterval(() => {
    sessionManager.cleanupExpiredSessions();
  }, 3600000);

  const shutdown = async () => {
    logger.log("Shutting down...", "BOOT");
    await redis.disconnect();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  process.on("unhandledRejection", (reason) => {
    logger.error(`Unhandled rejection: ${reason?.stack || reason}`);
  });

  process.on("uncaughtException", (err) => {
    logger.error(`Uncaught exception: ${err?.stack || err}`);
  });
}

main().catch((err) => {
  logger.error(`Fatal: ${err.message}`);
  process.exit(1);
});
