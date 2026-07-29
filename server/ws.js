import { WebSocketServer } from "ws";

export function startWebSocketServer({ server, sessionManager, combatService, productionService, craftingService, buildingService, workerService, questService, skillsService, spawnService, navigationService, broadcaster, logger }) {
  const wss = new WebSocketServer({ noServer: true });
  const clients = new Map();

  // Wire up broadcaster to send to all connected clients
  broadcaster.setSendFn((payload) => {
    for (const ws of clients.values()) {
      if (ws.readyState === 1) ws.send(payload);
    }
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  function send(ws, payload) {
    if (ws.readyState !== 1) return;
    ws.send(JSON.stringify(payload));
  }

  wss.on("connection", (ws) => {
    let currentNickname = null;
    let currentSessionId = null;

    ws.on("message", async (raw) => {
      try {
        const msg = JSON.parse(raw.toString());
        switch (msg.type) {
          case "JOIN": {
            const result = await sessionManager.createSession(msg.nickname);
            if (result.accepted) {
              currentNickname = msg.nickname;
              currentSessionId = result.session_id;
              clients.set(msg.nickname, ws);
              await sessionManager.initializeFullState(currentSessionId);
              const fullState = await sessionManager.loadFullState(currentSessionId);
              send(ws, { type: "STATE_SYNC", data: { sessionId: currentSessionId, ...fullState } });
            } else {
              send(ws, { type: "ERROR", message: result.error === "NICKNAME_TAKEN" ? "Nickname already taken" : "Join failed" });
            }
            logger.log(`JOIN: ${msg.nickname} accepted=${result.accepted}`, "WS");
            break;
          }
          case "RESUME": {
            const session = await sessionManager.getSession(msg.nickname);
            if (session && session.sessionId === msg.sessionId) {
              currentNickname = msg.nickname;
              currentSessionId = msg.sessionId;
              clients.set(msg.nickname, ws);
              await sessionManager.renewSession(msg.nickname);
              const fullState = await sessionManager.loadFullState(currentSessionId);
              send(ws, { type: "STATE_SYNC", data: { sessionId: currentSessionId, ...fullState } });
              logger.log(`RESUME: ${msg.nickname} session restored`, "WS");
            } else {
              send(ws, { type: "ERROR", message: "Session expired" });
              logger.log(`RESUME: ${msg.nickname} session not found`, "WS");
            }
            break;
          }
          case "PLAYER_ATTACK": {
            const result = await combatService.handlePlayerAttack(currentSessionId, msg.enemyId);
            if (result.error) {
              send(ws, { type: "ERROR", data: { message: result.error } });
            } else {
              send(ws, { type: "COMBAT_DIFF", data: result });
            }
            break;
          }
          case "NAVIGATE": {
            const result = await navigationService.navigate(currentSessionId, msg.placeId);
            send(ws, { type: "DIFF", data: { path: "player.currentPlaceId", value: msg.placeId } });
            await spawnService.triggerSpawn(currentSessionId, msg.placeId);
            break;
          }
          case "BUILD": {
            const result = await buildingService.build(currentSessionId, msg.placeId, msg.socketIndex, msg.buildingId);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          case "ASSIGN_WORKER": {
            const result = await productionService.assignWorker(currentSessionId, msg.placeId, msg.socketIndex, msg.worker, msg.building);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          case "UNASSIGN_WORKER": {
            const result = await productionService.unassignWorker(currentSessionId, msg.placeId, msg.socketIndex);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          case "CRAFT": {
            const result = await craftingService.craft(currentSessionId, msg.recipeId);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          case "HIRE_WORKER": {
            const result = await workerService.hire(currentSessionId);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          case "ACCEPT_QUEST": {
            const result = await questService.accept(currentSessionId, msg.questId);
            send(ws, { type: "QUEST_UPDATE", data: result });
            break;
          }
          case "COMPLETE_QUEST": {
            const result = await questService.complete(currentSessionId, msg.questId);
            send(ws, { type: "QUEST_UPDATE", data: result });
            break;
          }
          case "ACTIVATE_SKILL": {
            const result = await skillsService.activateSkill(currentSessionId, msg.skillId);
            send(ws, { type: "DIFF", data: result });
            break;
          }
          default:
            logger.warn(`Unknown message type: ${msg.type}`);
        }
      } catch (err) {
        logger.error(`Message handling error: ${err.message}`);
        send(ws, { type: "ERROR", message: err.message });
      }
    });

    ws.on("close", async () => {
      if (currentNickname) {
        clients.delete(currentNickname);
        await sessionManager.disconnectSession(currentNickname);
        logger.log(`DISCONNECT: ${currentNickname}`, "WS");
      }
    });
  });

  return wss;
}
