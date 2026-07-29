// server/processors/enemyAttackProcessor.js
import { Worker } from "bullmq";

export function createEnemyAttackWorker(combatService, broadcaster) {
  const worker = new Worker(
    "enemy-attacks",
    async (job) => {
      const { sessionId, enemyId } = job.data;
      const result = await combatService.handleEnemyAttack(sessionId, enemyId);
      if (result && !result.error) {
        broadcaster.broadcast("ENEMY_ATTACK", result);
        const enemy = await combatService.enemyState.load(sessionId, enemyId);
        if (enemy && enemy.hp > 0) {
          const delay = (enemy.attackDelayRange?.[0] || 1000) + Math.random() * (enemy.attackDelayRange?.[1] || 2000);
          await job.queue.add("enemy-attack", { sessionId, enemyId }, { delay: Math.round(delay) });
        }
      }
    },
    { connection: { host: "127.0.0.1", port: 6379 } }
  );
  return worker;
}
