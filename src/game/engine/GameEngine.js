import Logger from "../utils/Logger";

import { selectAssignedWorkers } from "../../store/slices/playerSlice";
import { InventoryService } from "../services/InventoryService";
import { CraftingService } from "../services/CraftingService";
import { createItem } from "../factory/itemFactory";
import SpawnService from "../services/SpawnService";
import { EventBusService, globalEventBus } from "../services/EventBusService";
import { CombatService } from "../services/CombatService";
import {
	workerCreatedItem,
	playerIntentCraft,
	playerIntentLearnRecipe,
} from "../events";
import GameLoop from "../core/GameLoop";
import ProductionService from "../services/ProductionService";
import { SaveService } from "../services/SaveService";
import { NavigationService } from "../services/NavigationService";
import { EnemyLifecycleService } from "../services/EnemyLifecycleService";
import BuildingService from "../services/BuildingService";
import { buildingsData } from "../../data/buildings";

/**
 * GameEngine: wires systems + runs game loop
 * CombatService: controls combat state + wave end
 * SpawnService: creates enemies + respawn timing
 * EnemyLifecycleService: detects deaths + cleanup
 * NavigationService: place changes
 * ProductionService: building production
 * InventoryService: item storage
 * SaveService: persistence
 * EventBusService: system messaging only
 */
class GameEngine {
	constructor(
		dispatch,
		store,
		{ spawnService: _spawnService = SpawnService } = {},
	) {
		this.store = store;
		this.lastState = store.getState();
		this.dispatch = dispatch;
		this.lastUpdate = Date.now();
		this.isRunning = false;

		// Initialize services
		this.inventoryService = this.inventoryService || InventoryService;
		this.itemFactory = this.itemFactory || createItem;
		this.events = { workerCreatedItem }; // Simple events object
		this.productionService = new ProductionService(
			this.inventoryService,
			this.itemFactory,
			this.store,
			this.dispatch,
			this.events,
		);
		this.saveService = this.saveService || SaveService;
		this.navigationService = this.navigationService || NavigationService;
		this.enemyLifecycleService =
			this.enemyLifecycleService || EnemyLifecycleService;
		this.combatService = this.combatService || CombatService;
		this.eventBusService = this.eventBusService || globalEventBus;
		this.spawnService = SpawnService
			? new SpawnService(this.eventBusService)
			: { spawners: {}, currentPlaceId: null };
		this.craftingService = new CraftingService(
			this.inventoryService,
			this.store,
			this.dispatch,
			this.eventBusService,
			this.itemFactory,
		);
		this.buildingService = new BuildingService(
			this.store,
			this.dispatch,
			this.eventBusService,
			buildingsData,
		);
		this.gameLoop = new GameLoop();

		// Initialize services
		this.combatService.initialize(this.store, this.eventBusService);

		// Listen for spawn events and add enemies to store
		this.eventBusService.on("spawnEnemy", ({ placeId, enemy }) => {
			Logger.log(
				`Adding enemy ${enemy.id} to store at place ${placeId}`,
				0,
				"spawn",
			);
			this.dispatch({ type: "enemies/addEnemy", payload: { placeId, enemy } });
		});

		this.eventBusService.on(
			playerIntentCraft.type,
			({ recipeId, outputItemId }) => {
				this.craftingService.craft(recipeId, outputItemId);
			},
		);

		this.eventBusService.on(
			playerIntentLearnRecipe.type,
			({ recipeId, itemId }) => {
				this.craftingService.learnRecipe(recipeId, itemId);
			},
		);
	}

	// Process production for a single building
	processBuildingProduction(placeId, socketIndex, buildingData, state, deltaTime) {
		this.productionService.processBuildingProduction(
			placeId,
			socketIndex,
			buildingData,
			state,
			deltaTime,
		);
	}

	// Get workers assigned to a specific building
	getAssignedWorkersBySocketIndex(state, socketIndex) {
		return this.productionService.getWorkersBySocketIndex(state, socketIndex);
	}

	// Calculate production rate for a building
	calculateProductionRate(buildingData, state) {
		return buildingData.baseProductionRate || 0;
	}

	// Validate that a building can produce
	canBuildingProduce(state, socketIndex, buildingData) {
		return this.productionService.canBuildingProduce(state, socketIndex, buildingData);
	}

	// Add an item to a place's inventory handled by InventoryService
	addItemToInventory(targetPlaceId, item) {
		this.inventoryService.addItemToInventory(this.store, targetPlaceId, item);
	}

