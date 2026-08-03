import React from "react";
import Item from "./Item";

const InventoryGrid = ({
	inventory,
	otherInventory: _otherInventory,
	onContextMenu,
	onItemClick,
	columns = 10,
	showBuyPrice = false,
}) => {
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
								onClick={onItemClick}
								onContextMenu={onContextMenu}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default React.memo(InventoryGrid);
