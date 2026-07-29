import { describe, it, expect } from "vitest";
import enemiesReducer, {
	addEnemy,
	removeEnemy,
} from "../src/store/slices/enemiesSlice";

describe("enemiesSlice reducer and selectors", () => {
	let state;
	beforeEach(() => {
		state = enemiesReducer(undefined, { type: "" });
	});

	it("should initialize with empty state", () => {
		expect(state.byId).toEqual({});
		expect(state.allIds).toEqual([]);
	});

	it("should handle addEnemy", () => {
		const enemy = { id: "e1", health: 10 };
		const newState = enemiesReducer(state, addEnemy(enemy));
		expect(newState.byId["e1"]).toEqual({ ...enemy, isDead: false });
		expect(newState.allIds).toContain("e1");
	});

	it("should handle removeEnemy", () => {
		let s = enemiesReducer(state, addEnemy({ id: "e1", health: 5 }));
		s = enemiesReducer(s, removeEnemy({ id: "e1" }));
		expect(s.byId).not.toHaveProperty("e1");
		expect(s.allIds).not.toContain("e1");
	});
});
