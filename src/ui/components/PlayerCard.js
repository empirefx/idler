import React from 'react';
import { useSelector } from 'react-redux';

import { selectPlayerInventory } from '../../store/slices/inventorySlice';
import InventoryDisplay from './display/InventoryDisplay';

const PlayerCard = ({ player, vaultId }) => {
  if (!player) return null;

  const inventory = useSelector(selectPlayerInventory);

  return (
    <div className="player-card">
      <div className="player-grid">
        <div className="player-display">
          <div className="player-avatar"></div>
          <h1>60</h1>
          <h1>{player.name}</h1>
        </div>

        <div className="player-Equipment">
          <p>Equipment</p>
        </div>

        <div className="player-stats">
          <p>Stats</p>
        </div>

        <div className="player-inventory">
          <h3>Inventory</h3>
          <InventoryDisplay 
            inventoryId="player"
            otherInventoryId={vaultId}
            isVault={false}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;