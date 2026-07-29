import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useGameState } from "./ui/hooks/useGameState";
import { GameClient } from "./game/GameClient";
import InputManager from "./ui/InputManager";
import GameLayout from "./ui/layouts/GameLayout";
import { UIVisibilityProvider } from "./ui/UIVisibilityContext";
import { WindowManagerProvider } from "./ui/WindowManagerContext";

const App = ({ sessionId, ws }) => {
	const dispatch = useDispatch();
	const clientRef = useRef(null);
	const { clearCache, error } = useGameState({ sessionId, ws });

	const handleJoin = (nickname) => {
		const client = new GameClient(dispatch, () => {});
		client.connect(nickname);
		clientRef.current = client;
	};

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
