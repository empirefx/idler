import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { setPlayerState, setPlayerHp, setPlayerExp, addGold } from "./store/slices/playerSlice";
import { setInventory } from "./store/slices/inventorySlice";
import { setBuildings } from "./store/slices/buildingsSlice";
import { setPlaces, setCurrentPlaceId, updateSocket } from "./store/slices/placesSlice";
import { setQuests, questAccepted, questCompleted } from "./store/slices/questSlice";
import { addNotification } from "./store/slices/notificationSlice";
import { setCombatState } from "./store/slices/combatSlice";
import { setEnemies, addEnemy, removeEnemy } from "./store/slices/enemiesSlice";
import { setWs } from "./store/ws";
import { placesData } from "../shared/data/places";
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

const applySockets = (sockets) => {
	if (!sockets) return;
	for (const [field, socket] of Object.entries(sockets)) {
		const [placeId, socketIndex] = field.split(":");
		store.dispatch(updateSocket({ placeId, socketIndex: Number(socketIndex), data: socket }));
	}
};

const mountGame = (sessionId) => {
	LOGIN_SCREEN.style.display = "none";
	ROOT.style.display = "";
	root = createRoot(ROOT);
	root.render(
		<Provider store={store}>
			<App sessionId={sessionId} ws={ws} />
		</Provider>,
	);

	ws.onmessage = (event) => {
		const data = JSON.parse(event.data);
		switch (data.type) {
			case "DIFF":
				store.dispatch({ type: "APPLY_DIFF", payload: data.data });
				break;
			case "COMBAT_DIFF": {
				const d = data.data;
				if (d.damageDealt > 0 && d.enemyId) {
					store.dispatch({ type: "enemies/damageEnemy", payload: { id: d.enemyId, amount: d.damageDealt } });
				}
				if (d.enemyDead) {
					store.dispatch(removeEnemy({ id: d.enemyId }));
					if (d.expGained !== undefined) store.dispatch(setPlayerExp(d.expGained));
					if (d.goldGained !== undefined) store.dispatch(addGold(d.goldGained));
				}
				if (d.playerStats) {
					store.dispatch(setPlayerState({ exp: d.playerStats.exp, gold: d.playerStats.gold }));
				}
				break;
			}
			case "QUEST_UPDATE": {
				const d = data.data;
				if (d.completed) {
					store.dispatch(questCompleted(d));
				} else if (d.questId) {
					store.dispatch(questAccepted(d));
				}
				break;
			}
			case "STATE_SYNC": {
				const { player, inventory, buildings, workers, quests, enemies } = data.data;
				if (player) store.dispatch(setPlayerState(player));
				if (data.data.skills) store.dispatch(setPlayerState({ skills: data.data.skills }));
				if (inventory) store.dispatch(setInventory(inventory));
				if (buildings) store.dispatch(setBuildings(buildings));
				if (workers) store.dispatch(setPlayerState({ workers: workers?.hired || [], workerSlots: workers?.workerSlots || 0, availablePool: workers?.available || [] }));
				if (quests) store.dispatch(setQuests(quests));
				if (enemies) {
					const byId = typeof enemies.byId !== "undefined" ? enemies : Object.keys(enemies).reduce((acc, id) => { acc[id] = enemies[id]; return acc; }, {});
					store.dispatch(setEnemies({ byId, allIds: Object.keys(byId) }));
				}
				store.dispatch(setPlaces(placesData));
				applySockets(data.data.sockets);
				if (player?.currentPlaceId) store.dispatch(setCurrentPlaceId(player.currentPlaceId));
				break;
			}
			case "ENEMY_ATTACK": {
				const { enemyId, damageDealt, playerHp, playerDead } = data.data;
				if (playerHp !== undefined) store.dispatch(setPlayerHp(playerHp));
				if (playerDead) {
					store.dispatch(setPlayerState({ isDead: true, autoCombat: false }));
				}
				break;
			}
			case "ENEMY_SPAWN": {
				const { enemies } = data.data;
				if (enemies) {
					const byId = Object.fromEntries(enemies.map((e) => [e.id, e]));
					store.dispatch(setEnemies({ byId, allIds: enemies.map((e) => e.id) }));
				}
				break;
			}
			case "INVENTORY_UPDATE": {
				const { inventories } = data.data;
				if (inventories) {
					store.dispatch(setInventory({
						...store.getState().inventory,
						...inventories,
					}));
				}
				break;
			}
			case "PRODUCTION_TICK":
				store.dispatch({ type: "PRODUCTION_TICK", payload: data.data });
				break;
			case "NOTIFICATION":
				store.dispatch(addNotification(data.data?.message || "Notification", data.data?.type || "info"));
				break;
			case "ERROR":
				store.dispatch(addNotification(data.message || "Server error", "error"));
				break;
		}
	};

	ws.onclose = () => {
		store.dispatch(addNotification("Disconnected from server", "error"));
	};
};

