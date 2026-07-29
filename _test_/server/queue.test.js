import { describe, it, expect, vi } from "vitest";

const { mockQueue } = vi.hoisted(() => ({
  mockQueue: vi.fn(),
}));

vi.mock("bullmq", () => ({
  Queue: mockQueue,
}));

import { createQueues } from "../../server/queue.js";

describe("createQueues", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("creates four queues with default connection", () => {
    const queues = createQueues();

    expect(queues).toHaveProperty("productionQueue");
    expect(queues).toHaveProperty("enemyAttackQueue");
    expect(queues).toHaveProperty("spawnQueue");
    expect(queues).toHaveProperty("sessionCleanupQueue");

    expect(mockQueue).toHaveBeenCalledWith("production", { connection: { host: "127.0.0.1", port: 6379 } });
    expect(mockQueue).toHaveBeenCalledWith("enemy-attacks", { connection: { host: "127.0.0.1", port: 6379 } });
    expect(mockQueue).toHaveBeenCalledWith("enemy-spawn", { connection: { host: "127.0.0.1", port: 6379 } });
    expect(mockQueue).toHaveBeenCalledWith("session-cleanup", { connection: { host: "127.0.0.1", port: 6379 } });
  });

  it("creates queues with custom redisOpts", () => {
    const customOpts = { host: "10.0.0.1", port: 6380 };
    createQueues(customOpts);

    expect(mockQueue).toHaveBeenCalledWith("production", { connection: customOpts });
  });
});
