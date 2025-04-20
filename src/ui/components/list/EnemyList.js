import React from 'react';
import EntityCard from '../EntityCard';

const EnemyList = ({ enemies }) => (
  <div className="enemies-list">
    {enemies.length > 0 ? (
      enemies.map(entity => <EntityCard key={entity.id} entity={entity} />)
    ) : (
      <p>Respawning...</p>
    )}
  </div>
);

export default EnemyList;
