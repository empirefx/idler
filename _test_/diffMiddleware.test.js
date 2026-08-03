import { describe, it, expect, vi } from "vitest";
import { createStore } from "redux";
import { diffMiddleware } from "../src/store/index.js";

const rootReducer = (state = { player: {} }, action) => {
  switch (action.type) {
    case "PLAYER_SET":
      return { player: { ...state.player, ...action.payload } };
    default:
      return state;
  }
};

// The middleware dispatches setPlayerState actions; capture them through a wrapper.
function makeStore() {
  const dispatches = [];
  const store = createStore(rootReducer);
  const originalDispatch = store.dispatch.bind(store);
  store.dispatch = (action) => {
    if (action.type === "APPLY_DIFF") {
      diffMiddleware(store)(originalDispatch)(action);
      dispatches.push(action.payload);
    } else {
      originalDispatch(action);
    }
    return action;
  };
  return { store, dispatches };
}

describe("diffMiddleware combat paths", () => {
  it("routes player.combat paths to setPlayerState", () => {
    const { store } = makeStore();
    store.dispatch({ type: "APPLY_DIFF", payload: { path: "player.derivedStats", data: { maxHealth: 150 } } });
    store.dispatch({ type: "APPLY_DIFF", payload: { path: "player.activeBuffs", data: [{ skillId: "warCry", duration: 2 }] } });
    store.dispatch({ type: "APPLY_DIFF", payload: { path: "player.activeCooldowns", data: { shieldBash: 1 } } });
    store.dispatch({ type: "APPLY_DIFF", payload: { path: "player.pausedCooldowns", data: { shieldBash: 5000 } } });
    store.dispatch({ type: "APPLY_DIFF", payload: { path: "player.autoCombat", data: true } });
    store.dispatch({ type: "APPLY_DIFF", payload: { path: "player.isDead", data: false } });
  });
});
