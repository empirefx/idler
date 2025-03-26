import { useState, useEffect, useCallback } from 'react';
import GameEngine from '../../game/engine/GameEngine';
import buildingsData from '../../data/buildings.json';

// Create a single instance of GameEngine outside the component
const gameEngineInstance = new GameEngine();

export const useGameState = () => {
  // Use the singleton instance instead of creating a new one
  const [gameEngine] = useState(() => gameEngineInstance);
  const [gameState, setGameState] = useState({
    resources: {
      food: 0,
      resources: 0
    },
    buildings: [],
    workers: [],
    places: Object.values(placesData.places) // Add places for debugging
  });
  const [error, setError] = useState(null);

  // Initialize game
  useEffect(() => {
    const initializeGame = async () => {
      try {
        console.log('Starting game initialization...');
        console.log('Buildings data:', buildingsData);

        if (!buildingsData) {
          throw new Error('Buildings data is missing');
        }

        if (!buildingsData.buildings) {
          throw new Error('Buildings data format is invalid');
        }

        // Initialize buildings and workers
        console.log('Initializing buildings...');
        gameEngine.initializeBuildings(buildingsData);
        
        // Load saved game state if exists
        try {
          console.log('Loading saved game state...');
          gameEngine.load();
        } catch (loadError) {
          console.warn('Failed to load saved game state:', loadError);
          // Continue without loading saved state
        }

        // Start the game loop
        console.log('Starting game loop...');
        gameEngine.start();
      } catch (err) {
        console.error('Error initializing game:', err);
        console.error('Error stack:', err.stack);
        setError(`Game initialization failed: ${err.message}`);
      }
    };

    initializeGame();

    return () => {
      gameEngine.stop();
      try {
        gameEngine.save();
      } catch (saveError) {
        console.error('Failed to save game state:', saveError);
      }
    };
  }, [gameEngine]);

  // Update game state
  useEffect(() => {
    const updateInterval = setInterval(() => {
      setGameState(gameEngine.getState());
    }, 1000); // Update UI every second

    return () => clearInterval(updateInterval);
  }, [gameEngine]);

  const assignWorker = useCallback((workerId, buildingId) => {
    gameEngine.assignWorkerToBuilding(workerId, buildingId);
  }, [gameEngine]);

  const unassignWorker = useCallback((workerId) => {
    gameEngine.unassignWorker(workerId);
  }, [gameEngine]);

  const clearCache = useCallback(() => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (err) {
      console.error('Failed to clear cache:', err);
      setError('Failed to clear cache');
    }
  }, []);

  if (error) {
    return {
      error,
      gameState: {
        resources: { food: 0, resources: 0 },
        buildings: [],
        workers: [],
        places: []
      },
      assignWorker: () => {},
      unassignWorker: () => {},
      clearCache: () => {}
    };
  }

  return {
    gameState,
    error,
    assignWorker,
    unassignWorker,
    clearCache
  };
};