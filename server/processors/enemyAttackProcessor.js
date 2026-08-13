// server/processors/enemyAttackProcessor.js
import { Worker } from "bullmq";
import { loadConfig } from "../config.js";

export function createEnemyAttackWorker(combatService, broadcaster, enemyAttackQueue, redisConfig = loadConfig().redis) {
  const worker = new Worker(
    "enemy-attacks",
    async (job) => {
      const { sessionId, enemyId } = job.data;
      const result = await combatService.handleEnemyAttack(sessionId, enemyId);
      if (result && !result.error && !result.skipped && !result.playerDead) {
        const enemy = await combatService.scheduleEnemyAttack(sessionId, enemyId);
        if (enemy) {
          broadcaster.broadcast(sessionId, "ENEMY_ATTACK", {
            ...result,
            nextAttackAt: enemy.nextAttackAt,
            nextAttackDelay: enemy.nextAttackDelay,
          });
        }
      }
    },
    { connection: { host: redisConfig.host, port: redisConfig.port } }
  );
  worker.on("error", (err) => {
    console.error(`[worker:enemy-attacks] error:`, err?.message || err);
  });
  return worker;
}
