import React from "react";
import ItemInfo from "./ItemInfo";

const Item = ({
	item,
	showQuantity = false,
	showBuyPrice = false,
	onClick,
	onContextMenu,
	onKeyDown,
}) => {
	if (!item) return null;

	const handleClick = () => {
		if (onClick) onClick(item);
	};

	const handleKeyDown = (e) => {
		if (onKeyDown) {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onKeyDown(item);
			}
		}
	};

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={handleClick}
			onContextMenu={onContextMenu ? (e) => onContextMenu(e, item) : undefined}
			onKeyDown={handleKeyDown}
		>
			<ItemInfo item={item} showBuyPrice={showBuyPrice}>
				<div className="item-sprite" id={item.icon} />
				{showQuantity && item.quantity > 1 && (
					<p>
						<span>{item.quantity}</span>
					</p>
				)}
			</ItemInfo>
		</div>
	);
};

export default React.memo(Item);
