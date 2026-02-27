import { useSelector } from "react-redux";

import "../../../styles/sections/workers-section.css";
import { useUIVisibility } from "../../UIVisibilityContext";
import WorkerCard from "../card/WorkerCard";
import {
	selectWorkers,
} from "../../../store/slices/playerSlice";
import { selectCurrentPlaceSockets, selectCurrentPlaceId } from "../../../store/slices/placesSlice";
import { buildingsData } from "../../../data/buildings";
import { itemCatalog } from "../../../data/itemCatalog";

const WorkersSection = () => {
	const { workerCard } = useUIVisibility();
	const workers = useSelector(selectWorkers);
	const socketData = useSelector(selectCurrentPlaceSockets);
	const currentPlaceId = useSelector(selectCurrentPlaceId);

	if (!workerCard) return null;

	const occupiedSocketIndexes = socketData.sockets
		?.map((socket, idx) => socket.status === "occupied" ? idx : -1)
		.filter(idx => idx !== -1) || [];

	const assignedSocketIndexesForPlace = workers
		.filter(w => w.assignments && w.assignments[currentPlaceId])
		.map(w => w.assignments[currentPlaceId].socketIndex)
		.filter(idx => idx !== null && idx !== undefined);

	const availableSocketIndexes = occupiedSocketIndexes.filter(
		idx => !assignedSocketIndexesForPlace.includes(idx)
	);

	const getSocketMaterials = (socketIndex) => {
		const socket = socketData.sockets?.[socketIndex];
		if (!socket || !socket.buildingId) return [];

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
		return worker.assignments && Object.keys(worker.assignments).length > 0;
	};

	const assigned = workers.filter(w => hasAnyAssignment(w));
	const unassigned = workers.filter(w => !hasAnyAssignment(w));

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
							/>
						))
					) : (
						<div className="no-workers-message">No workers available</div>
					)}
				</div>
				{assigned.length > 0 && (<h3>Assigned</h3>)}
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
