import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import InventoryDisplay from './display/InventoryDisplay';
import EquipmentDisplay from './display/EquipmentDisplay';
import StatList from './list/StatList';
import ProgressBar from './common/ProgressBar';
import NewLevelDialog from './common/NewLevelDialog';
import { levelUp } from '../../store/slices/playerSlice';

const PlayerCard = ({ player, vaultId }) => {
  const dispatch = useDispatch();
  const [showLevelUp, setShowLevelUp] = useState(false);
  const handleLevelChoice = (bonuses) => {
    dispatch(levelUp(bonuses));
    setShowLevelUp(false);
  };

  if (!player) return null;

  return (
    <div className="player-card">
      <div className="player-grid">
        <div className="player-display">
          <div className="player-avatar"></div>
          <h1>{player.level}</h1>
          <h1>{player.name}</h1>
          {/* <ProgressBar value={player.exp} max={player.expToNext} /> */}
          <div className="player-options">
            {player.exp >= player.expToNext && (
              <button className="select-btn" onClick={() => setShowLevelUp(prev => !prev)}>Level Up</button>
            )}
            {showLevelUp && (
              <NewLevelDialog
                onChoose={handleLevelChoice}
                onCancel={() => setShowLevelUp(false)}
              />
            )}
          </div>
        </div>

        <div className="player-Equipment">
          <EquipmentDisplay />
        </div>

        <div className="player-stats">
          <p>Base stats</p>
          {player.stats && (
            <StatList baseStats={player.stats} />
          )}
          <ul>
            <li><span>EXP</span> {player.exp}/{player.expToNext}</li>
          </ul>
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