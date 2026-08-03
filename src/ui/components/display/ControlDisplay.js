const ControlDisplay = ({ autoCombat, disabled, onToggleCombat }) => (
	<div className="combat">
		<button
			type="button"
			onClick={onToggleCombat}
			disabled={disabled}
			className={`combat-btn ${autoCombat ? "stop" : "engage"}`}
		>
			{autoCombat ? "Stop Auto-Combat" : "Start Auto-Combat"}
		</button>
	</div>
);

export default ControlDisplay;
