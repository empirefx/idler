import React from 'react';
import { useDispatch } from 'react-redux';
import { removeEnemy } from '../../store/slices/enemiesSlice';

const EnemyCard = ({ enemy }) => {
  const dispatch = useDispatch();
  const handleDefeat = () => {
    dispatch(removeEnemy({ id: enemy.id }));
  };

  return (
    <div className="enemy-card">
      <h4>{enemy.type}</h4>
      <p>ID: {enemy.id}</p>
      <button onClick={handleDefeat}>Defeat</button>
    </div>
  );
};

export default EnemyCard;
