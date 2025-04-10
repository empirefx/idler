import React from 'react';
import { useSelector } from 'react-redux';

import BuildingCard from '../components/BuildingCard';
import ResourceDisplay from '../components/ResourceDisplay';
import WorkerCard from '../components/WorkerCard';
import PlaceCard from '../components/PlaceCard';
import CurrentPlaceDisplay from '../components/CurrentPlaceDisplay';

import {
  selectUnassignedWorkers,
  selectAssignedWorkers,
  selectResources
} from '../../../store/slices/playerSlice';
import { selectAllBuildings } from '../../../store/slices/buildingsSlice';
import {
  selectCurrentPlaceBuildings,
  selectBackgroundImage,
  selectAvailableConnections,
} from '../../../store/slices/placesSlice';

const GameLayout = ({ clearCache }) => {
  // Use selectors to get state from Redux
  const buildings = useSelector(selectAllBuildings);
  const currentBuildings = useSelector(selectCurrentPlaceBuildings);
  const currentPlaceBackgroundImage = useSelector(selectBackgroundImage);
  const resources = useSelector(selectResources);
  const unassignedWorkers = useSelector(selectUnassignedWorkers);
  const assignedWorkers = useSelector(selectAssignedWorkers);
  const availableConnections = useSelector(selectAvailableConnections);

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
      <header className="game-header">
        <div className="header-controls">
          <ResourceDisplay resources={resources} />
          <button onClick={clearCache} className="clear-cache-btn">Clear Cache</button>
        </div>
      </header>
      
      <main className="game-main">
        <CurrentPlaceDisplay />
        <section className="workers-section">
          <h2>Workers</h2>
          <div className="workers-grid">
            <div className="workers-list">
              {unassignedWorkers.length > 0 ? (
                unassignedWorkers.map(worker => (
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    buildings={currentBuildings.map(buildingId => buildings[buildingId])}
                  />
                ))
              ) : (
                <div className="no-workers-message">No unassigned workers available</div>
              )}
            </div>
            
            <h3>Assigned</h3>
            <div className="workers-list">
              {assignedWorkers.length > 0 ? (
                assignedWorkers.map(worker => (
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    buildings={currentBuildings.map(buildingId => buildings[buildingId])}
                  />
                ))
              ) : (
                <div className="no-workers-message">Currently no workers</div>
              )}
            </div>
          </div>
        </section>

        <section className="buildings-section">
          <div className="buildings-grid">
            {currentBuildings.map(buildingId => {
              const building = buildings[buildingId];
              return building ? (
                <BuildingCard
                  key={buildingId}
                  building={building}
                />
              ) : null;
            })}
          </div>
        </section>

        <section className="places-section">
          <h2>Locations</h2>
          <div className="places-grid">
            {availableConnections && availableConnections.map(place => (
              <PlaceCard
                key={place.id}
                place={place}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GameLayout;