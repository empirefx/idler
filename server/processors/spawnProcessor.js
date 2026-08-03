// server/processors/spawnProcessor.js
import { Worker } from "bullmq";
import { loadConfig } from "../config.js";

export function createSpawnWorker(spawnService, redisConfig = loadConfig().redis) {
  const worker = new Worker(
    "enemy-spawn",
    async (job) => {
      const { sessionId, placeId } = job.data;
      await spawnService.triggerSpawn(sessionId, placeId);
    },
    { connection: { host: redisConfig.host, port: redisConfig.port } }
  );
  worker.on("error", (err) => {
    console.error(`[worker:enemy-spawn] error:`, err?.message || err);
  });
  return worker;
}
