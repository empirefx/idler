import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import "../../../styles/sections/control-section.css";
import { selectCurrentPlace } from "../../../store/slices/placesSlice";
import {
	selectGold,
	selectWorkers,
	selectAutoCombat,
	selectIsDead,
} from "../../../store/slices/playerSlice";
import { toggleAutoCombat } from "../../../store/ws";
import KeyBind from "../common/KeyBind";
import ControlDisplay from "../display/ControlDisplay";

// selectors
const selectMaxWorkers = (state) => state.player.workerSlots || 0;

// Memoized selector
const selectWorkerCount = createSelector(
	[selectWorkers],
	(workers) => workers.length,
);

const ControlSection = ({ clearCache }) => {
	const gold = useSelector(selectGold);
	const workerCount = useSelector(selectWorkerCount);
	const maxWorkers = useSelector(selectMaxWorkers);
	const currentPlace = useSelector(selectCurrentPlace);
	const autoCombat = useSelector(selectAutoCombat);
	const isDead = useSelector(selectIsDead);

	return (
		<section className="control-section">
			<div className="control-top">
				{currentPlace?.spawn && (
					<ControlDisplay
						autoCombat={autoCombat}
						disabled={isDead}
						onToggleCombat={toggleAutoCombat}
					/>
				)}

				<div className="cache">
					<button
						type="button"
						onClick={clearCache}
						className="clear-cache-btn"
					>
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
