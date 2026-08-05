import { describe, it, expect, vi, beforeEach } from "vitest";
import { SpawnService } from "../../../server/services/SpawnService.js";

function mockRedis() {
  return { hget: vi.fn() };
}

describe("SpawnService", () => {
  let redis;
  let enemyState;
  let queue;
  let playerAttackQueue;
  let playerState;
  let broadcaster;
  let ss;

  beforeEach(() => {
    redis = mockRedis();
    enemyState = { save: vi.fn(), clearAll: vi.fn(), delete: vi.fn() };
    queue = { add: vi.fn() };
    playerAttackQueue = { add: vi.fn().mockResolvedValue({ id: "pa-1" }) };
    playerState = { load: vi.fn().mockResolvedValue({ currentPlaceId: "forest_edge", isDead: false, autoCombat: false }), save: vi.fn().mockResolvedValue() };
    broadcaster = { broadcast: vi.fn() };
    ss = new SpawnService(redis, enemyState, queue, queue, playerAttackQueue, playerState, broadcaster);
  });

  it("triggerSpawn creates enemies and broadcasts", async () => {
    enemyState.save.mockResolvedValue();
    enemyState.clearAll.mockResolvedValue();
    await ss.triggerSpawn("s1", "forest_edge");
    expect(enemyState.save).toHaveBeenCalled();
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "ENEMY_SPAWN", expect.objectContaining({ placeId: "forest_edge" }));
  });

  it("triggerSpawn seeds one enemy-attack job per enemy", async () => {
    enemyState.save.mockResolvedValue();
    enemyState.clearAll.mockResolvedValue();
    playerState.load = vi.fn().mockResolvedValue({
      currentPlaceId: "forest_edge",
      isDead: false,
      autoCombat: true,
    });
    const result = await ss.triggerSpawn("s1", "forest_edge");
    expect(result).toBe(true);
    expect(enemyState.save).toHaveBeenCalled();
    expect(queue.add).toHaveBeenCalledWith(
      "enemy-attack",
      expect.objectContaining({ sessionId: "s1" }),
      expect.objectContaining({ delay: expect.any(Number) }),
    );
    expect(playerAttackQueue.add).toHaveBeenCalledWith(
      "player-attack",
      { sessionId: "s1" },
      expect.objectContaining({ jobId: expect.stringContaining("player-attack-"), removeOnComplete: true }),
    );
  });

  it("triggerSpawn does not spawn when the player is at a different place", async () => {
    enemyState.save.mockResolvedValue();
    enemyState.clearAll.mockResolvedValue();
    playerState.load = vi.fn().mockResolvedValue({
      currentPlaceId: "forest_edge",
      isDead: false,
      autoCombat: true,
    });
    const result = await ss.triggerSpawn("s1", "village_center");
    expect(result).toBe(false);
    expect(enemyState.save).not.toHaveBeenCalled();
    expect(queue.add).not.toHaveBeenCalled();
    expect(playerAttackQueue.add).not.toHaveBeenCalled();
    expect(broadcaster.broadcast).not.toHaveBeenCalled();
  });

  it("triggerSpawn does not broadcast or start the chain for places without spawn", async () => {
    enemyState.save.mockResolvedValue();
    enemyState.clearAll.mockResolvedValue();
    playerState.load = vi.fn().mockResolvedValue({
      currentPlaceId: "village_center",
      isDead: false,
      autoCombat: true,
    });
    const result = await ss.triggerSpawn("s1", "village_center");
    expect(result).toBe(false);
    expect(enemyState.save).not.toHaveBeenCalled();
    expect(queue.add).not.toHaveBeenCalled();
    expect(playerAttackQueue.add).not.toHaveBeenCalled();
    expect(broadcaster.broadcast).not.toHaveBeenCalled();
  });

  it("triggerSpawn does not start the player chain when auto-combat is off", async () => {
    enemyState.save.mockResolvedValue();
    enemyState.clearAll.mockResolvedValue();
    playerState.load = vi.fn().mockResolvedValue({
      currentPlaceId: "forest_edge",
      isDead: false,
      autoCombat: false,
    });
    await ss.triggerSpawn("s1", "forest_edge");
    expect(playerAttackQueue.add).not.toHaveBeenCalled();
  });

  it("_createEnemyWave uses spawn config from places", () => {
    const enemies = ss._createEnemyWave("forest_edge");
    expect(enemies.length).toBeGreaterThanOrEqual(1);
    expect(enemies.length).toBeLessThanOrEqual(1);
    enemies.forEach((e) => {
      expect(e).toHaveProperty("id");
      expect(e).toHaveProperty("placeId", "forest_edge");
      expect(["forest_beast"]).toContain(e.type);
      expect(e.name).toBe("Forest Beast");
      expect(e).toHaveProperty("hp");
      expect(e).toHaveProperty("maxHp");
      expect(e).toHaveProperty("attackPattern");
    });
  });

  it("_createEnemyWave returns empty for places without spawn", () => {
    expect(ss._createEnemyWave("village_center")).toEqual([]);
  });

  it("_createEnemy builds from catalog entry", () => {
    const enemy = ss._createEnemy("deep_woods", "woodland_predator");
    expect(enemy).not.toBeNull();
    expect(enemy.name).toBe("Woodland Predator");
    expect(enemy.avatar).toBe("2.png");
    expect(enemy.hp).toBe(80);
    expect(enemy.maxHp).toBe(80);
    expect(enemy.strength).toBe(12);
    expect(enemy.defense).toBe(3);
    expect(enemy.attackPattern).toBe("staggered");
  });

  it("_createEnemy returns null for unknown type", () => {
    expect(ss._createEnemy("forest_edge", "nonexistent")).toBeNull();
  });

  it("cleanupPlace removes pending attack/spawn jobs and enemies for the place", async () => {
    const enemyAttackQueue = {
      getJobs: vi.fn().mockResolvedValue([
        { id: "att-own", data: { sessionId: "s1", enemyId: "e1" } },
        { id: "att-other", data: { sessionId: "s2", enemyId: "x" } },
      ]),
      remove: vi.fn().mockResolvedValue(),
    };
    const spawnQueue = {
      getJobs: vi.fn().mockResolvedValue([
        { id: "spawn-own", data: { sessionId: "s1", placeId: "forest_edge" } },
        { id: "spawn-other-place", data: { sessionId: "s1", placeId: "deep_woods" } },
        { id: "spawn-other-session", data: { sessionId: "s2", placeId: "forest_edge" } },
      ]),
      remove: vi.fn().mockResolvedValue(),
    };
    const enemyState = {
      loadAll: vi.fn().mockResolvedValue({
        e1: { id: "e1", placeId: "forest_edge", hp: 10 },
        e2: { id: "e2", placeId: "deep_woods", hp: 10 },
      }),
      delete: vi.fn().mockResolvedValue(),
    };
    const localSs = new SpawnService(
      mockRedis(),
      enemyState,
      spawnQueue,
      enemyAttackQueue,
      playerAttackQueue,
      playerState,
      broadcaster,
    );

    const result = await localSs.cleanupPlace("s1", "forest_edge");

    expect(result).toBe(true);
    expect(enemyAttackQueue.remove).toHaveBeenCalledWith("att-own");
    expect(enemyAttackQueue.remove).not.toHaveBeenCalledWith("att-other");
    expect(spawnQueue.remove).toHaveBeenCalledWith("spawn-own");
    expect(spawnQueue.remove).not.toHaveBeenCalledWith("spawn-other-place");
    expect(spawnQueue.remove).not.toHaveBeenCalledWith("spawn-other-session");
    expect(enemyState.delete).toHaveBeenCalledWith("s1", "e1");
    expect(enemyState.delete).not.toHaveBeenCalledWith("s1", "e2");
  });

  it("cleanupPlace is a no-op for a null placeId", async () => {
    const result = await ss.cleanupPlace("s1", null);
    expect(result).toBe(false);
    expect(enemyState.delete).not.toHaveBeenCalled();
  });
});
