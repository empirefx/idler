import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import InventoryGrid from "../common/InventoryGrid";
import MoveItemDialog from "../common/MoveItemDialog";
import KeyBind from "../common/KeyBind";
import { moveItem, equipItem, useItem } from "../../../store/ws";

function calcTotalWeight(inv) {
	if (!inv?.items) return 0;
	return inv.items.reduce(
		(sum, item) => sum + (item.weight || 0) * (item.quantity || 1),
		0,
	);
}

const InventoryDisplay = ({ inventoryId, otherInventoryId }) => {
	const inventory = useSelector((state) => state.inventory[inventoryId]);
	const otherInventory = useSelector((state) =>
		otherInventoryId ? state.inventory[otherInventoryId] : null,
	);
	const [dialogItem, setDialogItem] = useState(null);

	if (!inventory) return null;

	const currentWeight = calcTotalWeight(inventory);
	const hasWeightLimit = typeof inventory.maxWeight !== "undefined";
	const maxWeight = inventory.maxWeight;
	const totalItems = inventory.items.length;
	const maxSlots = inventory.maxSlots;

	const handleContextMenu = useCallback(
		(e, item) => {
			if (!otherInventory) return;
			e.preventDefault();
			if ((item.quantity || 1) <= 1) {
				moveItem(inventory.id || inventoryId, otherInventoryId, item.id, 1);
			} else {
				setDialogItem(item);
			}
		},
		[otherInventory, inventoryId, otherInventoryId, inventory],
	);

	const canEquip = (item) =>
		["head", "body", "pants", "boots", "hands", "main-weapon", "second-weapon"].includes(item.type);

	const handleItemClick = useCallback(
		(item) => {
			if (inventory.type !== "player") return;
			if (item.type === "consumable" && item.consumable?.heal) {
				useItem(item.id);
			} else if (canEquip(item)) {
				equipItem(inventory.id || inventoryId, item.id);
			}
		},
		[inventory, inventoryId],
	);

	const handleConfirmMove = useCallback(
		(quantity) => {
			if (!dialogItem || !otherInventoryId) return;
			moveItem(
				inventory.id || inventoryId,
				otherInventoryId,
				dialogItem.id,
				quantity,
			);
			setDialogItem(null);
		},
		[dialogItem, otherInventoryId, inventory, inventoryId],
	);

	const handleCancelMove = useCallback(() => {
		setDialogItem(null);
	}, []);

	return (
		<>
			<div className="inventory-info">
				{otherInventory && (
					<KeyBind value="RClick" info="Move items" />
				)}
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
				onContextMenu={otherInventory ? handleContextMenu : undefined}
				onItemClick={inventory.type === "player" ? handleItemClick : undefined}
			/>
			{dialogItem && (
				<MoveItemDialog
					item={dialogItem}
					onConfirm={handleConfirmMove}
					onCancel={handleCancelMove}
					targetInventory={otherInventory}
				/>
			)}
		</>
	);
};

export default React.memo(InventoryDisplay);
