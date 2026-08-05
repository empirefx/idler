import { incrementProgress } from "../progress.js";

const matchesTarget = (objective, enemy) => {
  if (objective.target === "any") return true;
  return (
    objective.target === enemy?.id ||
    objective.target === enemy?.type ||
    objective.target === enemy?.name
  );
};

export const killObjective = {
  type: "kill",

  applyProgress({ entry, objective, event }) {
    if (event?.kind !== "kill") return null;
    if (!matchesTarget(objective, event.data?.enemy)) return null;

    const next = incrementProgress(entry, objective.progressKey, 1, objective.required);
    return next === null ? null : { [objective.progressKey]: next };
  },

  getProgress({ entry, objective }) {
    return entry?.progress?.[objective.progressKey] || 0;
  },

  isComplete({ entry, objective }) {
    return this.getProgress({ entry, objective }) >= objective.required;
  },
};
