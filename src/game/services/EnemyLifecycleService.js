// Enemy Lifecycle Service - handles enemy death detection and event emission
export const EnemyLifecycleService = {
  // Track enemy state for death detection
  trackEnemyDeaths(state) {
    const currentEnemyState = state.enemies?.byId || {};
    const lastEnemyState = this.lastEnemyState || {};
    
    // Find enemies that died (no longer in current state)
    Object.keys(lastEnemyState).forEach(id => {
      if (!currentEnemyState[id]) {
        const enemy = lastEnemyState[id];
        const placeId = enemy.placeId;
        
        Logger.log(`Enemy ${id} died at place ${placeId}`, 0, 'lifecycle');
        
        // Emit death event
        if (this.eventBusService && this.eventBusService.emit) {
          this.eventBusService.emit(`enemyDead:${placeId}`, { placeId, enemy });
        }
      }
    });
    
    // Update tracked state
    this.lastEnemyState = currentEnemyState;
  },

  // Initialize last enemy state
  initialize(state) {
    this.lastEnemyState = state.enemies.byId;
  },

  // Subscribe to enemy state changes
  subscribeToEnemyChanges(state) {
    return state.subscribe(() => {
      this.trackEnemyDeaths(state);
    });
  }
};

export default EnemyLifecycleService;