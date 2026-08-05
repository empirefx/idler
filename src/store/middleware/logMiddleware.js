import { addLog } from "../slices/logSlice";
import { getEnemyDisplayName } from "../../utils/enemyUtils";
import { buildingsData } from "../../../shared/data/buildings";
import { placesData } from "../../../shared/data/places";
import { questCatalog } from "../../../shared/data/questCatalog";
import { skillsCatalog } from "../../../shared/data/skillsData";

const getPlaceName = (placeId) => placesData[placeId]?.name || placeId;

const getSocketBuildingName = (state, placeId, socketIndex) => {
	const socket = state.places?.[placeId]?.sockets?.[socketIndex];
	const buildingId = socket?.buildingId;
	return buildingId ? buildingsData[buildingId]?.name || buildingId : null;
};

const logWorkerDiffs = (store, prevState, nextWorkers) => {
	const oldHired = prevState.player?.workers || [];
	const newHired = nextWorkers.hired || [];
	const oldAvailable = prevState.player?.availablePool || [];
	const newAvailable = nextWorkers.available || [];

	const newHiredIds = new Set(newHired.map((w) => w.id));

	for (const worker of newHired) {
		const prev = oldHired.find((w) => w.id === worker.id);
		if (!prev) {
			store.dispatch(addLog({ message: `You hired ${worker.name}`, category: "worker" }));
		} else if (!prev.assignment && worker.assignment) {
			const buildingName =
				getSocketBuildingName(
					store.getState(),
					worker.assignment.placeId,
					worker.assignment.socketIndex,
				) || "a building";
			store.dispatch(
				addLog({ message: `Worker ${worker.name} assigned to ${buildingName}`, category: "worker" }),
			);
		} else if (prev.assignment && !worker.assignment) {
			const buildingName =
				getSocketBuildingName(
					store.getState(),
					prev.assignment.placeId,
					prev.assignment.socketIndex,
				) || "a building";
			store.dispatch(
				addLog({ message: `Worker ${worker.name} unassigned from ${buildingName}`, category: "worker" }),
			);
		}
	}

	for (const worker of oldHired) {
		if (!newHiredIds.has(worker.id)) {
			store.dispatch(addLog({ message: `You fired ${worker.name}`, category: "worker" }));
		}
	}

	if (oldHired.length === newHired.length) {
		const newAvailIds = new Set(newAvailable.map((w) => w.id));
		const changed =
			oldAvailable.length !== newAvailable.length ||
			oldAvailable.some((w) => !newAvailIds.has(w.id));
		if (changed) {
			store.dispatch(addLog({ message: "Workers rerolled", category: "worker" }));
		}
	}
};

const logSocketDiff = (store, prevState, socket) => {
	const { placeId, socketIndex, status, buildingId, level } = socket;
	const oldSocket = prevState.places?.[placeId]?.sockets?.[socketIndex];
	const oldStatus = oldSocket?.status;
	const placeName = getPlaceName(placeId);

	if (status === "occupied") {
		const buildingName = buildingsData[buildingId]?.name || buildingId;
		if (oldStatus !== "occupied") {
			store.dispatch(addLog({ message: `Built ${buildingName} in ${placeName}`, category: "default" }));
		} else if ((level || 1) > (oldSocket?.level || 1)) {
			store.dispatch(addLog({ message: `Upgraded ${buildingName} to level ${level}`, category: "default" }));
		}
	} else if (status === "empty" && oldStatus === "occupied") {
		const buildingName = buildingsData[oldSocket?.buildingId]?.name || oldSocket?.buildingId;
		store.dispatch(addLog({ message: `Demolished ${buildingName}`, category: "default" }));
	}
};

