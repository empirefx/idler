import { useState, useMemo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import "../../../styles/sections/crafting-section.css";
import { useUIVisibility } from "../../UIVisibilityContext";
import { selectKnownRecipes } from "../../../store/slices/playerSlice";
import { craftingGroups, craftingRecipes } from "../../../data/craftingRecipes";
import { itemCatalog } from "../../../data/itemCatalog";
import { selectInventoryById } from "../../../store/slices/inventorySlice";
import { globalEventBus } from "../../../game/services/EventBusService";
import {
	playerIntentCraft,
	CRAFT_SUCCESS,
	CRAFT_FAILED,
} from "../../../game/events";
import Item from "../common/Item";

const groupLabels = {
	[craftingGroups.FOOD]: "Food",
	[craftingGroups.MATERIAL]: "Material",
	[craftingGroups.WEAPON]: "Weapon",
	[craftingGroups.ARMOR]: "Armor",
	[craftingGroups.SHIELD]: "Shield",
};

const CraftingSection = () => {
	const { craftingWindow, toggleCraftingWindow } = useUIVisibility();
	const knownRecipes = useSelector(selectKnownRecipes);
	const playerInventory = useSelector((state) =>
		selectInventoryById(state, "player"),
	);

	const [selectedGroup, setSelectedGroup] = useState(craftingGroups.FOOD);
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [selectedOutputItem, setSelectedOutputItem] = useState(null);

	useEffect(() => {
		setSelectedOutputItem(null);
	}, [selectedRecipe]);

	useEffect(() => {
		const handleCraftSuccess = ({ outputItemName }) => {
			// Handled by CraftingService notification
		};

		const handleCraftFailed = ({ error }) => {
			// Handled by CraftingService notification
		};

		globalEventBus.on(CRAFT_SUCCESS.type, handleCraftSuccess);
		globalEventBus.on(CRAFT_FAILED.type, handleCraftFailed);

		return () => {
			globalEventBus.off(CRAFT_SUCCESS.type, handleCraftSuccess);
			globalEventBus.off(CRAFT_FAILED.type, handleCraftFailed);
		};
	}, []);

	const recipesByGroup = useMemo(() => {
		const grouped = {};
		Object.values(craftingRecipes).forEach((recipe) => {
			if (!grouped[recipe.group]) {
				grouped[recipe.group] = [];
			}
			grouped[recipe.group].push(recipe);
		});
		return grouped;
	}, []);

	const currentGroupRecipes = recipesByGroup[selectedGroup] || [];

	const playerMaterials = useMemo(() => {
		if (!playerInventory?.items) return {};
		const materials = {};
		playerInventory.items.forEach((item) => {
			const key = item.icon;
			materials[key] = (materials[key] || 0) + (item.quantity || 1);
		});
		return materials;
	}, [playerInventory]);

	const checkMaterialsAvailable = (materials) => {
		if (!materials) return {};
		const available = {};
		materials.forEach((mat) => {
			const playerQty = playerMaterials[mat.icon] || 0;
			available[mat.icon] = playerQty >= mat.quantity;
		});
		return available;
	};

	const canCraft = useCallback(
		(recipe) => {
			if (!recipe.materials) return false;
			const isKnown = knownRecipes.includes(recipe.id);
			if (!isKnown) return false;
			const available = checkMaterialsAvailable(recipe.materials);
			return recipe.materials.every((mat) => available[mat.icon]);
		},
		[playerMaterials, knownRecipes],
	);

	const handleCraft = useCallback(
		(recipe) => {
			// Double-check recipe is known before emitting craft event
			const isKnown = knownRecipes.includes(recipe.id);
			if (!isKnown) {
				console.log("Cannot craft: recipe not known");
				return;
			}

			if (!canCraft(recipe)) return;

			const outputItemId =
				selectedOutputItem ||
				recipe.output.variants?.[0] ||
				recipe.output.items?.[0] ||
				recipe.output.icon;

			globalEventBus.emit(playerIntentCraft.type, {
				recipeId: recipe.id,
				outputItemId,
			});
		},
		[canCraft, selectedOutputItem, knownRecipes],
	);

	if (!craftingWindow) return null;

	return (
		<section className="crafting-section">
			<div className="crafting-header">
				<h3>Crafting</h3>
				<button className="close-btn" onClick={toggleCraftingWindow}>
					×
				</button>
			</div>

			<div className="crafting-groups">
				{Object.keys(groupLabels).map((group) => (
					<button
						key={group}
						className={`group-tab ${selectedGroup === group ? "active" : ""}`}
						onClick={() => {
							setSelectedGroup(group);
							setSelectedRecipe(null);
						}}
					>
						{groupLabels[group]}
					</button>
				))}
			</div>

			<div className="crafting-content">
				<div className="recipe-list">
					{currentGroupRecipes.length === 0 ? (
						<div className="no-recipes">No recipes in this category</div>
					) : (
						currentGroupRecipes.map((recipe) => {
							const isKnown = knownRecipes.includes(recipe.id);
							return (
								<div
									key={recipe.id}
									className={`recipe-item ${selectedRecipe?.id === recipe.id ? "selected" : ""} ${!isKnown ? "unknown" : ""}`}
									onClick={() => setSelectedRecipe(recipe)}
								>
									<span className="recipe-name">
										{isKnown ? recipe.name : "???"}
									</span>
									{isKnown && (
										<span
											className={`craft-status ${canCraft(recipe) ? "can-craft" : "cannot-craft"}`}
										>
											{canCraft(recipe) ? "✓" : "✗"}
										</span>
									)}
								</div>
							);
						})
					)}
				</div>

				<div className="recipe-details">
					{selectedRecipe ? (
						<>
							{knownRecipes.includes(selectedRecipe.id) ? (
								<>
									<div className="detail-header">
										<div className="craftable-items-list">
											{selectedRecipe.output.variants &&
												selectedRecipe.output.variants.map((v) => {
													const item = itemCatalog[v];
													return item ? (
														<div
															key={v}
															className={`craftable-item ${selectedOutputItem === v ? "selected" : ""}`}
															onClick={() => setSelectedOutputItem(v)}
														>
															<Item item={item} />
														</div>
													) : null;
												})}
											{selectedRecipe.output.items &&
												selectedRecipe.output.items.map((v) => {
													const item = itemCatalog[v];
													return item ? (
														<div
															key={v}
															className={`craftable-item ${selectedOutputItem === v ? "selected" : ""}`}
															onClick={() => setSelectedOutputItem(v)}
														>
															<Item item={item} />
														</div>
													) : null;
												})}
											{!selectedRecipe.output.variants &&
												!selectedRecipe.output.items &&
												selectedRecipe.output.icon && (
													<div
														className={`craftable-item ${selectedOutputItem === selectedRecipe.output.icon ? "selected" : ""}`}
														onClick={() =>
															setSelectedOutputItem(selectedRecipe.output.icon)
														}
													>
														<Item
															item={itemCatalog[selectedRecipe.output.icon]}
														/>
													</div>
												)}
										</div>
										<h4>{selectedRecipe.name}</h4>
										<span className="detail-group">
											{groupLabels[selectedRecipe.group]}
										</span>
									</div>

									{selectedRecipe.output.variants && (
										<div className="output-info">
											<strong>Variants:</strong>
											<div className="variant-list">
												{selectedRecipe.output.variants.map((v) => {
													const item = itemCatalog[v];
													return item ? (
														<span key={v} className="variant-badge">
															{item.name}
														</span>
													) : null;
												})}
											</div>
										</div>
									)}

									{selectedRecipe.output.items && (
										<div className="output-info">
											<strong>Set Items:</strong>
											<div className="variant-list">
												{selectedRecipe.output.items.map((v) => {
													const item = itemCatalog[v];
													return item ? (
														<span key={v} className="variant-badge">
															{item.name}
														</span>
													) : null;
												})}
											</div>
										</div>
									)}

									{!selectedRecipe.output.variants &&
										!selectedRecipe.output.items && (
											<div className="output-info">
												<strong>Output:</strong>
												<span>{selectedRecipe.output.name}</span>
											</div>
										)}

									<div className="materials-section">
										<h5>Required Materials</h5>
										<div className="materials-list">
											{selectedRecipe.materials.map((mat, idx) => {
												const available = playerMaterials[mat.icon] || 0;
												const hasEnough = available >= mat.quantity;
												const matItem = itemCatalog[mat.icon];
												return (
													<div
														key={idx}
														className={`material-item ${hasEnough ? "available" : "unavailable"}`}
													>
														<span className="mat-name">
															{matItem?.name || mat.icon}
														</span>
														<span className="mat-qty">
															{available} / {mat.quantity}
														</span>
													</div>
												);
											})}
										</div>
									</div>

									<button
										className={`craft-btn ${canCraft(selectedRecipe) ? "" : "disabled"}`}
										disabled={!canCraft(selectedRecipe)}
										onClick={() => handleCraft(selectedRecipe)}
									>
										Craft
									</button>
								</>
							) : (
								<div className="unknown-recipe">
									<h4>???</h4>
									<p>
										Right-click a recipe item in your inventory to learn this
										craft.
									</p>
									<div className="materials-section">
										<h5>Required Materials</h5>
										<div className="materials-list">
											{selectedRecipe.materials.map((mat, idx) => (
												<div key={idx} className="material-item unknown">
													<span className="mat-name">???</span>
													<span className="mat-qty">? / {mat.quantity}</span>
												</div>
											))}
										</div>
									</div>
								</div>
							)}
						</>
					) : (
						<div className="no-selection">
							<p>Select a recipe to view details</p>
						</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default CraftingSection;
