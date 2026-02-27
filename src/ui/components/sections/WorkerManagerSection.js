import { useState, useMemo, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import "../../../styles/sections/worker-manager-section.css";
import { useUIVisibility } from "../../UIVisibilityContext";
import { selectWorkers, selectWorkerSlots, selectGold, selectAvailableWorkers } from "../../../store/slices/playerSlice";
import { globalEventBus } from "../../../game/services/EventBusService";
import {
	PLAYER_INTENT_HIRE_WORKER,
	PLAYER_INTENT_REROLL_WORKERS,
	PLAYER_INTENT_BUY_WORKER_SLOT,
	WORKER_HIRED,
	WORKER_REROLLED,
	WORKER_SLOT_PURCHASED,
	WORKER_HIRE_FAILED,
	WORKER_REROLL_FAILED,
	WORKER_SLOT_FAILED,
} from "../../../game/events";

const REROLL_COST = 25;
const BASE_WORKER_COST = 50;
const WORKER_COST_MULTIPLIER = 25;
const SLOT_COST = 200;

const WorkerManagerSection = () => {
	const { workerManagerWindow, closeWorkerManagerWindow } = useUIVisibility();
	const workers = useSelector(selectWorkers);
	const workerSlots = useSelector(selectWorkerSlots);
	const gold = useSelector(selectGold);
	const availableWorkers = useSelector(selectAvailableWorkers);

	const [notification, setNotification] = useState(null);

	const workerCount = workers.length;
	const canHireMore = workerCount < workerSlots;
	const workerCost = BASE_WORKER_COST + workerCount * WORKER_COST_MULTIPLIER;

	useEffect(() => {
		const handleWorkerHired = ({ worker }) => {
			setNotification({ type: "success", message: `Hired ${worker.name}!` });
			setTimeout(() => setNotification(null), 3000);
		};

		const handleWorkerRerolled = () => {
			setNotification({ type: "success", message: "Workers refreshed!" });
			setTimeout(() => setNotification(null), 3000);
		};

		const handleSlotPurchased = ({ newSlotCount }) => {
			setNotification({ type: "success", message: `Worker slot purchased! Total: ${newSlotCount}` });
			setTimeout(() => setNotification(null), 3000);
		};

		const handleHireFailed = ({ error }) => {
			setNotification({ type: "error", message: error });
			setTimeout(() => setNotification(null), 3000);
		};

		const handleRerollFailed = ({ error }) => {
			setNotification({ type: "error", message: error });
			setTimeout(() => setNotification(null), 3000);
		};

		const handleSlotFailed = ({ error }) => {
			setNotification({ type: "error", message: error });
			setTimeout(() => setNotification(null), 3000);
		};

		globalEventBus.on(WORKER_HIRED, handleWorkerHired);
		globalEventBus.on(WORKER_REROLLED, handleWorkerRerolled);
		globalEventBus.on(WORKER_SLOT_PURCHASED, handleSlotPurchased);
		globalEventBus.on(WORKER_HIRE_FAILED, handleHireFailed);
		globalEventBus.on(WORKER_REROLL_FAILED, handleRerollFailed);
		globalEventBus.on(WORKER_SLOT_FAILED, handleSlotFailed);

		return () => {
			globalEventBus.off(WORKER_HIRED, handleWorkerHired);
			globalEventBus.off(WORKER_REROLLED, handleWorkerRerolled);
			globalEventBus.off(WORKER_SLOT_PURCHASED, handleSlotPurchased);
			globalEventBus.off(WORKER_HIRE_FAILED, handleHireFailed);
			globalEventBus.off(WORKER_REROLL_FAILED, handleRerollFailed);
			globalEventBus.off(WORKER_SLOT_FAILED, handleSlotFailed);
		};
	}, []);

	const handleHire = useCallback((workerId) => {
		globalEventBus.emit(PLAYER_INTENT_HIRE_WORKER, { workerId });
	}, []);

	const handleReroll = useCallback(() => {
		globalEventBus.emit(PLAYER_INTENT_REROLL_WORKERS, {});
	}, []);

	const handleBuySlot = useCallback(() => {
		globalEventBus.emit(PLAYER_INTENT_BUY_WORKER_SLOT, {});
	}, []);

	if (!workerManagerWindow) return null;

	return (
		<section className="worker-manager-section">
			<div className="worker-manager-header">
				<h3>Worker Manager</h3>
				<button className="close-btn" onClick={closeWorkerManagerWindow}>
					×
				</button>
			</div>

			<div className="worker-manager-stats">
				<span className="worker-count">
					Workers: {workerCount} / {workerSlots}
				</span>
				<span className="gold-amount">Gold: {gold}</span>
			</div>

			{notification && (
				<div className={`notification ${notification.type}`}>
					{notification.message}
				</div>
			)}

			<div className="worker-manager-content">
				<div className="available-workers">
					<h4>Available Workers</h4>
					{availableWorkers.length === 0 ? (
						<div className="no-workers">No workers available. Try rerolling!</div>
					) : (
						<div className="worker-list">
							{availableWorkers.map((worker) => (
								<div key={worker.id} className="worker-item">
									<div className="worker-avatar">
										<img src={`/assets/avatars/${worker.avatar}`} alt={worker.firstName} />
									</div>
									<div className="worker-info">
										<span className="worker-name">{worker.firstName}</span>
										<span className="worker-gender">
											{worker.gender === "male" ? "Male" : "Female"}
										</span>
									</div>
									<button
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
					className={`reroll-btn ${gold < REROLL_COST ? "disabled" : ""}`}
					disabled={gold < REROLL_COST}
					onClick={handleReroll}
				>
					Reroll Workers ({REROLL_COST}g)
				</button>

				<button
					className={`buy-slot-btn ${gold < SLOT_COST ? "disabled" : ""}`}
					disabled={gold < SLOT_COST}
					onClick={handleBuySlot}
				>
					Buy Worker Slot ({SLOT_COST}g)
				</button>
			</div>
		</section>
	);
};

export default WorkerManagerSection;
