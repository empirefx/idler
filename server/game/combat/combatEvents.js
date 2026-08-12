// server/game/combat/combatEvents.js
export function createCombatEventBus() {
  const handlers = new Map();

  function on(event, handler) {
    const list = handlers.get(event) || [];
    list.push(handler);
    handlers.set(event, list);
    return () => off(event, handler);
  }

  function off(event, handler) {
    const list = handlers.get(event) || [];
    handlers.set(event, list.filter((h) => h !== handler));
  }

  async function emit(event, payload) {
    for (const handler of handlers.get(event) || []) {
      await handler(payload);
    }
  }

  return { on, off, emit };
}
