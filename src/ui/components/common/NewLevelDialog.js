// Modal-style dialog for level-up choices
const NewLevelDialog = ({ onChoose, onCancel }) => (
	<div className="dialog" role="dialog" onClick={onCancel} onKeyDown={(e) => {
		if (e.key === 'Escape') {
			onCancel();
		}
	}} tabIndex={0}>
		<p>Choose bonus:</p>
		<div className="player-options" role="group" onClick={(e) => e.stopPropagation()}>
			<button className="select-btn" onClick={() => onChoose({ strength: 1 })}>
				+1 STR
			</button>
			<button className="select-btn" onClick={() => onChoose({ defense: 2 })}>
				+2 DEF
			</button>
			<button className="select-btn" onClick={() => onChoose({ agility: 1 })}>
				+1 AGI
			</button>
			<button className="select-btn" onClick={() => onChoose({ vitality: 3 })}>
				+3 VIT
			</button>
		</div>

		<button onClick={onCancel}>Cancel</button>
	</div>
);

export default NewLevelDialog;
