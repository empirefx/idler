import React from "react";

const ControlDisplay = ({ isInCombat, onToggleCombat }) => (
	<div className="combat">
		<button
			onClick={onToggleCombat}
			className={`combat-btn ${isInCombat ? "stop" : "engage"}`}
		>
			{isInCombat ? "Stop Combat" : "Engage Combat"}
		</button>
	</div>
);

export default ControlDisplay;
