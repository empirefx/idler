// src/ui/components/MoveItemDialog.js
import React, { useState, useEffect, useMemo } from "react";
import QuantitySlider from "./QuantitySlider.js";
import {
	calculateTotalPlayerWeight,
	calculateMaxMovableItems,
} from "../../../store/slices/inventory/inventoryUtils.js";

function MoveItemDialog({
	item,
	onConfirm,
	onCancel,
	sourceInventory,
	targetInventory,
}) {
	const [quantity, setQuantity] = useState(1);
	const availableQuantity = item?.quantity || 1;
	const isPlayerTarget = targetInventory?.type === "player";

	// Calculate weight information for player inventories
	const weightInfo = useMemo(() => {
		if (!isPlayerTarget || !targetInventory) {
			return null;
		}

		const currentWeight = calculateTotalPlayerWeight(targetInventory);
		const maxWeight = targetInventory.maxWeight || 0;
		const itemWeight = item?.weight || 0;
		const maxMovable = calculateMaxMovableItems(
			item,
			targetInventory,
			availableQuantity,
		);

		return {
			currentWeight,
			maxWeight,
			itemWeight,
			maxMovable,
			canMoveAny: maxMovable > 0,
			remainingWeight: maxWeight - currentWeight,
		};
	}, [isPlayerTarget, targetInventory, item, availableQuantity]);

	// Set initial quantity to max movable items
	useEffect(() => {
		if (weightInfo) {
			const initialQuantity = Math.min(
				availableQuantity,
				weightInfo.maxMovable,
			);
			setQuantity(Math.max(1, initialQuantity));
		} else {
			setQuantity(availableQuantity);
		}
	}, [weightInfo, availableQuantity]);

	const handleConfirm = () => {
		onConfirm(quantity);
	};

	const getWeightDisplay = () => {
		if (!weightInfo) return null;

		const { currentWeight, maxWeight, itemWeight } = weightInfo;
		const newWeight = currentWeight + itemWeight * quantity;
		const isNearLimit = newWeight >= maxWeight * 0.9;

		return (
			<div className="weight-info">
				<div className="current-weight">
					Current: {currentWeight} / {maxWeight} lt
				</div>
				<div className={`new-weight ${isNearLimit ? "weight-warning" : ""}`}>
					After move: {newWeight} / {maxWeight} lt
				</div>
			</div>
		);
	};

	const getTargetName = () => {
		if (targetInventory?.type === "player") return "inventory";
		if (item?.isVault) return "inventory";
		return "vault";
	};

	const maxSliderValue = weightInfo ? weightInfo.maxMovable : availableQuantity;
	const canConfirm = !weightInfo || weightInfo.maxMovable > 0;

	return (
		<div className="dialog" onClick={onCancel}>
			<div className="move-item-dialog" onClick={(e) => e.stopPropagation()}>
				<div className="dialog-header">
					Move {quantity} "{item?.name}" to {getTargetName()}?
				</div>

				<div className="quantity-section">
					<label>Quantity:</label>
					<QuantitySlider
						value={quantity}
						onChange={setQuantity}
						min={1}
						max={maxSliderValue}
						disabled={!canConfirm}
					/>
					<div className="quantity-display">
						{quantity} / {availableQuantity} available
						{weightInfo && weightInfo.maxMovable < availableQuantity && (
							<span className="weight-limit-info">
								(Max by weight: {weightInfo.maxMovable})
							</span>
						)}
					</div>
				</div>

				{getWeightDisplay()}

				<div className="dialog-buttons">
					<button
						onClick={handleConfirm}
						disabled={!canConfirm}
						className={!canConfirm ? "disabled" : ""}
					>
						Move {quantity}
					</button>
					<button onClick={onCancel}>Cancel</button>
				</div>
			</div>
		</div>
	);
}

export default MoveItemDialog;
