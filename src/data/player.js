export const playerData = {
	id: 1,
	name: "John Doe",
	MAX_WORKERS: 5,
	avatar: "1.png",
	baseHealth: 120,
	health: 120,
	attackCooldown: 2000,
	lastAttackTime: 0,
	level: 1,
	exp: 0,
	skillPoints: 10,
	stats: {
		strength: 10,
		defense: 5,
		agility: 7,
		vitality: 12,
		intelligence: 0,
		wisdom: 0,
	},
	skills: {},
	activeBuffs: [],
	activeCooldowns: {},
	resources: [{ name: "gold", amount: 1500 }],
	workers: [],
	workerSlots: 1,
	availableWorkers: [],
};

export const metadata = {
	version: "1.0.14",
	lastUpdated: "2026-02-27",
};
