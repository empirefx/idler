// server/messages/handlers/building.js
const broadcastSocket = (ctx, result) => {
  ctx.broadcaster.broadcast(ctx.sessionId, "DIFF", { path: "player.gold", data: result.gold });
  ctx.broadcaster.broadcast(ctx.sessionId, "DIFF", { path: "sockets", data: result.socket });
};

export const buildingHandlers = [
  {
    type: "BUY_SOCKET",
    async handler(ctx, msg) {
      const { ws, sessionId, send, buildingService } = ctx;
      const result = await buildingService.buySocket(sessionId, msg.placeId, msg.socketIndex);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        broadcastSocket(ctx, result);
      }
    },
  },
  {
    type: "BUILD",
    async handler(ctx, msg) {
      const { ws, sessionId, send, buildingService } = ctx;
      const result = await buildingService.build(sessionId, msg.placeId, msg.socketIndex, msg.buildingId);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        broadcastSocket(ctx, result);
      }
    },
  },
  {
    type: "UPGRADE_BUILDING",
    async handler(ctx, msg) {
      const { ws, sessionId, send, buildingService } = ctx;
      const result = await buildingService.upgrade(sessionId, msg.placeId, msg.socketIndex);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        broadcastSocket(ctx, result);
      }
    },
  },
  {
    type: "DEMOLISH",
    async handler(ctx, msg) {
      const { ws, sessionId, send, buildingService } = ctx;
      const result = await buildingService.demolish(sessionId, msg.placeId, msg.socketIndex);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        ctx.broadcaster.broadcast(sessionId, "DIFF", { path: "sockets", data: result.socket });
      }
    },
  },
];
