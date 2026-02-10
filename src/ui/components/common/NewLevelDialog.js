// Modal-style dialog for level-up choices
const NewLevelDialog = ({ onChoose, onCancel }) => (
	<div
		className="dialog"
		role="dialog"
		onClick={onCancel}
		onKeyDown={(e) => {
			if (e.key === "Escape") {
				onCancel();
			}
		}}
	>
		<p>Choose bonus:</p>
		<fieldset
			className="player-options"
			onClick={(e) => e.stopPropagation()}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.stopPropagation();
				}
			}}
		>
			<button
				className="select-btn"
				onClick={() => onChoose({ strength: 1 })}
				type="button"
			>
				+1 STR
			</button>
			<button
				className="select-btn"
				onClick={() => onChoose({ defense: 2 })}
				type="button"
			>
				+2 DEF
			</button>
			<button
				className="select-btn"
				onClick={() => onChoose({ agility: 1 })}
				type="button"
			>
				+1 AGI
			</button>
			<button
				className="select-btn"
				onClick={() => onChoose({ vitality: 3 })}
				type="button"
			>
				+3 VIT
			</button>
		</fieldset>

		<button onClick={onCancel} type="button">
			Cancel
		</button>
	</div>
);

export default NewLevelDialog;
