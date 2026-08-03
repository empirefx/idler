import { addLog } from "../slices/logSlice";

const logMiddleware = (store) => (next) => (action) => {
	if (action.type?.startsWith("logs/")) {
		return next(action);
	}

	const result = next(action);

	if (action.type === "COMBAT_DIFF" && action.payload) {
		const p = action.payload;
		if (p.hit) {
			store.dispatch(addLog({ message: `Hit enemy for ${p.damageDealt} damage${p.crit ? " (crit)" : ""}`, category: "combat" }));
		}
		if (p.enemyDead) {
			store.dispatch(addLog({ message: `Enemy defeated! +${p.expGained} exp, +${p.goldGained} gold`, category: "combat" }));
		}
	}

	if (action.type === "APPLY_DIFF" && action.payload) {
		const { path, data, value } = action.payload;
		const val = data !== undefined ? data : value;
		if (path === "player.currentPlaceId") {
			const places = store.getState().places;
			const name = places[val]?.name || val;
			store.dispatch(addLog({ message: `Moved to ${name}`, category: "movement" }));
		}
		if (path === "player.gold" && typeof val === "number") {
			const prev = store.getState().player.gold;
			const diff = val - prev;
			if (diff > 0) store.dispatch(addLog({ message: `Gained ${diff} gold`, category: "economy" }));
		}
		if (path === "player.exp" && typeof val === "number") {
			const prev = store.getState().player.exp;
			const diff = val - prev;
			if (diff > 0) store.dispatch(addLog({ message: `Gained ${diff} exp`, category: "combat" }));
		}
	}

	if (action.type === "ENEMY_SPAWN" && action.payload) {
		store.dispatch(addLog({ message: `Enemies appeared!`, category: "combat" }));
	}

	if (action.type === "PRODUCTION_TICK" && action.payload) {
		store.dispatch(addLog({ message: `Produced ${action.payload.item?.name || "an item"}`, category: "worker" }));
	}

	return result;
};

export default logMiddleware;
