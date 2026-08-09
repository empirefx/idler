import { encode } from "../shared/protocol.js";

export function createBroadcaster() {
  let sendFn = () => {};
  return {
    setSendFn(fn) { sendFn = fn; },
    broadcast(sessionId, event, data) {
      sendFn(sessionId, encode(event, data));
    },
  };
}
