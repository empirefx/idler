// server/processors/productionProcessor.js
import { Worker } from "bullmq";
import { loadConfig } from "../config.js";

export function createProductionWorker(productionService, redisConfig = loadConfig().redis) {
  const worker = new Worker(
    "production",
    async (job) => {
      const { sessionId, placeId, socketIndex, material } = job.data;
      await productionService.produce(sessionId, placeId, socketIndex, material);
    },
    { connection: { host: redisConfig.host, port: redisConfig.port } }
  );
  worker.on("error", (err) => {
    console.error(`[worker:production] error:`, err?.message || err);
  });
  return worker;
}
