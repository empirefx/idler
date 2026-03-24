// Combat Service - coordinates combat state with game loop
import Logger from "../utils/Logger";
import { batch } from "react-redux";
import { enemyAttacked, playerDamaged, enemyDead } from "../events";
import { addItem } from "../../store/slices/inventorySlice";
import {
	gainExp,
	updateLastAttackTime,
	tickBuffs,
	activateSkill,
	addBuff,
	pauseCooldowns,
	resumeCooldowns,
} from "../../store/slices/playerSlice";
import { createItem } from "../factory/itemFactory";
import { resolveAttack, resolveEnemyAttack } from "../core/combatCalculator";
import {
	getNextSkillToActivate,
	markSkillActivated,
	isSkillOnCooldown,
	getRankData,
	resetSkillRotation,
} from "../utils/skillResolver";
import { getWeaponProfile } from "../utils/combatResolvers";
import { getSkillById } from "../../data/skillsData";

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
		this.isStartingCombat = false;
		this.isStoppingCombat = false;
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

	// Try to activate the next skill in sequence
	tryActivateSkill(player, equippedWeapon, targetEnemy) {
		const state = this.store.getState();
		const playerSkills = player.skills || {};
		const activeCooldowns = state.player.activeCooldowns || {};

		// Find next ready skill to activate (filters out on-cooldown skills)
		const skill = getNextSkillToActivate(
			equippedWeapon,
			playerSkills,
			activeCooldowns,
		);
		if (!skill) return;

		// Get rank data
		const rankData = getRankData(skill, playerSkills);
		if (!rankData) return;

		// Apply skill effect based on type
		if (skill.type === "active_buff") {
			// Add buff to player
			const buff = {
				id: `${skill.id}_${Date.now()}`,
				skillId: skill.id,
				stat: rankData.statBonus.stat,
				value: rankData.statBonus.value,
				duration: rankData.duration,
				type: "buff",
			};
			this.store.dispatch(addBuff(buff));

			// Set cooldown
			this.store.dispatch(
				activateSkill({ skillId: skill.id, cooldown: skill.cooldown }),
			);

			Logger.log(
				`${skill.name} activated! +${rankData.statBonus.value} ${rankData.statBonus.stat} for ${rankData.duration} attacks.`,
				0,
				"combat",
			);
		} else if (skill.type === "active_damage") {
			// Calculate and apply skill damage
			const weaponProfile = getWeaponProfile(equippedWeapon);
			const damageType = weaponProfile.damageType || "physical";
			const multiplier = rankData.damageMultiplier || 1.0;

			// Calculate base damage based on damage type
			let baseDamage = 0;
			if (damageType === "magic") {
				baseDamage = (player.stats.intelligence || 0) * 2;
			} else if (damageType === "ranged") {
				baseDamage = (player.stats.agility || 0) * 2;
			} else {
				baseDamage = (player.stats.strength || 0) * 2;
			}

			const flatDamage = weaponProfile.flatDamage || 0;
			const skillDamage = Math.round((baseDamage + flatDamage) * multiplier);

			// Apply damage to enemy
			this.store.dispatch({
				type: "enemies/damageEnemy",
				payload: { id: targetEnemy.id, amount: skillDamage },
			});

			// Set cooldown
			this.store.dispatch(
				activateSkill({ skillId: skill.id, cooldown: skill.cooldown }),
			);

			Logger.log(`${skill.name} hits for ${skillDamage} damage!`, 0, "combat");
		}

		// Mark skill as last activated
		markSkillActivated(skill);
	},

	// Execute a skill (refactored from tryActivateSkill)
	executeSkill(skill, player, equippedWeapon, targetEnemy) {
		const playerSkills = player.skills || {};
		const rankData = getRankData(skill, playerSkills);
		if (!rankData) return;

		if (skill.type === "active_buff") {
			const buff = {
				id: `${skill.id}_${Date.now()}`,
				skillId: skill.id,
				stat: rankData.statBonus.stat,
				value: rankData.statBonus.value,
				duration: rankData.duration,
				type: "buff",
			};
			this.store.dispatch(addBuff(buff));
			this.store.dispatch(
				activateSkill({ skillId: skill.id, cooldown: skill.cooldown }),
			);
			Logger.log(
				`${skill.name} activated! +${rankData.statBonus.value} ${rankData.statBonus.stat} for ${rankData.duration} attacks.`,
				0,
				"combat",
			);
		} else if (skill.type === "active_damage") {
			const weaponProfile = getWeaponProfile(equippedWeapon);
			const damageType = weaponProfile.damageType || "physical";
			const multiplier = rankData.damageMultiplier || 1.0;

			let baseDamage = 0;
			if (damageType === "magic") {
				baseDamage = (player.stats.intelligence || 0) * 2;
			} else if (damageType === "ranged") {
				baseDamage = (player.stats.agility || 0) * 2;
			} else {
				baseDamage = (player.stats.strength || 0) * 2;
			}

			const flatDamage = weaponProfile.flatDamage || 0;
			const skillDamage = Math.round((baseDamage + flatDamage) * multiplier);

			this.store.dispatch({
				type: "enemies/damageEnemy",
				payload: { id: targetEnemy.id, amount: skillDamage },
			});
			this.store.dispatch(
				activateSkill({ skillId: skill.id, cooldown: skill.cooldown }),
			);
			Logger.log(`${skill.name} hits for ${skillDamage} damage!`, 0, "combat");
		}

		markSkillActivated(skill);
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
		if (this.isStartingCombat) {
			Logger.log("Combat start already in progress, skipping", 0, "combat");
			return;
		}
		this.isStartingCombat = true;
		Logger.log("Starting combat system", 0, "combat");
		this.store.dispatch(resumeCooldowns());
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
		this.isStartingCombat = false;
	},

	// Stop combat system with game loop
	stopCombat(gameLoop) {
		if (this.isStoppingCombat) {
			Logger.log("Combat stop already in progress, skipping", 0, "combat");
			return;
		}
		this.isStoppingCombat = true;
		this.store.dispatch(pauseCooldowns());
		resetSkillRotation();
		gameLoop.unregister("combat");
		this.isStoppingCombat = false;
	},

	// Handle enemy drops on death
	handleEnemyDrops(_enemy) {
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
		const inventory = state.inventory?.player;
		const equippedWeapon = inventory?.equipment?.["main-weapon"] || null;
		const equippedArmor = Object.values(inventory?.equipment || {}).filter(
			(item) =>
				item && item.type !== "main-weapon" && item.type !== "second-weapon",
		);
		const now = Date.now();

		if (now - (player.lastAttackTime || 0) < (player.attackCooldown || 1000))
			return;

		// Locked target logic
		const targetEnemy = this.getOrSelectTarget(aliveEnemies);
		if (!targetEnemy) return;

		// Capture enemy snapshot BEFORE attacking (for death event and logging)
		const enemySnapshot = { ...targetEnemy };

		// Update timestamp FIRST to prevent double attacks
		this.store.dispatch(updateLastAttackTime({ timestamp: now }));

		// Check if any skill is ready FIRST - skill takes priority over normal attack
		const playerSkills = player.skills || {};
		const activeCooldowns = state.player.activeCooldowns || {};
		const readySkill = getNextSkillToActivate(
			equippedWeapon,
			playerSkills,
			activeCooldowns,
		);

		if (readySkill) {
			// SKILL PATH: Execute only skill, skip normal attack
			this.executeSkill(readySkill, player, equippedWeapon, targetEnemy);
		} else {
			// NORMAL ATTACK PATH: Execute only normal attack, no skill
			const attackResult = resolveAttack(
				player,
				targetEnemy,
				equippedWeapon,
				equippedArmor,
				player.activeBuffs || [],
				playerSkills,
			);

			const damage = attackResult.hit ? attackResult.damage : 0;

			this.store.dispatch({
				type: "enemies/damageEnemy",
				payload: { id: targetEnemy.id, amount: damage },
			});

			// Dispatch player attack log
			const attackDesc = attackResult.hit
				? `${attackResult.crit ? "critically hit" : "hit"} for ${damage} damage`
				: "missed";
			this.store.dispatch(
				playerDamaged(
					"player",
					"player",
					targetEnemy.id,
					damage,
					attackResult.hit ? "dealt" : "missed",
					enemySnapshot.name,
				),
			);

			Logger.log(
				`Player attacks ${enemySnapshot.name}: ${attackDesc} (${attackResult.damageType})`,
				0,
				"combat",
			);
		}

		// Tick buffs after attack
		this.store.dispatch(tickBuffs());

		// Check if enemy died and emit death event
		setTimeout(() => {
			const updated = this.store.getState().enemies.byId[targetEnemy.id];
			if (!updated) return;

			if (updated?.isDead) {
				// Enemy died, handle drops, exp, etc
				this.store.dispatch({ type: "combat/clearTarget" });
				this.handleEnemyDrops(enemySnapshot);
				this.handleEnemyExpGain(enemySnapshot);

				// Emit enemyDead event for other systems
				this.eventBusService.emit("enemyDead", {
					placeId: enemySnapshot.placeId,
					enemy: enemySnapshot,
				});

				// Dispatch Redux action for enemy death
				this.store.dispatch(
					enemyDead(enemySnapshot.id, enemySnapshot.placeId, enemySnapshot),
				);

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
		const player = currentState.player;
		const playerStats = player?.stats || {
			defense: 0,
			agility: 0,
			wisdom: 0,
		};

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
				// Use new combat calculator for enemy attacks
				const attackResult = resolveEnemyAttack(enemy, playerStats);
				const enemyDamage = attackResult.hit ? attackResult.damage : 0;

				// Enemy attacks player with calculated damage
				if (enemyDamage > 0) {
					this.store.dispatch({
						type: "player/damagePlayer",
						payload: { amount: enemyDamage },
					});
					this.store.dispatch(enemyAttacked(enemy.id, "player", enemyDamage));
					this.store.dispatch(
						playerDamaged(enemy.id, "enemy", "player", enemyDamage, "received"),
					);
				}

				const attackDesc = attackResult.hit
					? `${attackResult.crit ? "critically hit" : "hit"} for ${enemyDamage} damage`
					: "missed";
				Logger.log(
					`${enemy.name || enemy.id} attacks player: ${attackDesc} (${attackResult.damageType})`,
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
