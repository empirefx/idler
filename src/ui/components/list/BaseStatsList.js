import { useSelector } from "react-redux";

import { selectInventoryById } from "../../../store/slices/inventorySlice";
import { selectPlayerSkills } from "../../../store/slices/playerSlice";
import { getPassiveSkillBonus } from "../../../game/core/combatCalculator";
import { getWeaponProfile } from "../../../game/utils/combatResolvers";

const BaseStatsList = ({ baseStats, exp, expToNext }) => {
	const playerInventory = useSelector((state) =>
		selectInventoryById(state, "player"),
	);
	const playerSkills = useSelector(selectPlayerSkills);
	const equipment = playerInventory?.equipment || {};
	const equippedWeapon = equipment["main-weapon"] || null;

	const equipmentBonus = {};
	Object.values(equipment).forEach((item) => {
		if (item?.stats) {
			Object.entries(item.stats).forEach(([stat, value]) => {
				equipmentBonus[stat] = (equipmentBonus[stat] || 0) + value;
			});
		}
	});

	const passiveBonus = getPassiveSkillBonus(equippedWeapon, playerSkills);

	return (
		<ul>
			{Object.entries(baseStats).map(([key, value]) => {
				const equipBonus = equipmentBonus[key] || 0;
				const passive = passiveBonus[key] || 0;
				const totalBonus = equipBonus + passive;
				return (
					<li key={key}>
						<span>{key}</span>
						<b>
							{value}
							{totalBonus > 0 && <span className="bonus"> (+{totalBonus})</span>}
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
