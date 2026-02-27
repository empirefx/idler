import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { selectWorkers } from "../../../../store/slices/playerSlice";
import { globalEventBus } from "../../../../game/services/EventBusService";
import { PLAYER_INTENT_FIRE_WORKER, WORKER_FIRED, WORKER_FIRE_FAILED } from "../../../../game/events";

const NPCDialogFireWorker = ({ onClose }) => {
	const workers = useSelector(selectWorkers);
	const [selectedWorker, setSelectedWorker] = useState(null);
	const [showConfirm, setShowConfirm] = useState(false);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		const handleWorkerFired = ({ workerName }) => {
			setNotification({ type: "success", message: `${workerName} has been fired.` });
			setSelectedWorker(null);
			setShowConfirm(false);
			setTimeout(() => {
				setNotification(null);
			}, 1500);
		};

		const handleFireFailed = ({ error }) => {
			setNotification({ type: "error", message: error });
			setTimeout(() => setNotification(null), 3000);
		};

		globalEventBus.on(WORKER_FIRED, handleWorkerFired);
		globalEventBus.on(WORKER_FIRE_FAILED, handleFireFailed);

		return () => {
			globalEventBus.off(WORKER_FIRED, handleWorkerFired);
			globalEventBus.off(WORKER_FIRE_FAILED, handleFireFailed);
		};
	}, [onClose]);

	const handleFireClick = (worker) => {
		setSelectedWorker(worker);
		setShowConfirm(true);
	};

	const handleConfirmFire = () => {
		if (selectedWorker) {
			globalEventBus.emit(PLAYER_INTENT_FIRE_WORKER, { workerId: selectedWorker.id });
		}
	};

	const handleCancelFire = () => {
		setShowConfirm(false);
		setSelectedWorker(null);
	};

	if (workers.length === 0) {
		return (
			<div className="fire-worker-panel">
				<h4>Fire Worker</h4>
				<p className="no-workers-message">You have no workers to fire.</p>
				<button className="close-panel-btn" onClick={onClose}>
					Close
				</button>
			</div>
		);
	}

	if (showConfirm && selectedWorker) {
		return (
			<div className="fire-worker-panel fire-confirm-panel">
				<h4>Confirm Fire</h4>
				<div className="confirm-content">
					<p>Are you sure you want to fire this worker?</p>
					<div className="worker-to-fire">
						<img src={`/assets/avatars/${selectedWorker.avatar}`} alt={selectedWorker.name} />
						<span>{selectedWorker.name}</span>
					</div>
					<p className="warning-text">This action cannot be undone.</p>
				</div>
				<div className="confirm-actions">
					<button className="cancel-btn" onClick={handleCancelFire}>
						Cancel
					</button>
					<button className="confirm-fire-btn" onClick={handleConfirmFire}>
						Fire Worker
					</button>
				</div>
				{notification && (
					<div className={`notification ${notification.type}`}>
						{notification.message}
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="fire-worker-panel">
			<h4>Fire Worker</h4>
			<p>Select a worker to fire:</p>
			<div className="worker-list">
				{workers.map((worker) => (
					<div key={worker.id} className="worker-item">
						<div className="worker-avatar">
							<img src={`/assets/avatars/${worker.avatar}`} alt={worker.name} />
						</div>
						<div className="worker-info">
							<span className="worker-name">{worker.name}</span>
							<span className="worker-status">
								{worker.assignments && Object.keys(worker.assignments).length > 0 
									? `Assigned to ${Object.keys(worker.assignments).join(", ")}`
									: "Unassigned"}
							</span>
						</div>
						<button className="fire-btn" onClick={() => handleFireClick(worker)}>
							Fire
						</button>
					</div>
				))}
			</div>
			<button className="close-panel-btn" onClick={onClose}>
				Cancel
			</button>
			{notification && (
				<div className={`notification ${notification.type}`}>
					{notification.message}
				</div>
			)}
		</div>
	);
};

export default NPCDialogFireWorker;
