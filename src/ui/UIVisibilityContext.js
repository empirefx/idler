import React, { createContext, useContext, useState, useCallback } from 'react';

// Manages the visibility of UI panels/cards
const UIVisibilityContext = createContext();

export const UIVisibilityProvider = ({ children }) => {
  // Default visible
  const [visible, setVisible] = useState({
    playerCard: false,
    workerCard: false,
    npcDialog: {
      isOpen: false,
      npcId: null,
      selectedOption: null
    }
  });

  // Toggle functions
  const togglePlayerCard = useCallback(() => {
    setVisible(v => ({ ...v, playerCard: !v.playerCard }));
  }, []);

  const toggleWorkerCard = useCallback(() => {
    setVisible(v => ({ ...v, workerCard: !v.workerCard }));
  }, []);

  const openNPCDialog = useCallback((npcId) => {
    setVisible(v => ({ 
      ...v, 
      npcDialog: {
        isOpen: true,
        npcId,
        selectedOption: null
      }
    }));
  }, []);

  const selectNPCOption = useCallback((optionIndex) => {
    setVisible(v => ({ 
      ...v, 
      npcDialog: {
        ...v.npcDialog,
        selectedOption: optionIndex
      }
    }));
  }, []);

  const closeNPCDialog = useCallback(() => {
    setVisible(v => ({ 
      ...v, 
      npcDialog: {
        isOpen: false,
        npcId: null,
        selectedOption: null
      }
    }));
  }, []);

  return (
    <UIVisibilityContext.Provider value={{ 
      ...visible, 
      togglePlayerCard, 
      toggleWorkerCard,
      openNPCDialog,
      selectNPCOption,
      closeNPCDialog
    }}>
      {children}
    </UIVisibilityContext.Provider>
  );
};

export const useUIVisibility = () => useContext(UIVisibilityContext);
