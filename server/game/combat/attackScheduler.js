export function rollEnemyAttackDelay(enemy) {
  const [min, max] = enemy?.attackDelayRange || [1000, 3000];
  return Math.round(min + Math.random() * (max - min));
}

export async function scheduleEnemyAttack({ enemyState, enemyAttackQueue }, sessionId, enemy) {
  const delay = rollEnemyAttackDelay(enemy);
  const now = Date.now();
  enemy.nextAttackDelay = delay;
  enemy.nextAttackAt = now + delay;
  await enemyState.save(sessionId, enemy.id, enemy);
  await enemyAttackQueue.add("enemy-attack", { sessionId, enemyId: enemy.id }, { delay });
  return enemy;
}
