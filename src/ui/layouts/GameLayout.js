import React from 'react';
import BuildingCard from '../components/BuildingCard';
import ResourceDisplay from '../components/ResourceDisplay';
import WorkerCard from '../components/WorkerCard';
import PlaceCard from '../components/PlaceCard';
import CurrentPlaceDisplay from '../components/CurrentPlaceDisplay';
import places from '../../data/places.json';
import buildings from '../../data/buildings.json';

const GameLayout = ({ gameState, assignWorker, unassignWorker, clearCache }) => {
  const currentPlace = places.places[gameState.player.currentLocation];
  const currentBuildings = currentPlace?.buildings || [];
  
  return (
    <div className="game-layout">
      <header className="game-header">
        <h1>Idler Game</h1>
        <div className="header-controls">
          <ResourceDisplay resources={gameState.resources} gameState={gameState} />
          <button onClick={clearCache} className="clear-cache-btn">Clear Cache</button>
        </div>
      </header>
      
      <main className="game-main">
        <CurrentPlaceDisplay />
        <section className="workers-section">
          <h2>Workers</h2>
          <div className="workers-grid">
            {gameState.workers.map(worker => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                buildings={currentBuildings.map(buildingId => buildings.buildings[buildingId])}
                onAssign={assignWorker}
                onUnassign={unassignWorker}
              />
            ))}
          </div>
        </section>

        <section className="buildings-section">
          <h2>Buildings in {currentPlace?.name || 'Current Location'}</h2>
          <div className="buildings-grid">
            {currentBuildings.map(buildingId => {
              const building = buildings.buildings[buildingId];
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
          <h2>Places</h2>
          <div className="places-grid">
            {gameState.availablePlaces && gameState.availablePlaces.map(place => (
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