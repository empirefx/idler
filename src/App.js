import React from "react";
import { UIVisibilityProvider } from "./ui/UIVisibilityContext";
import InputManager from "./ui/InputManager";
import { useGameState } from "./ui/hooks/useGameState";
import GameLayout from "./ui/layouts/GameLayout";

const App = () => {
  const { clearCache, error } = useGameState();

  if (error) {
    return (
      <div className="error-container">
        <h1>Error Loading Game</h1>
        <p>{error}</p>
        <p>Please check if the game files are properly loaded.</p>
      </div>
    );
  }

  return (
    <UIVisibilityProvider>
      <InputManager />
      <div className="App">
        <GameLayout clearCache={clearCache} />
      </div>
    </UIVisibilityProvider>
  );
};

export default App;
