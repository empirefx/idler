import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
	byId: {},
	allIds: [],
};

const enemiesSlice = createSlice({
	name: "enemies",
	initialState,
	reducers: {
		addEnemy(state, action) {
			const { placeId, enemy } = action.payload;
			if (!state.byId[enemy.id]) {
				state.byId[enemy.id] = {
					...enemy,
					placeId,
					nextAttackTime: enemy.nextAttackTime || 0,
					attackDelayRange: enemy.attackDelayRange || [2000, 5000],
					attackPattern: enemy.attackPattern || "normal",
					countdown: enemy.countdown || 0,
					initialAttackDelay: enemy.initialAttackDelay || 0,
					isCountdownActive: enemy.isCountdownActive || false,
					isDead: false,
				};
				state.allIds.push(enemy.id);
			}
		},

		removeEnemy(state, action) {
			const { id } = action.payload;
			if (state.byId[id]) {
				delete state.byId[id];
				state.allIds = state.allIds.filter((eid) => eid !== id);
			}
		},

		// Remove all enemies in a specific place
		removeEnemiesByPlace(state, action) {
			const placeId = action.payload;
			state.allIds = state.allIds.filter((id) => {
				if (state.byId[id]?.placeId === placeId) {
					delete state.byId[id];
					return false;
				}
				return true;
			});
		},

		// Damage an enemy by id
		damageEnemy(state, action) {
			const { id, amount } = action.payload;
			const enemy = state.byId[id];
			if (enemy && !enemy.isDead) {
				enemy.health = Math.max(0, enemy.health - amount);
				if (enemy.health === 0) {
					enemy.isDead = true;
				}
			}
		},

		// Remove all dead enemies when all enemies in a place are dead
		removeDeadEnemiesByPlace(state, action) {
			const { placeId } = action.payload;

			const enemiesInPlace = state.allIds.filter(
				(id) => state.byId[id]?.placeId === placeId,
			);

			const allDead =
				enemiesInPlace.length > 0 &&
				enemiesInPlace.every((id) => state.byId[id].isDead);

			if (!allDead) return;

			// remove one-by-one so lifecycle detects every death
			enemiesInPlace.forEach((id) => {
				delete state.byId[id];
			});

			state.allIds = state.allIds.filter((id) => !enemiesInPlace.includes(id));
		},

		// Update enemy's next attack time
		updateEnemyAttackTime(state, action) {
			const { id, nextAttackTime } = action.payload;
			const enemy = state.byId[id];
			if (enemy) {
				enemy.nextAttackTime = nextAttackTime;
			}
		},

		// Update enemy countdown by deltaTime (in seconds from game loop)
		updateEnemyCountdown(state, action) {
			const { id, deltaTime } = action.payload;
			const enemy = state.byId[id];
			if (enemy?.isCountdownActive && enemy.countdown > 0) {
				// Convert deltaTime from seconds to milliseconds
				enemy.countdown = Math.max(0, enemy.countdown - deltaTime * 1000);
			}
		},

		// Set countdown activation state
		setCountdownActive(state, action) {
			const { id, isActive } = action.payload;
			const enemy = state.byId[id];
			if (enemy) {
				enemy.isCountdownActive = isActive;
			}
		},

		// Initialize countdown with specific value
		initializeCountdown(state, action) {
			const { id, countdown } = action.payload;
			const enemy = state.byId[id];
			if (enemy) {
				enemy.countdown = countdown;
			}
		},

		// Initialize countdowns for all enemies at a specific place
		initializeCountdownsForPlace(state, action) {
			const { placeId, baseTimestamp } = action.payload;
			const placeEnemies = Object.values(state.byId).filter(
				(enemy) =>
					enemy.placeId === placeId &&
					enemy.attackPattern === "staggered" &&
					!enemy.isCountdownActive,
			);

			// Only initialize INACTIVE enemies
			placeEnemies.forEach((enemy) => {
				if (enemy.attackDelayRange) {
					const [minDelay, maxDelay] = enemy.attackDelayRange;
					enemy.countdown = Math.random() * (maxDelay - minDelay) + minDelay;
					enemy.isCountdownActive = true;
					enemy.countdownStartTime = baseTimestamp;
				}
			});
		},
	},
});

export const {
	addEnemy,
	removeEnemy,
	removeEnemiesByPlace,
	damageEnemy,
	removeDeadEnemiesByPlace,
	updateEnemyAttackTime,
	updateEnemyCountdown,
	setCountdownActive,
	initializeCountdown,
	initializeCountdownsForPlace,
} = enemiesSlice.actions;

// Selectors
const selectEnemiesState = (state) => state.enemies;
const selectCurrentPlaceId = (state) => state.places.currentPlaceId;

// Memoized selectors
export const selectAllEnemies = createSelector(
	[selectEnemiesState],
	(enemiesState) => enemiesState.allIds.map((id) => enemiesState.byId[id]),
);

export const selectEnemiesForCurrentPlace = createSelector(
	[selectAllEnemies, selectCurrentPlaceId],
	(enemiesList, currentPlaceId) =>
		enemiesList.filter((enemy) => enemy.placeId === currentPlaceId),
);

export default enemiesSlice.reducer;
