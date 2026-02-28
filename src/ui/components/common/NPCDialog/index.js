import { useState, useEffect } from "react";
import useNPCDialog from "./useNPCDialog";
import NPCDialogTrade from "./NPCDialogTrade";
import NPCDialogProfile from "./NPCDialogProfile";
import NPCDialogOptions from "./NPCDialogOptions";
import TradeMessageDialog from "../TradeMessageDialog";
import WorkerManagerSection from "../../sections/WorkerManagerSection";
import { useUIVisibility } from "../../../UIVisibilityContext";

const NPCDialog = ({
	isOpen,
	npcId,
	selectedOption,
	onClose,
	onOptionSelect,
}) => {
	const { workerManagerWindow, openWorkerManagerWindow } = useUIVisibility();
	const [specialAction, setSpecialAction] = useState(null);

	const {
		npc,
		player,
		playerInventory,
		npcInventory,
		playerGold,
		currentQuest,
		isQuestActive,
		isQuestReadyToComplete,
		visibleDialogueOptions,
		questObjectivesWithProgress,
		questConversationState,
		tradeMessage,
		setTradeMessage,
		handleAcceptQuestClick,
		handleCompleteQuestClick,
		handleDeclineQuestClick,
		handleOptionClick,
		handlePlayerItemSell,
		handleNpcItemBuy,
		advanceQuestConversation,
		getResponseText,
		getPlayerText,
		dialogRef,
		handleBackdropClick,
	} = useNPCDialog({
		isOpen,
		npcId,
		selectedOption,
		onClose,
		onOptionSelect,
	});

	useEffect(() => {
		if (!isOpen) {
			setSpecialAction(null);
		}
	}, [isOpen]);

	useEffect(() => {
		if (selectedOption !== null && npc?.dialogue?.options?.[selectedOption]) {
			const option = npc.dialogue.options[selectedOption];
			if (option.opensWorkerManager) {
				setSpecialAction("workerManager");
				openWorkerManagerWindow();
				if (onClose) onClose();
			}
		}
	}, [selectedOption, npc, openWorkerManagerWindow, onClose]);

	if (!npc || !isOpen) return null;

	const showWorkerManager =
		specialAction === "workerManager" && workerManagerWindow;

	return (
		<>
			<dialog
				ref={dialogRef}
				className="npc-dialog"
				onClick={handleBackdropClick}
				onKeyDown={(e) => {
					if (e.key === "Escape" && onClose) {
						onClose();
					}
				}}
			>
				{npc?.hasInventory && npcInventory && (
					<NPCDialogTrade
						playerInventory={playerInventory}
						npcInventory={npcInventory}
						playerGold={playerGold}
						onPlayerItemSell={handlePlayerItemSell}
						onNpcItemBuy={handleNpcItemBuy}
					/>
				)}
				<div
					className="npc-dialog-content"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.stopPropagation();
						}
					}}
				>
					<div className="key-bind-container">
						<span className="key-bind">ESC</span>
						<span>escape</span>
					</div>
					<NPCDialogProfile
						player={player}
						npc={npc}
						getResponseText={getResponseText}
						getPlayerText={getPlayerText}
					>
						<NPCDialogOptions
							questConversationState={questConversationState}
							currentQuest={currentQuest}
							isQuestActive={isQuestActive}
							isQuestReadyToComplete={isQuestReadyToComplete}
							questObjectivesWithProgress={questObjectivesWithProgress}
							visibleDialogueOptions={visibleDialogueOptions}
							onAccept={handleAcceptQuestClick}
							onComplete={handleCompleteQuestClick}
							onDecline={handleDeclineQuestClick}
							onOptionClick={handleOptionClick}
							onAdvance={advanceQuestConversation}
							onClose={onClose}
							npcDialogOptions={npc?.dialogue?.options || []}
						/>
					</NPCDialogProfile>
				</div>
				<TradeMessageDialog
					isOpen={!!tradeMessage}
					message={tradeMessage?.message}
					type={tradeMessage?.type}
					onClose={() => setTradeMessage(null)}
				/>
			</dialog>
			{showWorkerManager && <WorkerManagerSection />}
		</>
	);
};

export default NPCDialog;
