import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPlayer } from "../../../store/slices/playerSlice";
import { selectNPCById } from "../../../store/slices/npcSlice";
import { questCatalog } from "../../../data/questCatalog";
import {
	selectIsQuestActive,
	selectIsQuestCompleted,
} from "../../../store/slices/questSlice";
import { playerIntentAcceptQuest } from "../../../game/events";

const NPCDialog = ({
	isOpen,
	npcId,
	selectedOption,
	onClose,
	onOptionSelect,
}) => {
	const dispatch = useDispatch();
	const player = useSelector(selectPlayer);
	const npc = useSelector((state) => selectNPCById(state, npcId));
	const dialogRef = useRef(null);

	// Determine if this NPC offers a quest
	const npcQuest = npc
		? Object.values(questCatalog).find(
				(quest) => quest.giverNpcId === npc.id,
		  )
		: null;

	const isQuestActive = useSelector((state) =>
		npcQuest ? selectIsQuestActive(npcQuest.id)(state) : false,
	);
	const isQuestCompleted = useSelector((state) =>
		npcQuest ? selectIsQuestCompleted(npcQuest.id)(state) : false,
	);

	const [questConversationState, setQuestConversationState] = useState(null);

	// Handle ESC key and native dialog API
	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (isOpen) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	}, [isOpen]);

	// Close on backdrop click
	const handleBackdropClick = (e) => {
		if (e.target === dialogRef.current) {
			onClose();
		}
	};

	const resetQuestConversation = () => {
		setQuestConversationState(null);
		// Reset selected option so normal dialogue goes back to initial
		if (onOptionSelect) {
			onOptionSelect(null);
		}
	};

	const handleAcceptQuestClick = () => {
		if (!npcQuest || !npc) return;
		dispatch(playerIntentAcceptQuest(npcQuest.id, npc.id));
		resetQuestConversation();
	};

	const handleDeclineQuestClick = () => {
		resetQuestConversation();
	};

	const handleOptionClick = (index) => {
		if (!npc || !npc.dialogue?.options) return;

		const option = npc.dialogue.options[index];

		// If this option starts a quest conversation and the quest is not completed
		if (option?.startsQuestId && !isQuestCompleted) {
			if (npcQuest && npcQuest.id === option.startsQuestId) {
				setQuestConversationState({
					questId: npcQuest.id,
					stepIndex: 0,
				});
				// Clear standard selected option to switch into quest conversation mode
				if (onOptionSelect) {
					onOptionSelect(null);
				}
				return;
			}
		}

		// Normal dialogue flow
		if (onOptionSelect) {
			onOptionSelect(index);
		}
	};

	const advanceQuestConversation = () => {
		if (!questConversationState || !npcQuest) return;

		const quest = questCatalog[npcQuest.id];
		const steps = quest?.conversation || [];
		if (steps.length === 0) {
			resetQuestConversation();
			return;
		}

		const nextIndex = questConversationState.stepIndex + 1;
		if (nextIndex >= steps.length) {
			// Already at or past last step; keep at last
			setQuestConversationState({
				questId: questConversationState.questId,
				stepIndex: steps.length - 1,
			});
			return;
		}

		setQuestConversationState({
			questId: questConversationState.questId,
			stepIndex: nextIndex,
		});
	};

	if (!npc || !isOpen) return null;

	const getResponseText = () => {
		// Quest conversation overrides normal dialogue
		if (questConversationState && npcQuest) {
			const quest = questCatalog[npcQuest.id];
			const steps = quest?.conversation || [];
			const step =
				steps[questConversationState.stepIndex] ||
				steps[steps.length - 1] ||
				null;

			if (step?.npcText) {
				return step.npcText;
			}
		}

		if (!npc.dialogue) return "This NPC has nothing to say.";

		if (selectedOption !== null && npc.dialogue.options?.[selectedOption]) {
			return npc.dialogue.options[selectedOption].response;
		}
		return npc.dialogue.initial || "Hello, traveler.";
	};

	const getPlayerText = () => {
		// Quest conversation overrides normal dialogue
		if (questConversationState && npcQuest) {
			const quest = questCatalog[npcQuest.id];
			const steps = quest?.conversation || [];
			const step =
				steps[questConversationState.stepIndex] ||
				steps[steps.length - 1] ||
				null;

			if (step?.playerText) {
				return step.playerText;
			}
			return "...";
		}

		if (!npc.dialogue || !npc.dialogue.options) return "";

		if (selectedOption !== null && npc.dialogue.options?.[selectedOption]) {
			return npc.dialogue.options[selectedOption].text;
		}
		return "...";
	};

	return (
		<dialog
			ref={dialogRef}
			className="npc-dialog"
			onClick={handleBackdropClick}
			onKeyDown={(e) => {
				if (e.key === "Escape") {
					onClose();
				}
			}}
		>
			{/* Hidden focus trap */}
			<div style={{ position: "absolute", opacity: 0, height: 0 }}></div>
			<div className="key-bind-container">
				<span className="key-bind">ESC</span>
				<span>escape</span>
			</div>
			<fieldset
				className="npc-dialog-content"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.stopPropagation();
					}
				}}
			>
				{/* Bottom section with 2 columns */}
				<div className="dialog-bottom-section">
					{/* Left: Player Profile */}
					<div
						className="player-profile"
						style={{
							"--player-avatar-url": `url(./assets/avatars/players/${player.avatar})`,
						}}
					>
						<div className="player-background-image"></div>
						<div className="player-content-overlay">
							<div className="player-avatar-name">
								<h3>{player.name}</h3>
							</div>
							<div className="player-text">{getPlayerText()}</div>
						</div>
					</div>

					{/* Right: NPC Profile with Options */}
					<div className="npc-profile">
						<div className="npc-avatar-name">
							<div
								className={`npc-avatar avatar avatar_${npc.avatar} small`}
							></div>
							<h3>{npc.name}</h3>
						</div>
						<div className="npc-response">{getResponseText()}</div>
						<div className="dialog-options">
							{questConversationState && npcQuest ? (
								// Quest conversation mode: show Continue / Accept / Maybe later
								(() => {
									const quest = questCatalog[npcQuest.id];
									const steps = quest?.conversation || [];
									const step =
										steps[questConversationState.stepIndex] ||
										steps[steps.length - 1] ||
										null;
									const isFinal = step?.final || false;

									return (
										<>
											{!isFinal && (
												<button
													type="button"
													className="dialog-option-btn"
													onClick={advanceQuestConversation}
												>
													Continue
												</button>
											)}
											{isFinal && (
												<>
													<button
														type="button"
														className="dialog-option-btn"
														onClick={handleAcceptQuestClick}
														disabled={isQuestActive}
													>
														{isQuestActive
															? "Quest already accepted"
															: "Accept quest"}
													</button>
													<button
														type="button"
														className="dialog-option-btn"
														onClick={handleDeclineQuestClick}
													>
														Maybe later
													</button>
												</>
											)}
										</>
									);
								})()
							) : npc.dialogue?.options ? (
								npc.dialogue.options.map((option, index) => (
									<button
										key={`option-${option.id || index}`}
										onClick={() => handleOptionClick(index)}
										className="dialog-option-btn"
										type="button"
									>
										{option.text}
									</button>
								))
							) : (
								<button
									disabled
									className="dialog-option-btn"
									style={{ opacity: 0.5 }}
									type="button"
								>
									No dialogue options available
								</button>
							)}
						</div>
					</div>
				</div>
			</fieldset>
		</dialog>
	);
};

export default NPCDialog;
