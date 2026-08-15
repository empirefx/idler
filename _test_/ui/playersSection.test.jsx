// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import PlayersSection from "../../src/ui/components/sections/PlayersSection.js";
import playersReducer from "../../src/store/slices/playersSlice.js";

vi.mock("../../src/store/ws.js", () => ({
  poke: vi.fn(),
}));

function makeStore(present) {
  return configureStore({
    reducer: { players: playersReducer },
    preloadedState: {
      players: { ...playersReducer(undefined, { type: "" }), present },
    },
  });
}

describe("PlayersSection", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders nothing when no players are present", () => {
    const store = makeStore([]);
    render(<Provider store={store}><PlayersSection /></Provider>);
    expect(document.querySelector(".players-section")).toBeNull();
    expect(screen.queryByText("No other players here")).toBeNull();
  });

  it("renders the player list when players are present", () => {
    const store = makeStore([{ nickname: "Bobby", level: 3, placeId: "village_center" }]);
    render(<Provider store={store}><PlayersSection /></Provider>);
    expect(document.querySelector(".players-section")).toBeTruthy();
    expect(screen.getByText("Bobby")).toBeTruthy();
  });
});
