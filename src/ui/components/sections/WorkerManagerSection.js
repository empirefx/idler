import { useCallback } from "react";
import { useSelector } from "react-redux";

import "../../../styles/sections/worker-manager-section.css";
import {
	selectGold,
	selectWorkerSlots,
	selectWorkers,
} from "../../../store/slices/playerSlice";
import {
	WORKER_BASE_COST,
	WORKER_COST_MULTIPLIER,
	WORKER_REROLL_COST,
	WORKER_SLOT_COST,
	MAX_WORKER_SLOTS,
} from "../../../../shared/constants.js";
import { getWs } from "../../../store/ws";
import { useUIVisibility } from "../../UIVisibilityContext";
import DraggableWindow from "../common/DraggableWindow";

const WorkerManagerSection = () => {
	const { workerManagerWindow, closeWorkerManagerWindow } = useUIVisibility();
	const workers = useSelector(selectWorkers);
	const workerSlots = useSelector(selectWorkerSlots);
	const gold = useSelector(selectGold);
	const availablePool = useSelector((state) => state.player.availablePool || []);

	const workerCount = workers.length;
	const canHireMore = workerCount < workerSlots && availablePool.length > 0;
	const workerCost = WORKER_BASE_COST + workerCount * WORKER_COST_MULTIPLIER;

	const handleHire = useCallback((workerId) => {
		const ws = getWs();
		if (ws) {
			ws.send(JSON.stringify({ type: "HIRE_WORKER", workerId }));
		}
	}, []);

	const handleReroll = useCallback(() => {
		const ws = getWs();
		if (ws) {
			ws.send(JSON.stringify({ type: "REROLL_WORKERS" }));
		}
	}, []);

	const handleBuySlot = useCallback(() => {
		const ws = getWs();
		if (ws) {
			ws.send(JSON.stringify({ type: "BUY_WORKER_SLOT" }));
		}
	}, []);

	return (
		<DraggableWindow
			windowId="worker-manager"
			title="Worker Manager"
			width={700}
			isOpen={workerManagerWindow}
			onClose={closeWorkerManagerWindow}
			backgroundImage="assets/background/worker-bg.png"
		>
			<div className="worker-manager-stats">
				<span className="worker-count">
					Workers: {workerCount} / {workerSlots}
				</span>
				<span className="gold-amount">Gold: {gold}</span>
			</div>

			<div className="worker-manager-content">
				<div className="available-workers">
					<h4>Available Workers</h4>
					{availablePool.length === 0 ? (
						<div className="no-workers">
							No workers available. Try rerolling!
						</div>
					) : (
						<div className="worker-list">
							{availablePool.map((worker) => (
								<div key={worker.id} className="worker-item">
									<div className="worker-avatar">
										<img
											src={`assets/avatars/${worker.avatar}`}
											alt={worker.firstName}
										/>
									</div>
									<div className="worker-info">
										<span className="worker-name">{worker.firstName}</span>
										<span className="worker-gender">
											{worker.gender === "male" ? "Male" : "Female"}
										</span>
									</div>
									<button
										type="button"
										className={`hire-btn ${!canHireMore || gold < workerCost ? "disabled" : ""}`}
										disabled={!canHireMore || gold < workerCost}
										onClick={() => handleHire(worker.id)}
									>
										Hire ({workerCost}g)
									</button>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
			<div className="worker-manager-actions">
				<button
					type="button"
					className={`panel-action-btn reroll-btn ${gold < WORKER_REROLL_COST ? "disabled" : ""}`}
					disabled={gold < WORKER_REROLL_COST}
					onClick={handleReroll}
				>
					Reroll Workers ({WORKER_REROLL_COST}g)
				</button>

				<button
					type="button"
					className={`panel-action-btn buy-slot-btn ${gold < WORKER_SLOT_COST || workerSlots >= MAX_WORKER_SLOTS ? "disabled" : ""}`}
					disabled={gold < WORKER_SLOT_COST || workerSlots >= MAX_WORKER_SLOTS}
					onClick={handleBuySlot}
				>
					Buy Worker Slot ({WORKER_SLOT_COST}g)
				</button>
			</div>
		</DraggableWindow>
	);
};

export default WorkerManagerSection;
