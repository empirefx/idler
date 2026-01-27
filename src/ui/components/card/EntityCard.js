import React from 'react';
import ProgressBar from '../common/ProgressBar';

const EntityCard = ({ entity, avatarFolder = 'enemies' }) => {

  // Handle case where entity is null/undefined (still loading)
  if (!entity ||
      typeof entity !== 'object' ||
      entity.health === undefined ||
      entity.maxHealth === undefined) {
    return (
      <div className="entity-card error">
        <div className="block-gradient"></div>
        <h3>Loading or Invalid Data</h3>
      </div>
    );
  }

  const { name, health = 0, maxHealth = 100, avatar = 'default.png', attackPattern, countdown, isCountdownActive } = entity;

  // Calculate display values based on countdown
  const isStaggered = attackPattern === 'staggered';
  const canAttack = isStaggered && isCountdownActive && countdown !== undefined && countdown <= 0;
  const displayTime = isStaggered && isCountdownActive && countdown > 0 ? (countdown / 1000).toFixed(1) : null;

  // Color coding for countdown urgency
  const getTimeColor = (time) => {
    if (time <= 1) return '#ff4444'; // Red - very urgent
    if (time <= 2) return '#ffaa00'; // Orange/Yellow - getting urgent
    return '#44ff44'; // Green - safe
  };

  return (
    <div className={`entity-card ${canAttack ? 'ready-to-attack' : ''}`}>
    <div className={`entity-card ${canAttack ? 'ready-to-attack' : ''}`} data-enemy-id={entity.id}>
      <div className="block-gradient"></div>
      <img src={`assets/avatars/${avatarFolder}/${avatar || 'default.png'}`} alt={name || 'Unknown Entity'} draggable="false"/>
      <h3>{name || 'Unknown Entity'}</h3>
      <ProgressBar value={Number(health)} max={Number(maxHealth)} />

      {/* Attack indicator for staggered enemies with countdown display */}
      {isStaggered && (
        <div className="attack-indicator">
          {canAttack ? (
            <span className="attack-ready">⚔️ Ready to Attack</span>
          ) : isCountdownActive && displayTime !== null ? (
            <span className="attack-cooldown" style={{ color: getTimeColor(parseFloat(displayTime)) }}>
              ⏱️ {displayTime}s
            </span>
          ) : isCountdownActive ? (
            <span className="attack-preparing" style={{ color: '#44ff44' }}>
              ⚡ Attacking...
            </span>
          ) : (
            <span className="attack-waiting" style={{ color: '#888888' }}>
              ⏸️ Waiting for combat...
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(EntityCard);
