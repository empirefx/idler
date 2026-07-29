import { randomUUID } from "node:crypto";
import { NICKNAME_REGEX, INVENTORY_ERRORS } from "../shared/constants.js";

export class SessionManager {
	constructor(redis, logger, config) {
		this.redis = redis;
		this.logger = logger;
		this.config = config;
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
		await this.redis.del(`session:${nickname}`);
		this.logger.log(`Session destroyed for ${nickname}`, "SESSION");
	}

	async cleanupExpiredSessions() {
		this.logger.log("Session cleanup run", "SESSION");
	}
}
