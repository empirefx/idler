import React from "react";
import ItemInfo from "./ItemInfo";

const Item = ({
	item,
	showQuantity = false,
	showBuyPrice = false,
	showItemInfo = true,
	onClick,
	onContextMenu,
	onKeyDown,
}) => {
	if (!item) return null;

	const handleClick = () => {
		if (onClick) onClick(item);
	};

	const content = (
    <>
      <div className="item-sprite" id={item.icon} onClick={handleClick} onContextMenu={onContextMenu ? (e) => onContextMenu(e, item) : undefined}/>
      {showQuantity && item.quantity > 1 && (
        <p>
          <span>{item.quantity}</span>
        </p>
      )}
    </>
  );

	return showItemInfo ? (
    <ItemInfo item={item} showBuyPrice={showBuyPrice}>
      {content}
    </ItemInfo>
  ) : (
    <>{content}</>
  );
};

export default React.memo(Item);
