import { describe, it, expect, vi, beforeEach } from "vitest";
import { SpawnService } from "../../../server/services/SpawnService.js";

function mockRedis() {
  return { hget: vi.fn() };
}

describe("SpawnService", () => {
  let redis;
  let enemyState;
  let queue;
  let broadcaster;
  let ss;

  beforeEach(() => {
    redis = mockRedis();
    enemyState = { save: vi.fn() };
    queue = { add: vi.fn() };
    broadcaster = { broadcast: vi.fn() };
    ss = new SpawnService(redis, enemyState, queue, broadcaster);
  });

  it("triggerSpawn creates enemies and broadcasts", async () => {
    redis.hget.mockResolvedValue(JSON.stringify({ id: "forest" }));
    await ss.triggerSpawn("s1", "forest");
    expect(enemyState.save).toHaveBeenCalled();
    expect(broadcaster.broadcast).toHaveBeenCalledWith("ENEMY_SPAWN", expect.objectContaining({ placeId: "forest" }));
  });

  it("_createEnemyWave returns 3 enemies", () => {
    const enemies = ss._createEnemyWave("forest");
    expect(enemies).toHaveLength(3);
    expect(enemies[0]).toHaveProperty("id");
    expect(enemies[0]).toHaveProperty("placeId", "forest");
    expect(enemies[0]).toHaveProperty("hp", 30);
  });
});
