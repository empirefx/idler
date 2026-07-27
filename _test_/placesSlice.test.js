import { describe, it, expect } from "vitest";
import placesReducer, {
	navigateToPlace,
	selectCurrentPlace,
	selectAvailableConnections,
	selectBackgroundImage,
	selectCurrentPlaceSockets,
} from "../src/store/slices/placesSlice";
import { placesData } from "../src/data/places";

describe("placesSlice reducer and selectors", () => {
	const initialState = placesReducer(undefined, { type: "" });

	it("should have initial currentPlaceId and state", () => {
		expect(initialState.currentPlaceId).toBe("village_center");
	});

	it("should handle navigateToPlace and update availableConnections", () => {
		const targetId = "forest_edge";
		const newState = placesReducer(initialState, navigateToPlace(targetId));
		expect(newState.currentPlaceId).toBe(targetId);
		expect(newState[targetId].visited).toBe(true);
		const expectedConnections = placesData[targetId].connections.length;
		expect(newState.availableConnections.length).toBe(expectedConnections);
	});

	it("selectCurrentPlace returns correct place object", () => {
		const selected = selectCurrentPlace({ places: initialState });
		expect(selected).toEqual(initialState[initialState.currentPlaceId]);
	});

	it("selectBackgroundImage returns the right image", () => {
		const bg = selectBackgroundImage({ places: initialState });
		expect(bg).toBe(placesData.village_center["background-image"]);
	});

	it("selectCurrentPlaceSockets returns sockets and cost", () => {
		const result = selectCurrentPlaceSockets({ places: initialState });
		expect(result.sockets).toEqual(initialState.village_center.sockets);
		expect(result.cost).toBe(initialState.village_center.socketCost);
	});
});
