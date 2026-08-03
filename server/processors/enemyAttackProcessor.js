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
        broadcaster.broadcast(sessionId, "ENEMY_ATTACK", result);
        const enemy = await combatService.enemyState.load(sessionId, enemyId);
        if (enemy && enemy.hp > 0) {
          const delay = (enemy.attackDelayRange?.[0] || 1000) + Math.random() * (enemy.attackDelayRange?.[1] || 2000);
          await enemyAttackQueue.add("enemy-attack", { sessionId, enemyId }, { delay: Math.round(delay) });
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
