import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../../../store';

import GameEngine from '../../game/engine/GameEngine';

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
        console.log('Game already initialized, skipping');
        return;
      }
      
      console.log('Initializing game...');
      isInitialized.current = true;
      
      try {
        // Use the ref directly
        const gameEngine = gameEngineRef.current;
        console.log('GameEngine instance:', gameEngine);
        
        // Load saved game state if exists
        try {
          gameEngine.load();
          console.log('Game state loaded');
        } catch (loadError) {
          console.error('Error loading game state:', loadError);
        }
        
        // Start the game loop
        console.log('Starting game loop');
        gameEngine.start();
        console.log('Game loop started');
      } catch (err) {
        console.error('Error initializing game:', err);
        console.error('Error stack:', err.stack);
        setError(`Game initialization failed: ${err.message}`);
      }
    };
    
    initializeGame();
    
    return () => {
      console.log('Cleanup function called');
      const gameEngine = gameEngineRef.current;
      gameEngine.stop();
      try {
        gameEngine.save();
        console.log('Game state saved');
      } catch (saveError) {
        console.error('Failed to save game state:', saveError);
      }
    };
  }, []);

  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem('gameState');
      window.location.reload();
    } catch (err) {
      console.error('Failed to clear cache:', err);
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