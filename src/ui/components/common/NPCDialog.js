import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectPlayer } from "../../../store/slices/playerSlice";
import { selectNPCById } from "../../../store/slices/npcSlice";

const NPCDialog = ({
	isOpen,
	npcId,
	selectedOption,
	onClose,
	onOptionSelect,
}) => {
	const player = useSelector(selectPlayer);
	const npc = useSelector((state) => selectNPCById(state, npcId));
	const dialogRef = useRef(null);

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

	if (!npc || !isOpen) return null;

	const getResponseText = () => {
		if (!npc.dialogue) return "This NPC has nothing to say.";

		if (selectedOption !== null && npc.dialogue.options?.[selectedOption]) {
			return npc.dialogue.options[selectedOption].response;
		}
		return npc.dialogue.initial || "Hello, traveler.";
	};

	const getPlayerText = () => {
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
			<div
				className="npc-dialog-content"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.stopPropagation();
					}
				}}
				role="group"
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
							{npc.dialogue?.options ? (
								npc.dialogue.options.map((option, index) => (
									<button
										key={`option-${option.id || index}`}
										onClick={() => onOptionSelect(index)}
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
			</div>
		</dialog>
	);
};

export default NPCDialog;
