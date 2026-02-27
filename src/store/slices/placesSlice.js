import { createSlice, createSelector } from "@reduxjs/toolkit";
import { placesData } from "../../data/places";

const initialState = {
	...placesData,
	currentPlaceId: "village_center",
	previousPlaceId: null,
	availableConnections: [],
};

const currentPlace = placesData[initialState.currentPlaceId];
if (currentPlace?.connections) {
	initialState.availableConnections = currentPlace.connections.map(
		(placeId) => ({
			id: placeId,
			...placesData[placeId],
		}),
	);
}

const updateAvailableConnections = (state) => {
	const currentPlace = state[state.currentPlaceId];
	if (currentPlace?.connections) {
		state.availableConnections = currentPlace.connections.map((placeId) => ({
			id: placeId,
			...state[placeId],
		}));
	} else {
		state.availableConnections = [];
	}
};

export const placesSlice = createSlice({
	name: "places",
	initialState,
	reducers: {
		navigateToPlace: (state, action) => {
			const placeId = action.payload;
			if (
				state[placeId] &&
				(state[state.currentPlaceId].connections.includes(placeId) ||
					placeId === state.currentPlaceId)
			) {
				state.previousPlaceId = state.currentPlaceId;
				state.currentPlaceId = placeId;
				state[placeId].visited = true;
				updateAvailableConnections(state);
			}
		},
		setPlaces: (_state, action) => action.payload,
		buySocket: (state, action) => {
			const { placeId, socketIndex } = action.payload;
			const place = state[placeId];
			if (place && place.sockets && place.sockets[socketIndex]) {
				place.sockets[socketIndex].status = "empty";
			}
		},
		buildBuilding: (state, action) => {
			const { placeId, socketIndex, buildingId } = action.payload;
			const place = state[placeId];
			if (place && place.sockets && place.sockets[socketIndex]) {
				place.sockets[socketIndex] = {
					status: "occupied",
					buildingId,
					level: 1,
				};
			}
		},
		upgradeBuilding: (state, action) => {
			const { placeId, socketIndex } = action.payload;
			const place = state[placeId];
			if (place && place.sockets && place.sockets[socketIndex]) {
				const socket = place.sockets[socketIndex];
				if (socket.status === "occupied") {
					socket.level = (socket.level || 1) + 1;
				}
			}
		},
		demolishBuilding: (state, action) => {
			const { placeId, socketIndex } = action.payload;
			const place = state[placeId];
			if (place && place.sockets && place.sockets[socketIndex]) {
				place.sockets[socketIndex] = { status: "empty" };
			}
		},
	},

	extraReducers: (builder) => {
		builder.addCase("@@INIT", (state) => {
			updateAvailableConnections(state);
		});
		builder.addMatcher(
			(action) => action.type === "places/navigateToPlace",
			(state) => {
				updateAvailableConnections(state);
			},
		);
	},
});

export const { navigateToPlace, setPlaces, buySocket, buildBuilding, upgradeBuilding, demolishBuilding } = placesSlice.actions;

export const selectCurrentPlaceId = (state) => state.places.currentPlaceId;
export const selectCurrentPlace = (state) =>
	state.places[state.places.currentPlaceId];
export const selectAvailableConnections = (state) =>
	state.places.availableConnections;
export const selectBackgroundImage = (state) => {
	const currentPlace = state.places[state.places.currentPlaceId];
	return currentPlace ? currentPlace["background-image"] : null;
};

export const selectCurrentPlaceSockets = createSelector(
	[(state) => state.places[state.places.currentPlaceId]],
	(place) => ({
		sockets: place?.sockets || [],
		cost: place?.socketCost || 100,
	})
);

export const selectPlaceSocketInfo = (placeId) => createSelector(
	[(state) => state.places[placeId]],
	(place) => ({
		sockets: place?.sockets || [],
		cost: place?.socketCost || 100,
	})
);

export default placesSlice.reducer;
