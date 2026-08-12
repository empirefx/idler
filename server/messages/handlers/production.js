// server/messages/handlers/production.js
const broadcastWorkers = (ctx, workers) => {
  ctx.broadcaster.broadcast(ctx.sessionId, "DIFF", { path: "players.workers", data: workers });
};

export const productionHandlers = [
  {
    type: "ASSIGN_WORKER",
    async handler(ctx, msg) {
      const { ws, sessionId, send, productionService } = ctx;
      const result = await productionService.assignWorker(sessionId, msg.placeId, msg.socketIndex, msg.workerId, msg.material);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        broadcastWorkers(ctx, result.workers);
      }
    },
  },
  {
    type: "UNASSIGN_WORKER",
    async handler(ctx, msg) {
      const { ws, sessionId, send, productionService } = ctx;
      const result = await productionService.unassignWorker(sessionId, msg.placeId, msg.socketIndex, msg.workerId);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        broadcastWorkers(ctx, result.workers);
      }
    },
  },
  {
    type: "FIRE_WORKER",
    async handler(ctx, msg) {
      const { ws, sessionId, send, workerService } = ctx;
      const result = await workerService.fire(sessionId, msg.workerId);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        broadcastWorkers(ctx, result.workers);
        ctx.broadcaster.broadcast(sessionId, "DIFF", { path: "player.gold", data: result.gold });
      }
    },
  },
  {
    type: "HIRE_WORKER",
    async handler(ctx, msg) {
      const { ws, sessionId, send, workerService } = ctx;
      const result = await workerService.hire(sessionId, msg.workerId);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        broadcastWorkers(ctx, result.workers);
        ctx.broadcaster.broadcast(sessionId, "DIFF", { path: "player.gold", data: result.gold });
      }
    },
  },
  {
    type: "REROLL_WORKERS",
    async handler(ctx, msg) {
      const { ws, sessionId, send, workerService } = ctx;
      const rerollResult = await workerService.reroll(sessionId);
      if (rerollResult.error) {
        send(ws, "ERROR", { message: rerollResult.error });
      } else {
        broadcastWorkers(ctx, rerollResult.workers);
        ctx.broadcaster.broadcast(sessionId, "DIFF", { path: "player.gold", data: rerollResult.gold });
      }
    },
  },
  {
    type: "BUY_WORKER_SLOT",
    async handler(ctx, msg) {
      const { ws, sessionId, send, workerService } = ctx;
      const slotResult = await workerService.buySlot(sessionId);
      if (slotResult.error) {
        send(ws, "ERROR", { message: slotResult.error });
      } else {
        broadcastWorkers(ctx, slotResult.workers);
        ctx.broadcaster.broadcast(sessionId, "DIFF", { path: "player.gold", data: slotResult.gold });
      }
    },
  },
];
