import React from "react";

const BuildingCard = ({
	slotIndex,
	socket,
	buildingData,
	level,
	isLocked,
	isEmpty,
	onBuySocket,
	onBuild,
	onUpgrade,
	canAffordUpgrade,
	hasUpgrade,
	upgradeCost,
}) => {
	const getCardClass = () => {
		if (isLocked) return "building-card locked";
		if (isEmpty) return "building-card empty";
		return "building-card occupied";
	};

	const handleClick = () => {
		if (isLocked) {
			onBuySocket(slotIndex);
		} else if (isEmpty) {
			onBuild(slotIndex);
		}
	};

	const currentLevel = level || 1;
	const upgrades = buildingData?.upgrades || {};

	const getUnlockedMaterials = () => {
		const items = [];
		for (let l = 1; l <= currentLevel; l++) {
			const upgrade = upgrades[`level${l}`];
			if (upgrade?.material) {
				items.push({ level: l, material: upgrade.material });
			}
		}
		return items;
	};

	const getLockedMaterials = () => {
		const items = [];
		for (let l = currentLevel + 1; l <= 5; l++) {
			const upgrade = upgrades[`level${l}`];
			if (upgrade?.material) {
				items.push({ level: l, material: upgrade.material, cost: upgrade.cost });
			}
		}
		return items;
	};

	if (isLocked) {
		return (
			<div className={getCardClass()} onClick={handleClick}>
				<span className="locked-socket">LOCK</span>
			</div>
		);
	}

	if (isEmpty) {
		return (
			<div className={getCardClass()} onClick={handleClick}>
				<span className="building-label">+ Build</span>
			</div>
		);
	}

	const unlockedMaterials = getUnlockedMaterials();
	const lockedMaterials = getLockedMaterials();

	return (
		<div className={getCardClass()} onClick={handleClick}>
			<div className="building-header">
				{currentLevel > 1 && <span className="building-level">Lv.{currentLevel}</span>}
				<img
					className="building-icon"
					src={`assets/icons/buildings/${buildingData?.icon || "farm.jpg"}`}
					alt={buildingData?.name}
				/>
				<span className="building-name">{buildingData?.name}</span>
				<span className="building-description">{buildingData?.description}</span>
			</div>

			<div className="building-info">
				<div className="building-section">
					<span className="section-title">Materials</span>
					<div className="material-list">
						{unlockedMaterials.map((item, idx) => (
							<div key={idx} className="material-item unlocked">
								<span className="material-level">Lv.{item.level}</span>
								<span className="material-name">{item.material}</span>
							</div>
						))}
					</div>
				</div>

				{lockedMaterials.length > 0 && (
					<div className="building-section locked-section">
						<span className="section-title">LOCKED</span>
						<div className="material-list">
							{lockedMaterials.map((item, idx) => (
								<div key={idx} className="material-item locked">
									<span className="material-level">Lv.{item.level}</span>
									<span className="material-name">{item.material}</span>
									<span className="material-cost">{item.cost}g</span>
								</div>
							))}
						</div>
					</div>
				)}

				{hasUpgrade && canAffordUpgrade && (
					<button
						className="upgrade-btn"
						onClick={(e) => {
							e.stopPropagation();
							onUpgrade(slotIndex);
						}}
					>
						Upgrade ({upgradeCost}g)
					</button>
				)}
			</div>
		</div>
	);
};

export default React.memo(BuildingCard);
