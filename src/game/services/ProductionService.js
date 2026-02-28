import Logger from "../utils/Logger";

export default class ProductionService {
	constructor(inventoryService, itemFactory, store, dispatch, events) {
		this.inventoryService = inventoryService;
		this.itemFactory = itemFactory;
		this.store = store;
		this.dispatch = dispatch;
		this.events = events;
	}

	processBuildingProduction(placeId, socketIndex, buildingData, state, _deltaTime) {
		try {
			const worker = this.getWorkerByPlaceAndSocket(state, placeId, socketIndex);

			if (!worker) {
				Logger.log(
					`Worker not found for socket ${socketIndex} at ${placeId}, skipping production`,
					1,
					"production",
				);
				return;
			}

			const assignment = worker.assignments[placeId];
			if (!assignment || !assignment.material) {
				Logger.log(
					`Worker ${worker.name} has no material assigned at socket ${socketIndex} in ${placeId}`,
					1,
					"production",
				);
				return;
			}

			const productionRate = buildingData.baseProductionRate || 1;
			const productionType = assignment.material;
			const item = this.itemFactory(productionType, productionRate);

			if (!item) {
				Logger.log(
					`Failed to create item for ${productionType}`,
					1,
					"production",
				);
				return;
			}

			const targetPlaceId = this.findClosestPlaceWithInventory(placeId, state);

			this.inventoryService.addItemToInventory(this.store, targetPlaceId, item);

			if (this.dispatch) {
				const { workerCreatedItem } = require("../events");
				this.dispatch(workerCreatedItem(worker.id, item.type));
			}

		} catch (error) {
			console.error("Failed to create item during production", error);
			Logger.log(
				`Production failed for socket ${socketIndex} at ${placeId}: ${error.message}`,
				2,
				"production",
			);
		}
	}

	getWorkerByPlaceAndSocket(state, placeId, socketIndex) {
		const workers = state.player?.workers || [];
		return workers.find((worker) => 
			worker.assignments && 
			worker.assignments[placeId] && 
			worker.assignments[placeId].socketIndex === socketIndex
		);
	}

	getWorkersByPlaceAndSocket(state, placeId, socketIndex) {
		const workers = state.player?.workers || [];
		return workers.filter((worker) => 
			worker.assignments && 
			worker.assignments[placeId] && 
			worker.assignments[placeId].socketIndex === socketIndex
		);
	}

	findClosestPlaceWithInventory(currentPlaceId, state) {
		const places = state.places;
		const inventory = state.inventory;

		if (places[currentPlaceId]?.hasInventory && inventory[currentPlaceId]) {
			return currentPlaceId;
		}

		const queue = [currentPlaceId];
		const visited = new Set([currentPlaceId]);

		while (queue.length > 0) {
			const placeId = queue.shift();
			const place = places[placeId];

			if (!place) continue;

			if (place.hasInventory && inventory[placeId]) {
				return placeId;
			}

			if (place.connections) {
				for (const connectedPlaceId of place.connections) {
					if (!visited.has(connectedPlaceId)) {
						visited.add(connectedPlaceId);
						queue.push(connectedPlaceId);
					}
				}
			}
		}

		return inventory.village_center ? "village_center" : currentPlaceId;
	}

	canBuildingProduce(state, placeId, socketIndex, buildingData) {
		const worker = this.getWorkerByPlaceAndSocket(state, placeId, socketIndex);
		const assignment = worker?.assignments?.[placeId];
		return assignment && assignment.material && (buildingData.baseProductionRate || 0) > 0;
	}
}
