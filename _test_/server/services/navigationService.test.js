import { describe, it, expect, vi, beforeEach } from "vitest";
import { NavigationService } from "../../../server/services/NavigationService.js";

function mockRedis() {
  return { hgetall: vi.fn(), hset: vi.fn() };
}

describe("NavigationService", () => {
  let redis;
  let ns;

  beforeEach(() => {
    redis = mockRedis();
    ns = new NavigationService(redis);
  });

  it("navigate updates currentPlaceId and returns result", async () => {
    redis.hgetall.mockResolvedValue({ currentPlaceId: '"village"' });
    const result = await ns.navigate("s1", "forest");
    expect(result.currentPlaceId).toBe("forest");
    expect(result.previousPlaceId).toBe('"village"');
    expect(redis.hset).toHaveBeenCalledWith("player:s1:stats", "currentPlaceId", "forest");
  });

  it("navigate returns null previousPlaceId when none set", async () => {
    redis.hgetall.mockResolvedValue({});
    const result = await ns.navigate("s1", "forest");
    expect(result.currentPlaceId).toBe("forest");
    expect(result.previousPlaceId).toBeNull();
  });
});
