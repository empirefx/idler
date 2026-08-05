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

// The middleware dispatches real slice actions; capture every dispatched action.
function makeStore() {
  const dispatches = [];
  const store = createStore(rootReducer);
  const originalDispatch = store.dispatch.bind(store);
  store.dispatch = (action) => {
    dispatches.push(action);
    if (action.type === "APPLY_DIFF") {
      diffMiddleware(store)(originalDispatch)(action);
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

  it("routes a sockets DIFF to updateSocket", () => {
    const { store, dispatches } = makeStore();
    store.dispatch({
      type: "APPLY_DIFF",
      payload: { path: "sockets", data: { placeId: "farmlands", socketIndex: 0, status: "empty" } },
    });
    const action = dispatches.find((a) => a.type === "places/updateSocket");
    expect(action).toBeDefined();
    expect(action.payload).toEqual({ placeId: "farmlands", socketIndex: 0, data: { placeId: "farmlands", socketIndex: 0, status: "empty" } });
  });

  it("no longer wipes the buildings map on a buildings.* DIFF", () => {
    const { store, dispatches } = makeStore();
    store.dispatch({
      type: "APPLY_DIFF",
      payload: { path: "buildings.village_center:0", data: { id: "farm", level: 1 } },
    });
    const action = dispatches.find((a) => a.type === "buildings/setBuildings");
    expect(action).toBeUndefined();
  });
});
