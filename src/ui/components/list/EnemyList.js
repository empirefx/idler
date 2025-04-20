import React from 'react';
import EnemyCard from '../EnemyCard';

const EnemyList = ({ enemies }) => (
  <div className="enemies-list">
    {enemies.length > 0 ? (
      enemies.map(enemy => <EnemyCard key={enemy.id} enemy={enemy} />)
    ) : (
      <p>No enemies here.</p>
    )}
  </div>
);

export default EnemyList;
