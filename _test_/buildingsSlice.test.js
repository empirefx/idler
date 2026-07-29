import { describe, it, expect } from "vitest";
import buildingsReducer, {
	updateBuilding,
	setBuildings,
} from "../src/store/slices/buildingsSlice";

describe("buildingsSlice", () => {
	it("should handle setBuildings", () => {
		const initialState = buildingsReducer(undefined, { type: "init" });
		const payload = { foo: { id: "foo", baseProduction: 10 } };
		const newState = buildingsReducer(initialState, setBuildings(payload));
		expect(newState).toEqual(payload);
	});
});
