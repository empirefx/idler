// Mock GameLoop class for testing
export const createMockGameLoopConstructor = () => {
  return class MockGameLoop {
    constructor() {
      this.systems = new Map();
      this.isRunning = false;
    }

    register(name, callback, options = {}) {
      this.systems.set(name, {
        callback,
        priority: options.priority || 0,
        interval: options.interval || 0,
      });
    }

    unregister(name) {
      this.systems.delete(name);
    }

    start() {
      this.isRunning = true;
    }

    stop() {
      this.isRunning = false;
    }

    isActive() {
      return this.isRunning;
    }

    getSystems() {
      return Array.from(this.systems.entries());
    }

    isRunning() {
      return this.isRunning;
    }
  };
};

// For backward compatibility
export const createMockGameLoop = () => {
  const MockGameLoop = createMockGameLoopConstructor();
  return new MockGameLoop();
};
