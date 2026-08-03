import { useEffect, useRef } from "react";
import { useUIVisibility } from "./UIVisibilityContext";
import { useWindowManager } from "./WindowManagerContext";

const InputManager = () => {
	const {
		togglePlayerCard,
		toggleWorkerCard,
		toggleCraftingWindow,
		toggleBuildingPanel,
		closePlayerCard,
		closeWorkerCard,
		closeCraftingWindow,
		closeWorkerManagerWindow,
		closeNPCDialog,
		npcDialog,
	} = useUIVisibility();

	const { getFrontWindow } = useWindowManager();

	// Ref always holds the latest value — no stale closure issue
	const npcDialogRef = useRef(npcDialog);
	useEffect(() => {
		npcDialogRef.current = npcDialog;
	}, [npcDialog]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName))
				return;

			if (e.key === "c" || e.key === "i") {
				togglePlayerCard();
			} else if (e.key === "w") {
				toggleWorkerCard();
			} else if (e.key === "b") {
				toggleBuildingPanel();
			} else if (e.key === "l" || e.key === "L") {
				toggleCraftingWindow();
			} else if (e.key === "Escape") {
				console.log("npcDialogRef.current:", npcDialogRef.current);
				console.log("isOpen:", npcDialogRef.current?.isOpen);
				if (npcDialogRef.current?.isOpen) {
					closeNPCDialog();
				} else {
					const closers = {
						player: closePlayerCard,
						workers: closeWorkerCard,
						"worker-manager": closeWorkerManagerWindow,
						crafting: closeCraftingWindow,
					};
					closers[getFrontWindow()]?.();
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		togglePlayerCard,
		toggleWorkerCard,
		toggleBuildingPanel,
		closeNPCDialog,
		toggleCraftingWindow,
		closePlayerCard,
		closeWorkerCard,
		closeCraftingWindow,
		closeWorkerManagerWindow,
		getFrontWindow,
		// npcDialog removed — read via ref instead
	]);

	return null;
};

export default InputManager;
