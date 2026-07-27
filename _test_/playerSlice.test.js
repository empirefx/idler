import { describe, it, expect } from "vitest";
import playerReducer, {
	unassignWorkerFromSocket,
	assignWorkerToSocket,
	damagePlayer,
	healPlayer,
	setPlayerState,
	gainExp,
	levelUp,
	addWorker,
	selectWorkers,
	selectResources,
	selectPlayer,
	selectAssignedWorkers,
	selectUnassignedWorkers,
	selectGold,
	selectWorkerCount,
	selectMaxWorkers,
} from "../src/store/slices/playerSlice";
import { playerData } from "../src/data/player";

describe("playerSlice reducer and selectors", () => {
	const initialState = playerReducer(undefined, { type: "" });

	it("should initialize state from playerData and selectors", () => {
		expect(initialState.id).toBe(playerData.id);
		expect(initialState.name).toBe(playerData.name);
		expect(initialState.stats).toEqual(playerData.stats);
		expect(selectWorkers({ player: initialState })).toEqual(
			initialState.workers,
		);
		expect(selectResources({ player: initialState })).toEqual(
			initialState.resources,
		);
		expect(selectGold({ player: initialState })).toBe(
			playerData.resources.find((r) => r.name === "gold").amount,
		);
		expect(selectWorkerCount({ player: initialState })).toBe(
			initialState.workers.length,
		);
		expect(selectMaxWorkers({ player: initialState })).toBe(
			playerData.MAX_WORKERS,
		);
	});

	it("should assign and unassign worker", () => {
		let state = playerReducer(
			initialState,
			addWorker({ id: 1, name: "Test Worker" }),
		);
		const workerId = state.workers[0].id;
		state = playerReducer(
			state,
			assignWorkerToSocket({ workerId, placeId: "p1", socketIndex: 0, material: null, buildingName: "b1" }),
		);
		expect(
			state.workers.find((w) => w.id === workerId).assignments["p1"].socketIndex,
		).toBe(0);
		state = playerReducer(state, unassignWorkerFromSocket({ workerId, placeId: "p1" }));
		expect(
			state.workers.find((w) => w.id === workerId).assignments,
		).toEqual({});
	});

	it("should damage and heal player health", () => {
		let state = playerReducer(initialState, damagePlayer({ amount: 10 }));
		const damagedHealth = state.health;
		expect(damagedHealth).toBe(Math.max(0, initialState.health - 10));
		state = playerReducer(state, healPlayer({ amount: 5 }));
		const healedHealth = state.health;
		expect(healedHealth).toBe(
			Math.min(initialState.baseHealth, damagedHealth + 5),
		);
	});

	it("should handle experience gain and level up", () => {
		let state = playerReducer(initialState, gainExp({ amount: 150 }));
		expect(state.exp).toBe(initialState.exp + 150);
		// Level up if enough exp
		const required = initialState.level * 100;
		state = playerReducer(
			state,
			levelUp({ strength: 1, defense: 1, agility: 1, vitality: 1 }),
		);
		if (initialState.exp + 150 >= required) {
			expect(state.level).toBe(initialState.level + 1);
			expect(state.exp).toBe(initialState.exp + 150 - required);
		}
	});

	it("should list assigned and unassigned workers", () => {
		let state = playerReducer(
			initialState,
			addWorker({ id: 1, name: "Test Worker" }),
		);
		const workerId = state.workers[0].id;
		state = playerReducer(
			state,
			assignWorkerToSocket({ workerId, placeId: "p1", socketIndex: 0, material: null, buildingName: "b1" }),
		);
		expect(selectAssignedWorkers({ player: state }).length).toBe(1);
		expect(selectUnassignedWorkers({ player: state }).length).toBe(0);
		expect(selectUnassignedWorkers({ player: initialState }).length).toBe(0);
	});

	it("selectPlayer returns correct UI player object", () => {
		const ui = selectPlayer({ player: initialState });
		expect(ui).toHaveProperty("id", initialState.id);
		expect(ui).toHaveProperty("health", initialState.health);
		expect(ui).toHaveProperty("expToNext", initialState.level * 100);
	});
});
