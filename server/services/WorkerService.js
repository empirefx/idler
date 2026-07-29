// server/services/WorkerService.js
export class WorkerService {
  constructor(redis, workersState, broadcaster) {
    this.redis = redis;
    this.workersState = workersState;
    this.broadcaster = broadcaster;
  }

  async hire(sessionId) {
    const workers = await this.workersState.load(sessionId) || { hired: [], available: [] };
    if (workers.available.length === 0) return { error: "No workers available" };
    const worker = workers.available.pop();
    workers.hired.push(worker);
    await this.workersState.save(sessionId, workers);
    this.broadcaster.broadcast("DIFF", { path: "workers", data: workers });
    return { success: true, worker };
  }
}
