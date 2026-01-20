import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { equipItem } from '../../../store/slices/playerInventorySlice';
import { moveItemBetweenInventories, removeItemFromInventory } from '../../../store/slices/inventoryThunks.js';
import { healPlayer } from '../../../store/slices/playerSlice';
import MoveItemDialog from '../common/MoveItemDialog';
import ItemInfo from '../common/ItemInfo';
import KeyBind from '../common/KeyBind';

import { selectPlayerInventoryById } from '../../../store/slices/playerInventorySlice';
import { selectVaultByPlaceId, selectPlaceInventoryById } from '../../../store/slices/placeInventorySlice';
import { calculateTotalPlayerWeight } from '../../../store/slices/inventory/inventoryUtils';

const InventoryDisplay = ({ inventoryId, otherInventoryId }) => {
  // Determine which selector to use based on inventory type
  const inventory = useSelector(state => {
    if (inventoryId === 'player') {
      return selectPlayerInventoryById(state, inventoryId);
    } else {
      // Try place inventory first, then fallback to player inventory selector
      const placeInventory = selectVaultByPlaceId(state, inventoryId);
      if (placeInventory) return placeInventory;
      return selectPlaceInventoryById(state, inventoryId);
    }
  });
  
  const otherInventory = useSelector(state => {
    if (otherInventoryId === 'player') {
      return selectPlayerInventoryById(state, otherInventoryId);
    } else {
      const placeInventory = selectVaultByPlaceId(state, otherInventoryId);
      if (placeInventory) return placeInventory;
      return selectPlaceInventoryById(state, otherInventoryId);
    }
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  if (!inventory) return null; // If inventory is not found, render nothing

  // Handle right-click context menu for moving items between inventories
  const handleContextMenu = useCallback((e, item) => {
    if (!otherInventory) return; // Do nothing if no target inventory
    e.preventDefault();
    setSelectedItem(item);
    setDialogOpen(true);
  }, [otherInventory]);

  // Handle confirm button for moving items between inventories
  const handleConfirmMove = useCallback(() => {
    if (!otherInventoryId || !selectedItem) return; // Do nothing if no target inventory or no item selected
    
    const success = dispatch(moveItemBetweenInventories(
      inventory.id,
      otherInventoryId,
      selectedItem.id,
      selectedItem.quantity || 1
    ));
    
    if (success) {
      setDialogOpen(false);
      setSelectedItem(null);
    }
  }, [dispatch, inventory.id, otherInventoryId, selectedItem]);

  // Handle cancel button for moving items between inventories
  const handleCancel = useCallback(() => {
    setDialogOpen(false);
    setSelectedItem(null);
  }, []);

  // Consume consumable items: lookup heal from the item directly
  const handleConsume = useCallback((item) => {
    const healAmount = item.consumable?.heal;
    if (healAmount > 0) {
      dispatch(healPlayer({ amount: healAmount }));
      dispatch(removeItemFromInventory(inventory.id, item.id, 1));
    }
  }, [dispatch, inventory.id]);

  // Calculate total items and weight if available
  const totalItems = inventory.items.length;
  const maxSlots = inventory.maxSlots;
  const hasWeightLimit = typeof inventory.maxWeight !== 'undefined';
  let currentWeight = 0;

  // Calculate current weight
  // If player, use calculateTotalPlayerWeight
  // Otherwise, calculate manually
  if (inventory.type === 'player') {
    currentWeight = calculateTotalPlayerWeight(inventory);
  } else {
    currentWeight = inventory.items.reduce(
      (sum, item) => sum + ((item.weight || 0) * (item.quantity || 1)),
      0
    );
  }
  const maxWeight = inventory.maxWeight; // If undefined, no weight limit

  return (
    <>
      <div className="inventory-info">
        <KeyBind value="RClick" info="Move items between inventories" />
        {inventory.type === 'player' && <KeyBind value="LClick" info="Equip item" />}
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
              {item?.type === 'equipment' && (
                // Display armor/weapon sprite
                <div className="armor-sprite" id={item?.id ? item?.id : 'empty'}></div>
              )}
              {item && (
                // Show quantity & stats for items
                <ItemInfo item={item}>
                  <p>
                    <span>{item.type === 'equipment' ? '' : (item.quantity || '')}</span>
                  </p>
                </ItemInfo>
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

export default React.memo(InventoryDisplay);