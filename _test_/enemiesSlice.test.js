import { describe, it, expect } from "vitest";
import enemiesReducer, {
	addEnemy,
	removeEnemy,
	removeEnemiesByPlace,
	damageEnemy,
	selectAllEnemies,
	selectEnemiesForCurrentPlace,
	initializeCountdownsForPlace,
} from "../src/store/slices/enemiesSlice";
import { createMockEnemy, createStaggeredEnemy, createNormalEnemy } from "./utils/testHelpers.js";

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
		const placeId = "place1";
		const enemy = { id: "e1", health: 10 };

		const newState = enemiesReducer(state, addEnemy({ placeId, enemy }));

		expect(newState.byId["e1"]).toEqual({
			...enemy,
			placeId,
			nextAttackTime: 0,
			attackDelayRange: [2000, 5000],
			attackPattern: "normal",
			countdown: 0,
			initialAttackDelay: 0,
			isCountdownActive: false,
		});
		expect(newState.allIds).toContain("e1");
	});

	it("should handle removeEnemy", () => {
		let s = enemiesReducer(
			state,
			addEnemy({ placeId: "p", enemy: { id: "e1", health: 5 } }),
		);
		s = enemiesReducer(s, removeEnemy({ id: "e1" }));
		expect(s.byId).not.toHaveProperty("e1");
		expect(s.allIds).not.toContain("e1");
	});

	it("should handle removeEnemiesByPlace", () => {
		let s = enemiesReducer(
			state,
			addEnemy({ placeId: "p1", enemy: { id: "e1", health: 1 } }),
		);
		s = enemiesReducer(
			s,
			addEnemy({ placeId: "p2", enemy: { id: "e2", health: 1 } }),
		);
		s = enemiesReducer(s, removeEnemiesByPlace("p1"));
		expect(s.byId).not.toHaveProperty("e1");
		expect(s.allIds).not.toContain("e1");
		expect(s.byId).toHaveProperty("e2");
		expect(s.allIds).toContain("e2");
	});

	it("should handle damageEnemy and remove on zero health", () => {
		let s = enemiesReducer(
			state,
			addEnemy({ placeId: "p", enemy: { id: "e1", health: 5 } }),
		);
		s = enemiesReducer(s, damageEnemy({ id: "e1", amount: 3 }));
		expect(s.byId["e1"].health).toBe(2);
		s = enemiesReducer(s, damageEnemy({ id: "e1", amount: 5 }));
		expect(s.byId).not.toHaveProperty("e1");
		expect(s.allIds).not.toContain("e1");
	});

	it("selectAllEnemies returns list", () => {
		const s = enemiesReducer(
			state,
			addEnemy({ placeId: "p", enemy: { id: "e1", health: 1 } }),
		);
		const list = selectAllEnemies({ enemies: s });
		expect(list).toEqual([s.byId["e1"]]);
	});

	it("selectEnemiesForCurrentPlace filters by currentPlaceId", () => {
		let s = enemiesReducer(
			state,
			addEnemy({ placeId: "p1", enemy: createMockEnemy("e1", "p1") }),
		);
		s = enemiesReducer(
			s,
			addEnemy({ placeId: "p2", enemy: createMockEnemy("e2", "p2") }),
		);
		const globalState = { enemies: s, places: { currentPlaceId: "p1" } };
		const list = selectEnemiesForCurrentPlace(globalState);
		expect(list).toEqual([s.byId["e1"]]);
	});

	describe("Synchronized Countdown Initialization", () => {
		it("should initialize countdowns for all enemies at a specific place", () => {
			let s = enemiesReducer(
				state,
				addEnemy({
					placeId: "test_place",
					enemy: createStaggeredEnemy("enemy1", "test_place"),
				}),
			);
			s = enemiesReducer(
				s,
				addEnemy({
					placeId: "test_place",
					enemy: {
						id: "enemy2",
						health: 30,
						attackPattern: "staggered",
						attackDelayRange: [2000, 5000],
					},
				}),
			);
			s = enemiesReducer(
				s,
				addEnemy({
					placeId: "other_place",
					enemy: {
						id: "enemy3",
						health: 40,
						attackPattern: "staggered",
						attackDelayRange: [2000, 5000],
					},
				}),
			);

			const action = initializeCountdownsForPlace({
				placeId: "test_place",
				baseTimestamp: 1234567890,
			});

			const result = enemiesReducer(s, action);

			// Check that enemies at test_place have been initialized
			expect(result.byId.enemy1.countdown).toBeGreaterThanOrEqual(2000);
			expect(result.byId.enemy1.countdown).toBeLessThanOrEqual(5000);
			expect(result.byId.enemy1.isCountdownActive).toBe(true);
			expect(result.byId.enemy1.countdownStartTime).toBe(1234567890);

			expect(result.byId.enemy2.countdown).toBeGreaterThanOrEqual(2000);
			expect(result.byId.enemy2.countdown).toBeLessThanOrEqual(5000);
			expect(result.byId.enemy2.isCountdownActive).toBe(true);
			expect(result.byId.enemy2.countdownStartTime).toBe(1234567890);

			// Check that enemy at other_place was not affected
			expect(result.byId.enemy3.countdown).toBe(0);
			expect(result.byId.enemy3.isCountdownActive).toBe(false);
		});

		it("should only affect staggered pattern enemies", () => {
			let s = enemiesReducer(
				state,
				addEnemy({
					placeId: "test_place",
					enemy: createStaggeredEnemy("enemy1", "test_place"),
				}),
			);
			s = enemiesReducer(
				s,
				addEnemy({
					placeId: "test_place",
					enemy: createNormalEnemy("enemy2", "test_place"),
				}),
			);

			const action = initializeCountdownsForPlace({
				placeId: "test_place",
				baseTimestamp: 1234567890,
			});

			const result = enemiesReducer(s, action);

			// Only staggered enemy should be affected
			expect(result.byId.enemy1.isCountdownActive).toBe(true);
			expect(result.byId.enemy1.countdown).toBeGreaterThan(0);

			// Normal pattern enemy should not be affected
			expect(result.byId.enemy2.countdown).toBe(0);
			expect(result.byId.enemy2.isCountdownActive).toBe(false);
		});
	});
});
