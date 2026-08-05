import { randomUUID } from "node:crypto";
import { NICKNAME_REGEX, INVENTORY_ERRORS } from "../shared/constants.js";
import { materializeItem } from "../shared/inventory.js";
import { inventoryData } from "../shared/data/inventory.js";
import { placesData } from "../shared/data/places.js";
import { getMaxHealth } from "../shared/combat/combatCalculator.js";
import { PlayerState } from "./state/PlayerState.js";
import { InventoryState } from "./state/InventoryState.js";
import { BuildingsState } from "./state/BuildingsState.js";
import { SocketsState } from "./state/SocketsState.js";
import { WorkersState } from "./state/WorkersState.js";
import { QuestState } from "./state/QuestState.js";
import { EnemyState } from "./state/EnemyState.js";

export class SessionManager {
	constructor(redis, logger, config) {
		this.redis = redis;
		this.logger = logger;
		this.config = config;
		this.playerState = new PlayerState(redis);
		this.inventoryState = new InventoryState(redis);
		this.buildingsState = new BuildingsState(redis);
		this.socketsState = new SocketsState(redis);
		this.workersState = new WorkersState(redis);
		this.questState = new QuestState(redis);
		this.enemyState = new EnemyState(redis);
	}

	validateNickname(nickname) {
		if (!nickname || typeof nickname !== "string" || !NICKNAME_REGEX.test(nickname)) {
			return { valid: false, error: INVENTORY_ERRORS.NICKNAME_INVALID };
		}
		return { valid: true };
	}

	async createSession(nickname) {
		const validation = this.validateNickname(nickname);
		if (!validation.valid) return { accepted: false, error: validation.error };

		const exists = await this.redis.exists(`session:${nickname}`);
		if (exists) return { accepted: false, error: INVENTORY_ERRORS.NICKNAME_TAKEN };

		const sessionId = randomUUID();
		const sessionData = JSON.stringify({ nickname, sessionId, createdAt: Date.now(), lastSeen: Date.now() });
		await this.redis.set(`session:${nickname}`, sessionData);
		await this.redis.expire(`session:${nickname}`, this.config.sessionTtl);
		this.logger.log(`Session created for ${nickname}`, "SESSION");
		return { accepted: true, session_id: sessionId };
	}

	async getSession(nickname) {
		const raw = await this.redis.get(`session:${nickname}`);
		if (!raw) return null;
		return JSON.parse(raw);
	}

	async renewSession(nickname) {
		await this.redis.expire(`session:${nickname}`, this.config.sessionTtl);
	}

	async disconnectSession(nickname) {
		this.logger.log(`Session ${nickname} disconnected (data preserved for TTL)`, "SESSION");
	}

	async initializeFullState(sessionId) {
		await this.inventoryState.initialize(sessionId);
		// Seed pre-existing buildings (occupied sockets) from static data
		for (const [placeId, place] of Object.entries(placesData)) {
			for (const [index, socket] of (place.sockets || []).entries()) {
				if (socket.status === "occupied" && socket.buildingId) {
					await this.buildingsState.save(sessionId, `${placeId}:${index}`, {
						id: socket.buildingId,
						level: socket.level || 1,
						placeId,
						socketIndex: index,
					});
				}
			}
		}
		// Initialize place vault inventories with seed items from static data
		for (const place of Object.values(placesData)) {
			if (place.hasInventory) {
				const seed = inventoryData[place.id];
				await this.inventoryState.save(sessionId, `place-${place.id}`, {
					id: `place-${place.id}`,
					placeId: place.id,
					type: "vault",
					maxSlots: 30,
					items: seed?.items ? seed.items.map((it) => materializeItem(JSON.parse(JSON.stringify(it)))) : [],
				});
			}
		}
		await this.playerState.save(sessionId, {
			level: 1, gold: 0, exp: 0, expToNext: 100,
			hp: getMaxHealth(10), maxHp: getMaxHealth(10),
			avatar: "1.png",
			stats: { strength: 10, defense: 0, agility: 10, vitality: 10, intelligence: 10, wisdom: 0 },
			skillPoints: 0,
			currentPlaceId: "village_center",
			lastSeenAt: Date.now(),
			attackCooldown: 2000,
			lastAttackTime: 0,
			activeBuffs: [],
			activeCooldowns: {},
			pausedCooldowns: {},
			skillJobIds: {},
			autoCombat: false,
			isDead: false,
		});
		this.logger.log(`Full state initialized for session ${sessionId}`, "SESSION");
	}

	async loadFullState(sessionId) {
		const stats = await this.playerState.load(sessionId);
		const inventory = await this.inventoryState.loadAll(sessionId);
		const buildings = await this.buildingsState.loadAll(sessionId);
		const sockets = await this.socketsState.loadAll(sessionId);
		const workers = await this.workersState.load(sessionId);
		const active = await this.questState.loadActive(sessionId);
		const completed = await this.questState.loadCompleted(sessionId);
		const skills = await this.playerState.loadSkills(sessionId);
		const recipes = await this.playerState.loadRecipes(sessionId);
		const enemies = await this.enemyState.loadAll(sessionId);

		// Merge static NPC inventories (shared across all players, non-consumable)
		const staticNpcInventories = {};
		for (const [key, data] of Object.entries(inventoryData)) {
			if (data.type === "npc") {
				staticNpcInventories[key] = { ...data, id: key };
			}
		}

		return {
			player: stats,
			inventory: { ...inventory, ...staticNpcInventories },
			buildings,
			sockets,
			workers: workers || { hired: [], available: [] },
			quests: { active, completed },
			skills,
			recipes,
			enemies,
		};
	}

	async cleanupExpiredSessions() {
		this.logger.log("Session cleanup run", "SESSION");
	}
}
