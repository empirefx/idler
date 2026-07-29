// server/processors/spawnProcessor.js
import { Worker } from "bullmq";

export function createSpawnWorker(spawnService) {
  const worker = new Worker(
    "spawn",
    async (job) => {
      const { sessionId, placeId } = job.data;
      await spawnService.triggerSpawn(sessionId, placeId);
    },
    { connection: { host: "127.0.0.1", port: 6379 } }
  );
  return worker;
}
