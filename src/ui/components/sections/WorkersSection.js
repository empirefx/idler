import { useSelector } from "react-redux";

import "../../../styles/sections/workers-section.css";
import { useUIVisibility } from "../../UIVisibilityContext";
import WorkerCard from "../card/WorkerCard";
import {
	selectUnassignedWorkers,
	selectAssignedWorkers,
} from "../../../store/slices/playerSlice";
import { selectCurrentPlaceSockets } from "../../../store/slices/placesSlice";
import { buildingsData } from "../../../data/buildings";
import { itemCatalog } from "../../../data/itemCatalog";

const WorkersSection = () => {
	const { workerCard } = useUIVisibility();
	const unassigned = useSelector(selectUnassignedWorkers);
	const assigned = useSelector(selectAssignedWorkers);
	const socketData = useSelector(selectCurrentPlaceSockets);

	if (!workerCard) return null;

	const occupiedSockets = socketData.sockets?.filter(s => s.status === "occupied") || [];
	const occupiedSocketIndexes = occupiedSockets.map((_, idx) => idx);

	const assignedSocketIndexes = assigned
		.map(w => w.assignedSocketIndex)
		.filter(idx => idx !== null && idx !== undefined);

	const availableSocketIndexes = occupiedSocketIndexes.filter(
		idx => !assignedSocketIndexes.includes(idx)
	);

	const getSocketMaterials = (socketIndex) => {
		const socket = occupiedSockets[socketIndex];
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
								availableSocketIndexes={availableSocketIndexes}
								occupiedSockets={occupiedSockets}
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
								occupiedSockets={occupiedSockets}
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
