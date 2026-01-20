// Save Service - handles game state persistence and loading
export const SaveService = {
  // Serialize current game state for saving
  serializeState(state) {
    return {
      player: state.player,
      buildings: state.buildings,
      places: state.places
      // Note: Not including inventory to maintain separation of concerns
      // Inventory is handled by inventory services and persists separately
    };
  },

  // Save game state to localStorage
  saveState(store) {
    const currentState = store.getState();
    const serializedState = this.serializeState(currentState);
    
    try {
      localStorage.setItem('gameState', JSON.stringify(serializedState));
      return true;
    } catch (error) {
      console.error('Failed to save game state:', 0, 'game-loop', error);
      return false;
    }
  },

  // Load game state from localStorage
  loadState(store) {
    try {
      const savedState = localStorage.getItem('gameState');
      
      if (!savedState) {
        // console.log('No saved game state found', 0, 'game-loop');
        return { success: false, state: null };
      }

      const parsedState = JSON.parse(savedState);
      
      // Validate loaded state structure
      if (!this.validateLoadedState(parsedState)) {
        console.error('Invalid saved state structure', 0, 'game-loop');
        localStorage.removeItem('gameState'); // Clear corrupted state
        return { success: false, state: null };
      }

      // Restore state via Redux actions
      if (parsedState.player) {
        store.dispatch({ 
          type: 'player/setPlayerState',
          payload: parsedState.player 
        });
      }
      
      if (parsedState.buildings) {
        store.dispatch({ 
          type: 'buildings/setBuildings',
          payload: parsedState.buildings 
        });
      }
      
      if (parsedState.places) {
        store.dispatch({ 
          type: 'places/setPlaces',
          payload: parsedState.places 
        });
      }

      console.log('Game state loaded successfully', 0, 'game-loop');
      return { success: true, state: parsedState };
    } catch (error) {
      console.error('Error loading game state:', 0, 'game-loop', error);
      // Clear corrupted state to prevent further errors
      localStorage.removeItem('gameState');
      return { success: false, state: null };
    }
  },

  // Validate the structure of loaded state
  validateLoadedState(state) {
    return state && 
           typeof state === 'object' &&
           (state.player === null || typeof state.player === 'object') &&
           (state.buildings === null || typeof state.buildings === 'object') &&
           (state.places === null || typeof state.places === 'object');
  },

  // Check if there's a saved game
  hasSavedState() {
    return localStorage.getItem('gameState') !== null;
  },

  // Clear saved game state
  clearSavedState() {
    localStorage.removeItem('gameState');
    console.log('Saved game state cleared', 0, 'game-loop');
  }
};

export default SaveService;