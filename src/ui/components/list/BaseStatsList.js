import { useSelector } from "react-redux";

import { selectInventoryById } from "../../../store/slices/inventorySlice";

const BaseStatsList = ({ baseStats, exp, expToNext }) => {
	const playerInventory = useSelector((state) =>
		selectInventoryById(state, "player"),
	);
	const equipment = playerInventory?.equipment || {};

	const equipmentBonus = {};
	Object.values(equipment).forEach((item) => {
		if (item?.stats) {
			Object.entries(item.stats).forEach(([stat, value]) => {
				equipmentBonus[stat] = (equipmentBonus[stat] || 0) + value;
			});
		}
	});

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
			{exp !== undefined && (
				<li>
					<span>EXP</span>
					<b>
						{exp}/{expToNext}
					</b>
				</li>
			)}
		</ul>
	);
};

export default BaseStatsList;
