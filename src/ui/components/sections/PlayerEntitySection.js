import { useSelector } from "react-redux";

import "../../../styles/sections/player-entity-section.css";
import { selectPlayer } from "../../../store/slices/playerSlice";
import { useUIVisibility } from "../../UIVisibilityContext";
import EntityCard from "../card/EntityCard";

const PlayerEntitySection = () => {
	const playerInfo = useSelector(selectPlayer);
	const { togglePlayerCard } = useUIVisibility();
	if (!playerInfo) return null;
	return (
		<section className="player-entity-section" onClick={togglePlayerCard}>
			<EntityCard entity={playerInfo} avatarFolder="players" />
		</section>
	);
};

export default PlayerEntitySection;
