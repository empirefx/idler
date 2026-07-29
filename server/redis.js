import IORedis from "ioredis";

export class RedisClient {
	constructor(config) {
		this.config = config;
		this.sessionTtl = config.sessionTtl || 2592000;
		this.client = new IORedis({
			host: this.config.host || "127.0.0.1",
			port: this.config.port || 6379,
			retryStrategy: (times) => Math.min(times * 100, 3000),
		});

		this.client.on("error", (err) => {
			console.error("Redis connection error:", err.message);
		});
	}

	async connect() {
		await this.client.connect();
	}

	async get(key) {
		return this.client.get(key);
	}

	async set(key, value, ttl) {
		const t = ttl !== undefined ? ttl : this.sessionTtl;
		return this.client.set(key, value, "EX", t);
	}

	async hget(key, field) {
		return this.client.hget(key, field);
	}

	async hset(key, field, value) {
		return this.client.hset(key, field, value);
	}

	async hdel(key, field) {
		return this.client.hdel(key, field);
	}

	async del(key) {
		return this.client.del(key);
	}

	async expire(key, ttl) {
		return this.client.expire(key, ttl);
	}

	async exists(key) {
		const result = await this.client.exists(key);
		return result === 1;
	}

	async disconnect() {
		if (this.client) {
			await this.client.quit();
			this.client = null;
		}
	}
}
