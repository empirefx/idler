import React from "react";

const ProgressBar = ({ value, max }) => {
	// Handle undefined/null values to prevent NaN
	const safeValue = Number(value) || 0;
	const safeMax = Number(max) || 100;

	// Prevent division by zero
	if (safeMax <= 0) {
		return <div className="progress-bar">Invalid max value</div>;
	}

	const percent = Math.round((safeValue / safeMax) * 100);
	return (
		<div className="progress-bar">
			<div className="progress-bar__fill" style={{ width: `${percent}%` }}>
				<span>{value}</span>
			</div>
			{value < max && (
				<div className="progress-bar__remain">
					<span>{max}</span>
				</div>
			)}
		</div>
	);
};

export default ProgressBar;
