import React from 'react';
import { useSelector } from 'react-redux';

import CurrentPlaceDisplay from '../components/display/CurrentPlaceDisplay';
import PlayerSection from '../components/sections/PlayerSection';
import WorkersSection from '../components/sections/WorkersSection';
import BuildingsSection from '../components/sections/BuildingsSection';
import EnemySection from '../components/sections/EnemySection';
import ControlSection from '../components/sections/ControlSection';
import PlayerEntitySection from '../components/sections/PlayerEntitySection';
import PlacesSection from '../components/sections/PlacesSection';
import LogSection from '../components/sections/LogSection';
import NotificationContainer from '../components/common/NotificationContainer';

import { selectBackgroundImage } from '../../store/slices/placesSlice';

const GameLayout = ({ clearCache }) => {
  const currentPlaceBackgroundImage = useSelector(selectBackgroundImage);
  const styles = {
    backgroundImage: currentPlaceBackgroundImage ? `
      radial-gradient(circle, rgba(0,0,0,0.053) 64%, rgba(0,0,0,0.7) 93%),
      radial-gradient(75% 75% at 50% -10%, #5089DFFF 1%, #00000000 51%),
      radial-gradient(40% 30% at 50% 105%, rgb(0, 46, 104, 0.8) 0%, #073AFF00 100%),
      url(assets/background/${currentPlaceBackgroundImage})` : '',
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    backgroundRepeat: "no-repeat"
  };

  return (
    <div className="game-layout" style={styles}>
      <NotificationContainer />
      <main className="game-main">
        <CurrentPlaceDisplay />
        <PlayerSection />
        <WorkersSection />
        <BuildingsSection />
        <EnemySection />
        <ControlSection clearCache={clearCache}/>
        <PlayerEntitySection />
        <PlacesSection />
        <LogSection />
      </main>
    </div>
  );
};

export default GameLayout;