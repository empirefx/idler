import React from 'react';

import ToolTip from './common/ToolTip';

const InventoryDisplay = ({ inventory }) => {
  if (!inventory) return null;

  return (
    <div className="inventory-flex">
      {Array.from({ length: inventory.maxSlots }, (_, i) => {
      const item = inventory.items[i];

      return (
        <div className="inventory-slot" key={i}>
          {item && (
              <ToolTip item={item}>
                <p>
                  <span>{item.quantity || ''}</span>
                </p>
              </ToolTip>
            )}
        </div>
      );
      })}
    </div>
  );
};

export default InventoryDisplay;