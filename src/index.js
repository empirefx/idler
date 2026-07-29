import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./styles/components.css";
import "./styles/global.css";
import "./styles/icons-set.css";
import "./styles/npc-avatars.css";
import "./styles/npc-portraits.css";
import "./styles/components/npc-dialog.css";
import "./styles/components/trade-message-dialog.css";
import "./styles/login.css";

document.addEventListener("contextmenu", (e) => e.preventDefault());

const ROOT = document.getElementById("root");
const LOGIN_SCREEN = document.getElementById("login-screen");
const NICKNAME_INPUT = document.getElementById("nickname-input");
const JOIN_BUTTON = document.getElementById("join-button");
const LOGIN_ERROR = document.getElementById("login-error");

let ws = null;
let root = null;

const mountGame = (sessionId) => {
	LOGIN_SCREEN.style.display = "none";
	ROOT.style.display = "";
	root = createRoot(ROOT);
	root.render(
		<Provider store={store}>
			<App sessionId={sessionId} ws={ws} />
		</Provider>,
	);
};

const joinGame = () => {
	const nickname = NICKNAME_INPUT.value.trim();
	if (nickname.length < 4 || nickname.length > 15) {
		LOGIN_ERROR.textContent = "Nickname must be between 4 and 15 characters.";
		return;
	}
	LOGIN_ERROR.textContent = "";
	JOIN_BUTTON.disabled = true;
	JOIN_BUTTON.textContent = "Connecting...";

	ws = new WebSocket(`ws://${location.hostname}:3001`);

	ws.onopen = () => {
		ws.send(JSON.stringify({ type: "JOIN", nickname }));
	};

	ws.onmessage = (event) => {
		const data = JSON.parse(event.data);
		if (data.type === "ACCEPTED") {
			sessionStorage.setItem("sessionId", data.sessionId);
			mountGame(data.sessionId);
		} else if (data.type === "ERROR") {
			LOGIN_ERROR.textContent = data.message;
			JOIN_BUTTON.disabled = false;
			JOIN_BUTTON.textContent = "Enter";
		}
	};

	ws.onerror = () => {
		LOGIN_ERROR.textContent = "Connection failed. Is the server running?";
		JOIN_BUTTON.disabled = false;
		JOIN_BUTTON.textContent = "Enter";
	};

	ws.onclose = () => {
		if (LOGIN_SCREEN.style.display !== "none") {
			LOGIN_ERROR.textContent = "Disconnected from server.";
			JOIN_BUTTON.disabled = false;
			JOIN_BUTTON.textContent = "Enter";
		}
	};
};

const cachedSessionId = sessionStorage.getItem("sessionId");
if (cachedSessionId) {
	mountGame(cachedSessionId);
} else {
	LOGIN_SCREEN.style.display = "flex";
	NICKNAME_INPUT.addEventListener("keydown", (e) => {
		if (e.key === "Enter") joinGame();
	});
	JOIN_BUTTON.addEventListener("click", joinGame);
}
