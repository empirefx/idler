import Logger from "../utils/Logger";
import { workerNames } from "../../data/workerNames";
import {
	PLAYER_INTENT_HIRE_WORKER,
	PLAYER_INTENT_REROLL_WORKERS,
	PLAYER_INTENT_BUY_WORKER_SLOT,
	PLAYER_INTENT_FIRE_WORKER,
	WORKER_HIRED,
	WORKER_REROLLED,
	WORKER_SLOT_PURCHASED,
	WORKER_FIRED,
	WORKER_HIRE_FAILED,
	WORKER_REROLL_FAILED,
	WORKER_SLOT_FAILED,
	WORKER_FIRE_FAILED,
	workerHired,
	workerRerolled,
	workerSlotPurchased,
	workerFired,
	workerHireFailed,
	workerRerollFailed,
	workerSlotFailed,
	workerFireFailed,
} from "../events";
import { selectWorkers, selectWorkerSlots, selectGold } from "../../store/slices/playerSlice";

const REROLL_COST = 25;
const SLOT_COST = 200;
const FIRE_COST = 25;
const BASE_WORKER_COST = 50;
const WORKER_COST_MULTIPLIER = 25;

export default class WorkerService {
	constructor(store, dispatch, eventBus) {
		this.store = store;
		this.dispatch = dispatch;
		this.eventBus = eventBus;

		this.registerHandlers();
		this.initializeAvailableWorkers();
	}

	getState() {
		return this.store.getState();
	}

	registerHandlers() {
		this.eventBus.on(PLAYER_INTENT_HIRE_WORKER, ({ workerId }) => {
			this.hireWorker(workerId);
		});

		this.eventBus.on(PLAYER_INTENT_REROLL_WORKERS, () => {
			this.rerollWorkers();
		});

		this.eventBus.on(PLAYER_INTENT_BUY_WORKER_SLOT, () => {
			this.buyWorkerSlot();
		});

		this.eventBus.on(PLAYER_INTENT_FIRE_WORKER, ({ workerId }) => {
			this.fireWorker(workerId);
		});
	}

	initializeAvailableWorkers() {
		const state = this.getState();
		const existingWorkers = state.player.availableWorkers;
		if (existingWorkers && existingWorkers.length > 0) {
			return;
		}
		const workers = this.generateAvailableWorkers();
		this.dispatch({ type: "player/updateAvailableWorkers", payload: workers });
	}

	generateAvailableWorkers() {
		const count = 3 + Math.floor(Math.random() * 3);
		const workers = [];

		for (let i = 0; i < count; i++) {
			workers.push(this.generateRandomWorker());
		}

		return workers;
	}

	generateRandomWorker() {
		const isMale = Math.random() > 0.5;
		const names = isMale ? workerNames.male : workerNames.female;
		const firstName = names[Math.floor(Math.random() * names.length)];

		return {
			id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			firstName,
			gender: isMale ? "male" : "female",
			avatar: isMale ? "worker_m.jpg" : "worker_f.jpg",
		};
	}

	getWorkerCost() {
		const state = this.getState();
		const workerCount = selectWorkers(state).length;
		return BASE_WORKER_COST + workerCount * WORKER_COST_MULTIPLIER;
	}

	getGold() {
		return selectGold(this.getState());
	}

	getWorkerSlots() {
		return selectWorkerSlots(this.getState());
	}

	getCurrentWorkers() {
		return selectWorkers(this.getState());
	}

	canHireWorker(workerId) {
		const state = this.getState();
		const availableWorkers = state.player.availableWorkers;
		const worker = availableWorkers.find((w) => w.id === workerId);

		if (!worker) {
			return { valid: false, error: "Worker not found in available pool" };
		}

		const workerCount = this.getCurrentWorkers().length;
		const slots = this.getWorkerSlots();

		if (workerCount >= slots) {
			return { valid: false, error: "No worker slots available" };
		}

		const cost = this.getWorkerCost();
		const gold = this.getGold();

		if (gold < cost) {
			return { valid: false, error: `Not enough gold. Need ${cost}g` };
		}

		return { valid: true, cost };
	}

