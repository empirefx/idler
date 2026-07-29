import { readFileSync } from "node:fs";

export function loadConfig() {
  const raw = readFileSync(new URL("../server.config.json", import.meta.url), "utf8");
  return JSON.parse(raw);
}
