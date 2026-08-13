import { describe, it, expect, beforeEach } from "vitest";
import enemiesReducer, {
	addEnemy,
	removeEnemy,
	updateEnemy,
	spawnEnemies,
	setEnemies,
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

	it("spawnEnemies replaces the list but preserves same-place dead enemies still animating", () => {
		let s = enemiesReducer(state, addEnemy({ id: "dying", hp: 30, placeId: "forest_edge" }));
		s = enemiesReducer(s, updateEnemy({ id: "dying", hp: 0, isDead: true }));
		s = enemiesReducer(s, addEnemy({ id: "old", hp: 10, placeId: "forest_edge" }));
		const fresh = [
			{ id: "new1", hp: 50, placeId: "forest_edge" },
			{ id: "new2", hp: 50, placeId: "forest_edge" },
		];
		const next = enemiesReducer(s, spawnEnemies({ enemies: fresh, placeId: "forest_edge" }));
		expect(Object.keys(next.byId).sort()).toEqual(["dying", "new1", "new2"]);
		expect(next.byId["dying"].isDead).toBe(true);
		expect(next.byId["old"]).toBeUndefined();
		expect(next.byId["new1"].hp).toBe(50);
	});

	it("spawnEnemies keeps a dead-animating enemy in its current position instead of appending it to the end", () => {
		let s = enemiesReducer(state, addEnemy({ id: "a", hp: 50, placeId: "forest_edge" }));
		s = enemiesReducer(s, addEnemy({ id: "b", hp: 50, placeId: "forest_edge" }));
		s = enemiesReducer(s, addEnemy({ id: "c", hp: 50, placeId: "forest_edge" }));
		s = enemiesReducer(s, updateEnemy({ id: "b", hp: 0, isDead: true }));
		const fresh = [
			{ id: "a", hp: 40, placeId: "forest_edge" },
			{ id: "c", hp: 30, placeId: "forest_edge" },
		];
		const next = enemiesReducer(s, spawnEnemies({ enemies: fresh, placeId: "forest_edge" }));
		expect(next.allIds).toEqual(["a", "b", "c"]);
	});

	it("spawnEnemies keeps the existing relative order when the server sends survivors in a different order", () => {
		let s = enemiesReducer(state, addEnemy({ id: "x", hp: 50, placeId: "forest_edge" }));
		s = enemiesReducer(s, addEnemy({ id: "y", hp: 50, placeId: "forest_edge" }));
		s = enemiesReducer(s, addEnemy({ id: "z", hp: 50, placeId: "forest_edge" }));
		const fresh = [
			{ id: "z", hp: 40, placeId: "forest_edge" },
			{ id: "y", hp: 30, placeId: "forest_edge" },
		];
		const next = enemiesReducer(s, spawnEnemies({ enemies: fresh, placeId: "forest_edge" }));
		expect(next.allIds).toEqual(["y", "z"]);
	});

	it("spawnEnemies appends genuinely new enemies after existing ones", () => {
		let s = enemiesReducer(state, addEnemy({ id: "a", hp: 50, placeId: "forest_edge" }));
		const fresh = [
			{ id: "a", hp: 50, placeId: "forest_edge" },
			{ id: "fresh", hp: 50, placeId: "forest_edge" },
		];
		const next = enemiesReducer(s, spawnEnemies({ enemies: fresh, placeId: "forest_edge" }));
		expect(next.allIds).toEqual(["a", "fresh"]);
	});

	it("spawnEnemies drops dead enemies from other places", () => {
		let s = enemiesReducer(state, addEnemy({ id: "deadFar", hp: 30, placeId: "village_center" }));
		s = enemiesReducer(s, updateEnemy({ id: "deadFar", hp: 0, isDead: true }));
		s = enemiesReducer(s, addEnemy({ id: "deadHere", hp: 30, placeId: "forest_edge" }));
		s = enemiesReducer(s, updateEnemy({ id: "deadHere", hp: 0, isDead: true }));
		const fresh = [{ id: "new1", hp: 50, placeId: "forest_edge" }];
		const next = enemiesReducer(s, spawnEnemies({ enemies: fresh, placeId: "forest_edge" }));
		expect(Object.keys(next.byId).sort()).toEqual(["deadHere", "new1"]);
	});

	it("setEnemies preserves the client's current order for enemies it already knows", () => {
		let s = enemiesReducer(state, addEnemy({ id: "a", hp: 50, placeId: "forest_edge" }));
		s = enemiesReducer(s, addEnemy({ id: "b", hp: 50, placeId: "forest_edge" }));
		s = enemiesReducer(s, addEnemy({ id: "c", hp: 50, placeId: "forest_edge" }));
		const serverSnapshot = {
			byId: {
				b: { id: "b", hp: 40, placeId: "forest_edge" },
				a: { id: "a", hp: 30, placeId: "forest_edge" },
				c: { id: "c", hp: 20, placeId: "forest_edge" },
				fresh: { id: "fresh", hp: 50, placeId: "forest_edge" },
			},
			allIds: ["b", "a", "c", "fresh"],
		};
		const next = enemiesReducer(s, setEnemies(serverSnapshot));
		expect(next.allIds).toEqual(["a", "b", "c", "fresh"]);
		expect(Object.values(next.byId).map((e) => e.id)).toEqual(["a", "b", "c", "fresh"]);
	});

	it("setEnemies keeps an animating dead enemy in the current place during a reconnect", () => {
		let s = enemiesReducer(state, addEnemy({ id: "dead", hp: 0, placeId: "forest_edge" }));
		s = enemiesReducer(s, updateEnemy({ id: "dead", hp: 0, isDead: true }));
		s = enemiesReducer(s, addEnemy({ id: "live", hp: 50, placeId: "forest_edge" }));
		const snapshot = { byId: { live: { id: "live", hp: 45, placeId: "forest_edge" } }, allIds: ["live"], placeId: "forest_edge" };
		const next = enemiesReducer(s, setEnemies(snapshot));
		expect(next.allIds).toEqual(["dead", "live"]);
	});
});
