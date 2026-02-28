import { createContext, useContext, useState, useCallback } from "react";

// Manages the visibility of UI panels/cards
const UIVisibilityContext = createContext();

export const UIVisibilityProvider = ({ children }) => {
	// Default visible
	const [visible, setVisible] = useState({
		playerCard: false,
		workerCard: false,
		buildingPanel: false,
		npcSection: true,
		npcDialog: {
			isOpen: false,
			npcId: null,
			selectedOption: null,
		},
		craftingWindow: false,
		workerManagerWindow: false,
	});

	// Toggle functions
	const togglePlayerCard = useCallback(() => {
		setVisible((v) => ({ ...v, playerCard: !v.playerCard }));
	}, []);

	const toggleWorkerCard = useCallback(() => {
		setVisible((v) => {
			const newWorkerCard = !v.workerCard;
			// Auto-toggle NPC section: show NPC when worker is hidden
			const newNpcSection = !newWorkerCard;
			return { ...v, workerCard: newWorkerCard, npcSection: newNpcSection };
		});
	}, []);

	const toggleNpcSection = useCallback(() => {
		setVisible((v) => ({ ...v, npcSection: !v.npcSection }));
	}, []);

	const openNPCDialog = useCallback((npcId) => {
		setVisible((v) => ({
			...v,
			npcDialog: {
				isOpen: true,
				npcId,
				selectedOption: null,
			},
		}));
	}, []);

	const selectNPCOption = useCallback((optionIndex) => {
		setVisible((v) => ({
			...v,
			npcDialog: {
				...v.npcDialog,
				selectedOption: optionIndex,
			},
		}));
	}, []);

	const closeNPCDialog = useCallback(() => {
		setVisible((v) => ({
			...v,
			npcDialog: {
				isOpen: false,
				npcId: null,
				selectedOption: null,
			},
		}));
	}, []);

	const toggleCraftingWindow = useCallback(() => {
		setVisible((v) => ({ ...v, craftingWindow: !v.craftingWindow }));
	}, []);

	const toggleBuildingPanel = useCallback(() => {
		setVisible((v) => ({ ...v, buildingPanel: !v.buildingPanel }));
	}, []);

	const showBuildingPanel = useCallback(() => {
		setVisible((v) => ({ ...v, buildingPanel: true }));
	}, []);

	const hideBuildingPanel = useCallback(() => {
		setVisible((v) => ({ ...v, buildingPanel: false }));
	}, []);

	const toggleWorkerManagerWindow = useCallback(() => {
		setVisible((v) => ({ ...v, workerManagerWindow: !v.workerManagerWindow }));
	}, []);

	const openWorkerManagerWindow = useCallback(() => {
		setVisible((v) => ({ ...v, workerManagerWindow: true }));
	}, []);

	const closeWorkerManagerWindow = useCallback(() => {
		setVisible((v) => ({ ...v, workerManagerWindow: false }));
	}, []);

	return (
		<UIVisibilityContext.Provider
			value={{
				...visible,
				togglePlayerCard,
				toggleWorkerCard,
				toggleNpcSection,
				openNPCDialog,
				selectNPCOption,
				closeNPCDialog,
				toggleCraftingWindow,
				toggleBuildingPanel,
				showBuildingPanel,
				hideBuildingPanel,
				toggleWorkerManagerWindow,
				openWorkerManagerWindow,
				closeWorkerManagerWindow,
			}}
		>
			{children}
		</UIVisibilityContext.Provider>
	);
};

export const useUIVisibility = () => useContext(UIVisibilityContext);
