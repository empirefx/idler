import { describe, it, expect } from "vitest";
import placesReducer, { setPlaces, updateSocket } from "../src/store/slices/placesSlice.js";
import { buildingsToSocketUpdates } from "../src/store/buildingsToSocketUpdates.js";
import { placesData } from "../shared/data/places.js";

describe("buildingsToSocketUpdates", () => {
	it("maps each building field to an occupied socket update", () => {
		const buildings = {
			"farmlands:0": { id: "farm", level: 1, placeId: "farmlands", socketIndex: 0 },
			"farmlands:1": { id: "mine", level: 3, placeId: "farmlands", socketIndex: 1 },
		};
		expect(buildingsToSocketUpdates(buildings)).toEqual([
			{ placeId: "farmlands", socketIndex: 0, data: { status: "occupied", buildingId: "farm", level: 1 } },
			{ placeId: "farmlands", socketIndex: 1, data: { status: "occupied", buildingId: "mine", level: 3 } },
		]);
	});

	it("returns an empty list when buildings is missing", () => {
		expect(buildingsToSocketUpdates(undefined)).toEqual([]);
		expect(buildingsToSocketUpdates(null)).toEqual([]);
	});

	it("reconciles buildings onto the places slice after STATE_SYNC (buildings > sockets > base)", () => {
		let state = placesReducer(undefined, setPlaces(placesData));
		state = placesReducer(state, updateSocket({ placeId: "farmlands", socketIndex: 0, data: { status: "empty" } }));
		const buildings = { "farmlands:0": { id: "farm", level: 2 } };
		for (const update of buildingsToSocketUpdates(buildings)) {
			state = placesReducer(state, updateSocket(update));
		}
		expect(state.farmlands.sockets[0]).toEqual({ status: "occupied", buildingId: "farm", level: 2 });
	});
});
