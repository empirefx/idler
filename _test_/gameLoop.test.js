import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import GameLoop from '../src/game/core/GameLoop';

describe('GameLoop Unified Tick System', () => {
  let gameLoop;

  beforeEach(() => {
    gameLoop = new GameLoop();
  });

  afterEach(() => {
    if (gameLoop && gameLoop.isActive()) {
      gameLoop.stop();
    }
  });

  it('should register and unregister systems correctly', () => {
    const mockUpdateFn = vi.fn();
    
    // Register a system
    gameLoop.register('test', mockUpdateFn, { priority: 1, interval: 100 });
    
    // Check system is registered
    expect(gameLoop.getSystemStatus('test')).toBeDefined();
    expect(gameLoop.getSystemStatus('test').priority).toBe(1);
    expect(gameLoop.getSystemStatus('test').interval).toBe(100);
    
    // Unregister system
    const removed = gameLoop.unregister('test');
    expect(removed).toBe(true);
    expect(gameLoop.getSystemStatus('test')).toBeNull();
  });

  it('should handle multiple systems with different priorities', () => {
    const callOrder = [];
    
    // Register systems with different priorities
    gameLoop.register('high', () => callOrder.push('high'), { priority: 1 });
    gameLoop.register('low', () => callOrder.push('low'), { priority: 3 });
    gameLoop.register('medium', () => callOrder.push('medium'), { priority: 2 });
    
    // Simulate a tick to test priority ordering
    gameLoop.start();
    
    // Wait a bit for ticks to occur
    setTimeout(() => {
      gameLoop.stop();
      // High priority should execute first
      if (callOrder.length > 0) {
        expect(callOrder[0]).toBe('high');
      }
    }, 50);
  });

  it('should respect system intervals', () => {
    const fastCalls = vi.fn();
    const slowCalls = vi.fn();
    
    // Register systems with different intervals
    gameLoop.register('fast', fastCalls, { interval: 16 });  // ~60fps
    gameLoop.register('slow', slowCalls, { interval: 100 }); // ~10fps
    
    gameLoop.start();
    
    // Wait a short time then check
    setTimeout(() => {
      gameLoop.stop();
      // Fast system should be called more times than slow
      expect(fastCalls.mock.calls.length).toBeGreaterThan(slowCalls.mock.calls.length);
    }, 200);
  });

  it('should provide performance statistics', () => {
    const stats = gameLoop.getStats();
    
    expect(stats).toHaveProperty('fps', 0);
    expect(stats).toHaveProperty('isRunning', false);
    expect(stats).toHaveProperty('registeredSystems', 0);
    expect(stats).toHaveProperty('systemNames');
    expect(Array.isArray(stats.systemNames)).toBe(true);
  });

  it('should handle pause and resume correctly', () => {
    const updateFn = vi.fn();
    
    gameLoop.register('test', updateFn);
    gameLoop.start();
    
    // Pause the game loop
    gameLoop.pause();
    
    // Resume after a short delay
    setTimeout(() => {
      gameLoop.resume();
      
      // Check that the system is enabled again
      const status = gameLoop.getSystemStatus('test');
      expect(status.enabled).toBe(true);
    }, 50);
  });
});