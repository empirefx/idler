// Mock EventBusService for testing
export const createMockEventBus = () => {
  const events = new Map();
  
  return {
    on: vi.fn((event, callback) => {
      if (!events.has(event)) {
        events.set(event, []);
      }
      events.get(event).push(callback);
    }),
    emit: vi.fn((event, data) => {
      const callbacks = events.get(event) || [];
      callbacks.forEach(callback => callback(data));
    }),
    off: vi.fn((event, callback) => {
      const callbacks = events.get(event) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }),
    once: vi.fn((event, callback) => {
      const onceCallback = (data) => {
        callback(data);
        // Remove after first call
        const callbacks = events.get(event) || [];
        const index = callbacks.indexOf(onceCallback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      };
      
      if (!events.has(event)) {
        events.set(event, []);
      }
      events.get(event).push(onceCallback);
    }),
    // Helper for testing
    _getEventCount: (event) => (events.get(event) || []).length,
    _clearAllEvents: () => events.clear()
  };
};