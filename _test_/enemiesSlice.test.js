import { describe, it, expect, beforeEach } from "vitest";
import enemiesReducer, {
	addEnemy,
	removeEnemy,
	updateEnemy,
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

	it("should handle updateEnemy merging fields onto an existing enemy", () => {
		let s = enemiesReducer(state, addEnemy({ id: "e1", hp: 30, placeId: "forest_edge" }));
		s = enemiesReducer(s, updateEnemy({ id: "e1", nextAttackAt: 1000, nextAttackDelay: 200 }));
		expect(s.byId["e1"].nextAttackAt).toBe(1000);
		expect(s.byId["e1"].nextAttackDelay).toBe(200);
		expect(s.byId["e1"].hp).toBe(30);
	});

	it("updateEnemy ignores unknown ids", () => {
		const s = enemiesReducer(state, updateEnemy({ id: "nope", nextAttackAt: 1 }));
		expect(s.byId).toEqual({});
	});
});
