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
    availablePlaces: [],
    player: gameEngine.player
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

        await gameEngine.initializeBuildings(buildingsData);
        
        // Load saved game state if exists
        try {
          gameEngine.load();
        } catch (loadError) {
          // Continue without loading saved state
        }

        // Start the game loop
        gameEngine.start();
        
        // Update game state with initialized data including player
        setGameState(gameEngine.getState());
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
      const newState = gameEngine.getState();
      setGameState(newState);
    }, 100); // Update UI every 100ms to match game engine

    return () => clearInterval(updateInterval);
  }, [gameEngine]);

  // Navigation functions
  const getCurrentPlace = useCallback(() => {
    return gameEngine.navigation.getCurrentPlace();
  }, [gameEngine]);

  const getCurrentPlaceData = useCallback(() => {
    const currentPlaceId = getCurrentPlace();
    return gameEngine.places.get(currentPlaceId);
  }, [gameEngine, getCurrentPlace]);

  const getAvailablePlaces = useCallback(() => {
    return gameEngine.navigation.getAvailableConnections();
  }, [gameEngine]);

  const moveToPlace = useCallback((placeId) => {
    try {
      gameEngine.navigation.moveToPlace(placeId);
      setGameState(gameEngine.getState());
    } catch (err) {
      setError(err.message);
    }
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
        resources: { food: 0, materials: 0 },
        buildings: [],
        workers: [],
        currentPlace: null,
        availablePlaces: [],
        player: gameEngine.player
      },
      assignWorker: () => {},
      unassignWorker: () => {},
      clearCache: () => {},
      moveToPlace: () => {},
      getCurrentPlace: () => {},
      getCurrentPlaceData: () => {},
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
    getCurrentPlaceData,
    getAvailablePlaces
  };
};