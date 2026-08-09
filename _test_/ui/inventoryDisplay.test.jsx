// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import InventoryDisplay from "../../src/ui/components/display/InventoryDisplay.js";
import inventoryReducer from "../../src/store/slices/inventorySlice.js";

vi.mock("../../src/store/ws.js", () => ({
	moveItem: vi.fn(),
	equipItem: vi.fn(),
	useItem: vi.fn(),
}));

import { moveItem } from "../../src/store/ws.js";

function makeStore() {
	const vault = {
		type: "vault",
		maxSlots: 30,
		maxWeight: 0,
		items: [
			{ id: "single", name: "Potion", icon: "potion", quantity: 1, weight: 1 },
			{ id: "stack", name: "Arrows", icon: "arrows", quantity: 5, weight: 0.1 },
		],
	};
	const player = { type: "player", maxSlots: 30, maxWeight: 100, items: [] };
	return configureStore({
		reducer: { inventory: inventoryReducer },
		preloadedState: { inventory: { vault, player } },
	});
}

function renderDisplay(store) {
	return render(
		<Provider store={store}>
			<InventoryDisplay inventoryId="vault" otherInventoryId="player" />
		</Provider>
	);
}

function sprite(container, icon) {
	return container.querySelector(`[id="${icon}"]`);
}

describe("InventoryDisplay move behavior", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("moves a single item directly without opening the dialog", () => {
		const { container } = renderDisplay(makeStore());

		fireEvent.contextMenu(sprite(container, "potion"));

		expect(moveItem).toHaveBeenCalledWith("vault", "player", "single", 1);
		expect(screen.queryByRole("dialog")).toBeNull();
	});

	it("opens the dialog for a stack of more than one", () => {
		const { container } = renderDisplay(makeStore());

		fireEvent.contextMenu(sprite(container, "arrows"));

		expect(moveItem).not.toHaveBeenCalled();
		expect(screen.getByRole("dialog")).toBeTruthy();
	});

	it("does not show a weight indicator for non-player inventories", () => {
		const { container } = renderDisplay(makeStore());
		expect(screen.queryByText(/lt/)).toBeNull();
		expect(container.querySelector(".weight-warning")).toBeNull();
	});

	it("shows the weight indicator for the player inventory", () => {
		const store = makeStore();
		render(
			<Provider store={store}>
				<InventoryDisplay inventoryId="player" otherInventoryId="vault" />
			</Provider>
		);
		expect(screen.getByText("100 lt")).toBeTruthy();
	});
});
