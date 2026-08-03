// server/processors/playerAttackProcessor.js
import { Worker } from "bullmq";
import { loadConfig } from "../config.js";

export function createPlayerAttackWorker(combatService, redisConfig = loadConfig().redis) {
  const worker = new Worker(
    "player-attacks",
    async (job) => {
      const { sessionId } = job.data;
      if (job.name === "skill-activation") {
        return combatService.handleSkillActivationJob(sessionId, job.data.skillId);
      }
      return combatService.handlePlayerAttackJob(sessionId);
    },
    { connection: { host: redisConfig.host, port: redisConfig.port } }
  );
  worker.on("error", (err) => {
    console.error(`[worker:player-attacks] error:`, err?.message || err);
  });
  return worker;
}
