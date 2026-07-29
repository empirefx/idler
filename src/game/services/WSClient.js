export class WSClient {
	constructor(ws, sessionId) {
		this.ws = ws;
		this.sessionId = sessionId;
		this.diffHandlers = [];
		this.errorHandlers = [];
		this._setupListeners();
	}

	_setupListeners() {
		this.ws.onmessage = (event) => {
			try {
				const msg = JSON.parse(event.data);
				if (msg.type === "INVENTORY_DIFF" && msg.data) {
					const diff = JSON.parse(msg.data);
					this.diffHandlers.forEach((fn) => fn(diff));
				}
				if (msg.type === "ERROR" && msg.data) {
					const err = JSON.parse(msg.data);
					this.errorHandlers.forEach((fn) => fn(err));
				}
			} catch (err) {
				console.warn("[WSClient] parse error:", err);
			}
		};

		this.ws.onclose = () => {
			console.log("[WSClient] disconnected");
		};
	}

	sendAction(action) {
		if (this.ws.readyState !== WebSocket.OPEN) {
			console.warn("[WSClient] cannot send, not connected");
			return;
		}
		this.ws.send(JSON.stringify({ type: "INVENTORY_ACTION", data: JSON.stringify(action) }));
	}

	onDiff(handler) {
		this.diffHandlers.push(handler);
		return () => {
			this.diffHandlers = this.diffHandlers.filter((h) => h !== handler);
		};
	}

	onError(handler) {
		this.errorHandlers.push(handler);
		return () => {
			this.errorHandlers = this.errorHandlers.filter((h) => h !== handler);
		};
	}

	disconnect() {
		this.diffHandlers = [];
		this.errorHandlers = [];
		this.ws.close();
	}
}
