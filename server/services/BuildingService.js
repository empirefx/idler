// server/services/BuildingService.js
import { placesData } from "../../shared/data/places.js";
import { buildingsData } from "../../shared/data/buildings.js";

export class BuildingService {
  constructor(playerState, buildingsState, socketsState, productionService, broadcaster) {
    this.playerState = playerState;
    this.buildingsState = buildingsState;
    this.socketsState = socketsState;
    this.productionService = productionService;
    this.broadcaster = broadcaster;
  }

  async _loadGold(sessionId) {
    const playerData = await this.playerState.load(sessionId);
    return playerData?.gold ?? 0;
  }

  async _deductGold(sessionId, cost) {
    const playerData = await this.playerState.load(sessionId);
    const gold = (playerData?.gold ?? 0) - cost;
    await this.playerState.save(sessionId, { gold });
    return gold;
  }

  async _effectiveSocketState(sessionId, placeId, socketIndex) {
    const field = `${placeId}:${socketIndex}`;
    const place = placesData[placeId];
    const baseSocket = place?.sockets?.[socketIndex];
    if (!place || !baseSocket) return null;

    const [buildings, sockets] = await Promise.all([
      this.buildingsState.loadAll(sessionId),
      this.socketsState.loadAll(sessionId),
    ]);

    const building = buildings[field];
    if (building) {
      return { placeId, socketIndex, status: "occupied", buildingId: building.id, level: building.level };
    }
    if (sockets[field]) {
      return { placeId, socketIndex, status: "empty" };
    }
    return {
      placeId,
      socketIndex,
      status: baseSocket.status,
      ...(baseSocket.buildingId ? { buildingId: baseSocket.buildingId } : {}),
      ...(baseSocket.level ? { level: baseSocket.level } : {}),
    };
  }

  async canBuySocket(sessionId, placeId, socketIndex) {
    const socket = await this._effectiveSocketState(sessionId, placeId, socketIndex);
    if (!socket) return { valid: false, error: "Invalid place or socket" };
    if (socket.status !== "locked") return { valid: false, error: "Socket is not locked" };
    const cost = placesData[placeId].socketCost || 100;
    const gold = await this._loadGold(sessionId);
    if (gold < cost) return { valid: false, error: `Not enough gold. Need ${cost}g` };
    return { valid: true, cost };
  }

  async buySocket(sessionId, placeId, socketIndex) {
    const validation = await this.canBuySocket(sessionId, placeId, socketIndex);
    if (!validation.valid) return { error: validation.error };
    const gold = await this._deductGold(sessionId, validation.cost);
    await this.socketsState.save(sessionId, `${placeId}:${socketIndex}`, { status: "empty" });
    return { gold, socket: { placeId, socketIndex, status: "empty" } };
  }

  async canBuild(sessionId, placeId, socketIndex, buildingId) {
    const socket = await this._effectiveSocketState(sessionId, placeId, socketIndex);
    if (!socket) return { valid: false, error: "Invalid place or socket" };
    if (socket.status !== "empty") return { valid: false, error: "Socket is not empty" };
    const building = buildingsData[buildingId];
    if (!building) return { valid: false, error: "Invalid building type" };
    const gold = await this._loadGold(sessionId);
    if (gold < building.buildCost) return { valid: false, error: `Not enough gold. Need ${building.buildCost}g` };
    return { valid: true, cost: building.buildCost };
  }

  async build(sessionId, placeId, socketIndex, buildingId) {
    const validation = await this.canBuild(sessionId, placeId, socketIndex, buildingId);
    if (!validation.valid) return { error: validation.error };
    const gold = await this._deductGold(sessionId, validation.cost);
    const building = { id: buildingId, level: 1, placeId, socketIndex };
    await this.buildingsState.save(sessionId, `${placeId}:${socketIndex}`, building);
    return { gold, socket: { placeId, socketIndex, status: "occupied", buildingId, level: 1 } };
  }

  async canUpgrade(sessionId, placeId, socketIndex) {
    const socket = await this._effectiveSocketState(sessionId, placeId, socketIndex);
    if (!socket) return { valid: false, error: "Invalid place or socket" };
    if (socket.status !== "occupied") return { valid: false, error: "Socket is not occupied" };
    const building = buildingsData[socket.buildingId];
    if (!building?.upgrades) return { valid: false, error: "This building cannot be upgraded" };
    const nextLevel = (socket.level || 1) + 1;
    const upgrade = building.upgrades[`level${nextLevel}`];
    if (!upgrade) return { valid: false, error: "No more upgrades available" };
    const gold = await this._loadGold(sessionId);
    if (gold < upgrade.cost) return { valid: false, error: `Not enough gold. Need ${upgrade.cost}g` };
    return { valid: true, cost: upgrade.cost, nextLevel };
  }

  async upgrade(sessionId, placeId, socketIndex) {
    const validation = await this.canUpgrade(sessionId, placeId, socketIndex);
    if (!validation.valid) return { error: validation.error };
    const socket = await this._effectiveSocketState(sessionId, placeId, socketIndex);
    const newLevel = validation.nextLevel;
    const gold = await this._deductGold(sessionId, validation.cost);
    const building = { id: socket.buildingId, level: newLevel, placeId, socketIndex };
    await this.buildingsState.save(sessionId, `${placeId}:${socketIndex}`, building);
    return { gold, socket: { placeId, socketIndex, status: "occupied", buildingId: socket.buildingId, level: newLevel } };
  }

  async canDemolish(sessionId, placeId, socketIndex) {
    const socket = await this._effectiveSocketState(sessionId, placeId, socketIndex);
    if (!socket) return { valid: false, error: "Invalid place or socket" };
    if (socket.status !== "occupied") return { valid: false, error: "Socket is not occupied" };
    return { valid: true };
  }

  async demolish(sessionId, placeId, socketIndex) {
    const validation = await this.canDemolish(sessionId, placeId, socketIndex);
    if (!validation.valid) return { error: validation.error };
    await this.buildingsState.delete(sessionId, `${placeId}:${socketIndex}`);
    await this.socketsState.save(sessionId, `${placeId}:${socketIndex}`, { status: "empty" });
    await this.productionService.cleanupSocket(sessionId, placeId, socketIndex);
    return { socket: { placeId, socketIndex, status: "empty" } };
  }
}
