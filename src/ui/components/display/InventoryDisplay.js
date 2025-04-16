import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { moveItem, equipItem } from '../../../store/slices/inventorySlice';
import MoveItemDialog from '../common/MoveItemDialog';
import ToolTip from '../common/ToolTip';

import { selectInventoryById } from '../../../store/slices/inventorySlice';
import { calculateTotalPlayerWeight } from '../../../store/slices/inventorySlice';

const InventoryDisplay = ({ inventoryId, otherInventoryId }) => {
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

  // Calculate total items and weight if available
  const totalItems = inventory.items.length;
  const maxSlots = inventory.maxSlots;
  const hasWeightLimit = typeof inventory.maxWeight !== 'undefined';
  let currentWeight = 0;
  if (inventory.type === 'player') {
    currentWeight = calculateTotalPlayerWeight(inventory);
  } else {
    currentWeight = inventory.items.reduce(
      (sum, item) => sum + ((item.weight || 0) * (item.quantity || 1)),
      0
    );
  }
  const maxWeight = inventory.maxWeight;

  return (
    <>
      <div className="inventory-info" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        <span>{totalItems} / <b>{maxSlots} slots</b></span>
        {hasWeightLimit && (
          <span style={{ marginLeft: '16px' }}>
            {currentWeight} / <b>{maxWeight} lt</b>
          </span>
        )}
      </div>
      <div className="inventory-flex">
        {Array.from({ length: inventory.maxSlots }, (_, i) => {
          const item = inventory.items[i];

          return (
            <div
              className="inventory-slot"
              key={i}
              onContextMenu={item && otherInventory ? (e) => handleContextMenu(e, item) : undefined}
              onClick={item && item.type === 'equipment' ? () => dispatch(equipItem({ inventoryId: inventory.id, itemId: item.id })) : undefined}
              style={{ cursor: item && item.type === 'equipment' ? 'pointer' : 'default' }}
            >
              {item && (
                <ToolTip item={item}>
                  <p>
                    <span>{item.type === 'equipment' ? '' : (item.quantity || '')}</span>
                  </p>
                </ToolTip>
              )}
            </div>
          );
        })}
      </div>
      {dialogOpen && selectedItem && ( // Open dialog if an item is selected
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