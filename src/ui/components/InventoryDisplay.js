import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';

import { moveItem } from '../../store/slices/inventorySlice';
import MoveItemDialog from './common/MoveItemDialog';
import ToolTip from './common/ToolTip';

import { useSelector } from 'react-redux';
import { selectInventoryById } from '../../store/slices/inventorySlice';

const InventoryDisplay = ({ inventoryId, otherInventoryId, isVault }) => {
  const inventory = useSelector(state => selectInventoryById(state, inventoryId));
  const otherInventory = useSelector(state => selectInventoryById(state, otherInventoryId));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  if (!inventory) return null; // If inventory is not found, render nothing

  const handleContextMenu = (e, item) => {
    if (!otherInventory) return; // Do nothing if no target inventory
    e.preventDefault();
    setSelectedItem(item);
    setDialogOpen(true);
  };

  const handleConfirmMove = () => {
    if (!otherInventory || !selectedItem) return;
    dispatch(moveItem({
      fromInventoryId: inventory.id,
      toInventoryId: otherInventory.id,
      itemId: selectedItem.id,
      quantity: selectedItem.quantity || 1,
    }));
    setDialogOpen(false);
    setSelectedItem(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <div className="inventory-flex">
        {Array.from({ length: inventory.maxSlots }, (_, i) => {
          const item = inventory.items[i];

          return (
            <div
              className="inventory-slot"
              key={i}
              onContextMenu={item && otherInventory ? (e) => handleContextMenu(e, item) : undefined}
            >
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
      {dialogOpen && selectedItem && (
        <MoveItemDialog
          item={selectedItem}
          onConfirm={handleConfirmMove}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default InventoryDisplay;