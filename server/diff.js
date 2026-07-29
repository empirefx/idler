export function buildDiff(before, after, prefix) {
  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const key of allKeys) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (!(key in before)) {
      return { path, data: after[key] };
    }
    if (!(key in after)) {
      return { path, data: null };
    }
    if (!Array.isArray(before[key]) && !Array.isArray(after[key]) && typeof before[key] === "object" && typeof after[key] === "object" && before[key] !== null && after[key] !== null) {
      const nested = buildDiff(before[key], after[key], path);
      if (nested) return nested;
    } else if (before[key] !== after[key]) {
      return { path, data: after[key] };
    }
  }
  return null;
}
