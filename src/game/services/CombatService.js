// Combat Service - coordinates combat state with game loop
import Logger from "../utils/Logger";
import { batch } from "react-redux";
import { enemyAttacked, playerDamaged } from "../events";
import { addItem } from "../../store/slices/playerInventorySlice";
import { gainExp, updateLastAttackTime } from "../../store/slices/playerSlice";
import { createItem } from "../factory/itemFactory";

/**
 * CombatService coordinates combat state with game loop and handles combat mechanics.
 * Uses service pattern with singleton-like behavior for game coordination.
 */
export const CombatService = {
	// Initialize with store and eventBus
	initialize(store, eventBus) {
		this.store = store;
		this.eventBusService = eventBus;
		this.currentTargetId = null;
	},

	getOrSelectTarget(aliveEnemies) {
		const state = this.store.getState();
		const currentTargetId = state.combat.targetEnemyId;

		const currentTarget = aliveEnemies.find((e) => e.id === currentTargetId);

		if (currentTarget) return currentTarget; // keep lock

		if (aliveEnemies.length === 0) return null; // respawning

		const newTarget =
			aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
		this.store.dispatch({ type: "combat/setTarget", payload: newTarget.id });
		Logger.log(`New target has been set: ${newTarget.id}`, 0, "combat");
		return newTarget;
	},

	// Start combat when combat state changes to true
	handleCombatStateChange(wasInCombat, isInCombat, gameLoop) {
		// Ensure store is available before proceeding
		if (!this.store) {
			console.error("CombatService: store not initialized");
			return;
		}
		// Transition from not in combat to in combat
		if (!wasInCombat && isInCombat) {
			this.startCombat(gameLoop);
		}
		// Transition from in combat to not in combat
		else if (wasInCombat && !isInCombat) {
			this.stopCombat(gameLoop);
		}
	},

	// Start combat system with game loop
	startCombat(gameLoop) {
		Logger.log("Starting combat system", 0, "combat");
		if (!gameLoop || !gameLoop.register) {
			Logger.log(
				"GameLoop is not available or missing register method",
				0,
				"combat",
			);
			return;
		}
		Logger.log(
			"GameLoop is available, attempting to register combat system",
			0,
			"combat",
		);
		// Initialize store reference for better error messages
		const result = gameLoop.register(
			"combat",
			(deltaTime) => {
				// Get current game state from store subscription
				const state = this.store.getState();
				if (!state || !state.places) {
					return; // Skip update if state not ready
				}
				const currentPlaceId = state.places.currentPlaceId;

				// Get enemies at current place
				const currentEnemies = Object.values(state.enemies.byId).filter(
					(enemy) => enemy.placeId === currentPlaceId,
				);

				// Update countdowns for all enemies at current place
				currentEnemies.forEach((enemy) => {
					if (enemy.isCountdownActive && enemy.countdown > 0) {
						this.store.dispatch({
							type: "enemies/updateEnemyCountdown",
							payload: { id: enemy.id, deltaTime: deltaTime },
						});
					}
				});

				// Handle enemy attacks based on countdowns
				this.handleStaggeredAttacks(currentEnemies);

				// Player attacks with cooldown system
				this.handlePlayerAttack(currentEnemies);
			},
			{
				priority: 0, // Highest priority
				interval: 100, // Update every second to match deltaTime timing
			},
		);
		Logger.log("Combat registration result:", 0, "combat", result);
	},

	// Stop combat system with game loop
	stopCombat(gameLoop) {
		gameLoop.unregister("combat");
	},

	// Handle enemy drops on death
	handleEnemyDrops(enemy) {
		const currentPlaceId = this.store.getState().places.currentPlaceId;
		const place = this.store.getState().places[currentPlaceId];
		const spawnInfo = place.spawn;

		// Drop items on enemy death
		if (spawnInfo && Array.isArray(spawnInfo.drops)) {
			spawnInfo.drops.forEach(({ itemId, dropRate }) => {
				if (Math.random() < dropRate) {
					const loot = createItem(itemId, 1);
					if (loot) {
						this.store.dispatch(
							addItem({
								inventoryId: "player",
								item: loot,
							}),
						);
					}
				}
			});
		}
	},

	// Handle experience gain on enemy death
	handleEnemyExpGain(enemy) {
		// Grant experience for enemy kill (equal to enemy's max health)
		this.store.dispatch(gainExp({ amount: enemy.maxHealth }));
	},

	// Handle player attack with cooldown system
	handlePlayerAttack(enemies) {
		const aliveEnemies = enemies.filter((e) => e.health > 0);
		if (!aliveEnemies.length) return; // respawning

		const state = this.store.getState();
		const player = state.player;
		const now = Date.now();

		if (now - (player.lastAttackTime || 0) < (player.attackCooldown || 1000))
			return;

		// Locked target logic
		const targetEnemy = this.getOrSelectTarget(aliveEnemies);
		if (!targetEnemy) return;

		// Capture enemy snapshot BEFORE attacking (for death event and logging)
		const enemySnapshot = { ...targetEnemy };
		const damage = player.baseAttack || 10;

		// Update timestamp FIRST to prevent double attacks
		this.store.dispatch(updateLastAttackTime({ timestamp: now }));
		this.store.dispatch({
			type: "enemies/damageEnemy",
			payload: { id: targetEnemy.id, amount: damage },
		});
		// Dispatch single consolidated player attack log with pre-captured enemy name
		this.store.dispatch(
			playerDamaged(
				"player",
				"player",
				targetEnemy.id,
				damage,
				"dealt",
				enemySnapshot.name,
			),
		);

		// Check if enemy died and emit death event
		setTimeout(() => {
			const updated = this.store.getState().enemies.byId[targetEnemy.id];
			if (!updated) return;

			if (updated && updated.isDead) {
				// Enemy died, handle drops, exp, etc
				this.store.dispatch({ type: "combat/clearTarget" });
				this.handleEnemyDrops(enemySnapshot);
				this.handleEnemyExpGain(enemySnapshot);

				// Only CombatService emits enemyDead
				this.eventBusService.emit(`enemyDead:${enemySnapshot.placeId}`, {
					placeId: enemySnapshot.placeId,
					enemy: enemySnapshot,
				});

				// Check if all enemies in this place are dead and trigger cleanup
				this.checkAllEnemiesDead(enemySnapshot.placeId);
			}
		}, 50);
	},

	// Handle enemy attacks based on countdowns
	handleStaggeredAttacks(enemies) {
		// Get current combat state with safety checks
		const currentState = this.store?.getState();
		if (!currentState || !currentState.combat) {
			console.error("CombatService: store state or combat state not available");
			return;
		}
		const isInCombat = currentState.combat.isInCombat;

		// Filter enemies that have staggered attack pattern and are alive
		const staggeredEnemies = enemies.filter(
			(enemy) => enemy.attackPattern === "staggered" && enemy.health > 0,
		);

		// Check if we need to initialize countdowns for this place (synchronized start)
		const hasInactiveEnemies = staggeredEnemies.some(
			(enemy) => !enemy.isCountdownActive,
		);
		const hasUninitializedEnemies = staggeredEnemies.some(
			(enemy) => enemy.countdown === 0,
		);

		if (isInCombat && (hasInactiveEnemies || hasUninitializedEnemies)) {
			// Initialize each enemy with random delay
			staggeredEnemies.forEach((enemy) => {
				if (!enemy.isCountdownActive || enemy.countdown === 0) {
					// Get enemy's configured attack delay range from spawn initialization
					// These values were set by SpawnService when the enemy was created
					const [minDelay, maxDelay] = enemy.attackDelayRange || [1000, 4000];
					const randomDelay = this.randomBetween(minDelay, maxDelay);

					this.store.dispatch({
						type: "enemies/initializeCountdown",
						payload: { id: enemy.id, countdown: randomDelay },
					});
					this.store.dispatch({
						type: "enemies/setCountdownActive",
						payload: { id: enemy.id, isActive: true },
					});
				}
			});
			Logger.log(`Individual countdowns initialized for place`, 0, "combat");
		}

		// Deactivate countdowns when not in combat
		if (
			!isInCombat &&
			staggeredEnemies.some((enemy) => enemy.isCountdownActive)
		) {
			staggeredEnemies.forEach((enemy) => {
				this.store.dispatch({
					type: "enemies/setCountdownActive",
					payload: { id: enemy.id, isActive: false },
				});
				this.store.dispatch({
					type: "enemies/initializeCountdown",
					payload: { id: enemy.id, countdown: 0 },
				});
			});
		}

		// Find enemies whose countdown has reached zero (ready to attack)
		const readyEnemies = staggeredEnemies.filter(
			(enemy) => enemy.isCountdownActive && enemy.countdown <= 0,
		);

		// Allow ALL ready enemies to attack simultaneously at different delay times
		batch(() => {
			readyEnemies.forEach((enemy) => {
				// Get enemy's actual attack damage
				const enemyDamage = enemy.attack || enemy.baseAttack || 5;

				// Enemy attacks player with their actual damage
				this.store.dispatch({
					type: "player/damagePlayer",
					payload: { amount: enemyDamage },
				});
				this.store.dispatch(enemyAttacked(enemy.id, "player", enemyDamage));
				this.store.dispatch(
					playerDamaged(enemy.id, "enemy", "player", enemyDamage, "received"),
				);

				Logger.log(
					`${enemy.name || enemy.id} attacks player for ${enemyDamage} damage (countdown-based)`,
					0,
					"combat",
				);

				// Reset countdown with new random delay from enemy's configured range
				// Each enemy gets an independent delay to create staggered attack patterns
				const [minDelay, maxDelay] = enemy.attackDelayRange || [2000, 4000];
				const nextRandomDelay =
					this.randomBetween(minDelay, maxDelay) + Math.random() * 200;

				this.store.dispatch({
					type: "enemies/initializeCountdown",
					payload: { id: enemy.id, countdown: nextRandomDelay },
				});
			});
		});
	},

	// Calculate random delay between min and max values
	randomBetween(min, max) {
		return Math.random() * (max - min) + min;
	},

	checkAllEnemiesDead(placeId) {
		const state = this.store.getState();
		const enemiesInPlace = Object.values(state.enemies.byId).filter(
			(e) => e.placeId === placeId,
		);
		const allDead =
			enemiesInPlace.length > 0 && enemiesInPlace.every((e) => e.isDead);

		if (!allDead) return;

		this.store.dispatch({
			type: "enemies/removeDeadEnemiesByPlace",
			payload: { placeId },
		});

		Logger.log(`All enemies in place ${placeId} are dead`, 0, "combat");
	},

	// Subscribe to combat state changes
	subscribeToCombatChanges(state, gameLoop) {
		return state.subscribe(() => {
			this.handleCombatStateChange(state, gameLoop);
		});
	},
};

export default CombatService;
