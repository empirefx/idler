import { useGameState } from "./ui/hooks/useGameState";
import InputManager from "./ui/InputManager";
import GameLayout from "./ui/layouts/GameLayout";
import { UIVisibilityProvider } from "./ui/UIVisibilityContext";
import { WindowManagerProvider } from "./ui/WindowManagerContext";

const App = ({ sessionId, ws }) => {
	const { clearCache, error } = useGameState({ sessionId, ws });

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
		<WindowManagerProvider>
			<UIVisibilityProvider>
				<InputManager />
				<div className="App">
					<GameLayout clearCache={clearCache} />
				</div>
			</UIVisibilityProvider>
		</WindowManagerProvider>
	);
};

export default App;
