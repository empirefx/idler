import Logger from "../utils/Logger";
import createEnemy from "../factory/enemyFactory";
import { placesData } from "../../data/places";

class BaseSpawner {
	#isDestroyed = false; // Flag to track if the spawner is destroyed
	#abortController = null; // Abort controller for cleanup

	constructor(placeId, config, eventBus) {
		this.placeId = placeId;
		this.config = config;
		this.eventBus = eventBus;
	}

	// Create an enemy instance
	createEnemy(type) {
		// Generate a unique ID for the enemy
		const id = `${type}-${Date.now()}-${crypto.randomUUID().slice(0, 6)}`;
		const base = createEnemy(type);

		// Create the enemy object
		const enemy = base
			? { ...base, id }
			: {
					id,
					type,
					name: "Unknown",
					health: 50,
					maxHealth: 50,
					attack: 5,
					speed: 1,
				};

		if (enemy.attackPattern === "staggered") {
			const [min, max] = enemy.attackDelayRange || [1000, 2000];
			const delay = Math.random() * (max - min) + min;
			enemy.nextAttackTime = Date.now() + delay;
			enemy.countdown = delay;
		}

		return enemy;
	}

	/**
	 * Listen for enemy deaths and call the callback when all enemies are dead
	 * @param {Function} onAllDead - Callback function to call when all enemies are dead
	 * @returns {AbortController} Abort controller for cleanup
	 */
	listenDeaths(onAllDead) {
		this.#abortController?.abort();
		this.#abortController = new AbortController();

		return this.eventBus.on(`enemyDead:${this.placeId}`, onAllDead, {
			signal: this.#abortController.signal,
		});
	}

	// Destroy the spawner and clean up resources
	destroy() {
		this.#isDestroyed = true;
		this.#abortController?.abort();
	}

	get isDestroyed() {
		return this.#isDestroyed;
	}
}

export class WaveSpawner extends BaseSpawner {
	#active = false;
	#respawnTimer = null;
	#aliveIds = new Set(); // Set to track alive enemy IDs

	// For testing purposes
	constructor(placeId, config, eventBus) {
		super(placeId, config, eventBus);
	}

	get isActive() {
		return this.#active;
	}

	get isSingleEnemy() {
		const pool = Array.isArray(this.config.pool)
			? this.config.pool
			: [this.config.pool];
		return pool.length === 1;
	}

	selectEnemyFromPool() {
		const pool = Array.isArray(this.config.pool)
			? this.config.pool
			: [this.config.pool];
		return pool[Math.floor(Math.random() * pool.length)];
	}

	start() {
		if (this.#active || this.isDestroyed) return;
		this.#active = true;
		this.#spawnBatch();
	}

	// Spawn a batch of enemies
	#spawnBatch() {
		const pool = Array.isArray(this.config.pool)
			? this.config.pool
			: [this.config.pool];

		const [min, max] = this.config.waveSize || [1, 1];
		const count = Math.floor(Math.random() * (max - min + 1)) + min;

		this.#aliveIds.clear(); // Clear the set of alive enemy IDs

		// Listen for enemy deaths and call the callback when all enemies are dead
		this.listenDeaths(({ enemy }) => {
			if (!enemy?.id) return; // Safety check

			this.#aliveIds.delete(enemy.id);
			if (this.#aliveIds.size > 0) return;
			this.#active = false;
			this.#scheduleRespawn();
		});

		// 1. Clear the set of alive enemy IDs
		// 2. Listen for enemy deaths and call the callback when all enemies are dead
		// 3. Spawn a batch of enemies
		// 4. Add each enemy to the set of alive enemy IDs
		// 5. Emit an event to notify other systems that an enemy has been spawned
		for (let i = 0; i < count; i++) {
			const type = pool[Math.floor(Math.random() * pool.length)];
			const enemy = this.createEnemy(type);
			this.#aliveIds.add(enemy.id);

			Logger.log(`Spawned ${enemy.id} at ${this.placeId}`, 0, "spawn");
			this.eventBus.emit("spawnEnemy", { placeId: this.placeId, enemy });
		}
	}

	#scheduleRespawn() {
		clearTimeout(this.#respawnTimer);
		this.#respawnTimer = setTimeout(() => {
			// Schedule respawn after delay
			if (!this.isDestroyed) this.start();
		}, this.config.respawnDelay * 1000);
	}

	stop() {
		this.#active = false;
		clearTimeout(this.#respawnTimer);
	}
}

export default class SpawnService {
	#spawners = new Map();
	#currentPlaceId = null;

	constructor(eventBus) {
		this.eventBus = eventBus;
		this.eventBus.on("enterPlace", (id) => this.#onEnterPlace(id));
	}

	// Handle place entry
	// 1. Stop the current spawner
	// 2. Set the current place ID
	// 3. Get the spawn configuration for the place
	// 4. If the spawner doesn't exist, create it
	// 5. Start the spawner
	#onEnterPlace(placeId) {
		if (placeId === this.#currentPlaceId) return;

		this.#spawners.get(this.#currentPlaceId)?.stop();
		this.#currentPlaceId = placeId;

		const config = placesData[placeId]?.spawn;
		if (!config) return;

		if (!this.#spawners.has(placeId)) {
			this.#spawners.set(
				placeId,
				new WaveSpawner(placeId, config, this.eventBus),
			);
		}

		this.#spawners.get(placeId).start();
	}

	// Clean up all spawners
	destroy() {
		for (const s of this.#spawners.values()) s.destroy();
		this.#spawners.clear();
		this.#currentPlaceId = null;
	}

	// Getters for testing purposes
	get currentPlaceId() {
		return this.#currentPlaceId;
	}

	get spawners() {
		return Array.from(this.#spawners.keys());
	}

	getSpawner(placeId) {
		return this.#spawners.get(placeId);
	}

	getCurrentSpawner() {
		return this.#currentPlaceId
			? this.#spawners.get(this.#currentPlaceId)
			: null;
	}
}
