import React from 'react';
import EnemyList from '../list/EnemyList';

const EnemyDisplay = ({ enemies }) => (
  <section className="enemies-section">
    <EnemyList enemies={enemies} />
  </section>
);

export default EnemyDisplay;
