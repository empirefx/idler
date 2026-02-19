import React from "react";
import { useDispatch } from "react-redux";

import { equipItem } from "../../../store/slices/inventorySlice";
import { removeItemFromInventory } from "../../../store/slices/inventoryThunks.js";
import { healPlayer } from "../../../store/slices/playerSlice";
import { TYPE_TO_SLOT } from "../../../store/slices/inventory/inventoryTypes.js";
import ItemInfo from "../common/ItemInfo";

const InventoryGrid = ({
	inventory,
	otherInventory,
	onContextMenu,
	columns = 10,
	showBuyPrice = false,
}) => {
	const dispatch = useDispatch();

	const handleConsume = React.useCallback(
		(item) => {
			const healAmount = item.consumable?.heal;
			if (healAmount > 0) {
				dispatch(healPlayer({ amount: healAmount }));
				dispatch(removeItemFromInventory(inventory.id, item.id, 1));
			}
		},
		[dispatch, inventory.id],
	);

	const handleEquip = React.useCallback(
		(item) => {
			dispatch(
				equipItem({
					inventoryId: inventory.id,
					itemId: item.id,
					typeToSlot: TYPE_TO_SLOT,
				}),
			);
		},
		[dispatch, inventory.id],
	);

	return (
		<div className="inventory-grid" style={{ "--grid-columns": columns }}>
			{Array.from({ length: inventory.maxSlots }, (_, i) => {
				const item = inventory.items[i];
				const isEquipment = item && TYPE_TO_SLOT[item.type];

				return (
					<div
						role="button"
						tabIndex={item ? 0 : -1}
						className={`inventory-slot ${item ? "filled" : "empty"}`}
						key={item ? `slot-${item.id}-${i}` : `empty-${i}`}
						onContextMenu={
							item && otherInventory ? (e) => onContextMenu(e, item) : undefined
						}
						onKeyDown={
							item && otherInventory
								? (e) => {
										if (e.key === "Enter" || e.key === " ")
											onContextMenu(e, item);
									}
								: undefined
						}
						onClick={
							item
								? () => {
										if (isEquipment) handleEquip(item);
										else if (item.type === "consumable") handleConsume(item);
									}
								: undefined
						}
					>
						{item && (
							<div className="item-sprite" id={item.itemKey || item.id} />
						)}
						{item && (
							<ItemInfo item={item} showBuyPrice={showBuyPrice}>
								<p>
									<span>{isEquipment ? "" : item.quantity || ""}</span>
								</p>
							</ItemInfo>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default React.memo(InventoryGrid);
