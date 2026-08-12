// server/ws.js
import { WebSocketServer } from "ws";
import { encode, decode } from "../shared/protocol.js";
import { messageRegistry } from "./messages/registry.js";

export function startWebSocketServer({ server, sessionManager, combatService, productionService, craftingService, buildingService, workerService, questService, skillsService, spawnService, navigationService, inventoryHandler, playerState, inventoryState, broadcaster, logger }) {
  const wss = new WebSocketServer({ noServer: true });
  const clients = new Map();

  // Wire up broadcaster to send only to the owning session's client(s)
  broadcaster.setSendFn((sessionId, payload) => {
    for (const ws of clients.values()) {
      if (ws.readyState === 1 && ws.sessionId === sessionId) ws.send(payload);
    }
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  function send(ws, type, payload) {
    if (ws.readyState !== 1) return;
    ws.send(encode(type, payload));
  }

  wss.on("connection", (ws) => {
    const connection = { nickname: null, sessionId: null };
    const ctx = {
      ws,
      connection,
      send,
      clients,
      logger,
      broadcaster,
      sessionManager,
      playerState,
      inventoryState,
      combatService,
      productionService,
      craftingService,
      buildingService,
      workerService,
      questService,
      skillsService,
      spawnService,
      navigationService,
      inventoryHandler,
      get sessionId() {
        return connection.sessionId;
      },
    };

    ws.on("message", async (raw) => {
      try {
        const { type, data } = decode(raw);
        const msg = { ...data, type };
        const handler = messageRegistry.get(msg.type);
        if (!handler) {
          logger.warn(`Unknown message type: ${msg.type}`);
          return;
        }
        await handler(ctx, msg);
      } catch (err) {
        logger.error(`Message handling error: ${err.message}`);
        send(ws, "ERROR", { message: err.message });
      }
    });

    ws.on("close", async () => {
      if (connection.nickname) {
        clients.delete(connection.nickname);
        await sessionManager.disconnectSession(connection.nickname);
        await productionService.pauseAll(connection.sessionId);
        logger.log(`DISCONNECT: ${connection.nickname}`, "WS");
      }
    });
  });

  return wss;
}
