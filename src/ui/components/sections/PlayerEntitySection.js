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
		<div
			className="player-entity-section"
			role="button"
			tabIndex={0}
			onClick={togglePlayerCard}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					togglePlayerCard();
				}
			}}
		>
			<EntityCard entity={playerInfo} avatarFolder="players" />
		</div>
	);
};

export default PlayerEntitySection;
