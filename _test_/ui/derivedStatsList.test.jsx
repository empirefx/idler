// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import DerivedStatsList from "../../src/ui/components/list/DerivedStatsList.jsx";
import BaseStatsList from "../../src/ui/components/list/BaseStatsList.jsx";
import playerReducer from "../../src/store/slices/playerSlice.js";
import inventoryReducer from "../../src/store/slices/inventorySlice.js";

function makeStore(player, inventory) {
  return configureStore({
    reducer: { player: playerReducer, inventory: inventoryReducer },
    preloadedState: {
      player: { ...playerReducer(undefined, { type: "" }), ...player },
      inventory: inventory || {},
    },
  });
}

describe("DerivedStatsList", () => {
  it("renders derived stats from the store", () => {
    const store = makeStore({
      maxHp: 150,
      derivedStats: { defense: 6, damageType: "magic", damage: 24, hitChance: 55, critChance: 10, equipmentBonus: { defense: 4 } },
    });
    render(<Provider store={store}><DerivedStatsList /></Provider>);
    expect(screen.getByText("150")).toBeTruthy();
    expect(screen.getByText("magic Dmg")).toBeTruthy();
    expect(screen.getByText("24")).toBeTruthy();
    expect(screen.getByText("55%")).toBeTruthy();
    expect(screen.getByText("10%")).toBeTruthy();
  });

  it("renders nothing when derivedStats is missing", () => {
    const store = makeStore({});
    const { container } = render(<Provider store={store}><DerivedStatsList /></Provider>);
    expect(container.firstChild).toBeNull();
  });
});

describe("BaseStatsList", () => {
  it("renders base stats with equipment bonus", () => {
    const store = makeStore({
      stats: { strength: 10, defense: 2 },
      derivedStats: { equipmentBonus: { strength: 1, defense: 4 } },
    });
    render(<Provider store={store}><BaseStatsList baseStats={store.getState().player.stats} /></Provider>);
    expect(screen.getByText("strength")).toBeTruthy();
    expect(screen.getByText("10")).toBeTruthy();
    expect(screen.getByText("(+1)")).toBeTruthy();
    expect(screen.getByText("(+4)")).toBeTruthy();
  });
});
