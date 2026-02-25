import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import "../../../styles/sections/building-panel.css";
import { useUIVisibility } from "../../UIVisibilityContext";
import BuildingCard from "../card/BuildingCard";
import BuildingSelector from "../card/BuildingSelector";
import {
	selectCurrentPlace,
	selectCurrentPlaceSockets,
} from "../../../store/slices/placesSlice";
import { selectAllBuildings } from "../../../store/slices/buildingsSlice";
import { selectGold, spendGold } from "../../../store/slices/playerSlice";
import { buySocket, buildBuilding, upgradeBuilding } from "../../../store/slices/placesSlice";

const BuildingPanel = ({ onClose }) => {
	const dispatch = useDispatch();
	const { buildingPanel } = useUIVisibility();
	const currentPlace = useSelector(selectCurrentPlace);
	const socketData = useSelector(selectCurrentPlaceSockets);
	const allBuildings = useSelector(selectAllBuildings);
	const gold = useSelector(selectGold);

	const [showBuildingSelector, setShowBuildingSelector] = useState(false);
	const [selectedSocketIndex, setSelectedSocketIndex] = useState(null);

	const placeId = currentPlace?.id;
	const sockets = socketData.sockets || [];

	const handleBuySocket = useCallback((socketIndex) => {
		if (gold >= socketData.cost) {
			dispatch(spendGold(socketData.cost));
			dispatch(buySocket({ placeId, socketIndex }));
		}
	}, [dispatch, placeId, gold, socketData]);

	const handleBuildClick = useCallback((socketIndex) => {
		setSelectedSocketIndex(socketIndex);
		setShowBuildingSelector(true);
	}, []);

	const handleSelectBuilding = useCallback(
		(buildingId) => {
			const building = allBuildings[buildingId];
			if (gold >= building.buildCost) {
				dispatch(spendGold(building.buildCost));
				dispatch(buildBuilding({ placeId, socketIndex: selectedSocketIndex, buildingId }));
			}
			setShowBuildingSelector(false);
			setSelectedSocketIndex(null);
		},
		[dispatch, placeId, allBuildings, gold, selectedSocketIndex]
	);

	const handleUpgrade = useCallback(
		(socketIndex) => {
			const socket = sockets[socketIndex];
			if (!socket || socket.status !== "occupied") return;

			const building = allBuildings[socket.buildingId];
			const nextLevel = (socket.level || 1) + 1;
			const upgradeKey = `level${nextLevel}`;
			const upgrade = building?.upgrades?.[upgradeKey];

			if (upgrade && gold >= upgrade.cost) {
				dispatch(spendGold(upgrade.cost));
				dispatch(upgradeBuilding({ placeId, socketIndex }));
			}
		},
		[dispatch, placeId, sockets, allBuildings, gold]
	);

	const lockedCount = sockets.filter(s => s.status === "locked").length;
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
