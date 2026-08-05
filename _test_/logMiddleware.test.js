import { describe, it, expect } from "vitest";
import { createStore } from "redux";
import logMiddleware from "../src/store/middleware/logMiddleware.js";
import { questCatalog } from "../shared/data/questCatalog.js";

const baseState = () => ({
	player: {
		gold: 100,
		exp: 0,
		level: 1,
		currentPlaceId: "village_center",
		workers: [],
		availablePool: [],
		autoCombat: false,
	},
	places: {
		village_center: {
			name: "Village Center",
			sockets: [{ status: "occupied", buildingId: "farm", level: 1 }, { status: "locked" }],
		},
		forest_edge: { name: "Forest Edge", sockets: [] },
	},
	enemies: {
		byId: { e1: { id: "e1", name: "Forest Beast", placeId: "forest_edge", hp: 30 } },
	},
});

const rootReducer = (state = baseState()) => state;

function makeStore(state) {
	const logs = [];
	const store = createStore(rootReducer, state);
	const originalDispatch = store.dispatch.bind(store);
	const middleware = logMiddleware(store)(originalDispatch);
	store.dispatch = (action) => {
		if (action.type === "logs/addLog") {
			logs.push(action.payload);
			return action;
		}
		middleware(action);
		return action;
	};
	return { store, logs };
}

const applyDiff = (store, path, val) =>
	store.dispatch({ type: "APPLY_DIFF", payload: { path, data: val } });

describe("logMiddleware APPLY_DIFF", () => {
	it("logs movement from place to place", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "player.currentPlaceId", "forest_edge");
		expect(logs).toEqual([
			{ message: "Moved from Village Center to Forest Edge", category: "movement" },
		]);
	});

	it("does not log moving to the current place", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "player.currentPlaceId", "village_center");
		expect(logs).toHaveLength(0);
	});

	it("logs positive gold gains under default", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "player.gold", 150);
		expect(logs).toEqual([{ message: "You gained 50 gold", category: "default" }]);
	});

	it("does not log gold spending", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "player.gold", 50);
		expect(logs).toHaveLength(0);
	});

	it("logs positive exp gains under combat", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "player.exp", 25);
		expect(logs).toEqual([{ message: "You gained 25 exp", category: "combat" }]);
	});

	it("logs level ups", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "player.level", 2);
		expect(logs).toEqual([{ message: "You reached level 2!", category: "combat" }]);
	});

	it("logs auto-combat toggles", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "player.autoCombat", true);
		expect(logs).toEqual([{ message: "Auto-combat enabled", category: "combat" }]);
	});
});

describe("logMiddleware workers", () => {
	it("logs hiring a worker", () => {
		const state = baseState();
		state.player.availablePool = [{ id: "w1", name: "Bob", assignment: null }];
		const { store, logs } = makeStore(state);
		applyDiff(store, "players.workers", {
			hired: [{ id: "w1", name: "Bob", assignment: null }],
			available: [],
			workerSlots: 1,
		});
		expect(logs).toEqual([{ message: "You hired Bob", category: "worker" }]);
	});

	it("logs assigning a worker to a building", () => {
		const state = baseState();
		state.player.workers = [{ id: "w1", name: "Bob", assignment: null }];
		const { store, logs } = makeStore(state);
		applyDiff(store, "players.workers", {
			hired: [
				{ id: "w1", name: "Bob", assignment: { placeId: "village_center", socketIndex: 0, material: "wheat" } },
			],
			available: [],
		});
		expect(logs).toEqual([
			{ message: "Worker Bob assigned to Farm", category: "worker" },
		]);
	});

	it("logs unassigning a worker", () => {
		const state = baseState();
		state.player.workers = [
			{ id: "w1", name: "Bob", assignment: { placeId: "village_center", socketIndex: 0, material: "wheat" } },
		];
		const { store, logs } = makeStore(state);
		applyDiff(store, "players.workers", {
			hired: [{ id: "w1", name: "Bob", assignment: null }],
			available: [],
		});
		expect(logs).toEqual([
			{ message: "Worker Bob unassigned from Farm", category: "worker" },
		]);
	});

	it("logs firing a worker", () => {
		const state = baseState();
		state.player.workers = [{ id: "w1", name: "Bob", assignment: null }];
		const { store, logs } = makeStore(state);
		applyDiff(store, "players.workers", { hired: [], available: [] });
		expect(logs).toEqual([{ message: "You fired Bob", category: "worker" }]);
	});

	it("logs worker rerolls", () => {
		const state = baseState();
		state.player.availablePool = [{ id: "a1", name: "Alice" }];
		const { store, logs } = makeStore(state);
		applyDiff(store, "players.workers", {
			hired: [],
			available: [{ id: "a2", name: "Charlie" }],
		});
		expect(logs).toEqual([{ message: "Workers rerolled", category: "worker" }]);
	});
});

