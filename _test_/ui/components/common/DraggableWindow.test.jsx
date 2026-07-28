// @vitest-environment jsdom
import "@testing-library/jest-dom";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("../../../../src/styles/components/draggable-window.css", () => ({}));

vi.mock("../../../../src/ui/WindowManagerContext", () => ({
	useWindowManager: vi.fn(),
}));

import { useWindowManager } from "../../../../src/ui/WindowManagerContext";
import DraggableWindow from "../../../../src/ui/components/common/DraggableWindow";

describe("DraggableWindow", () => {
	let mockWindow;

	beforeEach(() => {
		mockWindow = {
			bringToFront: vi.fn(),
			getZIndex: vi.fn(() => 10),
			isWindowAtFront: vi.fn(() => true),
			getWindowPosition: vi.fn(() => null),
			setWindowPosition: vi.fn(),
			removeFromStack: vi.fn(),
		};
		useWindowManager.mockReturnValue(mockWindow);
		// Set window dimensions so centering calculation uses known values
		window.innerWidth = 1024;
		window.innerHeight = 768;
	});

	afterEach(() => {
		cleanup();
		vi.clearAllMocks();
	});

	describe("rendering", () => {
		it("renders when isOpen is true", () => {
			render(
				<DraggableWindow windowId="test" title="Test Window" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			expect(screen.getByText("Test Window")).toBeInTheDocument();
			expect(screen.getByText("Content")).toBeInTheDocument();
		});

		it("returns null when isOpen is false", () => {
			const { container } = render(
				<DraggableWindow windowId="test" title="Test Window" isOpen={false}>
					<div>Content</div>
				</DraggableWindow>,
			);
			expect(container.innerHTML).toBe("");
		});

		it("calls bringToFront on mount", () => {
			render(
				<DraggableWindow windowId="test" title="Test Window" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			expect(mockWindow.bringToFront).toHaveBeenCalledWith("test");
		});

		it("centers itself when no saved position", () => {
			const { container } = render(
				<DraggableWindow windowId="test" title="Test Window" width={400} height={300} isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			const windowEl = container.querySelector(".draggable-window");
			expect(windowEl).toHaveStyle({ left: "312px", top: "234px" });
		});

		it("uses saved position when available", () => {
			mockWindow.getWindowPosition.mockReturnValue({ x: 100, y: 200 });
			const { container } = render(
				<DraggableWindow windowId="test" title="Test Window" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			const windowEl = container.querySelector(".draggable-window");
			expect(windowEl).toHaveStyle({ left: "100px", top: "200px" });
		});
	});

	describe("close button", () => {
		it("shows close button and calls onClose when clicked", () => {
			const onClose = vi.fn();
			render(
				<DraggableWindow windowId="test" title="Test" isOpen={true} onClose={onClose}>
					<div>Content</div>
				</DraggableWindow>,
			);
			fireEvent.click(screen.getByText("×"));
			expect(onClose).toHaveBeenCalledTimes(1);
		});

		it("disables close button when window is not at front", () => {
			mockWindow.isWindowAtFront.mockReturnValue(false);
			render(
				<DraggableWindow windowId="test" title="Test" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			expect(screen.getByText("×")).toBeDisabled();
		});

		it("enables close button when window is at front", () => {
			mockWindow.isWindowAtFront.mockReturnValue(true);
			render(
				<DraggableWindow windowId="test" title="Test" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			expect(screen.getByText("×")).not.toBeDisabled();
		});
	});

	describe("bring to front", () => {
		it("brings window to front on click", () => {
			const { container } = render(
				<DraggableWindow windowId="test" title="Test" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			fireEvent.click(container.querySelector(".draggable-window"));
			expect(mockWindow.bringToFront).toHaveBeenCalledWith("test");
		});

		it.each([{ key: "Enter" }, { key: " " }])("brings window to front on $key key", ({ key }) => {
			const { container } = render(
				<DraggableWindow windowId="test" title="Test" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			const windowEl = container.querySelector(".draggable-window");
			fireEvent.keyDown(windowEl, { key });
			expect(mockWindow.bringToFront).toHaveBeenCalledWith("test");
		});
	});

	describe("z-index", () => {
		it("applies correct z-index from getZIndex", () => {
			mockWindow.getZIndex.mockReturnValue(15);
			const { container } = render(
				<DraggableWindow windowId="test" title="Test" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			const windowEl = container.querySelector(".draggable-window");
			expect(windowEl).toHaveStyle({ zIndex: "15" });
		});
	});

	describe("cleanup on close", () => {
		it("removes from stack when isOpen becomes false", () => {
			const { rerender } = render(
				<DraggableWindow windowId="test" title="Test" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			rerender(
				<DraggableWindow windowId="test" title="Test" isOpen={false}>
					<div>Content</div>
				</DraggableWindow>,
			);
			expect(mockWindow.removeFromStack).toHaveBeenCalledWith("test");
		});
	});

	describe("drag behavior", () => {
		it("starts drag on header mousedown", () => {
			render(
				<DraggableWindow windowId="test" title="Test" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			const header = screen.getByText("Test").closest(".draggable-window-header");
			fireEvent.mouseDown(header, { clientX: 500, clientY: 400 });
			expect(mockWindow.bringToFront).toHaveBeenCalledWith("test");
		});

		it("updates DOM position during drag", () => {
			const { container } = render(
				<DraggableWindow windowId="test" title="Test" isOpen={true}>
					<div>Content</div>
				</DraggableWindow>,
			);
			const header = screen.getByText("Test").closest(".draggable-window-header");
			const windowEl = container.querySelector(".draggable-window");
			// Start drag (initial center: 162px, 104px)
			fireEvent.mouseDown(header, { clientX: 500, clientY: 400 });
			// Move — position computed as delta from dragStart
			fireEvent.mouseMove(window, { clientX: 600, clientY: 450 });
			expect(windowEl).toHaveStyle({ left: "262px", top: "154px" });
			// Stop
			fireEvent.mouseUp(window);
			expect(mockWindow.setWindowPosition).toHaveBeenCalledWith("test", { x: 262, y: 154 });
		});

		it("does not start drag when clicking close button", () => {
			const onClose = vi.fn();
			render(
				<DraggableWindow windowId="test" title="Test" isOpen={true} onClose={onClose}>
					<div>Content</div>
				</DraggableWindow>,
			);
			const closeBtn = screen.getByText("×");
			// mousedown on close button should not call bringToFront
			fireEvent.mouseDown(closeBtn, { clientX: 500, clientY: 400 });
			// bringToFront was called on mount, so check it wasn't called AGAIN
			expect(mockWindow.bringToFront).toHaveBeenCalledTimes(1);
		});
	});
});
