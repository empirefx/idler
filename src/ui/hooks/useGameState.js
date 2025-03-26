import { useState, useEffect, useCallback, useRef } from 'react';
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
      materials: 0
    },
    buildings: [],
    workers: [],
    currentPlace: null,
    availablePlaces: []
  });
  const [error, setError] = useState(null);
  const isInitialized = useRef(false);

  // Initialize game
  useEffect(() => {
    const initializeGame = async () => {
      // Prevent double initialization
      if (isInitialized.current) return;
      isInitialized.current = true;

      try {
        if (!buildingsData) {
          throw new Error('Buildings data is missing');
        }

        if (!buildingsData.buildings) {
          throw new Error('Buildings data format is invalid');
        }

        // Initialize buildings and workers
        gameEngine.initializeBuildings(buildingsData);
        
        // Load saved game state if exists
        try {
          gameEngine.load();
        } catch (loadError) {
          // Continue without loading saved state
        }

        // Start the game loop
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

  // Navigation functions
  const getCurrentPlace = useCallback(() => {
    const currentPlaceId = gameEngine.navigation.getCurrentPlace();
    return gameEngine.places.get(currentPlaceId);
  }, [gameEngine]);

  const getAvailablePlaces = useCallback(() => {
    return gameEngine.navigation.getAvailableConnections();
  }, [gameEngine]);

  const moveToPlace = useCallback((placeId) => {
    try {
      const newPlace = gameEngine.navigation.moveToPlace(placeId);
      setGameState(prev => ({
        ...prev,
        currentPlace: newPlace,
        availablePlaces: gameEngine.navigation.getAvailableConnections()
      }));
    } catch (err) {
      setError(err.message);
    }
  }, [gameEngine]);

  // Update game state to include navigation info
  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      currentPlace: getCurrentPlace(),
      availablePlaces: getAvailablePlaces()
    }));
  }, [getCurrentPlace, getAvailablePlaces]);

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
        resources: { food: 0, materials: 0 },
        buildings: [],
        workers: [],
        currentPlace: null,
        availablePlaces: []
      },
      assignWorker: () => {},
      unassignWorker: () => {},
      clearCache: () => {},
      moveToPlace: () => {},
      getCurrentPlace: () => {},
      getAvailablePlaces: () => {}
    };
  }

  return {
    gameState,
    error,
    assignWorker,
    unassignWorker,
    clearCache,
    moveToPlace,
    getCurrentPlace,
    getAvailablePlaces
  };
};