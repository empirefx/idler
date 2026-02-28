import Logger from "../utils/Logger";
import {
	PLAYER_INTENT_BUY_SOCKET,
	PLAYER_INTENT_BUILD,
	PLAYER_INTENT_UPGRADE,
	PLAYER_INTENT_DEMOLISH,
	buildSuccess,
	buildFailed,
} from "../events";

export default class BuildingService {
	constructor(store, dispatch, eventBus, buildingsData) {
		this.store = store;
		this.dispatch = dispatch;
		this.eventBus = eventBus;
		this.buildingsData = buildingsData;

		this.registerHandlers();
	}

	registerHandlers() {
		this.eventBus.on(PLAYER_INTENT_BUY_SOCKET, ({ placeId, socketIndex }) => {
			this.buySocket(placeId, socketIndex);
		});

		this.eventBus.on(
			PLAYER_INTENT_BUILD,
			({ placeId, socketIndex, buildingId }) => {
				this.buildBuilding(placeId, socketIndex, buildingId);
			},
		);

		this.eventBus.on(PLAYER_INTENT_UPGRADE, ({ placeId, socketIndex }) => {
			this.upgradeBuilding(placeId, socketIndex);
		});

		this.eventBus.on(PLAYER_INTENT_DEMOLISH, ({ placeId, socketIndex }) => {
			this.demolishBuilding(placeId, socketIndex);
		});
	}

	getState() {
		return this.store.getState();
	}

	getPlace(placeId) {
		return this.getState().places[placeId];
	}

	getGold() {
		return (
			this.getState().player.resources.find((r) => r.name === "gold")?.amount ||
			0
		);
	}

	getBuildingDefinition(buildingId) {
		return this.buildingsData[buildingId];
	}

	getSocketCost(placeId) {
		const place = this.getPlace(placeId);
		return place?.socketCost || 100;
	}

	canBuySocket(placeId, socketIndex) {
		const place = this.getPlace(placeId);
		if (!place || !place.sockets || !place.sockets[socketIndex]) {
			return { valid: false, error: "Invalid place or socket" };
		}

		const socket = place.sockets[socketIndex];
		if (socket.status !== "locked") {
			return { valid: false, error: "Socket is not locked" };
		}

		const cost = this.getSocketCost(placeId);
		const gold = this.getGold();

		if (gold < cost) {
			return { valid: false, error: `Not enough gold. Need ${cost}g` };
		}

		return { valid: true, cost };
	}

	buySocket(placeId, socketIndex) {
		const validation = this.canBuySocket(placeId, socketIndex);

		if (!validation.valid) {
			Logger.log(`BuySocket failed: ${validation.error}`, 1, "building");
			this.dispatch(
				buildFailed("buySocket", placeId, socketIndex, validation.error),
			);
			return;
		}

		this.dispatch({
			type: "places/buySocket",
			payload: { placeId, socketIndex },
		});
		this.dispatch({ type: "player/spendGold", payload: validation.cost });

		Logger.log(
			`Bought socket ${socketIndex} at ${placeId} for ${validation.cost}g`,
			1,
			"building",
		);
		this.dispatch(
			buildSuccess("buySocket", placeId, socketIndex, {
				cost: validation.cost,
			}),
		);
	}

	canBuild(placeId, socketIndex, buildingId) {
		const place = this.getPlace(placeId);
		if (!place || !place.sockets || !place.sockets[socketIndex]) {
			return { valid: false, error: "Invalid place or socket" };
		}

		const socket = place.sockets[socketIndex];
		if (socket.status !== "empty") {
			return { valid: false, error: "Socket is not empty" };
		}

		const building = this.getBuildingDefinition(buildingId);
		if (!building) {
			return { valid: false, error: "Invalid building type" };
		}

		const gold = this.getGold();
		if (gold < building.buildCost) {
			return {
				valid: false,
				error: `Not enough gold. Need ${building.buildCost}g`,
			};
		}

		return { valid: true, cost: building.buildCost };
	}

