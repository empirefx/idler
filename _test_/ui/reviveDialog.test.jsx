// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import ReviveDialog from "../../src/ui/components/common/ReviveDialog.jsx";
import playerReducer from "../../src/store/slices/playerSlice.js";

vi.mock("../../src/store/ws.js", () => ({ revive: vi.fn() }));
import { revive } from "../../src/store/ws.js";

function makeStore(isDead) {
	return configureStore({
		reducer: { player: playerReducer },
		preloadedState: {
			player: { ...playerReducer(undefined, { type: "" }), isDead },
		},
	});
}

describe("ReviveDialog", () => {
	it("shows the revive alert when the player is dead", () => {
		render(
			<Provider store={makeStore(true)}>
				<ReviveDialog />
			</Provider>,
		);
		expect(screen.getByText("You died. Revive?")).toBeTruthy();
	});

	it("sends revive on confirm", () => {
		render(
			<Provider store={makeStore(true)}>
				<ReviveDialog />
			</Provider>,
		);
		fireEvent.click(screen.getByText("Revive"));
		expect(revive).toHaveBeenCalled();
	});

	it("renders nothing when alive", () => {
		const { container } = render(
			<Provider store={makeStore(false)}>
				<ReviveDialog />
			</Provider>,
		);
		expect(container.firstChild).toBeNull();
	});
});
