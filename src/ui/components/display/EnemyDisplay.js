import React from 'react';
import EnemyList from '../list/EnemyList';

const EnemyDisplay = ({ enemies, isInCombat, onToggleCombat }) => (
  <section className="enemies-section">
    <div className="combat-controls">
      <button onClick={onToggleCombat}>
        {isInCombat ? 'Stop Combat' : 'Engage Combat'}
      </button>
    </div>
    <h2>Enemies</h2>
    <EnemyList enemies={enemies} />
  </section>
);

export default EnemyDisplay;
