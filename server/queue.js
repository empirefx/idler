import { Queue } from "bullmq";

export function createQueues(redisOpts) {
  const connection = { host: "127.0.0.1", port: 6379, ...redisOpts };
  const productionQueue = new Queue("production", { connection });
  const enemyAttackQueue = new Queue("enemy-attacks", { connection });
  const spawnQueue = new Queue("enemy-spawn", { connection });
  const sessionCleanupQueue = new Queue("session-cleanup", { connection });
  return { productionQueue, enemyAttackQueue, spawnQueue, sessionCleanupQueue };
}
