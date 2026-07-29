import { WebSocketServer } from "ws";

export function startWebSocketServer({ server, sessionManager, inventoryHandler, logger }) {
	const wss = new WebSocketServer({ noServer: true });
	const clients = new Map();

	server.on("upgrade", (request, socket, head) => {
		wss.handleUpgrade(request, socket, head, (ws) => {
			wss.emit("connection", ws, request);
		});
	});

	function send(ws, type, data) {
		if (ws.readyState !== 1) return;
		ws.send(JSON.stringify({ type, data: JSON.stringify(data) }));
	}

	wss.on("connection", (ws) => {
		let currentNickname = null;

		ws.on("message", async (raw) => {
			try {
				const msg = JSON.parse(raw.toString());
				switch (msg.type) {
					case "JOIN": {
						const { nickname } = JSON.parse(msg.data);
						const result = await sessionManager.createSession(nickname);
						if (result.accepted) {
							currentNickname = nickname;
							clients.set(nickname, ws);
						}
						send(ws, "JOIN", result);
						logger.log(`JOIN: ${nickname} accepted=${result.accepted}`, "WS");
						break;
					}
					case "INVENTORY_ACTION": {
						if (!currentNickname) {
							send(ws, "ERROR", { code: "NOT_JOINED", message: "Must join first" });
							return;
						}
						const action = JSON.parse(msg.data);
						const result = await inventoryHandler.handleAction(currentNickname, action);
						if (result.success) {
							send(ws, "INVENTORY_DIFF", result.diff);
						} else {
							send(ws, "ERROR", { code: result.error, message: result.error });
						}
						break;
					}
					default:
						logger.warn(`Unknown message type: ${msg.type}`);
				}
			} catch (err) {
				logger.error(`Message handling error: ${err.message}`);
				send(ws, "ERROR", { code: "PARSE_ERROR", message: err.message });
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
