export class GameClient {
  constructor(dispatch, getState) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.ws = null;
    this.sessionId = null;
    this.nickname = null;
  }

  connect(nickname) {
    this.nickname = nickname;
    this.ws = new WebSocket(`ws://${location.hostname}:3001`);

    this.ws.onopen = () => {
      this.send("JOIN", { nickname });
    };

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      this._handleMessage(msg);
    };

    this.ws.onclose = () => {
      console.log("Disconnected");
    };
  }

  send(type, payload) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, ...payload }));
    }
  }

  _handleMessage(msg) {
    switch (msg.type) {
      case "STATE_SYNC":
        this.sessionId = msg.data.sessionId;
        this.dispatch({ type: "STATE_SYNC", payload: msg.data });
        break;

      case "DIFF":
        this.dispatch({ type: "APPLY_DIFF", payload: msg.data });
        break;

      case "COMBAT_DIFF":
        this.dispatch({ type: "APPLY_COMBAT_DIFF", payload: msg.data });
        break;

      case "ENEMY_ATTACK":
        this.dispatch({ type: "APPLY_ENEMY_ATTACK", payload: msg.data });
        break;

      case "PRODUCTION_TICK":
        this.dispatch({ type: "ADD_ITEM_TO_INVENTORY", payload: msg.data.item });
        break;

      case "ENEMY_SPAWN":
        this.dispatch({ type: "BATCH_ADD_ENEMIES", payload: msg.data.enemies });
        break;

      case "QUEST_UPDATE":
        this.dispatch({ type: "UPDATE_QUEST", payload: msg.data });
        break;

      case "ERROR":
        console.error("Server error:", msg.data?.message);
        this.dispatch({ type: "ADD_NOTIFICATION", payload: { message: msg.data?.message, type: "error" } });
        break;
    }
  }

  sendCommand(type, data = {}) {
    this.send(type, data);
  }

  disconnect() {
    this.ws?.close();
  }
}
