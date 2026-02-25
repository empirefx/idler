import { useSelector } from "react-redux";

import "../../../styles/sections/workers-section.css";
import { useUIVisibility } from "../../UIVisibilityContext";
import WorkerCard from "../card/WorkerCard";
import {
	selectUnassignedWorkers,
	selectAssignedWorkers,
} from "../../../store/slices/playerSlice";
import { selectAllBuildings } from "../../../store/slices/buildingsSlice";
import { selectCurrentPlaceSockets } from "../../../store/slices/placesSlice";

const WorkersSection = () => {
	const { workerCard } = useUIVisibility();
	const unassigned = useSelector(selectUnassignedWorkers);
	const assigned = useSelector(selectAssignedWorkers);
	const buildings = useSelector(selectAllBuildings);
	const socketData = useSelector(selectCurrentPlaceSockets);

	if (!workerCard) return null;

	const occupiedSockets = socketData.sockets?.filter(s => s.status === "occupied") || [];
	const buildingList = occupiedSockets
		?.map((s) => buildings[s.buildingId])
		.filter(Boolean) || [];

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
								buildings={buildingList}
							/>
						))
					) : (
						<div className="no-workers-message">No workers available</div>
					)}
				</div>
				<h3>Assigned</h3>
				<div className="workers-list">
					{assigned.length > 0 ? (
						assigned.map((w) => (
							<WorkerCard
								key={w.id}
								worker={w}
								buildings={buildingList}
							/>
						))
					) : (
						<div className="no-workers-message">Currently no workers</div>
					)}
				</div>
			</div>
		</section>
	);
};

export default WorkersSection;
