import {
  WORKER_BASE_COST,
  WORKER_COST_MULTIPLIER,
  WORKER_REROLL_COST,
  WORKER_SLOT_COST,
  WORKER_FIRE_COST,
  MAX_WORKER_SLOTS,
  DEFAULT_WORKER_SLOTS,
} from "../../shared/constants.js";
import { workerNames } from "../../shared/data/workerNames.js";

function generateWorkers(count) {
  const pool = [...workerNames.male, ...workerNames.female];
  const result = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const name = pool[Math.floor(Math.random() * pool.length)];
    const gender = workerNames.male.includes(name) ? "male" : "female";
    result.push({
      id: `worker-${Date.now()}-${i}`,
      firstName: name,
      name,
      gender,
      avatar: gender === "male" ? "worker_m.jpg" : "worker_f.jpg",
      assignment: null,
    });
  }
  return result;
}

export class WorkerService {
  constructor(redis, workersState, playerState, broadcaster, productionService) {
    this.redis = redis;
    this.workersState = workersState;
    this.playerState = playerState;
    this.broadcaster = broadcaster;
    this.productionService = productionService;
  }

  async hire(sessionId, workerId) {
    const raw = await this.workersState.load(sessionId);
    const workers = raw || { hired: [], available: [], workerSlots: DEFAULT_WORKER_SLOTS };
    if (workers.hired.length >= workers.workerSlots) {
      return { error: "No available worker slots" };
    }
    const playerData = await this.playerState.load(sessionId);
    if (!playerData) return { error: "Player not found" };
    const cost = WORKER_BASE_COST + workers.hired.length * WORKER_COST_MULTIPLIER;
    if (playerData.gold < cost) {
      return { error: "Not enough gold" };
    }
    const idx = workers.available.findIndex((w) => w.id === workerId);
    if (idx === -1) return { error: "Worker not available" };
    const [worker] = workers.available.splice(idx, 1);
    workers.hired.push({ ...worker, assignment: null });
    playerData.gold -= cost;
    await this.workersState.save(sessionId, workers);
    await this.playerState.save(sessionId, { gold: playerData.gold });
    return { workers, gold: playerData.gold };
  }

  async fire(sessionId, workerId) {
    const playerData = await this.playerState.load(sessionId);
    if (!playerData) return { error: "Player not found" };
    if (playerData.gold < WORKER_FIRE_COST) {
      return { error: "Not enough gold" };
    }
    const raw = await this.workersState.load(sessionId);
    const workers = raw || { hired: [], available: [], workerSlots: DEFAULT_WORKER_SLOTS };
    const idx = workers.hired.findIndex((w) => w.id === workerId);
    if (idx === -1) return { error: "Worker not found" };
    const [worker] = workers.hired.splice(idx, 1);
    if (worker.assignment) {
      await this.productionService.cleanupWorkerAssignment(sessionId, workerId);
    }
    playerData.gold -= WORKER_FIRE_COST;
    await this.workersState.save(sessionId, workers);
    await this.playerState.save(sessionId, { gold: playerData.gold });
    return { workers, gold: playerData.gold };
  }

  async reroll(sessionId) {
    const playerData = await this.playerState.load(sessionId);
    if (!playerData) return { error: "Player not found" };
    if (playerData.gold < WORKER_REROLL_COST) {
      return { error: "Not enough gold" };
    }
    const raw = await this.workersState.load(sessionId);
    const workers = raw || { hired: [], available: [], workerSlots: DEFAULT_WORKER_SLOTS };
    workers.available = generateWorkers(3);
    playerData.gold -= WORKER_REROLL_COST;
    await this.workersState.save(sessionId, workers);
    await this.playerState.save(sessionId, { gold: playerData.gold });
    return { workers, gold: playerData.gold };
  }

  async buySlot(sessionId) {
    const playerData = await this.playerState.load(sessionId);
    if (!playerData) return { error: "Player not found" };
    if (playerData.gold < WORKER_SLOT_COST) {
      return { error: "Not enough gold" };
    }
    const raw = await this.workersState.load(sessionId);
    const workers = raw || { hired: [], available: [], workerSlots: DEFAULT_WORKER_SLOTS };
    if (workers.workerSlots >= MAX_WORKER_SLOTS) {
      return { error: "Maximum slots reached" };
    }
    workers.workerSlots += 1;
    playerData.gold -= WORKER_SLOT_COST;
    await this.workersState.save(sessionId, workers);
    await this.playerState.save(sessionId, { gold: playerData.gold });
    return { workers, gold: playerData.gold };
  }
}
