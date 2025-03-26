import React from 'react';
import BuildingCard from '../components/BuildingCard';
import ResourceDisplay from '../components/ResourceDisplay';

const GameLayout = ({ gameState, addBuilding, removeBuilding }) => {
  return (
    <div className="game-layout">
      <header className="game-header">
        <h1>Idler Game</h1>
        <ResourceDisplay resources={gameState.resources} />
      </header>
      
      <main className="game-main">
        <div className="buildings-grid">
          {gameState.buildings.map(building => (
            <BuildingCard
              key={building.id}
              building={building}
              quantity={building.quantity}
              onAdd={() => addBuilding(building.id)}
              onRemove={() => removeBuilding(building.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default GameLayout; 