// server/services/NavigationService.js
export class NavigationService {
  constructor(redis) {
    this.redis = redis;
  }

  async navigate(sessionId, placeId) {
    const stats = await this.redis.hgetall(`player:${sessionId}:stats`);
    const previousPlace = stats?.currentPlaceId || null;

    await this.redis.hset(`player:${sessionId}:stats`, "currentPlaceId", placeId);

    return { currentPlaceId: placeId, previousPlaceId: previousPlace };
  }
}
