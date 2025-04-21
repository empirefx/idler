import React from 'react';
import { useSelector } from 'react-redux';
import { useUIVisibility } from '../../UIVisibilityContext';
import PlayerCard from '../PlayerCard';
import { selectPlayer } from '../../../store/slices/playerSlice';
import { selectCurrentPlace } from '../../../store/slices/placesSlice';

const PlayerSection = () => {
  const { playerCard } = useUIVisibility();
  const playerInfo = useSelector(selectPlayer);
  const currentPlace = useSelector(selectCurrentPlace);

  if (!playerCard || !playerInfo) return null;

  return (
    <section className="player-section">
      <PlayerCard player={playerInfo} vaultId={currentPlace.id} />
    </section>
  );
};

export default PlayerSection;
