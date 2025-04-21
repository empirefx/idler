import React,{ useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { moveItem, equipItem, removeItem } from '../../../store/slices/inventorySlice';
import { healPlayer } from '../../../store/slices/playerSlice';
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

  // Consume consumable items: lookup heal from the item directly
  const handleConsume = (item) => {
    const healAmount = item.consumable?.heal;
    if (healAmount > 0) {
      dispatch(healPlayer({ amount: healAmount }));
      dispatch(removeItem({ inventoryId: inventory.id, itemId: item.id, quantity: 1 }));
    }
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
              className={`inventory-slot ${item ? 'filled' : 'empty'}`}
              key={i}
              onContextMenu={item && otherInventory ? (e) => handleContextMenu(e, item) : undefined}
              // Handle equipment and consumable items
              // left click for equipment/consumable, right click for move to vault/inventory
              onClick={
                item
                  ? item.type === 'equipment'
                    ? () => dispatch(equipItem({ inventoryId: inventory.id, itemId: item.id }))
                    : item.type === 'consumable'
                      ? () => handleConsume(item)
                      : undefined
                  : undefined
              }
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