import { useSelector } from "react-redux";
import { selectDerivedStats } from "../../../store/slices/playerSlice";

const BaseStatsList = ({ baseStats, exp, expToNext }) => {
	const derived = useSelector(selectDerivedStats);
	const equipmentBonus = derived?.equipmentBonus || {};

	return (
		<ul>
			{Object.entries(baseStats || {}).map(([key, value]) => {
				const totalBonus = equipmentBonus[key] || 0;
				return (
					<li key={key}>
						<span>{key}</span>
						<b>
							{value}
							{totalBonus > 0 && (
								<span className="bonus"> (+{totalBonus})</span>
							)}
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
