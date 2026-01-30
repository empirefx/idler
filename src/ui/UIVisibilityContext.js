import React, { createContext, useContext, useState, useCallback } from 'react';

// Manages the visibility of UI panels/cards
const UIVisibilityContext = createContext();

export const UIVisibilityProvider = ({ children }) => {
  // Default visible
  const [visible, setVisible] = useState({
    playerCard: false,
    workerCard: false,
    npcSection: true,
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
    setVisible(v => {
      const newWorkerCard = !v.workerCard;
      // Auto-toggle NPC section: show NPC when worker is hidden
      const newNpcSection = !newWorkerCard;
      return { ...v, workerCard: newWorkerCard, npcSection: newNpcSection };
    });
  }, []);

  const toggleNpcSection = useCallback(() => {
    setVisible(v => ({ ...v, npcSection: !v.npcSection }));
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
      toggleNpcSection,
      openNPCDialog,
      selectNPCOption,
      closeNPCDialog
    }}>
      {children}
    </UIVisibilityContext.Provider>
  );
};

export const useUIVisibility = () => useContext(UIVisibilityContext);
