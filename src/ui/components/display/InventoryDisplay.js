import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { moveItemBetweenInventories } from "../../../store/slices/inventoryThunks.js";
import { selectKnownRecipes } from "../../../store/slices/playerSlice.js";
import MoveItemDialog from "../common/MoveItemDialog";
import KeyBind from "../common/KeyBind";
import InventoryGrid from "../common/InventoryGrid";

import {
	selectInventoryById,
	selectInventoryByPlaceId,
} from "../../../store/slices/inventorySlice";
import { calculateTotalPlayerWeight } from "../../../store/slices/inventory/inventoryUtils";
import { globalEventBus } from "../../../game/services/EventBusService";
import { playerIntentLearnRecipe } from "../../../game/events";

const generateId = () =>
	`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const InventoryDisplay = ({ inventoryId, otherInventoryId }) => {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const dispatch = useDispatch();
	const knownRecipes = useSelector(selectKnownRecipes);

	// Determine which selector to use based on inventory type
	const inventory = useSelector((state) => {
		if (inventoryId === "player") {
			return selectInventoryById(state, inventoryId);
		} else {
			// Try place inventory first, then fallback to player inventory selector
			const placeInventory = selectInventoryByPlaceId(state, inventoryId);
			if (placeInventory) return placeInventory;
			return selectInventoryById(state, inventoryId);
		}
	});

	const otherInventory = useSelector((state) => {
		if (otherInventoryId === "player") {
			return selectInventoryById(state, otherInventoryId);
		} else {
			const placeInventory = selectInventoryByPlaceId(state, otherInventoryId);
			if (placeInventory) return placeInventory;
			return selectInventoryById(state, otherInventoryId);
		}
	});

	// Handle right-click context menu for moving items between inventories
	const handleContextMenu = useCallback(
		(e, item) => {
			e.preventDefault();

			// Handle recipe items in player inventory - learn the recipe
			if (item.type === "recipe" && inventoryId === "player" && item.recipeId) {
				// Check if already known
				if (knownRecipes.includes(item.recipeId)) {
					dispatch({
						type: "notifications/addNotification",
						payload: {
							id: generateId(),
							message: `You already know the "${item.name}" recipe!`,
							type: "info",
						},
					});
					return;
				}

				// Emit event to learn the recipe (service handles removal and state update)
				globalEventBus.emit(playerIntentLearnRecipe.type, {
					recipeId: item.recipeId,
					itemId: item.id,
				});
				return;
			}

			// Original move item logic
			if (!otherInventoryId) return; // Do nothing if no target inventory

			const quantity = item.quantity || 1;

			// Skip dialog for single items, move directly
			if (quantity === 1) {
				const itemWeight = item.weight || 0;

				// Check weight limit for player inventories
				if (otherInventory.type === "player" && itemWeight > 0) {
					const currentWeight = calculateTotalPlayerWeight(otherInventory);
					const maxWeight = otherInventory.maxWeight || 0;

					if (currentWeight + itemWeight > maxWeight) {
						// Show notification instead of dialog
						dispatch({
							type: "notifications/addNotification",
							payload: {
								id: generateId(),
								message: `Cannot move "${item.name}" - not enough carry capacity! (Need ${currentWeight + itemWeight - maxWeight} more capacity)`,
								type: "warning",
							},
						});
						return;
					}
				}

				// Direct move for single item
				const success = dispatch(
					moveItemBetweenInventories(
						inventory.id,
						otherInventoryId,
						item.id,
						1,
					),
				);

				if (!success) {
					// Handle other move errors
					dispatch({
						type: "notifications/addNotification",
						payload: {
							id: generateId(),
							message: `Failed to move "${item.name}"`,
							type: "error",
						},
					});
				}
			} else {
				// Show dialog for multiple items
				setSelectedItem(item);
				setDialogOpen(true);
			}
		},
		[
			otherInventory,
			otherInventoryId,
			inventory.id,
			dispatch,
			knownRecipes,
			inventoryId,
		],
	);

	// Handle confirm button for moving items between inventories
	const handleConfirmMove = useCallback(
		(quantity = null) => {
			if (!otherInventoryId || !selectedItem) return; // Do nothing if no target inventory or no item selected

			const moveQuantity = quantity || selectedItem.quantity || 1;
			const success = dispatch(
				moveItemBetweenInventories(
					inventory.id,
					otherInventoryId,
					selectedItem.id,
					moveQuantity,
				),
			);

			if (success) {
				setDialogOpen(false);
				setSelectedItem(null);
			}
		},
		[dispatch, inventory.id, otherInventoryId, selectedItem],
	);

	// Handle cancel button for moving items between inventories
	const handleCancel = useCallback(() => {
		setDialogOpen(false);
		setSelectedItem(null);
	}, []);

	if (!inventory) return null; // If inventory is not found, render nothing

	const hasWeightLimit = typeof inventory.maxWeight !== "undefined";
	let currentWeight = 0;

	// Calculate current weight
	// If player, use calculateTotalPlayerWeight
	// Otherwise, calculate manually
	if (inventory.type === "player") {
		currentWeight = calculateTotalPlayerWeight(inventory);
	} else {
		currentWeight = inventory.items.reduce(
			(sum, item) => sum + (item.weight || 0) * (item.quantity || 1),
			0,
		);
	}
	const maxWeight = inventory.maxWeight; // If undefined, no weight limit

	// Calculate total items and max slots
	const totalItems = inventory.items.length;
	const maxSlots = inventory.maxSlots;

	return (
		<>
			<div className="inventory-info">
				<KeyBind value="RClick" info="Move items between inventories" />
				{inventory.type === "player" && (
					<KeyBind value="LClick" info="Equip item" />
				)}
				<span>
					{totalItems} / <b>{maxSlots} slots</b>
				</span>
				{hasWeightLimit && (
					<span
						className={currentWeight >= maxWeight * 0.9 ? "weight-warning" : ""}
						style={{ marginLeft: "16px" }}
					>
						{currentWeight.toFixed(1)} / <b>{maxWeight} lt</b>
					</span>
				)}
			</div>
			<InventoryGrid
				inventory={inventory}
				otherInventory={otherInventory}
				onContextMenu={handleContextMenu}
				columns={10}
			/>
			{dialogOpen &&
				selectedItem && ( // Open dialog if an item is selected
					<MoveItemDialog
						item={selectedItem}
						onConfirm={handleConfirmMove}
						onCancel={handleCancel}
						sourceInventory={inventory}
						targetInventory={otherInventory}
					/>
				)}
		</>
	);
};

export default React.memo(InventoryDisplay);
