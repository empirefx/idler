import { createSlice, createSelector } from "@reduxjs/toolkit";

import { playerData } from "../../data/player";
import { workerAssigned, workerUnassigned } from "../../game/events";

export const assignWorkerToSocketWithEvent = (workerId, socketIndex, material) => {
	return (dispatch, getState) => {
		dispatch(assignWorkerToSocket({ workerId, socketIndex, material }));

		const state = getState();
		const worker = state.player.workers.find((w) => w.id === workerId);
		if (worker) {
			dispatch(workerAssigned(workerId, worker.name, `socket_${socketIndex}`, material));
		}
	};
};

export const unassignWorkerFromSocketWithEvent = (workerId) => {
	return (dispatch, getState) => {
		const state = getState();
		const worker = state.player.workers.find((w) => w.id === workerId);
		const socketIndex = worker?.assignedSocketIndex;
		const material = worker?.assignedMaterial;
		const workerName = worker?.name;

		dispatch(unassignWorkerFromSocket({ workerId }));

		if (workerName !== undefined) {
			dispatch(workerUnassigned(workerId, workerName, `socket_${socketIndex}`, material));
		}
	};
};

const initialState = { ...playerData };

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		assignWorkerToSocket: (state, action) => {
			const { workerId, socketIndex, material } = action.payload;
			const worker = state.workers.find((worker) => worker.id === workerId);
			if (worker) {
				worker.assignedSocketIndex = socketIndex;
				worker.assignedMaterial = material;
				action.payload.workerName = worker.name;
			}
		},
		unassignWorkerFromSocket: (state, action) => {
			const { workerId } = action.payload;
			const worker = state.workers.find((worker) => worker.id === workerId);
			if (worker) {
				worker.assignedSocketIndex = null;
				worker.assignedMaterial = null;
				action.payload.workerName = worker.name;
			}
		},
		// Apply damage to player health
		damagePlayer: (state, action) => {
			const { amount } = action.payload;
			state.health = Math.max(0, state.health - amount);
		},
		// Heal player health
		healPlayer: (state, action) => {
			const { amount } = action.payload;
			state.health = Math.min(state.baseHealth, state.health + amount);
		},
		setPlayerState: (_state, action) => {
			// This will replace the entire player state with the saved one
			// Only for loading saved states!
			return action.payload; // Replace entire state with payload
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
		// Update last attack time for cooldown tracking
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
		// Learn a crafting recipe
		learnRecipe: (state, action) => {
			const recipeId = action.payload;
			if (!state.knownRecipes) {
				state.knownRecipes = [];
			}
			if (!state.knownRecipes.includes(recipeId)) {
				state.knownRecipes.push(recipeId);
			}
		},
	},
});

// Action creators
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
} = playerSlice.actions;

// Selectors
export const selectWorkers = (state) => state.player.workers;
export const selectResources = (state) => state.player.resources;

// Memoized selectors
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
	(workers) => workers.filter((worker) => worker.assignedSocketIndex !== null && worker.assignedSocketIndex !== undefined),
);
export const selectUnassignedWorkers = createSelector(
	[selectWorkers],
	(workers) => workers.filter((worker) => worker.assignedSocketIndex === null || worker.assignedSocketIndex === undefined),
);

// Centralized selectors for player resources and workers
export const selectGold = createSelector(
	[selectResources],
	(resources) => resources.find((r) => r.name === "gold")?.amount || 0,
);
export const selectWorkerCount = createSelector(
	[selectWorkers],
	(workers) => workers.length,
);
export const selectMaxWorkers = (state) => state.player.MAX_WORKERS;

// Selector to check if player is ready to level up
export const selectIsReadyToLevelUp = createSelector(
	[(state) => state.player.level, (state) => state.player.exp],
	(level, exp) => exp >= level * 100,
);

// Selector to check if player is ready to attack
export const selectIsPlayerReadyToAttack = createSelector(
	[(state) => state.player],
	(player) => {
		const now = Date.now();
		const timeSinceLastAttack = now - (player.lastAttackTime || 0);
		return timeSinceLastAttack >= (player.attackCooldown || 1000);
	},
);

// Selector for known crafting recipes (memoized to avoid unnecessary re-renders)
export const selectKnownRecipes = createSelector(
	[(state) => state.player.knownRecipes],
	(knownRecipes) => knownRecipes || [],
);

export default playerSlice.reducer;
