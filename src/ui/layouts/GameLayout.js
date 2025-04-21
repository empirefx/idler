import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUIVisibility } from '../UIVisibilityContext';

import BuildingCard from '../components/BuildingCard';
import ResourceDisplay from '../components/display/ResourceDisplay';
import WorkerCard from '../components/WorkerCard';
import PlaceCard from '../components/PlaceCard';
import PlayerCard from '../components/PlayerCard';
import EntityCard from '../components/EntityCard';
import ControlDisplay from '../components/display/ControlDisplay';
import CurrentPlaceDisplay from '../components/display/CurrentPlaceDisplay';
import InventoryDisplay from '../components/display/InventoryDisplay';
import EnemyDisplay from '../components/display/EnemyDisplay';
import LogDisplay from '../components/LogDisplay';

import {
  selectUnassignedWorkers,
  selectAssignedWorkers,
  selectResources,
  selectPlayer
} from '../../store/slices/playerSlice';
import { selectAllBuildings } from '../../store/slices/buildingsSlice';
import {
  selectCurrentPlace,
  selectCurrentPlaceBuildings,
  selectBackgroundImage,
  selectAvailableConnections,
} from '../../store/slices/placesSlice';
import { selectVaultByPlaceId } from '../../store/slices/inventorySlice';
import { selectEnemiesForCurrentPlace } from '../../store/slices/enemiesSlice';
import { startCombat, stopCombat, selectIsInCombat } from '../../store/slices/combatSlice';

const GameLayout = ({ clearCache }) => {
  const { playerCard, workerCard } = useUIVisibility();
  // Use selectors to get state from Redux
  const buildings = useSelector(selectAllBuildings);
  const currentBuildings = useSelector(selectCurrentPlaceBuildings);
  const currentPlaceBackgroundImage = useSelector(selectBackgroundImage);
  const resources = useSelector(selectResources);
  const unassignedWorkers = useSelector(selectUnassignedWorkers);
  const assignedWorkers = useSelector(selectAssignedWorkers);
  const availableConnections = useSelector(selectAvailableConnections);
  const playerInfo = useSelector(selectPlayer);
  const currentPlace = useSelector(selectCurrentPlace);
  const vault = useSelector(state => selectVaultByPlaceId(state, currentPlace.id));
  const enemies = useSelector(selectEnemiesForCurrentPlace);
  const dispatch = useDispatch();
  const isInCombat = useSelector(selectIsInCombat);

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
        <section className="resources-section">
          <ResourceDisplay resources={resources} />
          <button onClick={clearCache} className="clear-cache-btn">Clear Cache</button>
        </section>
        
        <CurrentPlaceDisplay />
        
        {playerCard && (
          <section className="player-section">
            <PlayerCard player={playerInfo} vaultId={currentPlace.id} />
          </section>
        )}

        {workerCard && (
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
        )}

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

        {currentPlace.spawn && (
          <>
            <ControlDisplay
              isInCombat={isInCombat}
              onToggleCombat={() => dispatch(isInCombat ? stopCombat() : startCombat())}
            />
            <EnemyDisplay enemies={enemies} />
          </>
        )}

        {playerInfo && (
          <section className="player-entity-section">
            <EntityCard entity={playerInfo} avatarFolder="players" />
          </section>
        )}

        <section className="places-section">
          {currentPlace && vault && (
            <div className="place-vault">
              <h3>Vault</h3>
              <InventoryDisplay 
                inventoryId={currentPlace.id}
                otherInventoryId="player"
                isVault={true}
              />
            </div>
          )}
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

        <section className="log-section">
          <h2>Log</h2>
          <LogDisplay />
        </section>
      </main>
    </div>
  );
};

export default GameLayout;