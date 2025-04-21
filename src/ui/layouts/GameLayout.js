import React from 'react';
import { useSelector } from 'react-redux';
import { useUIVisibility } from '../UIVisibilityContext';

import CurrentPlaceDisplay from '../components/display/CurrentPlaceDisplay';
import ResourcesSection from '../components/sections/ResourcesSection';
import PlayerSection from '../components/sections/PlayerSection';
import WorkersSection from '../components/sections/WorkersSection';
import BuildingsSection from '../components/sections/BuildingsSection';
import EnemySection from '../components/sections/EnemySection';
import ControlSection from '../components/sections/ControlSection';
import PlayerEntitySection from '../components/sections/PlayerEntitySection';
import PlacesSection from '../components/sections/PlacesSection';
import LogSection from '../components/sections/LogSection';

import { selectBackgroundImage } from '../../store/slices/placesSlice';

const GameLayout = ({ clearCache }) => {
  const { playerCard, workerCard } = useUIVisibility();

  const currentPlaceBackgroundImage = useSelector(selectBackgroundImage);
  const styles = {
    backgroundImage: currentPlaceBackgroundImage ? `
      radial-gradient(circle, rgba(0,0,0,0.053) 64%, rgba(0,0,0,0.7) 93%),
      radial-gradient(75% 75% at 50% -10%, #5089DFFF 1%, #00000000 51%),
      url(assets/background/${currentPlaceBackgroundImage})` : '',
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat"
  };

  return (
    <div className="game-layout" style={styles}>
      <main className="game-main">
        <ResourcesSection clearCache={clearCache} />
        <CurrentPlaceDisplay />
        <PlayerSection />
        <WorkersSection />
        <BuildingsSection />
        <EnemySection />
        <ControlSection />
        <PlayerEntitySection />
        <PlacesSection />
        <LogSection />
      </main>
    </div>
  );
};

export default GameLayout;