import React from 'react';
import { useGameState } from './ui/hooks/useGameState';
import GameLayout from './ui/layouts/GameLayout';
import './ui/styles/components.css';

const App = () => {
  const { gameState, addBuilding, removeBuilding, assignWorker, unassignWorker, clearCache, error } = useGameState();

  if (error) {
    return (
      <div className="error-container">
        <h1>Error Loading Game</h1>
        <p>{error}</p>
        <p>Please check if the game files are properly loaded.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <GameLayout
        gameState={gameState}
        addBuilding={addBuilding}
        removeBuilding={removeBuilding}
        assignWorker={assignWorker}
        unassignWorker={unassignWorker}
        clearCache={clearCache}
      />
    </div>
  );
};

export default App; 