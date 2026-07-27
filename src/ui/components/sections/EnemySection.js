import { useSelector } from "react-redux";

import "../../../styles/sections/enemy-section.css";
import { selectEnemiesForCurrentPlace } from "../../../store/slices/enemiesSlice";
import { selectCurrentPlace } from "../../../store/slices/placesSlice";
import EnemyDisplay from "../display/EnemyDisplay";

const EnemySection = () => {
	const currentPlace = useSelector(selectCurrentPlace);
	const enemies = useSelector(selectEnemiesForCurrentPlace);

	if (!currentPlace.spawn) return null;
	return <EnemyDisplay enemies={enemies} />;
};

export default EnemySection;