	buildBuilding(placeId, socketIndex, buildingId) {
		const validation = this.canBuild(placeId, socketIndex, buildingId);

		if (!validation.valid) {
			Logger.log(`Build failed: ${validation.error}`, 1, "building");
			this.dispatch(
				buildFailed("build", placeId, socketIndex, validation.error),
			);
			return;
		}

		this.dispatch({
			type: "places/buildBuilding",
			payload: { placeId, socketIndex, buildingId },
		});
		this.dispatch({ type: "player/spendGold", payload: validation.cost });

		const building = this.getBuildingDefinition(buildingId);
		Logger.log(
			`Built ${building.name} at ${placeId} socket ${socketIndex} for ${validation.cost}g`,
			1,
			"building",
		);
		this.dispatch(
			buildSuccess("build", placeId, socketIndex, {
				cost: validation.cost,
				buildingId,
				buildingName: building.name,
			}),
		);
	}

	canUpgrade(placeId, socketIndex) {
		const place = this.getPlace(placeId);
		if (!place || !place.sockets || !place.sockets[socketIndex]) {
			return { valid: false, error: "Invalid place or socket" };
		}

		const socket = place.sockets[socketIndex];
		if (socket.status !== "occupied") {
			return { valid: false, error: "Socket is not occupied" };
		}

		const building = this.getBuildingDefinition(socket.buildingId);
		if (!building) {
			return { valid: false, error: "Building not found" };
		}

		const nextLevel = (socket.level || 1) + 1;
		const upgradeKey = `level${nextLevel}`;
		const upgrade = building.upgrades?.[upgradeKey];

		if (!upgrade) {
			return { valid: false, error: "No more upgrades available" };
		}

		const gold = this.getGold();
		if (gold < upgrade.cost) {
			return { valid: false, error: `Not enough gold. Need ${upgrade.cost}g` };
		}

		return { valid: true, cost: upgrade.cost, upgrade, nextLevel };
	}

	upgradeBuilding(placeId, socketIndex) {
		const validation = this.canUpgrade(placeId, socketIndex);

		if (!validation.valid) {
			Logger.log(`Upgrade failed: ${validation.error}`, 1, "building");
			this.dispatch(
				buildFailed("upgrade", placeId, socketIndex, validation.error),
			);
			return;
		}

		this.dispatch({
			type: "places/upgradeBuilding",
			payload: { placeId, socketIndex },
		});
		this.dispatch({ type: "player/spendGold", payload: validation.cost });

		const place = this.getPlace(placeId);
		const building = this.getBuildingDefinition(
			place.sockets[socketIndex].buildingId,
		);
		Logger.log(
			`Upgraded ${building.name} at ${placeId} socket ${socketIndex} to level ${validation.nextLevel} for ${validation.cost}g`,
			1,
			"building",
		);
		this.dispatch(
			buildSuccess("upgrade", placeId, socketIndex, {
				cost: validation.cost,
				newLevel: validation.nextLevel,
				material: validation.upgrade.material,
			}),
		);
	}

	canDemolish(placeId, socketIndex) {
		const place = this.getPlace(placeId);
		if (!place || !place.sockets || !place.sockets[socketIndex]) {
			return { valid: false, error: "Invalid place or socket" };
		}

		const socket = place.sockets[socketIndex];
		if (socket.status !== "occupied") {
			return { valid: false, error: "Socket is not occupied" };
		}

		return { valid: true };
	}

	demolishBuilding(placeId, socketIndex) {
		const validation = this.canDemolish(placeId, socketIndex);

		if (!validation.valid) {
			Logger.log(`Demolish failed: ${validation.error}`, 1, "building");
			this.dispatch(
				buildFailed("demolish", placeId, socketIndex, validation.error),
			);
			return;
		}

		const place = this.getPlace(placeId);
		const building = this.getBuildingDefinition(
			place.sockets[socketIndex].buildingId,
		);

		this.dispatch({
			type: "places/demolishBuilding",
			payload: { placeId, socketIndex },
		});

		Logger.log(
			`Demolished ${building.name} at ${placeId} socket ${socketIndex}`,
			1,
			"building",
		);
		this.dispatch(
			buildSuccess("demolish", placeId, socketIndex, {
				buildingId: building.id,
				buildingName: building.name,
			}),
		);
	}
}
