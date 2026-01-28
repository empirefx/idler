import React, { useMemo } from 'react';
import ProgressBar from '../common/ProgressBar';
import CircularProgressTimer from '../common/CircularProgressTimer';

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

  // Memoize timer props to prevent unnecessary re-renders
  const timerProps = useMemo(() => {
    const { countdown, isCountdownActive, maxCountdown } = entity;

    return {
      time: countdown,
      maxTime: maxCountdown || countdown, // Use maxCountdown if available
      isRunning: Boolean(isCountdownActive && countdown > 0),
      size: 20,
      displayText: false,
      onComplete: () => {
        // Enemy will perform an attack - could trigger attack event here if needed
      }
    };
  }, [entity.countdown, entity.isCountdownActive, entity.maxCountdown]);

  const { name, health = 0, maxHealth = 100, avatar = 'default.png', attackPattern } = entity;

  // Calculate display values based on countdown
  const isStaggered = attackPattern === 'staggered';
  const canAttack = isStaggered && entity.isCountdownActive && entity.countdown !== undefined && entity.countdown <= 0;

  return (
    <div className={`entity-card ${canAttack ? 'ready-to-attack' : ''}`} data-enemy-id={entity.id}>
      <div className="block-gradient"></div>
      <img src={`assets/avatars/${avatarFolder}/${avatar || 'default.png'}`} alt={name || 'Unknown Entity'} draggable="false"/>
      <h3>{name || 'Unknown Entity'}</h3>
      <ProgressBar value={Number(health)} max={Number(maxHealth)} />

      {/* Attack timer for staggered enemies */}
      {isStaggered && <CircularProgressTimer {...timerProps} />}
    </div>
  );
};

export default React.memo(EntityCard);