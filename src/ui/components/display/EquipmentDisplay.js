import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unequipItem, selectInventoryById } from '../../../store/slices/inventorySlice';
import ItemInfo from '../common/ItemInfo';

const EQUIPMENT_SLOTS = [
  { key: 'head', label: 'Head' },
  { key: 'body', label: 'Body' },
  { key: 'pants', label: 'Pants' },
  { key: 'main-weapon', label: 'Main Weapon' },
  { key: 'second-weapon', label: 'Second Weapon' },
];

const EquipmentDisplay = () => {
  const dispatch = useDispatch();
  const playerInventory = useSelector(state => selectInventoryById(state, 'player'));
  const equipment = playerInventory?.equipment || {};

  const handleUnequip = (slot) => {
    if (equipment[slot]) {
      dispatch(unequipItem({ inventoryId: 'player', slot }));
    }
  };

  return (
    <div className="equipment-flex">
      {EQUIPMENT_SLOTS.map(({ key, label }) => (
        <div className={key} key={key} onClick={() => equipment[key] && handleUnequip(key)} style={{ cursor: equipment[key] ? 'pointer' : 'default' }}>
          {equipment[key] ? (
            <ItemInfo item={equipment[key]}>
              <span>{equipment[key].name}</span>
            </ItemInfo>
          ) : (
            <span>{label}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default EquipmentDisplay;
