import { createSlice } from "@reduxjs/toolkit";
import { buildingsData } from "../../data/buildings";

const initialState = { ...buildingsData };

export const buildingsSlice = createSlice({
	name: "buildings",
	initialState,
	reducers: {
		updateBuilding: (state, action) => {
			const { buildingId, data } = action.payload;
			if (state[buildingId]) {
				state[buildingId] = {
					...state[buildingId],
					...data,
				};
			}
		},
		calculateProduction: (state, action) => {
			const { buildingId } = action.payload;
			if (state[buildingId]) {
				state[buildingId].production = state[buildingId].baseProduction;
			}
		},
		// Set entire buildings state (used for loading saved state)
		setBuildings: (state, action) => action.payload,
	},
});

export const { updateBuilding, setBuildings } = buildingsSlice.actions;

// Selectors
export const selectAllBuildings = (state) => state.buildings;
export const selectBuildingById = (state, buildingId) =>
	state.buildings[buildingId];

// Memoized selectors

export default buildingsSlice.reducer;
