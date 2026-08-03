import { Queue } from "bullmq";
import { loadConfig } from "./config.js";

export function createQueues(redisOpts) {
  const defaults = loadConfig().redis;
  const connection = { host: defaults.host, port: defaults.port, ...redisOpts };
  const jobOptions = { removeOnComplete: true };
  const queueOptions = { connection, defaultJobOptions: jobOptions, streams: { events: { maxLen: 100 } } };
  const productionQueue = new Queue("production", queueOptions);
  const enemyAttackQueue = new Queue("enemy-attacks", queueOptions);
  const spawnQueue = new Queue("enemy-spawn", queueOptions);
  const sessionCleanupQueue = new Queue("session-cleanup", queueOptions);
  const playerAttackQueue = new Queue("player-attacks", queueOptions);
  return { productionQueue, enemyAttackQueue, spawnQueue, sessionCleanupQueue, playerAttackQueue };
}
