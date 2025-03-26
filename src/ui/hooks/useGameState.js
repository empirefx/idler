import { useState, useEffect, useCallback } from 'react';
import GameEngine from '../../game/engine/GameEngine';
import buildingsData from '../../data/buildings.json';

export const useGameState = () => {
  const [gameEngine] = useState(() => new GameEngine());
  const [gameState, setGameState] = useState({
    resources: {
      worker: 0,
      food: 0,
      resources: 0
    },
    buildings: []
  });
  const [error, setError] = useState(null);

  // Initialize game
  useEffect(() => {
    const initializeGame = async () => {
      try {
        if (!buildingsData || !buildingsData.buildings) {
          throw new Error('Invalid building data format');
        }

        gameEngine.initializeBuildings(buildingsData);
        gameEngine.load(); // Load saved game state if exists
        gameEngine.start();
      } catch (err) {
        console.error('Error initializing game:', err);
        setError(err.message);
      }
    };

    initializeGame();

    return () => {
      gameEngine.stop();
      gameEngine.save(); // Save game state when component unmounts
    };
  }, [gameEngine]);

  // Update game state
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setGameState(gameEngine.getState());
    }, 1000); // Update UI every second

    return () => clearInterval(updateInterval);
  }, [gameEngine]);

  // Actions
  const addBuilding = useCallback((buildingId) => {
    const building = gameEngine.buildings.get(buildingId);
    if (building) {
      building.add();
      gameEngine.save(); // Save after each action
    }
  }, [gameEngine]);

  const removeBuilding = useCallback((buildingId) => {
    const building = gameEngine.buildings.get(buildingId);
    if (building) {
      building.remove();
      gameEngine.save(); // Save after each action
    }
  }, [gameEngine]);

  const saveGame = useCallback(() => {
    gameEngine.save();
  }, [gameEngine]);

  const loadGame = useCallback(() => {
    gameEngine.load();
  }, [gameEngine]);

  if (error) {
    return {
      error,
      gameState: {
        resources: { worker: 0, food: 0, resources: 0 },
        buildings: []
      },
      addBuilding: () => {},
      removeBuilding: () => {},
      saveGame: () => {},
      loadGame: () => {}
    };
  }

  return {
    gameState,
    addBuilding,
    removeBuilding,
    saveGame,
    loadGame
  };
}; 