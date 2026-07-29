// server/services/BuildingService.js
export class BuildingService {
  constructor(redis, buildingsState, broadcaster) {
    this.redis = redis;
    this.buildingsState = buildingsState;
    this.broadcaster = broadcaster;
  }

  async build(sessionId, placeId, socketIndex, buildingId) {
    const field = `${placeId}:${socketIndex}`;
    const building = { id: buildingId, level: 1, placeId, socketIndex };
    await this.buildingsState.save(sessionId, field, building);
    this.broadcaster.broadcast("DIFF", { path: `buildings.${field}`, data: building });
    return { success: true };
  }
}
