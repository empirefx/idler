export function incrementProgress(entry, progressKey, amount, max) {
  const current = entry?.progress?.[progressKey] || 0;
  const next = Math.min(current + amount, max);
  return next > current ? next : null;
}
