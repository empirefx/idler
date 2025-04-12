import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../store';

import GameEngine from '../../game/engine/GameEngine';
import Logger from '../../game/engine/Logger';

export const useGameState = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux and pass it to GameEngine

  // Create GameEngine instance with a ref to ensure it's created only once
  const gameEngineRef = useRef(null);
  if (!gameEngineRef.current) {
    gameEngineRef.current = new GameEngine(dispatch, store);
  }
  const gameEngine = gameEngineRef.current;
  const [error, setError] = useState(null);
  const isInitialized = useRef(false);

  // Initialize game
  useEffect(() => {
    const initializeGame = async () => {
      // Prevent double initialization
      if (isInitialized.current) {
        Logger.log('Game already initialized, skipping', 0, 'game-loop');
        return;
      }
      
      Logger.log('Initializing game...', 0, 'game-loop');
      isInitialized.current = true;
      
      try {
        // Use the ref directly
        const gameEngine = gameEngineRef.current;
        Logger.log('GameEngine instance:', 0, 'game-loop', gameEngine);
        
        // Load saved game state if exists
        try {
          gameEngine.load();
          Logger.log('Game state loaded', 0, 'game-loop');
        } catch (loadError) {
          Logger.error('Error loading game state:', 0, 'game-loop', loadError);
        }
        
        // Start the game loop
        Logger.log('Starting game loop', 0, 'game-loop');
        gameEngine.start();
        Logger.log('Game loop started', 0, 'game-loop');
      } catch (err) {
        Logger.error('Error initializing game:', 0, 'game-loop', err);
        Logger.error('Error stack:', 0, 'game-loop', err.stack);
        setError(`Game initialization failed: ${err.message}`);
      }
    };
    
    initializeGame();
    
    return () => {
      Logger.log('Cleanup function called', 0, 'game-loop');
      const gameEngine = gameEngineRef.current;
      gameEngine.stop();
      try {
        gameEngine.save();
        Logger.log('Game state saved', 0, 'game-loop');
      } catch (saveError) {
        Logger.error('Failed to save game state:', 0, 'game-loop', saveError);
      }
    };
  }, []);

  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem('gameState');
      window.location.reload();
    } catch (err) {
      Logger.error('Failed to clear cache:', 0, 'game-loop', err);
      setError('Failed to clear cache');
    }
  }, []);

  if (error) {
    return {
      error,
      clearCache: () => {}
    };
  }

  return {
    error,
    clearCache
  };
};