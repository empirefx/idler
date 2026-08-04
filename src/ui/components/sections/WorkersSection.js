import { useSelector } from "react-redux";

import "../../../styles/sections/workers-section.css";
import { buildingsData } from "../../../../shared/data/buildings";
import { itemCatalog } from "../../../../shared/data/itemCatalog";
import {
	selectCurrentPlaceId,
	selectCurrentPlaceSockets,
} from "../../../store/slices/placesSlice";
import { selectWorkers } from "../../../store/slices/playerSlice";
import { getWs } from "../../../store/ws";
import { useUIVisibility } from "../../UIVisibilityContext";
import WorkerCard from "../card/WorkerCard";

const WorkersSection = () => {
	const { workerCard } = useUIVisibility();
	const workers = useSelector(selectWorkers);
	const socketData = useSelector(selectCurrentPlaceSockets);
	const currentPlaceId = useSelector(selectCurrentPlaceId);

	if (!workerCard) return null;

	const occupiedSocketIndexes =
		(socketData || [])
			?.map((socket, idx) => (socket.status === "occupied" ? idx : -1))
			.filter((idx) => idx !== -1) || [];

	const assignedSocketIndexesForPlace = workers
		.filter((w) => w.assignment?.placeId === currentPlaceId)
		.map((w) => w.assignment.socketIndex)
		.filter((idx) => idx !== null && idx !== undefined);

	const availableSocketIndexes = occupiedSocketIndexes.filter(
		(idx) => !assignedSocketIndexesForPlace.includes(idx),
	);

	const getSocketMaterials = (socketIndex) => {
		const socket = socketData?.[socketIndex];
		if (!socket?.buildingId) return [];

		const building = buildingsData[socket.buildingId];
		if (!building?.upgrades) return [];

		const materials = [];
		for (let level = 1; level <= socket.level; level++) {
			const upgrade = building.upgrades[`level${level}`];
			if (upgrade?.material) {
				const item = itemCatalog[upgrade.material];
				materials.push({
					material: upgrade.material,
					icon: item?.icon || upgrade.material,
					level,
				});
			}
		}
		return materials;
	};

	const hasAnyAssignment = (worker) => {
		return Boolean(worker.assignment);
	};

	const handleFire = (workerId) => {
		const ws = getWs();
		if (ws) {
			ws.send(JSON.stringify({ type: "FIRE_WORKER", workerId }));
		}
	};

	const assigned = workers.filter((w) => hasAnyAssignment(w));
	const unassigned = workers.filter((w) => !hasAnyAssignment(w));

	return (
		<section className="workers-section">
			<h2>Workers</h2>
			<div className="workers-grid">
				<div className="workers-list">
					{unassigned.length > 0 ? (
						unassigned.map((w) => (
							<WorkerCard
								key={w.id}
								worker={w}
								placeId={currentPlaceId}
								availableSocketIndexes={availableSocketIndexes}
								occupiedSocketIndexes={occupiedSocketIndexes}
								socketData={socketData}
								getSocketMaterials={getSocketMaterials}
								onFire={handleFire}
							/>
						))
					) : (
						<div className="no-workers-message">No workers available</div>
					)}
				</div>
				{assigned.length > 0 && <h3>Assigned</h3>}
				<div className="workers-list">
					{assigned.length > 0 ? (
						assigned.map((w) => (
							<WorkerCard
								key={w.id}
								worker={w}
								placeId={currentPlaceId}
								occupiedSocketIndexes={occupiedSocketIndexes}
								socketData={socketData}
								getSocketMaterials={getSocketMaterials}
								isAssigned={true}
							/>
						))
					) : (
						<div className="no-workers-message">No assigned workers</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default WorkersSection;
