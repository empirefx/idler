import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";

import "../../../styles/sections/building-panel.css";
import { selectAllBuildings } from "../../../store/slices/buildingsSlice";
import {
	selectCurrentPlace,
	selectCurrentPlaceSockets,
} from "../../../store/slices/placesSlice";
import { selectGold } from "../../../store/slices/playerSlice";
import { getWs } from "../../../store/ws";
import { useUIVisibility } from "../../UIVisibilityContext";
import BuildingCard from "../card/BuildingCard";
import BuildingSelector from "../card/BuildingSelector";

const BuildingPanel = ({ onClose }) => {
	const { buildingPanel } = useUIVisibility();
	const currentPlace = useSelector(selectCurrentPlace);
	const socketData = useSelector(selectCurrentPlaceSockets);
	const allBuildings = useSelector(selectAllBuildings);
	const gold = useSelector(selectGold);

	const [showBuildingSelector, setShowBuildingSelector] = useState(false);
	const [selectedSocketIndex, setSelectedSocketIndex] = useState(null);

	const sockets = socketData || [];

	const handleBuildClick = useCallback((socketIndex) => {
		setSelectedSocketIndex(socketIndex);
		setShowBuildingSelector(true);
	}, []);

	const handleSelectBuilding = useCallback(
		(buildingId) => {
			setShowBuildingSelector(false);
			if (selectedSocketIndex !== null && currentPlace?.id) {
				const ws = getWs();
				if (ws) {
					ws.send(
						JSON.stringify({
							type: "BUILD",
							placeId: currentPlace.id,
							socketIndex: selectedSocketIndex,
							buildingId,
						}),
					);
				}
			}
			setSelectedSocketIndex(null);
		},
		[selectedSocketIndex, currentPlace],
	);

	const handleUpgrade = useCallback((socketIndex) => {
		if (currentPlace?.id) {
			const ws = getWs();
			if (ws) {
				ws.send(
					JSON.stringify({
						type: "UPGRADE_BUILDING",
						placeId: currentPlace.id,
						socketIndex,
					}),
				);
			}
		}
	}, [currentPlace]);

	const lockedCount = sockets.filter((s) => s.status === "locked").length;
	const showPurchaseMsg = lockedCount > 0;

	const renderSockets = () => {
		return sockets.map((socket, i) => {
			const isLocked = socket.status === "locked";
			const isEmpty = socket.status === "empty";
			const isOccupied = socket.status === "occupied";

			const building = isOccupied ? allBuildings[socket.buildingId] : null;
			const level = socket.level || 1;

			const upgradeKey = `level${level + 1}`;
			const upgrade = building?.upgrades?.[upgradeKey];
			const canAffordUpgrade = gold >= (upgrade?.cost || 0);
			const hasUpgrade = !!upgrade;

			return (
				<BuildingCard
					// biome-ignore lint/suspicious/noArrayIndexKey: socket index is stable, never reordered
					key={i}
					slotIndex={i}
					socket={socket}
					buildingData={building}
					level={level}
					isLocked={isLocked}
					isEmpty={isEmpty}
					onBuild={() => handleBuildClick(i)}
					onUpgrade={() => handleUpgrade(i)}
					canAffordUpgrade={canAffordUpgrade}
					hasUpgrade={hasUpgrade}
					upgradeCost={upgrade?.cost || 0}
				/>
			);
		});
	};

	return (
		<>
			<div className={`building-panel ${buildingPanel ? "visible" : ""}`}>
				<div className="building-panel-header">
					<h3>Buildings</h3>
					{showPurchaseMsg && (
						<div className="building-panel-info">
							<span>{lockedCount} locked</span>
						</div>
					)}
					<button
						type="button"
						className="building-panel-close"
						onClick={onClose}
					>
						&times;
					</button>
				</div>
				<div className="building-panel-content">
					<div className="socket-grid">{renderSockets()}</div>
					{showPurchaseMsg && (
						<div className="socket-purchase-msg">
							<span>Click slot to unlock ({currentPlace?.socketCost || 100}g)</span>
						</div>
					)}
				</div>
			</div>
			{showBuildingSelector && (
				<BuildingSelector
					buildings={allBuildings}
					onSelect={handleSelectBuilding}
					onClose={() => {
						setShowBuildingSelector(false);
						setSelectedSocketIndex(null);
					}}
					gold={gold}
				/>
			)}
		</>
	);
};

export default React.memo(BuildingPanel);
