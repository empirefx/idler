// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import BuffBar from "../../src/ui/components/sections/BuffBar.js";
import playerReducer from "../../src/store/slices/playerSlice.js";

function makeStore(player) {
  return configureStore({
    reducer: { player: playerReducer },
    preloadedState: { player: { ...playerReducer(undefined, { type: "" }), ...player } },
  });
}

describe("BuffBar", () => {
  it("renders buff duration as a countdown", () => {
    const store = makeStore({
      activeBuffs: [{ skillId: "warCry", expiresAt: Date.now() + 2000 }],
    });
    render(<Provider store={store}><BuffBar /></Provider>);
    expect(screen.getByText("War Cry")).toBeTruthy();
    expect(screen.getByText("2s")).toBeTruthy();
  });

  it("renders nothing when no buffs are active", () => {
    const store = makeStore({ activeBuffs: [] });
    const { container } = render(<Provider store={store}><BuffBar /></Provider>);
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelector(".buff-slot")).toBeNull();
  });
});
