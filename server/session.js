import { randomUUID } from "node:crypto";
import { NICKNAME_REGEX, INVENTORY_ERRORS } from "../shared/constants.js";
import { PlayerState } from "./state/PlayerState.js";
import { InventoryState } from "./state/InventoryState.js";
import { BuildingsState } from "./state/BuildingsState.js";
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
		await this.playerState.save(sessionId, {
			level: 1, gold: 0, exp: 0,
			hp: 100, maxHp: 100,
			vitality: 10, agility: 10, strength: 10, intelligence: 10,
			skillPoints: 0,
			currentPlaceId: "village",
			lastSeenAt: Date.now(),
		});
		this.logger.log(`Full state initialized for session ${sessionId}`, "SESSION");
	}

	async loadFullState(sessionId) {
		const stats = await this.playerState.load(sessionId);
		const inventory = await this.inventoryState.loadAll(sessionId);
		const buildings = await this.buildingsState.loadAll(sessionId);
		const workers = await this.workersState.load(sessionId);
		const active = await this.questState.loadActive(sessionId);
		const completed = await this.questState.loadCompleted(sessionId);
		const skills = await this.playerState.loadSkills(sessionId);
		const recipes = await this.playerState.loadRecipes(sessionId);

		return {
			player: stats,
			inventory,
			buildings,
			workers: workers || { hired: [], available: [] },
			quests: { active, completed },
			skills,
			recipes,
		};
	}

	async cleanupExpiredSessions() {
		this.logger.log("Session cleanup run", "SESSION");
	}
}
