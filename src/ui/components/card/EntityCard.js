import React from 'react';

import ProgressBar from '../common/ProgressBar';

const EntityCard = ({ entity, avatarFolder = 'enemies' }) => {
  const { name, health, maxHealth, avatar } = entity;

  return (
    <div className="entity-card">
      <div className="block-gradient"></div>
      <img src={`assets/avatars/${avatarFolder}/${avatar}`} alt={name} draggable="false"/>
      <h3>{name}</h3>
      <ProgressBar value={health} max={maxHealth} />
    </div>
  );
};

export default React.memo(EntityCard);
