import React from 'react';
import EnemyList from '../list/EnemyList';

const EnemyDisplay = ({ enemies, isInCombat, onToggleCombat }) => (
  <section className="enemies-section">
    <EnemyList enemies={enemies} />
    <div className="combat-controls">
      <button onClick={onToggleCombat}>
        {isInCombat ? 'Stop Combat' : 'Engage Combat'}
      </button>
    </div>
  </section>
);

export default EnemyDisplay;
