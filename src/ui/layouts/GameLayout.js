import React from 'react';
import BuildingCard from '../components/BuildingCard';
import ResourceDisplay from '../components/ResourceDisplay';
import WorkerCard from '../components/WorkerCard';

const GameLayout = ({ gameState, assignWorker, unassignWorker, clearCache }) => {
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
        <section className="workers-section">
          <h2>Workers</h2>
          <div className="workers-grid">
            {gameState.workers.map(worker => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                buildings={gameState.buildings}
                onAssign={assignWorker}
                onUnassign={unassignWorker}
              />
            ))}
          </div>
        </section>

        <section className="buildings-section">
          <h2>Buildings</h2>
          <div className="buildings-grid">
            {gameState.buildings.map(building => (
              <BuildingCard
                key={building.id}
                building={building}
                quantity={building.quantity}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default GameLayout;