export const playerData = {
	id: 1,
	name: "John Doe",
	MAX_WORKERS: 5,
	avatar: "1.png",
	baseHealth: 120,
	baseAttack: 16,
	health: 120,
	attack: 16,
	attackCooldown: 2000, // Time in milliseconds between player attacks
	lastAttackTime: 0, // Timestamp of last player attack
	level: 1,
	exp: 0,
	stats: {
		strength: 10,
		defense: 5,
		agility: 7,
		vitality: 12,
	},
	resources: [{ name: "gold", amount: 100 }],
	workers: [
		{
			id: 1,
			name: "Milo Bladovan",
			avatar: "worker_m.jpg",
			assignedBuildingId: null,
		},
		{
			id: 2,
			name: "Silik Ludorin",
			avatar: "worker_f.jpg",
			assignedBuildingId: null,
		},
		{
			id: 3,
			name: "Kresibrin Dobronimir",
			avatar: "worker_m.jpg",
			assignedBuildingId: null,
		},
	],
};

export const metadata = {
	version: "1.0.13",
	lastUpdated: "2026-02-16",
};