	hireWorker(workerId) {
		const validation = this.canHireWorker(workerId);

		if (!validation.valid) {
			Logger.log(`Worker hire failed: ${validation.error}`, 0, "worker");
			this.dispatch(workerHireFailed(validation.error));
			this.eventBus.emit(WORKER_HIRE_FAILED, { error: validation.error });
			return;
		}

		const state = this.getState();
		const availableWorkers = state.player.availableWorkers;
		const workerToHire = availableWorkers.find((w) => w.id === workerId);

		if (!workerToHire) {
			this.dispatch(workerHireFailed("Worker not found"));
			this.eventBus.emit(WORKER_HIRE_FAILED, { error: "Worker not found" });
			return;
		}

		const cost = this.getWorkerCost();

		this.dispatch({ type: "player/spendGold", payload: cost });

		const newWorker = {
			id: this.getNextWorkerId(),
			name: workerToHire.firstName,
			avatar: workerToHire.avatar,
			assignedBuildingId: null,
		};

		this.dispatch({ type: "player/addWorker", payload: newWorker });

		const remainingWorkers = availableWorkers.filter((w) => w.id !== workerId);
		this.dispatch({ type: "player/updateAvailableWorkers", payload: remainingWorkers });

		this.dispatch(workerHired(newWorker));
		this.eventBus.emit(WORKER_HIRED, { worker: newWorker });
		Logger.log(`Worker hired: ${newWorker.name} for ${cost}g`, 0, "worker");
	}

	getNextWorkerId() {
		const workers = this.getCurrentWorkers();
		if (!workers || workers.length === 0) return 1;
		return Math.max(...workers.map((w) => w.id)) + 1;
	}

	canRerollWorkers() {
		const gold = this.getGold();

		if (gold < REROLL_COST) {
			return { valid: false, error: `Not enough gold. Need ${REROLL_COST}g` };
		}

		return { valid: true };
	}

	rerollWorkers() {
		const validation = this.canRerollWorkers();

		if (!validation.valid) {
			Logger.log(`Worker reroll failed: ${validation.error}`, 0, "worker");
			this.dispatch(workerRerollFailed(validation.error));
			this.eventBus.emit(WORKER_REROLL_FAILED, { error: validation.error });
			return;
		}

		this.dispatch({ type: "player/spendGold", payload: REROLL_COST });

		const newWorkers = this.generateAvailableWorkers();
		this.dispatch({ type: "player/updateAvailableWorkers", payload: newWorkers });

		this.dispatch(workerRerolled(newWorkers));
		this.eventBus.emit(WORKER_REROLLED, { availableWorkers: newWorkers });
		Logger.log(`Workers rerolled for ${REROLL_COST}g`, 0, "worker");
	}

	canBuyWorkerSlot() {
		const gold = this.getGold();

		if (gold < SLOT_COST) {
			return { valid: false, error: `Not enough gold. Need ${SLOT_COST}g` };
		}

		return { valid: true, cost: SLOT_COST };
	}

	buyWorkerSlot() {
		const validation = this.canBuyWorkerSlot();

		if (!validation.valid) {
			Logger.log(`Worker slot purchase failed: ${validation.error}`, 0, "worker");
			this.dispatch(workerSlotFailed(validation.error));
			this.eventBus.emit(WORKER_SLOT_FAILED, { error: validation.error });
			return;
		}

		this.dispatch({ type: "player/spendGold", payload: SLOT_COST });
		this.dispatch({ type: "player/incrementWorkerSlots", payload: 1 });

		const newSlotCount = this.getWorkerSlots();
		this.dispatch(workerSlotPurchased(newSlotCount));
		this.eventBus.emit(WORKER_SLOT_PURCHASED, { newSlotCount });
		Logger.log(`Worker slot purchased. Total: ${newSlotCount}g`, 0, "worker");
	}

	canFireWorker(workerId) {
		const state = this.getState();
		const workers = selectWorkers(state);
		const worker = workers.find((w) => w.id === workerId);
		const gold = selectGold(state);

		if (!worker) {
			return { valid: false, error: "Worker not found" };
		}

		if (gold < FIRE_COST) {
			return { valid: false, error: `Not enough gold. Need ${FIRE_COST}g to fire a worker` };
		}

		return { valid: true, cost: FIRE_COST };
	}

	fireWorker(workerId) {
		const validation = this.canFireWorker(workerId);

		if (!validation.valid) {
			Logger.log(`Worker fire failed: ${validation.error}`, 0, "worker");
			this.dispatch(workerFireFailed(validation.error));
			this.eventBus.emit(WORKER_FIRE_FAILED, { error: validation.error });
			return;
		}

		const state = this.getState();
		const workers = selectWorkers(state);
		const worker = workers.find((w) => w.id === workerId);

		this.dispatch({ type: "player/spendGold", payload: FIRE_COST });
		this.dispatch({ type: "player/removeWorker", payload: workerId });
		this.dispatch(workerFired(workerId, worker?.name));
		this.eventBus.emit(WORKER_FIRED, { workerId, workerName: worker?.name });
		Logger.log(`Worker fired: ${worker?.name} for ${FIRE_COST}g`, 0, "worker");
	}
}
