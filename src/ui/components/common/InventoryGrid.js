import React from "react";
import { useDispatch } from "react-redux";

import { equipItem } from "../../../store/slices/inventorySlice";
import { removeItemFromInventory } from "../../../store/slices/inventoryThunks.js";
import { healPlayer } from "../../../store/slices/playerSlice";
import { TYPE_TO_SLOT } from "../../../store/slices/inventory/inventoryTypes.js";
import Item from "./Item";

const InventoryGrid = ({
	inventory,
	otherInventory,
	onContextMenu,
	columns = 10,
	showBuyPrice = false,
}) => {
	const dispatch = useDispatch();

	const handleItemClick = React.useCallback(
		(item) => {
			if (TYPE_TO_SLOT[item.type]) {
				dispatch(
					equipItem({
						inventoryId: inventory.id,
						itemId: item.id,
						typeToSlot: TYPE_TO_SLOT,
					}),
				);
			} else if (item.type === "consumable") {
				const healAmount = item.consumable?.heal;
				if (healAmount > 0) {
					dispatch(healPlayer({ amount: healAmount }));
					dispatch(removeItemFromInventory(inventory.id, item.id, 1));
				}
			}
		},
		[dispatch, inventory.id],
	);

	return (
		<div className="inventory-grid" style={{ "--grid-columns": columns }}>
			{Array.from({ length: inventory.maxSlots }, (_, i) => {
				const item = inventory.items[i];

				return (
					<div
						className={`inventory-slot ${item ? "filled" : "empty"}`}
						key={item ? `slot-${item.id}-${i}` : `empty-${i}`}
					>
						{item && (
							<Item
								item={item}
								showQuantity
								showBuyPrice={showBuyPrice}
								onClick={handleItemClick}
								onContextMenu={otherInventory ? onContextMenu : undefined}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default React.memo(InventoryGrid);
