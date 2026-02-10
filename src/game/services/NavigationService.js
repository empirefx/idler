// Navigation Service - handles place changes and enemy despawning
import Logger from "../utils/Logger";
import { removeEnemiesByPlace } from "../../store/slices/enemiesSlice";
import { locationChanged } from "../events";

export const NavigationService = {
	// Handle place change detection and enemy cleanup
	handleNavigation(state, currentPlaceId, previousPlaceId, dispatch) {
		if (currentPlaceId !== previousPlaceId) {
			// Emit enterPlace event for spawn service
			if (this.eventBus?.emit) {
				this.eventBus.emit("enterPlace", currentPlaceId);
			}

			// Emit location changed event for logging
			if (dispatch && typeof dispatch === "function") {
				dispatch(locationChanged(previousPlaceId, currentPlaceId));

				Logger.log(
					`Player moves from ${previousPlaceId} to ${currentPlaceId}`,
					0,
					"navigation",
				);

				// Stop combat when moving to any different location
				const currentCombatState = state.combat?.isInCombat;
				if (currentCombatState) {
					dispatch({ type: "combat/stopCombat" });
				}
			}

			// Despawn all enemies from the previous place
			const previousEnemyState = state.enemies?.byId || {};
			const enemiesToDespawn = Object.keys(previousEnemyState).filter(
				(id) => previousEnemyState[id].placeId === previousPlaceId,
			);

			Logger.log(
				`Checking for enemies to despawn from ${previousPlaceId}. Enemies found: ${enemiesToDespawn.length}`,
				0,
				"navigation",
			);
			if (enemiesToDespawn.length > 0) {
				Logger.log(
					`Despawning ${enemiesToDespawn.length} enemies from place ${previousPlaceId}`,
					0,
					"navigation",
				);

				// Dispatch action to remove enemies from previous place
				if (dispatch && typeof dispatch === "function") {
					dispatch(removeEnemiesByPlace(previousPlaceId));
				}
			} else {
				Logger.log(
					`No enemies to despawn from ${previousPlaceId}`,
					0,
					"navigation",
				);
			}
		}
	},

	// Subscribe to place changes for cleanup
	subscribeToPlaceChanges(store) {
		let lastPlaceId = store.getState().places.currentPlaceId;
		let isProcessing = false;

		return store.subscribe(() => {
			if (isProcessing) return;

			const state = store.getState();
			const newPlaceId = state.places.currentPlaceId;

			if (newPlaceId !== lastPlaceId) {
				isProcessing = true;
				this.handleNavigation(state, newPlaceId, lastPlaceId, store.dispatch);
				lastPlaceId = newPlaceId;
				isProcessing = false;
			}
		});
	},
};

export default NavigationService;
