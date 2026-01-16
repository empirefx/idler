import Logger from '../utils/Logger';

class GameLoop {
  constructor() {
    this.isRunning = false;
    this.lastFrameTime = 0;
    this.frameInterval = null;
    
    // Registered systems with their configurations
    this.systems = new Map();
    
    // Performance tracking
    this.frameCount = 0;
    this.lastFpsUpdate = 0;
    this.fps = 0;
  }

  /**
   * Register a system to be updated on each tick
   * @param {string} name - Unique system identifier
   * @param {Function} updateFn - Update function called with deltaTime
   * @param {Object} options - Configuration options
   * @param {number} options.priority - Execution priority (lower numbers run first)
   * @param {number} options.interval - Minimum update interval in ms (default: 16 ~60fps)
   */
  register(name, updateFn, options = {}) {
    const config = {
      updateFn,
      priority: options.priority || 0,
      interval: options.interval || 16,
      lastUpdate: 0,
      enabled: true
    };

    this.systems.set(name, config);
    Logger.log(`GameLoop: Registered system: ${name} (priority: ${config.priority}, interval: ${config.interval}ms)`, 2, 'game-loop');
  }

  /**
   * Unregister a system from the game loop
   * @param {string} name - System identifier
   */
  unregister(name) {
    const removed = this.systems.delete(name);
    if (removed) {
      Logger.log(`GameLoop: Unregistered system: ${name}`, 2, 'game-loop');
    }
    return removed;
  }

  /**
   * Enable/disable a system without unregistering
   * @param {string} name - System identifier
   * @param {boolean} enabled - Whether the system should be updated
   */
  setEnabled(name, enabled) {
    const system = this.systems.get(name);
    if (system) {
      system.enabled = enabled;
      Logger.log(`GameLoop: ${enabled ? 'Enabled' : 'Disabled'} system: ${name}`, 2, 'game-loop');
    }
  }

  /**
   * Start the game loop
   */
  start() {
    if (this.isRunning) {
      Logger.log('GameLoop: GameLoop is already running', 1, 'game-loop');
      return;
    }

    this.isRunning = true;
    this.lastFrameTime = performance.now();
    this.lastFpsUpdate = this.lastFrameTime;
    this.frameCount = 0;

    // Use requestAnimationFrame for smooth rendering with fallback to setInterval
    if (typeof requestAnimationFrame !== 'undefined') {
      this.frameInterval = requestAnimationFrame((timestamp) => this._tick(timestamp));
    } else {
      this.frameInterval = setInterval(() => this._tick(performance.now()), 16);
    }

    Logger.log('GameLoop: GameLoop started', 0, 'game-loop');
  }

  /**
   * Stop the game loop
   */
  stop() {
    if (!this.isRunning) {
      Logger.log('GameLoop: GameLoop is not running', 1, 'game-loop');
      return;
    }

    this.isRunning = false;

    if (this.frameInterval) {
      if (typeof requestAnimationFrame !== 'undefined') {
        cancelAnimationFrame(this.frameInterval);
      } else {
        clearInterval(this.frameInterval);
      }
      this.frameInterval = null;
    }

    Logger.log('GameLoop: GameLoop stopped', 0, 'game-loop');
  }

  /**
   * Pause the game loop (keeps running but skips updates)
   */
  pause() {
    this.setEnabled('*', false);
    Logger.log('GameLoop: GameLoop paused', 0, 'game-loop');
  }

  /**
   * Resume the game loop
   */
  resume() {
    this.setEnabled('*', true);
    this.lastFrameTime = performance.now(); // Reset time to avoid large delta
    Logger.log('GameLoop: GameLoop resumed', 0, 'game-loop');
  }

  /**
   * Main tick function - called every frame
   * @private
   */
  _tick(currentTime) {
    if (!this.isRunning) return;

    // Calculate delta time in seconds
    const deltaTime = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    // Update FPS counter
    this._updateFps(currentTime);

    // Sort systems by priority each frame (could be optimized for static priorities)
    const sortedSystems = Array.from(this.systems.entries())
      .filter(([name, system]) => system.enabled || name === '*')
      .sort(([, a], [, b]) => a.priority - b.priority);

    // Update all systems based on their intervals
    for (const [name, system] of sortedSystems) {
      if (name === '*') continue; // Skip wildcard
      
      // Check if enough time has passed for this system's interval
      if (currentTime - system.lastUpdate >= system.interval) {
        try {
          system.updateFn(deltaTime, currentTime);
          system.lastUpdate = currentTime;
        } catch (error) {
          Logger.error(`GameLoop: Error in system ${name}:`, 1, 'game-loop', error);
        }
      }
    }

    // Schedule next frame
    if (this.isRunning) {
      if (typeof requestAnimationFrame !== 'undefined') {
        this.frameInterval = requestAnimationFrame((timestamp) => this._tick(timestamp));
      }
    }
  }

  /**
   * Update FPS counter
   * @private
   */
  _updateFps(currentTime) {
    this.frameCount++;
    
    if (currentTime - this.lastFpsUpdate >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = currentTime;
    }
  }

  /**
   * Get current FPS
   */
  getFps() {
    return this.fps;
  }

  /**
   * Get performance statistics
   */
  getStats() {
    return {
      fps: this.fps,
      isRunning: this.isRunning,
      registeredSystems: this.systems.size,
      systemNames: Array.from(this.systems.keys())
    };
  }

  /**
   * Check if the game loop is running
   */
  isActive() {
    return this.isRunning;
  }

  /**
   * Get system status
   * @param {string} name - System identifier
   */
  getSystemStatus(name) {
    const system = this.systems.get(name);
    return system ? {
      enabled: system.enabled,
      priority: system.priority,
      interval: system.interval,
      lastUpdate: system.lastUpdate
    } : null;
  }
}

export default GameLoop;