import React from "react";

import "../../../styles/sections/building-selector.css";

// Helper: returns an array of "levelX: material" strings
function getMaterialStrings(obj) {
	const upgrades = obj.upgrades ?? {};
	const sortedLevels = Object.keys(upgrades).sort((a, b) => {
		const aNum = parseInt(a.replace("level", ""), 10);
		const bNum = parseInt(b.replace("level", ""), 10);
		return aNum - bNum;
	});

	return sortedLevels.map((lvl) => `${upgrades[lvl].material}`);
}

const BuildingSelector = ({ buildings, onSelect, onClose, gold }) => {
	return (
		<div
			className="building-selector-overlay"
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === "Escape") onClose();
			}}
			role="button"
			tabIndex={0}
		>
			<div
				className="building-selector"
				role="none"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="building-selector-header">
					<h3>Select Building</h3>
					<button
						type="button"
						className="building-selector-close"
						onClick={onClose}
					>
						&times;
					</button>
				</div>
				<div className="building-selector-content">
					{Object.values(buildings).map((building) => {
						const canAfford = gold >= (building.buildCost || 0);
						return (
							<div
								key={building.id}
								className={`building-option ${!canAfford ? "disabled" : ""}`}
								onClick={() => canAfford && onSelect(building.id)}
								onKeyDown={(e) => {
									if ((e.key === "Enter" || e.key === " ") && canAfford) {
										e.preventDefault();
										onSelect(building.id);
									}
								}}
								role="button"
								tabIndex={0}
							>
								<img
									className="building-option-img"
									src={`assets/icons/buildings/${building.icon}`}
									alt={building.name}
								/>
								<div className="building-option-info">
									<h4>{building.name}</h4>
									<p>{building.description}</p>
								</div>
								<div className="building-option-cost">
									<span className="cost">{building.buildCost}g</span>
									{getMaterialStrings(building).map((txt, idx) => (
										// biome-ignore lint/suspicious/noArrayIndexKey: material strings are display-only, never reordered
										<span className="production" key={idx}>
											+{txt}
										</span>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default React.memo(BuildingSelector);
