// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import SkillsSection from "../../src/ui/components/sections/SkillsSection.js";
import playerReducer from "../../src/store/slices/playerSlice.js";
import inventoryReducer from "../../src/store/slices/inventorySlice.js";

vi.mock("../../src/store/ws.js", () => ({
  spendSkillPoint: vi.fn(),
}));

function makeStore(player, inventory) {
  return configureStore({
    reducer: { player: playerReducer, inventory: inventoryReducer },
    preloadedState: {
      player: { ...playerReducer(undefined, { type: "" }), ...player },
      inventory: inventory || {},
    },
  });
}

describe("SkillsSection", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows the no-weapon hint when nothing is equipped", () => {
    const store = makeStore({}, { player: { items: [], equipment: {} } });
    render(<Provider store={store}><SkillsSection /></Provider>);
    expect(screen.getByText("Equip a weapon to unlock skills")).toBeTruthy();
    expect(screen.queryByText("War Cry")).toBeNull();
  });

  it("shows physical skills only for a physical weapon", () => {
    const store = makeStore({}, {
      player: { items: [], equipment: { "main-weapon": { id: "sword1", name: "Rusty Shortblade", damageType: "physical" } } },
    });
    render(<Provider store={store}><SkillsSection /></Provider>);
    expect(screen.getByText("War Cry")).toBeTruthy();
    expect(screen.getByText("Shield Bash")).toBeTruthy();
    expect(screen.getByText("Iron Skin")).toBeTruthy();
    expect(screen.queryByText("Fireball")).toBeNull();
  });

  it("shows magic skills only for a magic weapon", () => {
    const store = makeStore({}, {
      player: { items: [], equipment: { "main-weapon": { id: "staff1", name: "Wooden Staff", damageType: "magic" } } },
    });
    render(<Provider store={store}><SkillsSection /></Provider>);
    expect(screen.getByText("Fireball")).toBeTruthy();
    expect(screen.queryByText("War Cry")).toBeNull();
  });

  it("resolves the column from the catalog for an icon-only weapon", () => {
    const store = makeStore({}, {
      player: { items: [], equipment: { "main-weapon": { id: "staff1", icon: "staff1" } } },
    });
    render(<Provider store={store}><SkillsSection /></Provider>);
    expect(screen.getByText("Fireball")).toBeTruthy();
    expect(screen.queryByText("War Cry")).toBeNull();
  });
});
