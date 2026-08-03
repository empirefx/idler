// server/config.js
import { readFileSync } from "node:fs";

function toBool(value) {
  return value === true || value === "true" || value === "1";
}

function toInt(value, fallback) {
  if (value === "" || value == null) return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

export function loadConfig(env = process.env) {
  const defaults = JSON.parse(
    readFileSync(new URL("../server.config.json", import.meta.url), "utf8")
  );

  return {
    server: {
      port: toInt(env.SERVER_PORT, defaults.server.port),
      host: env.SERVER_HOST || defaults.server.host,
      debug: env.SERVER_DEBUG != null ? toBool(env.SERVER_DEBUG) : defaults.server.debug,
    },
    redis: {
      host: env.REDIS_HOST || defaults.redis.host,
      port: toInt(env.REDIS_PORT, defaults.redis.port),
      sessionTtl: toInt(env.REDIS_SESSION_TTL, defaults.redis.sessionTtl),
    },
    game: {
      maxPlayers: toInt(env.GAME_MAX_PLAYERS, defaults.game.maxPlayers),
      sessionInactiveDays: toInt(env.GAME_SESSION_INACTIVE_DAYS, defaults.game.sessionInactiveDays),
      tickRate: toInt(env.GAME_TICK_RATE, defaults.game.tickRate),
    },
    ws: {
      port: toInt(env.WS_PORT, defaults.server.port),
    },
  };
}
