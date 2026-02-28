import { createSlice, createSelector } from "@reduxjs/toolkit";

import { playerData } from "../../data/player";
import { workerAssigned, workerUnassigned } from "../../game/events";

const getNextWorkerId = (workers) => {
	if (!workers || workers.length === 0) return 1;
	const maxId = Math.max(...workers.map((w) => w.id));
	return maxId + 1;
};

export const assignWorkerToSocketWithEvent = (
	workerId,
	placeId,
	socketIndex,
	material,
) => {
	return (dispatch, getState) => {
		dispatch(
			assignWorkerToSocket({ workerId, placeId, socketIndex, material }),
		);

		const state = getState();
		const worker = state.player.workers.find((w) => w.id === workerId);
		if (worker) {
			dispatch(
				workerAssigned(
					workerId,
					worker.name,
					`socket_${socketIndex}`,
					material,
				),
			);
		}
	};
};

export const unassignWorkerFromSocketWithEvent = (workerId, placeId) => {
	return (dispatch, getState) => {
		const state = getState();
		const worker = state.player.workers.find((w) => w.id === workerId);
		const assignment = worker?.assignments?.[placeId];
		const socketIndex = assignment?.socketIndex;
		const material = assignment?.material;
		const workerName = worker?.name;

		dispatch(unassignWorkerFromSocket({ workerId, placeId }));

		if (workerName !== undefined) {
			dispatch(
				workerUnassigned(
					workerId,
					workerName,
					`socket_${socketIndex}`,
					material,
				),
			);
		}
	};
};

const initialState = {
	...playerData,
	availableWorkers: [],
};

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		assignWorkerToSocket: (state, action) => {
			const { workerId, placeId, socketIndex, material } = action.payload;
			const worker = state.workers.find((w) => w.id === workerId);
			if (worker) {
				if (!worker.assignments) {
					worker.assignments = {};
				}
				worker.assignments[placeId] = {
					socketIndex,
					material,
				};
				action.payload.workerName = worker.name;
			}
		},
		unassignWorkerFromSocket: (state, action) => {
			const { workerId, placeId } = action.payload;
			const worker = state.workers.find((w) => w.id === workerId);
			if (worker && worker.assignments && worker.assignments[placeId]) {
				action.payload.workerName = worker.name;
				delete worker.assignments[placeId];
			}
		},
		damagePlayer: (state, action) => {
			const { amount } = action.payload;
			state.health = Math.max(0, state.health - amount);
		},
		healPlayer: (state, action) => {
			const { amount } = action.payload;
			state.health = Math.min(state.baseHealth, state.health + amount);
		},
		setPlayerState: (_state, action) => {
			return action.payload;
		},
		gainExp: (state, action) => {
			const { amount } = action.payload;
			state.exp += amount;
		},
		levelUp: (state, action) => {
			const required = state.level * 100;
			if (state.exp < required) return;
			state.exp -= required;
			state.level += 1;
			const {
				strength = 0,
				defense = 0,
				agility = 0,
				vitality = 0,
			} = action.payload;
			state.stats.strength += strength;
			state.stats.defense += defense;
			state.stats.agility += agility;
			state.stats.vitality += vitality;
		},
		updateLastAttackTime: (state, action) => {
			const { timestamp } = action.payload;
			state.lastAttackTime = timestamp;
		},
		addGold: (state, action) => {
			const resource = state.resources.find((r) => r.name === "gold");
			if (resource) {
				resource.amount += action.payload;
			}
		},
		spendGold: (state, action) => {
			const resource = state.resources.find((r) => r.name === "gold");
			if (resource) {
				resource.amount = Math.max(0, resource.amount - action.payload);
			}
		},
		learnRecipe: (state, action) => {
			const recipeId = action.payload;
			if (!state.knownRecipes) {
				state.knownRecipes = [];
			}
			if (!state.knownRecipes.includes(recipeId)) {
				state.knownRecipes.push(recipeId);
			}
		},
		addWorker: (state, action) => {
			const worker = action.payload;
			const newWorker = {
				...worker,
				id: worker.id || getNextWorkerId(state.workers),
				assignments: worker.assignments || {},
			};
			state.workers.push(newWorker);
		},
		removeWorker: (state, action) => {
			const workerId = action.payload;
			state.workers = state.workers.filter((w) => w.id !== workerId);
		},
		incrementWorkerSlots: (state, action) => {
			const amount = action.payload || 1;
			state.workerSlots += amount;
		},
		updateAvailableWorkers: (state, action) => {
			state.availableWorkers = action.payload;
		},
	},
});

export const {
	assignWorkerToSocket,
	unassignWorkerFromSocket,
	damagePlayer,
	healPlayer,
	setPlayerState,
	gainExp,
	levelUp,
	updateLastAttackTime,
	addGold,
	spendGold,
	learnRecipe,
	addWorker,
	removeWorker,
	incrementWorkerSlots,
	updateAvailableWorkers,
} = playerSlice.actions;

export const selectWorkers = (state) => state.player.workers;
export const selectResources = (state) => state.player.resources;

export const selectPlayer = createSelector(
	(state) => state.player,
	(player) => ({
		id: player.id,
		avatar: player.avatar,
		name: player.name,
		stats: player.stats,
		health: player.health,
		maxHealth: player.baseHealth,
		attack: player.baseAttack,
		level: player.level,
		exp: player.exp,
		expToNext: player.level * 100,
		resources: player.resources,
	}),
);

export const selectAssignedWorkers = createSelector(
	[selectWorkers],
	(workers) =>
		workers.filter(
			(worker) =>
				worker.assignments && Object.keys(worker.assignments).length > 0,
		),
);

export const selectUnassignedWorkers = createSelector(
	[selectWorkers],
	(workers) =>
		workers.filter(
			(worker) =>
				!worker.assignments || Object.keys(worker.assignments).length === 0,
		),
);

export const selectGold = createSelector(
	[selectResources],
	(resources) => resources.find((r) => r.name === "gold")?.amount || 0,
);
export const selectWorkerCount = createSelector(
	[selectWorkers],
	(workers) => workers.length,
);
export const selectMaxWorkers = (state) => state.player.MAX_WORKERS;
export const selectWorkerSlots = (state) => state.player.workerSlots;
export const selectAvailableWorkers = (state) => state.player.availableWorkers;

export const selectIsReadyToLevelUp = createSelector(
	[(state) => state.player.level, (state) => state.player.exp],
	(level, exp) => exp >= level * 100,
);

export const selectIsPlayerReadyToAttack = createSelector(
	[(state) => state.player],
	(player) => {
		const now = Date.now();
		const timeSinceLastAttack = now - (player.lastAttackTime || 0);
		return timeSinceLastAttack >= (player.attackCooldown || 1000);
	},
);

export const selectKnownRecipes = createSelector(
	[(state) => state.player.knownRecipes],
	(knownRecipes) => knownRecipes || [],
);

export const selectWorkerByPlaceAndSocket = (placeId, socketIndex) =>
	createSelector([selectWorkers], (workers) =>
		workers.find(
			(worker) =>
				worker.assignments &&
				worker.assignments[placeId] &&
				worker.assignments[placeId].socketIndex === socketIndex,
		),
	);

export const selectWorkersByPlace = (placeId) =>
	createSelector([selectWorkers], (workers) =>
		workers.filter(
			(worker) => worker.assignments && worker.assignments[placeId],
		),
	);

export default playerSlice.reducer;
