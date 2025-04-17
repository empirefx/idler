import React, { createContext, useContext, useState, useCallback } from 'react';

// Manages the visibility of UI panels/cards
const UIVisibilityContext = createContext();

export const UIVisibilityProvider = ({ children }) => {
  // Default visible
  const [visible, setVisible] = useState({
    playerCard: false,
    workerCard: false,
  });

  // Toggle functions
  const togglePlayerCard = useCallback(() => {
    setVisible(v => ({ ...v, playerCard: !v.playerCard }));
  }, []);

  const toggleWorkerCard = useCallback(() => {
    setVisible(v => ({ ...v, workerCard: !v.workerCard }));
  }, []);

  return (
    <UIVisibilityContext.Provider value={{ ...visible, togglePlayerCard, toggleWorkerCard }}>
      {children}
    </UIVisibilityContext.Provider>
  );
};

export const useUIVisibility = () => useContext(UIVisibilityContext);
