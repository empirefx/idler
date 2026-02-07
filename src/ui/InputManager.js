import { useEffect } from "react";
import { useUIVisibility } from "./UIVisibilityContext";

// Listens for keypresses and toggles UI cards
const InputManager = () => {
  const { togglePlayerCard, toggleWorkerCard, closeNPCDialog, npcDialog } =
    useUIVisibility();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if input/textarea is focused
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName))
        return;

      if (e.key === "c" || e.key === "i") {
        togglePlayerCard();
      } else if (e.key === "w") {
        toggleWorkerCard();
      } else if (e.key === "Escape") {
        // Close NPC dialog if open
        if (npcDialog?.isOpen) {
          closeNPCDialog();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayerCard, toggleWorkerCard, closeNPCDialog, npcDialog?.isOpen]);

  return null; // No UI
};

export default InputManager;
