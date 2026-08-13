import { useEffect, useState } from "react";

export function useEnemyCountdown(enemy) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enemy?.nextAttackAt) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), 100);
    return () => clearInterval(id);
  }, [enemy?.nextAttackAt]);

  const nextAttackAt = enemy?.nextAttackAt || 0;
  const nextAttackDelay = enemy?.nextAttackDelay || 0;
  const remaining = nextAttackAt ? Math.max(0, Math.round(nextAttackAt - Date.now())) : 0;

  return { remaining, nextAttackAt, nextAttackDelay };
}

export default useEnemyCountdown;
