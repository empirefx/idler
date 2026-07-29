import { describe, it, expect } from "vitest";
import placesReducer, {
	setCurrentPlaceId,
} from "../src/store/slices/placesSlice";

describe("placesSlice reducer and selectors", () => {
	const initialState = placesReducer(undefined, { type: "" });

	it("should have initial currentPlaceId and state", () => {
		expect(initialState.currentPlaceId).toBe("village_center");
	});
});
