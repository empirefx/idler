// server/messages/handlers/session.js
import { PROTOCOL_VERSION } from "../../../shared/protocol.js";

export const sessionHandlers = [
  {
    type: "JOIN",
    async handler(ctx, msg) {
      const { ws, connection, send, clients, logger, sessionManager, playerState, spawnService, combatService, productionService, presenceService, broadcaster } = ctx;
      if (msg.protocolVersion !== PROTOCOL_VERSION) {
        send(ws, "ERROR", { code: "PROTOCOL_MISMATCH", message: "Protocol version not supported" });
        logger.log(`JOIN: ${msg.nickname} protocol mismatch`, "WS");
        return;
      }
      const result = await sessionManager.createSession(msg.nickname);
      if (result.accepted) {
        connection.nickname = msg.nickname;
        connection.sessionId = result.session_id;
        ws.sessionId = connection.sessionId;
        clients.set(msg.nickname, ws);
        await sessionManager.initializeFullState(connection.sessionId);
        const fullState = await sessionManager.loadFullState(connection.sessionId);
        send(ws, "STATE_SYNC", { sessionId: connection.sessionId, ...fullState });
        const player = await playerState.load(connection.sessionId);
        if (connection.closed) return;
        const placeId = player?.currentPlaceId || "village_center";
        presenceService.register(connection.sessionId, connection.nickname, placeId);
        await presenceService.broadcastPlace(placeId, broadcaster, playerState);
        if (player?.currentPlaceId) {
          await spawnService.resumeEnemyAttacks(connection.sessionId, player.currentPlaceId);
        }
        await combatService.computeAndBroadcastDerivedStats(connection.sessionId);
        await productionService.resumeAll(connection.sessionId);
      } else {
        send(ws, "ERROR", { message: result.error === "NICKNAME_TAKEN" ? "Nickname already taken" : "Join failed" });
      }
      logger.log(`JOIN: ${msg.nickname} accepted=${result.accepted}`, "WS");
    },
  },
  {
    type: "RESUME",
    async handler(ctx, msg) {
      const { ws, connection, send, clients, logger, sessionManager, playerState, spawnService, combatService, productionService, presenceService, broadcaster } = ctx;
      if (msg.protocolVersion !== PROTOCOL_VERSION) {
        send(ws, "ERROR", { code: "PROTOCOL_MISMATCH", message: "Protocol version not supported" });
        logger.log(`RESUME: ${msg.nickname} protocol mismatch`, "WS");
        return;
      }
      const session = await sessionManager.getSession(msg.nickname);
      if (session && session.sessionId === msg.sessionId) {
        connection.nickname = msg.nickname;
        connection.sessionId = msg.sessionId;
        ws.sessionId = connection.sessionId;
        clients.set(msg.nickname, ws);
        await sessionManager.renewSession(msg.nickname);
        const fullState = await sessionManager.loadFullState(connection.sessionId);
        send(ws, "STATE_SYNC", { sessionId: connection.sessionId, ...fullState });
        const player = await playerState.load(connection.sessionId);
        if (connection.closed) return;
        const placeId = player?.currentPlaceId || "village_center";
        presenceService.register(connection.sessionId, connection.nickname, placeId, { refresh: true });
        await presenceService.broadcastPlace(placeId, broadcaster, playerState);
        if (player?.currentPlaceId) {
          await spawnService.resumeEnemyAttacks(connection.sessionId, player.currentPlaceId);
        }
        if (player?.autoCombat) {
          await combatService.resumePlayerAttackLoop(connection.sessionId);
        }
        await combatService.computeAndBroadcastDerivedStats(connection.sessionId);
        await productionService.resumeAll(connection.sessionId);
        logger.log(`RESUME: ${msg.nickname} session restored`, "WS");
      } else {
        send(ws, "ERROR", { message: "Session expired" });
        logger.log(`RESUME: ${msg.nickname} session not found`, "WS");
      }
    },
  },
];
