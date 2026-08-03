import { useSelector } from "react-redux";
import { selectDerivedStats, selectMaxHp } from "../../../store/slices/playerSlice";

const DerivedStatsList = () => {
	const derived = useSelector(selectDerivedStats);
	const maxHp = useSelector(selectMaxHp);
	if (!derived) return null;

	return (
		<ul>
			<li><span>Health</span><b>{maxHp}</b></li>
			<li><span>{derived.damageType} Dmg</span><b>{derived.damage}</b></li>
			<li><span>Hit</span><b>{derived.hitChance}%</b></li>
			<li><span>Crit</span><b>{derived.critChance}%</b></li>
			<li><span>Defense</span><b>{derived.defense}</b></li>
		</ul>
	);
};

export default DerivedStatsList;
