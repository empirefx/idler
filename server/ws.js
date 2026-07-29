import { WebSocketServer } from "ws";
import {
	GameMessage,
	JoinRequest,
	JoinResponse,
	InventoryAction,
	InventoryDiff,
	ErrorResponse,
} from "../proto/game.mjs";

export function startWebSocketServer({ server, sessionManager, inventoryHandler, logger }) {
	const wss = new WebSocketServer({ noServer: true });
	const clients = new Map();

	server.on("upgrade", (request, socket, head) => {
		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit("connection", ws, request);
		});
	});

	function send(ws, type, payload) {
		const data = GameMessage.encode({ type, data: payload }).finish();
		ws.send(data);
	}

	wss.on("connection", (ws) => {
		let currentNickname = null;

		ws.on("message", async (raw) => {
			try {
				const decoded = GameMessage.decode(new Uint8Array(raw));
				switch (decoded.type) {
					case "JOIN": {
						const joinReq = JoinRequest.decode(decoded.data);
						const result = await sessionManager.createSession(joinReq.nickname);
						if (result.accepted) {
							currentNickname = joinReq.nickname;
							clients.set(currentNickname, ws);
						}
						const resp = JoinResponse.encode({
							sessionId: result.session_id || "",
							accepted: result.accepted,
							error: result.error || "",
						}).finish();
						send(ws, "JOIN_RESPONSE", resp);
						logger.log(`JOIN: ${joinReq.nickname} accepted=${result.accepted}`, "WS");
						break;
					}
					case "INVENTORY_ACTION": {
						if (!currentNickname) {
							const err = ErrorResponse.encode({
								code: "NOT_JOINED",
								message: "Must join first",
							}).finish();
							send(ws, "ERROR", err);
							return;
						}
						const action = InventoryAction.decode(decoded.data);
						const result = await inventoryHandler.handleAction(currentNickname, action);
						if (result.success) {
							const diff = InventoryDiff.encode({
								inventoryId: action.actionType || "",
								action: result.diff.action || "",
							}).finish();
							send(ws, "INVENTORY_DIFF", diff);
						} else {
							const err = ErrorResponse.encode({
								code: result.error || "UNKNOWN",
								message: result.error || "Unknown error",
								originalAction: "INVENTORY_ACTION",
							}).finish();
							send(ws, "ERROR", err);
						}
						break;
					}
					default:
						logger.warn(`Unknown message type: ${decoded.type}`);
				}
			} catch (err) {
				logger.error(`Message handling error: ${err.message}`);
				const errPayload = ErrorResponse.encode({
					code: "PARSE_ERROR",
					message: err.message,
				}).finish();
				send(ws, "ERROR", errPayload);
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
