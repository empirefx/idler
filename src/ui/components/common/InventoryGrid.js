import React from "react";
import { useDispatch } from "react-redux";

import { equipItem } from "../../../store/slices/playerInventorySlice";
import { removeItemFromInventory } from "../../../store/slices/inventoryThunks.js";
import { healPlayer } from "../../../store/slices/playerSlice";
import ItemInfo from "../common/ItemInfo";

const InventoryGrid = ({ 
	inventory, 
	otherInventory, 
	onContextMenu, 
	columns = 10 
}) => {
	const dispatch = useDispatch();

	// Consume consumable items: lookup heal from the item directly
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

	return (
		<div 
			className="inventory-grid" 
			style={{ 
				"--grid-columns": columns 
			}}
		>
			{Array.from({ length: inventory.maxSlots }, (_, i) => {
				const item = inventory.items[i];

				return (
					<div
						role="button"
						tabIndex={item ? 0 : -1}
						className={`inventory-slot ${item ? "filled" : "empty"}`}
						key={item ? `slot-${item.id}-${i}` : `empty-${i}`}
						onContextMenu={
							item && otherInventory
								? (e) => onContextMenu(e, item)
								: undefined
						}
						onKeyDown={
							item && otherInventory
								? (e) => {
										if (e.key === "Enter" || e.key === " ") {
											onContextMenu(e, item);
										}
									}
								: undefined
						}
						// Handle equipment and consumable items
						// left click for equipment/consumable, right click for move to vault/inventory
						onClick={
							item
								? item.type === "equipment"
									? () =>
											dispatch(
												equipItem({
													inventoryId: inventory.id,
													itemId: item.id,
												}),
											)
									: item.type === "consumable"
										? () => handleConsume(item)
										: undefined
								: undefined
						}
					>
						{item?.type === "equipment" && (
							// Display armor/weapon sprite
							<div
								className="armor-sprite"
								id={item?.id ? item?.id : "empty"}
							></div>
						)}
						{item && (
							// Show quantity & stats for items
							<ItemInfo item={item}>
								<p>
									<span>
										{item.type === "equipment" ? "" : item.quantity || ""}
									</span>
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
