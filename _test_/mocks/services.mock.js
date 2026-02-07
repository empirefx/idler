// Mock Redux store for testing
export const createMockStore = (initialState = {}) => {
	let state = { ...initialState };
	const listeners = [];

	return {
		getState: vi.fn(() => state),
		dispatch: vi.fn((action) => {
			// Simulate state changes for known actions
			if (action.type === "player/setPlayerState") {
				state.player = { ...state.player, ...action.payload };
			}
			if (action.type === "buildings/setBuildings") {
				state.buildings = { ...state.buildings, ...action.payload };
			}
			if (action.type === "places/setPlaces") {
				state.places = { ...state.places, ...action.payload };
			}
			if (action.type === "enemies/addEnemy") {
				state.enemies = state.enemies || { byId: {} };
				state.enemies.byId[action.payload.placeId] = action.payload.enemy;
			}
			if (action.type === "enemies/damageEnemy") {
				if (state.enemies && state.enemies.byId[action.payload.id]) {
					state.enemies.byId[action.payload.id].health = Math.max(
						0,
						state.enemies.byId[action.payload.id].health -
							action.payload.amount,
					);
				}
			}
		}),
		subscribe: vi.fn((listener) => {
			listeners.push(listener);
			return vi.fn(() => {
				const index = listeners.indexOf(listener);
				if (index > -1) {
					listeners.splice(index, 1);
				}
			});
		}),
		// Helper method to trigger subscriptions in tests
		_triggerListeners: () => {
			listeners.forEach((listener) => listener());
		},
		// Helper method to update state for tests
		_updateState: (newState) => {
			state = { ...state, ...newState };
		},
	};
};
