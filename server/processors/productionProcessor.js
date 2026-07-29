// server/processors/productionProcessor.js
import { Worker } from "bullmq";

export function createProductionWorker(productionService) {
  const worker = new Worker(
    "production",
    async (job) => {
      const { sessionId, placeId, socketIndex, worker, building } = job.data;
      await productionService.produce(sessionId, placeId, socketIndex, worker, building);
    },
    { connection: { host: "127.0.0.1", port: 6379 } }
  );
  return worker;
}