const logMiddleware = (store) => (next) => (action) => {
	// Don't process log actions to prevent recursion
	if (action.type?.startsWith("logs/")) {
		return next(action);
	}

	const prevState = store.getState();
	const result = next(action);

	switch (action.type) {
		case "APPLY_DIFF": {
			const { path, data, value } = action.payload;
			const val = data !== undefined ? data : value;

			if (path === "player.currentPlaceId") {
				const oldPlaceId = prevState.player?.currentPlaceId;
				if (oldPlaceId && oldPlaceId !== val) {
					store.dispatch(
						addLog({
							message: `Moved from ${getPlaceName(oldPlaceId)} to ${getPlaceName(val)}`,
							category: "movement",
						}),
					);
				}
			} else if (path === "player.gold" && typeof val === "number") {
				const diff = val - (prevState.player?.gold || 0);
				if (diff > 0) {
					store.dispatch(addLog({ message: `You gained ${diff} gold`, category: "default" }));
				}
			} else if (path === "player.exp" && typeof val === "number") {
				const diff = val - (prevState.player?.exp || 0);
				if (diff > 0) {
					store.dispatch(addLog({ message: `You gained ${diff} exp`, category: "combat" }));
				}
			} else if (path === "player.level" && typeof val === "number") {
				store.dispatch(addLog({ message: `You reached level ${val}!`, category: "combat" }));
			} else if (path === "player.autoCombat") {
				store.dispatch(
					addLog({
						message: val ? "Auto-combat enabled" : "Auto-combat disabled",
						category: "combat",
					}),
				);
			} else if (path === "players.workers" && val) {
				logWorkerDiffs(store, prevState, val);
			} else if (path === "sockets" && val) {
				logSocketDiff(store, prevState, val);
			}
			break;
		}

		case "COMBAT_DIFF": {
			const p = action.payload;
			if (!p) break;
			const enemyName = getEnemyDisplayName(prevState, p.enemyId);
			if (p.skillId) {
				const skillName = skillsCatalog[p.skillId]?.name || p.skillId;
				store.dispatch(addLog({ message: `You used ${skillName}`, category: "combat" }));
			}
			if (p.damageDealt > 0) {
				store.dispatch(
					addLog({
						message: `You hit the ${enemyName} for ${p.damageDealt} damage${p.crit ? " (crit!)" : ""}`,
						category: "combat",
					}),
				);
			} else if (!p.skillId && p.hit === false) {
				store.dispatch(addLog({ message: `Your attack missed the ${enemyName}`, category: "combat" }));
			}
			if (p.enemyDead) {
				store.dispatch(
					addLog({
						message: `You defeated the ${enemyName}! +${p.expGained} exp, +${p.goldGained} gold`,
						category: "combat",
					}),
				);
			}
			break;
		}

		case "ENEMY_ATTACK": {
			const p = action.payload;
			if (!p) break;
			const enemyName = getEnemyDisplayName(prevState, p.enemyId);
			if (p.playerDead) {
				store.dispatch(
					addLog({ message: `You were defeated by the ${enemyName}...`, category: "combat" }),
				);
			} else if (p.damageDealt > 0) {
				store.dispatch(
					addLog({ message: `The ${enemyName} hits you for ${p.damageDealt} damage`, category: "combat" }),
				);
			} else if (!p.hit) {
				store.dispatch(addLog({ message: `The ${enemyName} missed you`, category: "combat" }));
			}
			break;
		}

		case "ENEMY_SPAWN": {
			const { placeId, enemies } = action.payload || {};
			if (!placeId || !enemies || enemies.length === 0) break;
			store.dispatch(
				addLog({ message: `Enemies appeared in ${getPlaceName(placeId)}`, category: "movement" }),
			);
			break;
		}

		case "PRODUCTION_TICK": {
			const { workerName, item } = action.payload || {};
			if (!workerName) break;
			const itemName = item?.name || "an item";
			store.dispatch(
				addLog({ message: `Worker ${workerName} made a ${itemName}`, category: "worker" }),
			);
			break;
		}

		case "quests/questAccepted": {
			const { questId, accepted } = action.payload || {};
			if (questId && accepted) {
				store.dispatch(
					addLog({
						message: `Quest accepted: ${questCatalog[questId]?.title || questId}`,
						category: "default",
					}),
				);
			}
			break;
		}

		case "quests/questCompleted": {
			const questId = action.payload?.questId;
			if (questId) {
				store.dispatch(
					addLog({
						message: `Quest completed: ${questCatalog[questId]?.title || questId}`,
						category: "default",
					}),
				);
			}
			break;
		}

		case "notifications/addNotification": {
			const message = action.payload?.message;
			if (message) {
				store.dispatch(addLog({ message, category: "default" }));
			}
			break;
		}

		default:
			break;
	}

	return result;
};

export default logMiddleware;
