import Logger from "../utils/Logger";
import { craftingRecipes } from "../../data/craftingRecipes";
import { itemCatalog } from "../../data/itemCatalog";
import { createItem } from "../factory/itemFactory";
import { craftSuccess, craftFailed, recipeLearned } from "../events";

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export class CraftingService {
	constructor(inventoryService, store, dispatch, eventBus, itemFactory = createItem) {
		this.inventoryService = inventoryService;
		this.store = store;
		this.dispatch = dispatch;
		this.eventBus = eventBus;
		this.itemFactory = itemFactory;
	}

	getRecipe(recipeId) {
		return craftingRecipes[recipeId];
	}

	getAllRecipes() {
		return Object.values(craftingRecipes);
	}

	getRecipesByGroup(group) {
		return Object.values(craftingRecipes).filter((r) => r.group === group);
	}

	getKnownRecipes(state) {
		return state.player?.knownRecipes || [];
	}

	isRecipeKnown(state, recipeId) {
		return this.getKnownRecipes(state).includes(recipeId);
	}

	getPlayerMaterials(state) {
		const inventory = state.inventory?.player;
		if (!inventory?.items) return {};

		const materials = {};
		inventory.items.forEach((item) => {
			const key = item.icon;
			materials[key] = (materials[key] || 0) + (item.quantity || 1);
		});
		return materials;
	}

	getMaterialsAvailability(state, recipeId) {
		const recipe = this.getRecipe(recipeId);
		if (!recipe?.materials) return {};

		const playerMaterials = this.getPlayerMaterials(state);
		const available = {};

		recipe.materials.forEach((mat) => {
			const playerQty = playerMaterials[mat.icon] || 0;
			available[mat.icon] = {
				available: playerQty,
				required: mat.quantity,
				hasEnough: playerQty >= mat.quantity,
			};
		});

		return available;
	}

	canCraft(state, recipeId, outputItemId = null) {
		const recipe = this.getRecipe(recipeId);
		const knownRecipes = this.getKnownRecipes(state);
		const isKnown = knownRecipes.includes(recipeId);
		
		Logger.log(`canCraft check: recipeId=${recipeId}, recipeFound=${!!recipe}, isKnown=${isKnown}`, 0, "crafting");
		
		if (!recipe) {
			return { valid: false, error: "RECIPE_NOT_FOUND" };
		}

		if (!isKnown) {
			return { valid: false, error: "RECIPE_NOT_KNOWN" };
		}

		if (!recipe.materials || recipe.materials.length === 0) {
			return { valid: false, error: "NO_MATERIALS" };
		}

		const availability = this.getMaterialsAvailability(state, recipeId);
		const canCraft = recipe.materials.every((mat) => availability[mat.icon]?.hasEnough);

		if (!canCraft) {
			return { valid: false, error: "INSUFFICIENT_MATERIALS", availability };
		}

		let selectedOutput = outputItemId;
		if (!selectedOutput) {
			selectedOutput = recipe.output.variants?.[0] || recipe.output.items?.[0] || recipe.output.icon;
		}

		return { valid: true, outputItemId: selectedOutput };
	}

	craft(recipeId, outputItemId = null) {
		const state = this.store.getState();
		const knownRecipes = state.player?.knownRecipes || [];
		
		const validation = this.canCraft(state, recipeId, outputItemId);

		if (!validation.valid) {
			Logger.log(`Cannot craft ${recipeId}: ${validation.error}`, 1, "crafting");

			if (this.dispatch) {
				this.dispatch(craftFailed(recipeId, validation.error || "Unknown error"));
			}
			return { success: false, error: validation.error || "Unknown error" };
		}

		const recipe = this.getRecipe(recipeId);
		const actualOutputItemId = validation.outputItemId;
		let outputItem = this.itemFactory(actualOutputItemId, 1);

		if (!outputItem) {
			Logger.log(`itemFactory returned null for ${actualOutputItemId}, falling back to catalog lookup`, 1, "crafting");
			outputItem = { ...itemCatalog[actualOutputItemId], quantity: 1 };
		}

		if (!outputItem || !outputItem.name) {
			Logger.log(`Failed to create output item: ${actualOutputItemId} not found in catalog`, 2, "crafting");
			if (this.dispatch) {
				this.dispatch(craftFailed(recipeId, `Item ${actualOutputItemId} not found`));
			}
			return { success: false, error: "OUTPUT_ITEM_NOT_FOUND" };
		}

		try {
			recipe.materials.forEach((mat) => {
				const itemDef = itemCatalog[mat.icon];
				if (itemDef) {
					this.dispatch({
						type: "inventory/removeItem",
						payload: {
							inventoryId: "player",
							itemId: itemDef.id,
							quantity: mat.quantity,
						},
					});
				}
			});

			if (outputItem) {
				this.dispatch({
					type: "inventory/addItem",
					payload: {
						inventoryId: "player",
						item: outputItem,
					},
				});
			}

			Logger.log(`Crafted ${recipe.name} (${actualOutputItemId})`, 0, "crafting");

			if (this.dispatch) {
				this.dispatch(craftSuccess(recipeId, actualOutputItemId, outputItem?.name || recipe.name));
				this.dispatch({
					type: "notifications/addNotification",
					payload: {
						id: generateId(),
						message: `Crafted ${outputItem?.name || recipe.name}!`,
						type: "success",
					},
				});
			}

			return { success: true, outputItemId: actualOutputItemId, outputItemName: outputItem?.name };
		} catch (error) {
			Logger.log(`Crafting failed for ${recipeId}: ${error.message}`, 2, "crafting");

			if (this.dispatch) {
				this.dispatch(craftFailed(recipeId, error.message));
				this.dispatch({
					type: "notifications/addNotification",
					payload: {
						id: generateId(),
						message: `Failed to craft: ${error.message}`,
						type: "error",
					},
				});
			}

			return { success: false, error: error.message };
		}
	}

	learnRecipe(recipeId, itemId = null) {
		const state = this.store.getState();

		if (this.isRecipeKnown(state, recipeId)) {
			Logger.log(`Recipe ${recipeId} already known`, 1, "crafting");
			return { success: false, error: "ALREADY_KNOWN" };
		}

		try {
			this.dispatch({
				type: "player/learnRecipe",
				payload: recipeId,
			});

			if (itemId) {
				this.dispatch({
					type: "inventory/removeItem",
					payload: {
						inventoryId: "player",
						itemId: itemId,
						quantity: 1,
					},
				});
			}

			Logger.log(`Learned recipe ${recipeId}`, 0, "crafting");

			if (this.dispatch) {
				this.dispatch(recipeLearned(recipeId));
				const recipe = craftingRecipes[recipeId];
				this.dispatch({
					type: "notifications/addNotification",
					payload: {
						id: generateId(),
						message: `You learned the "${recipe?.name || recipeId}" recipe!`,
						type: "success",
					},
				});
			}

			return { success: true };
		} catch (error) {
			Logger.log(`Failed to learn recipe ${recipeId}: ${error.message}`, 2, "crafting");
			return { success: false, error: error.message };
		}
	}
}

export default CraftingService;