describe("logMiddleware sockets", () => {
	it("logs building on an empty socket", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "sockets", {
			placeId: "village_center",
			socketIndex: 1,
			status: "occupied",
			buildingId: "farm",
			level: 1,
		});
		expect(logs).toEqual([{ message: "Built Farm in Village Center", category: "default" }]);
	});

	it("logs upgrading a building", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "sockets", {
			placeId: "village_center",
			socketIndex: 0,
			status: "occupied",
			buildingId: "farm",
			level: 2,
		});
		expect(logs).toEqual([{ message: "Upgraded Farm to level 2", category: "default" }]);
	});

	it("logs demolishing a building", () => {
		const { store, logs } = makeStore(baseState());
		applyDiff(store, "sockets", {
			placeId: "village_center",
			socketIndex: 0,
			status: "empty",
		});
		expect(logs).toEqual([{ message: "Demolished Farm", category: "default" }]);
	});
});

describe("logMiddleware combat", () => {
	it("logs a critical hit", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "COMBAT_DIFF",
			payload: { enemyId: "e1", hit: true, damageDealt: 20, crit: true },
		});
		expect(logs).toEqual([
			{ message: "You hit the Forest Beast for 20 damage (crit!)", category: "combat" },
		]);
	});

	it("logs a plain hit without crit", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "COMBAT_DIFF",
			payload: { enemyId: "e1", hit: true, damageDealt: 15, crit: false },
		});
		expect(logs).toEqual([{ message: "You hit the Forest Beast for 15 damage", category: "combat" }]);
	});

	it("logs a missed attack", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "COMBAT_DIFF",
			payload: { enemyId: "e1", hit: false, damageDealt: 0 },
		});
		expect(logs).toEqual([
			{ message: "Your attack missed the Forest Beast", category: "combat" },
		]);
	});

	it("logs skill usage and a kill with rewards", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "COMBAT_DIFF",
			payload: { enemyId: "e1", hit: true, damageDealt: 30, crit: false, skillId: "shieldBash", enemyDead: true, expGained: 10, goldGained: 5 },
		});
		expect(logs).toEqual([
			{ message: "You used Shield Bash", category: "combat" },
			{ message: "You hit the Forest Beast for 30 damage", category: "combat" },
			{ message: "You defeated the Forest Beast! +10 exp, +5 gold", category: "combat" },
		]);
	});

	it("logs enemy hits and misses", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "ENEMY_ATTACK",
			payload: { enemyId: "e1", damageDealt: 8, hit: true, playerHp: 92, playerDead: false },
		});
		store.dispatch({
			type: "ENEMY_ATTACK",
			payload: { enemyId: "e1", damageDealt: 0, hit: false, playerHp: 92, playerDead: false },
		});
		expect(logs).toEqual([
			{ message: "The Forest Beast hits you for 8 damage", category: "combat" },
			{ message: "The Forest Beast missed you", category: "combat" },
		]);
	});

	it("logs player defeat", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "ENEMY_ATTACK",
			payload: { enemyId: "e1", damageDealt: 100, hit: true, playerHp: 0, playerDead: true },
		});
		expect(logs).toEqual([
			{ message: "You were defeated by the Forest Beast...", category: "combat" },
		]);
	});
});

describe("logMiddleware other messages", () => {
	it("logs enemy spawns with the place name", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "ENEMY_SPAWN",
			payload: { enemies: [{ id: "e1", name: "Forest Beast" }], placeId: "forest_edge" },
		});
		expect(logs).toEqual([
			{ message: "Enemies appeared in Forest Edge", category: "movement" },
		]);
	});

	it("does not log empty enemy spawns", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({ type: "ENEMY_SPAWN", payload: { enemies: [], placeId: "forest_edge" } });
		expect(logs).toHaveLength(0);
	});

	it("logs produced items with worker name", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "PRODUCTION_TICK",
			payload: { workerName: "Bob", item: { name: "Wheat" } },
		});
		expect(logs).toEqual([{ message: "Worker Bob made a Wheat", category: "worker" }]);
	});

	it("logs quest accept and complete", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "quests/questAccepted",
			payload: { questId: "help_village_kill_monsters", progress: {} },
		});
		const title = questCatalog.help_village_kill_monsters.title;
		store.dispatch({
			type: "quests/questCompleted",
			payload: { questId: "help_village_kill_monsters" },
		});
		expect(logs).toEqual([
			{ message: `Quest accepted: ${title}`, category: "default" },
			{ message: `Quest completed: ${title}`, category: "default" },
		]);
	});

	it("logs notifications under default", () => {
		const { store, logs } = makeStore(baseState());
		store.dispatch({
			type: "notifications/addNotification",
			payload: { message: "Bob stopped producing Wheat (inventory full)", type: "warning" },
		});
		expect(logs).toEqual([
			{ message: "Bob stopped producing Wheat (inventory full)", category: "default" },
		]);
	});
});
