import { describe, it, expect } from "vitest";
import { selectAllBuildings } from "../src/store/slices/buildingsSlice";
import { selectEnemiesForCurrentPlace } from "../src/store/slices/enemiesSlice";
import { selectAvailableConnections } from "../src/store/slices/placesSlice";
import { selectAvailableWorkers } from "../src/store/slices/playerSlice";

describe("selector memoization", () => {
	describe("selectAllBuildings", () => {
		it("returns memoized result when state unchanged", () => {
			const state = { buildings: { a: { id: "a" }, b: { id: "b" } } };
			const r1 = selectAllBuildings(state);
			const r2 = selectAllBuildings(state);
			expect(r1).toBe(r2);
		});
	});

	describe("selectEnemiesForCurrentPlace", () => {
		it("returns memoized result when state unchanged", () => {
			const state = {
				enemies: { byId: { e1: { id: "e1", placeId: "village" } }, allIds: ["e1"] },
				places: { currentPlaceId: "village" },
			};
			const r1 = selectEnemiesForCurrentPlace(state);
			const r2 = selectEnemiesForCurrentPlace(state);
			expect(r1).toBe(r2);
		});
	});

	describe("selectAvailableConnections", () => {
		it("returns memoized result when state unchanged", () => {
			const state = {
				places: {
					currentPlaceId: "village",
					village: { id: "village", connections: ["forest"] },
					forest: { id: "forest" },
				},
			};
			const r1 = selectAvailableConnections(state);
			const r2 = selectAvailableConnections(state);
			expect(r1).toBe(r2);
		});
	});

	describe("selectAvailableWorkers", () => {
		it("returns memoized result when state unchanged", () => {
			const state = {
				player: { workers: [{ id: "w1", assigned: false }] },
			};
			const r1 = selectAvailableWorkers(state);
			const r2 = selectAvailableWorkers(state);
			expect(r1).toBe(r2);
		});
	});
});
