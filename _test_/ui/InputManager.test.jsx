// @vitest-environment jsdom
import "@testing-library/jest-dom";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../src/ui/UIVisibilityContext", () => ({
	useUIVisibility: vi.fn(),
}));

vi.mock("../../src/ui/WindowManagerContext", () => ({
	useWindowManager: vi.fn(),
}));

import { useUIVisibility } from "../../src/ui/UIVisibilityContext";
import { useWindowManager } from "../../src/ui/WindowManagerContext";
import InputManager from "../../src/ui/InputManager";

describe("InputManager", () => {
	let mockUI;
	let mockWindow;

	beforeEach(() => {
		mockUI = {
			togglePlayerCard: vi.fn(),
			toggleWorkerCard: vi.fn(),
			toggleCraftingWindow: vi.fn(),
			toggleBuildingPanel: vi.fn(),
			closePlayerCard: vi.fn(),
			closeWorkerCard: vi.fn(),
			closeCraftingWindow: vi.fn(),
			closeWorkerManagerWindow: vi.fn(),
			closeNPCDialog: vi.fn(),
			npcDialog: { isOpen: false, npcId: null, selectedOption: null },
		};
		mockWindow = {
			getFrontWindow: vi.fn(() => "player"),
		};
		useUIVisibility.mockReturnValue(mockUI);
		useWindowManager.mockReturnValue(mockWindow);
	});

	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	describe("toggle shortcuts", () => {
		it('calls togglePlayerCard on "c" key', () => {
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "c" });
			expect(mockUI.togglePlayerCard).toHaveBeenCalledTimes(1);
		});

		it('calls togglePlayerCard on "i" key', () => {
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "i" });
			expect(mockUI.togglePlayerCard).toHaveBeenCalledTimes(1);
		});

		it('calls toggleWorkerCard on "w" key', () => {
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "w" });
			expect(mockUI.toggleWorkerCard).toHaveBeenCalledTimes(1);
		});

		it('calls toggleBuildingPanel on "b" key', () => {
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "b" });
			expect(mockUI.toggleBuildingPanel).toHaveBeenCalledTimes(1);
		});

		it('calls toggleCraftingWindow on "l" key', () => {
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "l" });
			expect(mockUI.toggleCraftingWindow).toHaveBeenCalledTimes(1);
		});

		it('calls toggleCraftingWindow on "L" key', () => {
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "L" });
			expect(mockUI.toggleCraftingWindow).toHaveBeenCalledTimes(1);
		});
	});

	describe("Escape key", () => {
		it("closes NPC dialog when open", () => {
			mockUI.npcDialog = { isOpen: true, npcId: "test", selectedOption: 0 };
			useUIVisibility.mockReturnValue(mockUI);
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "Escape" });
			expect(mockUI.closeNPCDialog).toHaveBeenCalledTimes(1);
		});

		it("closes the front window when no NPC dialog", () => {
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "Escape" });
			expect(mockUI.closePlayerCard).toHaveBeenCalledTimes(1);
		});

		it("calls closeWorkerCard when worker window is front", () => {
			mockWindow.getFrontWindow.mockReturnValue("workers");
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "Escape" });
			expect(mockUI.closeWorkerCard).toHaveBeenCalledTimes(1);
		});

		it("calls closeWorkerManagerWindow when worker-manager is front", () => {
			mockWindow.getFrontWindow.mockReturnValue("worker-manager");
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "Escape" });
			expect(mockUI.closeWorkerManagerWindow).toHaveBeenCalledTimes(1);
		});

		it("calls closeCraftingWindow when crafting window is front", () => {
			mockWindow.getFrontWindow.mockReturnValue("crafting");
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "Escape" });
			expect(mockUI.closeCraftingWindow).toHaveBeenCalledTimes(1);
		});
	});

	describe("INPUT/TEXTAREA guard", () => {
		it("does not toggle when INPUT is focused", () => {
			const input = document.createElement("input");
			document.body.appendChild(input);
			input.focus();
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "c" });
			expect(mockUI.togglePlayerCard).not.toHaveBeenCalled();
			document.body.removeChild(input);
		});

		it("does not toggle when TEXTAREA is focused", () => {
			const textarea = document.createElement("textarea");
			document.body.appendChild(textarea);
			textarea.focus();
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "c" });
			expect(mockUI.togglePlayerCard).not.toHaveBeenCalled();
			document.body.removeChild(textarea);
		});
	});

	describe("keybindings work regardless of focus", () => {
		it("works when a button is focused", () => {
			const button = document.createElement("button");
			document.body.appendChild(button);
			button.focus();
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "c" });
			expect(mockUI.togglePlayerCard).toHaveBeenCalledTimes(1);
			document.body.removeChild(button);
		});

		it("works when a [role=button] div is focused", () => {
			const div = document.createElement("div");
			div.setAttribute("role", "button");
			document.body.appendChild(div);
			div.focus();
			render(<InputManager />);
			fireEvent.keyDown(window, { key: "c" });
			expect(mockUI.togglePlayerCard).toHaveBeenCalledTimes(1);
			document.body.removeChild(div);
		});
	});

	it("cleans up keydown listener on unmount", () => {
		const addSpy = vi.spyOn(window, "addEventListener");
		const removeSpy = vi.spyOn(window, "removeEventListener");
		const { unmount } = render(<InputManager />);
		unmount();
		expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
		addSpy.mockRestore();
		removeSpy.mockRestore();
	});
});
