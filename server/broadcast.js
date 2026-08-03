export function createBroadcaster() {
  let sendFn = () => {};
  return {
    setSendFn(fn) { sendFn = fn; },
    broadcast(sessionId, event, data) {
      sendFn(sessionId, JSON.stringify({ type: event, data }));
    },
  };
}
