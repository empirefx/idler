export function createBroadcaster() {
  let sendFn = () => {};
  return {
    setSendFn(fn) { sendFn = fn; },
    broadcast(event, data) {
      sendFn(JSON.stringify({ type: event, data }));
    },
  };
}
