import React from "react";
import { useSelector } from "react-redux";
import { selectAllBuildings } from "../../../store/slices/buildingsSlice";
import { selectCurrentPlace } from "../../../store/slices/placesSlice";
import { useUIVisibility } from "../../UIVisibilityContext";

const BuildingSection = () => {
	const { toggleBuildingPanel, showBuildingPanel } = useUIVisibility();
	const currentPlace = useSelector(selectCurrentPlace);
	const allBuildings = useSelector(selectAllBuildings);

	const sockets = currentPlace?.sockets || [];

	const socketItems = sockets.map((socket, idx) => {
		if (socket.status === "occupied") {
			const building = allBuildings[socket.buildingId];
		return building ? (
			// biome-ignore lint/suspicious/noArrayIndexKey: socket index is stable, never reordered
			<img key={idx}
				className="building-mini-icon"
					src={`assets/icons/buildings/${building.icon}`}
					alt={building.name}
				/>
			) : null;
		}
		return (
			// biome-ignore lint/suspicious/noArrayIndexKey: socket index is stable, never reordered
			<div key={idx} className="socket-placeholder">
				{socket.status === "locked" ? "LOCK" : "BUILD"}
			</div>
		);
	});

	const hasSockets = sockets.length > 0;

	return (
		<div
			className="buildings-section"
			role="button"
			tabIndex={0}
			onMouseEnter={showBuildingPanel}
			onClick={toggleBuildingPanel}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					toggleBuildingPanel();
				}
			}}
		>
			{hasSockets && socketItems}
		</div>
	);
};

export default React.memo(BuildingSection);
