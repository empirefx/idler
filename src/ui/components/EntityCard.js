import React from 'react';

const EntityCard = ({ entity }) => {
  const { name, health, maxHealth } = entity;
  const percent = Math.round((health / maxHealth) * 100);

  return (
    <div className="entity-card">
      <h4>{name}</h4>
      <p>Health: {health}/{maxHealth}</p>
      <progress value={health} max={maxHealth} />
    </div>
  );
};

export default EntityCard;
