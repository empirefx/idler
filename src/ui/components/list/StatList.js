import { useSelector } from "react-redux";

import { selectInventoryById } from "../../../store/slices/inventorySlice";

// Displays base stats and equipment bonuses
const StatList = ({ baseStats }) => {
	// Get equipped items from player inventory
	const playerInventory = useSelector((state) =>
		selectInventoryById(state, "player"),
	);
	const equipment = playerInventory?.equipment || {};

	// Aggregate equipment bonuses for each stat
	const equipmentBonus = {};
	Object.values(equipment).forEach((item) => {
		if (item?.stats) {
			Object.entries(item.stats).forEach(([stat, value]) => {
				equipmentBonus[stat] = (equipmentBonus[stat] || 0) + value;
			});
		}
	});

	// Render each stat with bonus if present
	return (
		<ul>
			{Object.entries(baseStats).map(([key, value]) => {
				const bonus = equipmentBonus[key] || 0;
				return (
					<li key={key}>
						<span>{key}</span>
						<b>
							{value}
							{bonus > 0 && <span className="bonus"> (+{bonus})</span>}
						</b>
					</li>
				);
			})}
		</ul>
	);
};

export default StatList;
