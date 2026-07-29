import { WebSocketServer } from "ws";

export function startWebSocketServer({ server, sessionManager, inventoryHandler, logger }) {
	const wss = new WebSocketServer({ noServer: true });
	const clients = new Map();

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
							await inventoryHandler.initializePlayerInventory(currentSessionId);
							send(ws, { type: "ACCEPTED", sessionId: currentSessionId });
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
							send(ws, { type: "ACCEPTED", sessionId: currentSessionId });
							logger.log(`RESUME: ${msg.nickname} session restored`, "WS");
						} else {
							send(ws, { type: "ERROR", message: "Session expired" });
							logger.log(`RESUME: ${msg.nickname} session not found`, "WS");
						}
						break;
					}
					case "INVENTORY_ACTION": {
						if (!currentSessionId) {
							send(ws, { type: "ERROR", message: "Must join first" });
							return;
						}
						const action = JSON.parse(msg.data);
						const result = await inventoryHandler.handleAction(currentSessionId, action);
						if (result.success) {
							send(ws, { type: "INVENTORY_DIFF", data: JSON.stringify(result.diff) });
						} else {
							send(ws, { type: "ERROR", message: result.error });
						}
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
