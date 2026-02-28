import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import "../../../styles/sections/building-panel.css";
import { useUIVisibility } from "../../UIVisibilityContext";
import BuildingCard from "../card/BuildingCard";
import BuildingSelector from "../card/BuildingSelector";
import { globalEventBus } from "../../../game/services/EventBusService";
import {
	selectCurrentPlace,
	selectCurrentPlaceSockets,
} from "../../../store/slices/placesSlice";
import { selectAllBuildings } from "../../../store/slices/buildingsSlice";
import { selectGold } from "../../../store/slices/playerSlice";
import {
	PLAYER_INTENT_BUY_SOCKET,
	PLAYER_INTENT_BUILD,
	PLAYER_INTENT_UPGRADE,
} from "../../../game/events";

const BuildingPanel = ({ onClose }) => {
	const { buildingPanel } = useUIVisibility();
	const currentPlace = useSelector(selectCurrentPlace);
	const socketData = useSelector(selectCurrentPlaceSockets);
	const allBuildings = useSelector(selectAllBuildings);
	const gold = useSelector(selectGold);

	const [showBuildingSelector, setShowBuildingSelector] = useState(false);
	const [selectedSocketIndex, setSelectedSocketIndex] = useState(null);

	const placeId = currentPlace?.id;
	const sockets = socketData.sockets || [];

	const handleBuySocket = useCallback(
		(socketIndex) => {
			globalEventBus.emit(PLAYER_INTENT_BUY_SOCKET, { placeId, socketIndex });
		},
		[placeId],
	);

	const handleBuildClick = useCallback((socketIndex) => {
		setSelectedSocketIndex(socketIndex);
		setShowBuildingSelector(true);
	}, []);

	const handleSelectBuilding = useCallback(
		(buildingId) => {
			globalEventBus.emit(PLAYER_INTENT_BUILD, {
				placeId,
				socketIndex: selectedSocketIndex,
				buildingId,
			});
			setShowBuildingSelector(false);
			setSelectedSocketIndex(null);
		},
		[placeId, selectedSocketIndex],
	);

	const handleUpgrade = useCallback(
		(socketIndex) => {
			globalEventBus.emit(PLAYER_INTENT_UPGRADE, { placeId, socketIndex });
		},
		[placeId],
	);

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
					key={i}
					slotIndex={i}
					socket={socket}
					buildingData={building}
					level={level}
					isLocked={isLocked}
					isEmpty={isEmpty}
					onBuySocket={handleBuySocket}
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
					<button className="building-panel-close" onClick={onClose}>
						&times;
					</button>
				</div>
				<div className="building-panel-content">
					<div className="socket-grid">{renderSockets()}</div>
					{showPurchaseMsg && (
						<div className="socket-purchase-msg">
							<span>Click slot to unlock ({socketData.cost}g)</span>
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
