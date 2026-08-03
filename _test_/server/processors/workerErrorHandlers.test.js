import { describe, it, expect, vi } from "vitest";

vi.mock("bullmq", () => {
  class FakeWorker {
    constructor(queueName, processor, opts) {
      this.queueName = queueName;
      this.processor = processor;
      this.opts = opts;
      this.handlers = {};
    }
    on(event, handler) {
      this.handlers[event] = handler;
      return this;
    }
    close() {
      return Promise.resolve();
    }
  }
  return { Worker: FakeWorker };
});

import { createProductionWorker } from "../../../server/processors/productionProcessor.js";
import { createEnemyAttackWorker } from "../../../server/processors/enemyAttackProcessor.js";
import { createPlayerAttackWorker } from "../../../server/processors/playerAttackProcessor.js";
import { createSpawnWorker } from "../../../server/processors/spawnProcessor.js";

const redisCfg = { host: "127.0.0.1", port: 6379 };

describe("BullMQ worker factories", () => {
  it("production worker registers an error listener", () => {
    const worker = createProductionWorker({ produce: async () => {} }, redisCfg);
    expect(typeof worker.handlers.error).toBe("function");
  });

  it("enemy-attack worker registers an error listener", () => {
    const combatService = {
      handleEnemyAttack: async () => ({}),
      enemyState: { load: async () => null },
    };
    const broadcaster = { broadcast: () => {} };
    const enemyAttackQueue = { add: async () => ({}) };
    const worker = createEnemyAttackWorker(combatService, broadcaster, enemyAttackQueue, redisCfg);
    expect(typeof worker.handlers.error).toBe("function");
  });

  it("player-attack worker registers an error listener", () => {
    const worker = createPlayerAttackWorker(
      { handleSkillActivationJob: async () => ({}), handlePlayerAttackJob: async () => ({}) },
      redisCfg,
    );
    expect(typeof worker.handlers.error).toBe("function");
  });

  it("enemy-spawn worker registers an error listener", () => {
    const worker = createSpawnWorker({ triggerSpawn: async () => true }, redisCfg);
    expect(typeof worker.handlers.error).toBe("function");
  });
});
