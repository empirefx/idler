export function createBroadcaster(sendFn) {
  return {
    broadcast(event, data) {
      sendFn(JSON.stringify({ type: event, data }));
    },
  };
}
