import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../../../store/slices/playerSlice';
import EntityCard from '../EntityCard';

const PlayerEntitySection = () => {
  const playerInfo = useSelector(selectPlayer);
  if (!playerInfo) return null;
  return (
    <section className="player-entity-section">
      <EntityCard entity={playerInfo} avatarFolder="players" />
    </section>
  );
};

export default PlayerEntitySection;
