import React, { useMemo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Item from "../common/Item";
import ConfirmAlert from "../common/ConfirmAlert";
import { itemCatalog } from "../../../data/itemCatalog";
import {
	assignWorkerToSocketWithEvent,
	unassignWorkerFromSocketWithEvent,
} from "../../../store/slices/playerSlice";

const WorkerAvatar = ({ avatar, name, bgClass }) => (
	<div className="worker-avatar">
		<img
			src={`assets/avatars/${avatar}`}
			alt={name}
			className={bgClass}
			width={45}
			height={45}
		/>
	</div>
);

const WorkerInfo = ({ name }) => {
	const firstName = name ? name.split(" ")[0] : name;
	return (
		<div className="worker-info">
			<p>{firstName}</p>
		</div>
	);
};

const WorkerCard = ({
	worker,
	placeId,
	availableSocketIndexes,
	occupiedSocketIndexes,
	socketData,
	getSocketMaterials,
	isAssigned = false,
	onFire,
}) => {
	const dispatch = useDispatch();
	const [showFireConfirm, setShowFireConfirm] = useState(false);

	const handleMaterialClick = useCallback(
		(socketIndex, material, assignmentPlaceId) => {
			if (isAssigned) {
				dispatch(
					unassignWorkerFromSocketWithEvent(worker.id, assignmentPlaceId),
				);
			} else {
				dispatch(
					assignWorkerToSocketWithEvent(
						worker.id,
						placeId,
						socketIndex,
						material,
					),
				);
			}
		},
		[dispatch, worker, isAssigned, placeId],
	);

	const handleFireClick = () => {
		setShowFireConfirm(true);
	};

	const handleConfirmFire = () => {
		if (onFire) {
			onFire(worker.id);
		}
		setShowFireConfirm(false);
	};

	const handleCancelFire = () => {
		setShowFireConfirm(false);
	};

	const materials = useMemo(() => {
		if (isAssigned && worker.assignments) {
			const assignments = Object.entries(worker.assignments);
			if (assignments.length > 0) {
				const [assignmentPlaceId, assignment] = assignments[0];
				const item = itemCatalog[assignment.material];
				return [
					{
						socketIndex: assignment.socketIndex,
						mat: {
							material: assignment.material,
							icon: item?.icon || assignment.material,
						},
						assignmentPlaceId,
					},
				];
			}
		}

		if (!availableSocketIndexes || availableSocketIndexes.length === 0) {
			return [];
		}
		return availableSocketIndexes.flatMap((socketIndex) =>
			getSocketMaterials(socketIndex).map((mat) => ({ socketIndex, mat })),
		);
	}, [
		isAssigned,
		worker,
		placeId,
		availableSocketIndexes,
		getSocketMaterials,
		socketData,
	]);

	const workerName = worker.name ? worker.name.split(" ")[0] : "Worker";

	return (
		<>
			<div className={`worker-card${isAssigned ? " assigned" : ""}`}>
				<WorkerAvatar
					avatar={worker.avatar}
					name={worker.name}
					bgClass={isAssigned ? "bg-red" : "bg-green"}
				/>
				<WorkerInfo name={worker.name} />
				{(isAssigned || materials.length > 0) && (
					<span>{isAssigned ? "Working on ⏵ " : "Select material ⏷"}</span>
				)}
				{!isAssigned && onFire && (
					<div className="worker-actions">
						<button className="fire-btn" onClick={handleFireClick}>
							Fire
						</button>
					</div>
				)}
				{materials.length > 0 && (
					<div className="worker-materials">
						{materials.map(({ socketIndex, mat, assignmentPlaceId }) => (
							<Item
								key={`${socketIndex}-${mat.material}`}
								item={{ icon: mat.icon, name: mat.material }}
								showItemInfo={false}
								onClick={() =>
									handleMaterialClick(
										socketIndex,
										mat.material,
										assignmentPlaceId,
									)
								}
							/>
						))}
					</div>
				)}
			</div>
			<ConfirmAlert
				open={showFireConfirm}
				title="Fire Worker?"
				message={`This will cost 25 gold. ${workerName} will be removed from your workforce.`}
				variant="danger"
				confirmLabel="Fire (25g)"
				cancelLabel="Cancel"
				overlay={false}
				onConfirm={handleConfirmFire}
				onCancel={handleCancelFire}
			/>
		</>
	);
};

export default WorkerCard;
