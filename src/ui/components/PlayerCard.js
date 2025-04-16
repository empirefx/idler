import React from 'react';

import InventoryDisplay from './display/InventoryDisplay';
import EquipmentDisplay from './display/EquipmentDisplay';

const PlayerCard = ({ player, vaultId }) => {
  if (!player) return null;

  return (
    <div className="player-card">
      <div className="player-grid">
        <div className="player-display">
          <div className="player-avatar"></div>
          <h1>60</h1>
          <h1>{player.name}</h1>
        </div>

        <div className="player-Equipment">
          <EquipmentDisplay />
        </div>

        <div className="player-stats">
          <p>Base stats</p>
          {player.stats && (
            <ul>
              {Object.entries(player.stats).map(([key, value]) => (
                <li key={key}><span>{key}</span> <b>{value}</b></li>
              ))}
            </ul>
          )}
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