	// Get inventory for a specific place (vault functionality)
	getVaultInventory(state, targetPlace) {
		return this.inventoryService.getInventoryForPlace(state, targetPlace);
	}

	getCraftingService() {
		return this.craftingService;
	}

	// Update game state
	update(state, deltaTime) {
		const currentState = state;
		const currentPlaceId = currentState.places.currentPlaceId;
		const currentPlace = currentState.places[currentPlaceId];

		if (!currentPlace || !currentPlace.sockets) return;

		const assignedWorkers = selectAssignedWorkers(currentState);
		const assignedSocketIndexes = assignedWorkers
			.map(w => Number(w.assignedSocketIndex))
			.filter(idx => !isNaN(idx));

		currentPlace.sockets.forEach((socket, socketIndex) => {
			if (socket.status !== "occupied") return;
			if (!assignedSocketIndexes.includes(socketIndex)) return;

			const buildingData = buildingsData[socket.buildingId];
			if (!buildingData) return;

			const hasProduction = (buildingData.baseProductionRate || 0) > 0;

			if (hasProduction) {
				this.productionService.processBuildingProduction(
					currentPlaceId,
					socketIndex,
					buildingData,
					currentState,
					deltaTime,
				);
			}
		});
	}

	// Save game state to localStorage
	save() {
		return this.saveService.saveState(this.store);
	}

	// Validate structure of loaded state
	validateLoadedState(state) {
		return this.saveService.validateLoadedState(state);
	}

	// Check if there's a saved game
	hasSavedState() {
		return this.saveService.hasSavedState();
	}

	// Clear saved game state
	clearSavedState() {
		this.saveService.clearSavedState();
	}

	// Start the game loop
	start() {
		if (this.isRunning) return;

		Logger.log("Game engine starting", 0, "game-loop");
		this.isRunning = true;
		this.lastUpdate = Date.now();

		// Register production system (now handled by ProductionService)
		this.gameLoop.register(
			"production",
			(deltaTime) => {
				this.update(this.store.getState(), deltaTime);
			},
			{
				priority: 2,
				interval: 1000, // Update every second for production
			},
		);

		// Initialize and hook lifecycle services
		if (this.enemyLifecycleService?.initialize) {
			this.enemyLifecycleService.eventBusService = null;
			this.enemyLifecycleService.initialize(this.store.getState());
			this.enemyLifecycleService.subscribeToEnemyChanges(this.store);
		}

		if (this.navigationService?.subscribeToPlaceChanges) {
			this.navigationService.eventBus = this.eventBusService;
			this.navigationService.subscribeToPlaceChanges(this.store);
		}

		// Subscribe to combat state changes
		if (this.combatService?.handleCombatStateChange) {
			this.combatService.eventBusService = this.eventBusService;
			this.combatService.store = this.store;
			let lastCombatState = this.store.getState().combat.isInCombat;
			this.store.subscribe(() => {
				const state = this.store.getState();
				const currentCombatState = state.combat.isInCombat;
				if (currentCombatState !== lastCombatState) {
					Logger.log(
						"Combat state changed from " +
							lastCombatState +
							" to " +
							currentCombatState,
						0,
						"game-loop",
					);
					this.combatService.handleCombatStateChange(
						lastCombatState,
						currentCombatState,
						this.gameLoop,
					);
					lastCombatState = currentCombatState;
				}
			});
		}

		// Start the unified game loop
		this.gameLoop.start();
	}

	// Stop the game loop
	stop() {
		if (!this.isRunning) return;

		Logger.log("Game engine stopping", 0, "game-loop");
		this.gameLoop.stop();
		this.isRunning = false;
	}

	// Load game state
	load() {
		const savedState = localStorage.getItem("gameState");
		if (savedState) {
			try {
				const state = JSON.parse(savedState);

				// Dispatch the correct actions with the right payload format
				if (state.player) {
					this.dispatch({
						type: "player/setPlayerState",
						payload: state.player,
					});
				}

				if (state.buildings) {
					this.dispatch({
						type: "buildings/setBuildings",
						payload: state.buildings,
					});
				}

				if (state.place) {
					this.dispatch({
						type: "places/setPlaces",
						payload: state.place,
					});
				}
				Logger.log("Game state loaded successfully", 0, "game-loop");
			} catch (error) {
				Logger.error("Error parsing saved game state:", 0, "game-loop", error);
				// Clear corrupted state to prevent further errors
				localStorage.removeItem("gameState");
			}
		} else {
			//Logger.log('No saved game state found', 0, 'game-loop');
		}
	}
}

export default GameEngine;
