import NPCDialogQuestPanel from "./NPCDialogQuestPanel";

const NPCDialogOptions = ({
	questConversationState,
	currentQuest,
	isQuestActive,
	isQuestReadyToComplete,
	questObjectivesWithProgress,
	visibleDialogueOptions,
	onAccept,
	onComplete,
	onDecline,
	onOptionClick,
	onAdvance,
	onClose,
	npcDialogOptions,
}) => {
	if (questConversationState && currentQuest) {
		const steps = currentQuest?.conversation || [];
		const step =
			steps[questConversationState.stepIndex] ||
			steps[steps.length - 1] ||
			null;
		const isFinal = step?.final || false;

		return (
			<fieldset className="dialog-options">
				{!isFinal && (
					<button
						type="button"
						className="dialog-option-btn"
						onClick={onAdvance}
					>
						Continue
					</button>
				)}
				{isFinal && (
					<>
						{questObjectivesWithProgress.length > 0 && (
							<NPCDialogQuestPanel
								objectives={questObjectivesWithProgress}
								rewards={currentQuest.rewards}
							/>
						)}
						{isQuestReadyToComplete ? (
							<button
								type="button"
								className="dialog-option-btn quest-complete-btn"
								onClick={onComplete}
							>
								Complete Quest
							</button>
						) : isQuestActive ? (
							<button
								type="button"
								className="dialog-option-btn"
								disabled
							>
								Quest in progress
							</button>
						) : (
							<button
								type="button"
								className="dialog-option-btn"
								onClick={onAccept}
							>
								Accept quest
							</button>
						)}
						<button
							type="button"
							className="dialog-option-btn"
							onClick={onDecline}
						>
							Maybe later
						</button>
					</>
				)}
			</fieldset>
		);
	}

	if (visibleDialogueOptions.length > 0) {
		return (
			<fieldset className="dialog-options">
				{visibleDialogueOptions.map((option, _filteredIndex) => {
					const originalIndex = npcDialogOptions.indexOf(option);
					return (
						<button
							key={`option-${option.id || originalIndex}`}
							onClick={() => onOptionClick(originalIndex)}
							className="dialog-option-btn"
							type="button"
						>
							{option.text}
						</button>
					);
				})}
			</fieldset>
		);
	}

	return (
		<fieldset className="dialog-options">
			<button
				disabled
				className="dialog-option-btn"
				style={{ opacity: 0.5 }}
				type="button"
			>
				No dialogue options available
			</button>
		</fieldset>
	);
};

export default NPCDialogOptions;
