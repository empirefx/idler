import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";

import "../../../styles/sections/control-section.css";
import { selectCurrentPlace } from "../../../store/slices/placesSlice";
import {
	selectIsInCombat,
	startCombat,
	stopCombat,
} from "../../../store/slices/combatSlice";
import {
	selectResources,
	selectWorkers,
} from "../../../store/slices/playerSlice";
import ControlDisplay from "../display/ControlDisplay";
import KeyBind from "../common/KeyBind";

// selectors
const selectMaxWorkers = (state) => state.player.MAX_WORKERS || 0;

// Memoized selector
const selectWorkerCount = createSelector(
	[selectWorkers],
	(workers) => workers.length,
);

const ControlSection = ({ clearCache }) => {
	const resources = useSelector(selectResources);
	const workerCount = useSelector(selectWorkerCount);
	const maxWorkers = useSelector(selectMaxWorkers);
	const gold = resources.find((r) => r.name === "gold").amount;
	const currentPlace = useSelector(selectCurrentPlace);
	const isInCombat = useSelector(selectIsInCombat);
	const dispatch = useDispatch();

	return (
		<section className="control-section">
			<div className="control-top">
				{currentPlace.spawn && (
					<ControlDisplay
						isInCombat={isInCombat}
						onToggleCombat={() =>
							dispatch(isInCombat ? stopCombat() : startCombat())
						}
					/>
				)}

				<div className="cache">
					<button type="button" onClick={clearCache} className="clear-cache-btn">
						Clear Cache
					</button>
				</div>
			</div>

			<div className="control-bottom">
				<div className="keys-bindings">
					<span>
						<KeyBind value="c" info="Display character stats" /> character
					</span>
					<span>
						<KeyBind value="w" info="Open workers tab" /> workers
					</span>
				</div>
				<div className="resources">
					<span className="resource-item">
						{`${workerCount}/${maxWorkers}`} <b>workers</b>
					</span>
					<span className="resource-item">
						{gold} <b>gold</b>
					</span>
				</div>
			</div>
		</section>
	);
};

export default ControlSection;
