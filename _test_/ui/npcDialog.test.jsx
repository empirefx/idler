// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import NPCDialog from "../../src/ui/components/common/NPCDialog";
import { UIVisibilityProvider } from "../../src/ui/UIVisibilityContext";
import playerReducer from "../../src/store/slices/playerSlice.js";
import inventoryReducer from "../../src/store/slices/inventorySlice.js";
import npcReducer from "../../src/store/slices/npcSlice.js";
import questReducer from "../../src/store/slices/questSlice.js";

vi.mock("../../src/store/ws.js", () => ({ getWs: () => null }));

beforeEach(() => {
	if (typeof HTMLDialogElement !== "undefined") {
		HTMLDialogElement.prototype.showModal = vi.fn();
		HTMLDialogElement.prototype.close = vi.fn();
	}
});

function makeStore() {
	return configureStore({
		reducer: {
			player: playerReducer,
			inventory: inventoryReducer,
			npcs: npcReducer,
			quests: questReducer,
		},
		preloadedState: {
			player: playerReducer(undefined, { type: "" }),
			inventory: {
				player: {
					id: "player",
					type: "player",
					maxSlots: 20,
					maxWeight: 100,
					items: [],
					equipment: {},
				},
			},
		},
	});
}

function buildDialog(isOpen, store) {
	return (
		<Provider store={store}>
			<UIVisibilityProvider>
				<NPCDialog
					isOpen={isOpen}
					npcId="village_elder"
					selectedOption={null}
					onClose={() => {}}
					onOptionSelect={() => {}}
				/>
			</UIVisibilityProvider>
		</Provider>
	);
}

describe("NPCDialog", () => {
	it("shows the initial greeting when opened", () => {
		const store = makeStore();
		render(buildDialog(true, store));
		expect(screen.getByText(/Welcome, traveler/)).toBeTruthy();
	});

	it("resets the conversation when the dialog is reopened", () => {
		const store = makeStore();
		const { rerender } = render(buildDialog(true, store));

		expect(screen.getByText(/Welcome, traveler/)).toBeTruthy();

		// Start the quest conversation and advance to the final step
		fireEvent.click(screen.getByText(/I can help clear out the monsters/));
		expect(
			screen.getByText(/Monsters have been seen near our borders/),
		).toBeTruthy();

		fireEvent.click(screen.getByText("Continue"));
		expect(screen.getByText(/Various creatures - wolves/)).toBeTruthy();

		fireEvent.click(screen.getByText("Continue"));
		expect(screen.getByText(/If you can eliminate five/)).toBeTruthy();

		// Close and reopen the dialog
		rerender(buildDialog(false, store));
		rerender(buildDialog(true, store));

		// Conversation must start over from the initial greeting
		expect(screen.getByText(/Welcome, traveler/)).toBeTruthy();
		expect(screen.queryByText(/If you can eliminate five/)).toBeNull();
	});
});
