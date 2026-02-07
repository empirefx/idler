// Enemy Lifecycle Service - handles enemy death detection and cleanup
import Logger from "../utils/Logger";

export const EnemyLifecycleService = {
	// Track enemy state for death detection
	trackEnemyDeaths(state) {
		const currentEnemyState = state.enemies?.byId || {};
		const lastEnemyState = this.lastEnemyState || {};

		// Find enemies that died (no longer in current state)
		Object.keys(lastEnemyState).forEach((id) => {
			if (!currentEnemyState[id]) {
				const enemy = lastEnemyState[id];
				const placeId = enemy.placeId;

				Logger.log(`Enemy ${id} died at place ${placeId}`, 0, "lifecycle");

				// Clean up staggered attack timers for dead enemies
				this.cleanupEnemyAttackTimers(enemy);

				// Respawn logic is handled by CombatService when ALL are dead
			}
		});

		// Update tracked state
		this.lastEnemyState = currentEnemyState;
	},

	cleanupEnemyAttackTimers(enemy) {
		if (enemy.attackPattern === "staggered") {
			Logger.log(
				`Cleaning up attack timers for dead enemy ${enemy.id}`,
				0,
				"lifecycle",
			);

			// Enemy is being removed from state, so no need to manually clean up timers
			// The Redux store will handle the cleanup when enemy is removed

			// However, we can emit an event for other systems that might need to know
			if (this.eventBusService?.emit) {
				this.eventBusService.emit("enemyAttackTimersCleanup", {
					enemyId: enemy.id,
				});
			}
		}
	},

	// Handle enemy death in combat context (additional cleanup)
	handleEnemyCombatDeath(enemy) {
		if (enemy?.attackPattern === "staggered") {
			Logger.log(
				`Handling combat death for staggered enemy ${enemy.id}`,
				0,
				"lifecycle",
			);

			// Any additional combat-specific cleanup can go here
			// For example, removing from attack queues, resetting combat state, etc.
		}
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
	},
};

export default EnemyLifecycleService;