const showLogin = () => {
	sessionStorage.removeItem("sessionId");
	sessionStorage.removeItem("nickname");
	LOGIN_SCREEN.style.display = "flex";
	ROOT.style.display = "none";
	JOIN_BUTTON.disabled = false;
	JOIN_BUTTON.textContent = "Enter";
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

	ws = new WebSocket(`ws://${location.hostname}:${process.env.WS_PORT || 3001}`);
	setWs(ws);

	ws.onopen = () => {
		ws.send(JSON.stringify({ type: "JOIN", nickname }));
	};

	ws.onmessage = (event) => {
		const data = JSON.parse(event.data);
		if (data.type === "STATE_SYNC") {
			const { sessionId, player, inventory, buildings, workers, quests, enemies } = data.data;
			sessionStorage.setItem("sessionId", sessionId);
			sessionStorage.setItem("nickname", nickname);
			if (player) store.dispatch(setPlayerState({ ...player, name: nickname }));
			if (data.data.skills) store.dispatch(setPlayerState({ skills: data.data.skills }));
			if (inventory) store.dispatch(setInventory(inventory));
			if (buildings) store.dispatch(setBuildings(buildings));
			if (workers) store.dispatch(setPlayerState({ workers: workers?.hired || [], workerSlots: workers?.workerSlots || 0, availablePool: workers?.available || [] }));
			if (quests) store.dispatch(setQuests(quests));
			if (enemies) {
				const byId = Object.keys(enemies).reduce((acc, id) => { acc[id] = enemies[id]; return acc; }, {});
				store.dispatch(setEnemies({ byId, allIds: Object.keys(byId) }));
			}
			store.dispatch(setPlaces(placesData));
			applySockets(data.data.sockets);
			store.dispatch(setCurrentPlaceId(player?.currentPlaceId || "village_center"));
			mountGame(sessionId);
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
const cachedNickname = sessionStorage.getItem("nickname");
if (cachedSessionId && cachedNickname) {
	ws = new WebSocket(`ws://${location.hostname}:${process.env.WS_PORT || 3001}`);
	setWs(ws);
	ws.onopen = () => {
		ws.send(JSON.stringify({ type: "RESUME", sessionId: cachedSessionId, nickname: cachedNickname }));
	};
	ws.onmessage = (event) => {
		const data = JSON.parse(event.data);
		if (data.type === "STATE_SYNC") {
			const { sessionId, player, inventory, buildings, workers, quests, enemies } = data.data;
			if (player) store.dispatch(setPlayerState({ ...player, name: cachedNickname || player.name }));
			if (data.data.skills) store.dispatch(setPlayerState({ skills: data.data.skills }));
			if (inventory) store.dispatch(setInventory(inventory));
			if (buildings) store.dispatch(setBuildings(buildings));
			if (workers) store.dispatch(setPlayerState({ workers: workers?.hired || [], workerSlots: workers?.workerSlots || 0, availablePool: workers?.available || [] }));
			if (quests) store.dispatch(setQuests(quests));
			if (enemies) {
				const byId = Object.keys(enemies).reduce((acc, id) => { acc[id] = enemies[id]; return acc; }, {});
				store.dispatch(setEnemies({ byId, allIds: Object.keys(byId) }));
			}
			store.dispatch(setPlaces(placesData));
			applySockets(data.data.sockets);
			store.dispatch(setCurrentPlaceId(player?.currentPlaceId || "village_center"));
			mountGame(sessionId);
		} else {
			showLogin();
		}
	};
	ws.onerror = showLogin;
} else {
	LOGIN_SCREEN.style.display = "flex";
	NICKNAME_INPUT.addEventListener("keydown", (e) => {
		if (e.key === "Enter") joinGame();
	});
	JOIN_BUTTON.addEventListener("click", joinGame);
}
