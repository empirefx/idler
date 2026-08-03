import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import {
	selectGold,
	selectWorkers,
} from "../../../store/slices/playerSlice";

// selectors
const selectMaxWorkers = (state) => state.player.workerSlots || 0;

// Memoized selector
const selectWorkerCount = createSelector(
	[selectWorkers],
	(workers) => workers.length,
);

const ResourceDisplay = () => {
	// Use selectors to get data directly from Redux store
	const gold = useSelector(selectGold);
	const workerCount = useSelector(selectWorkerCount);
	const maxWorkers = useSelector(selectMaxWorkers);

	return (
		<div className="resource-display">
			<div className="resource-item">
				<span className="resource-name">Workers</span>
				<span className="resource-amount">{`${workerCount}/${maxWorkers}`}</span>
			</div>
			<div className="resource-item">
				<span className="resource-name">Gold</span>
				<span className="resource-amount">{gold}</span>
			</div>
		</div>
	);
};

export default ResourceDisplay;
