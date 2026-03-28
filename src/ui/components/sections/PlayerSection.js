import { useSelector } from "react-redux";

import "../../../styles/sections/player-section.css";
import { useUIVisibility } from "../../UIVisibilityContext";
import PlayerCard from "../card/PlayerCard";
import { selectPlayer } from "../../../store/slices/playerSlice";
import { selectCurrentPlace } from "../../../store/slices/placesSlice";
import DraggableWindow from "../common/DraggableWindow";

const PlayerSection = () => {
	const { playerCard, togglePlayerCard } = useUIVisibility();
	const playerInfo = useSelector(selectPlayer);
	const currentPlace = useSelector(selectCurrentPlace);

	if (!playerInfo) return null;

	return (
		<DraggableWindow
			windowId="player"
			title="Character"
			width={970}
			height={530}
			isOpen={playerCard}
			onClose={togglePlayerCard}
			backgroundImage="assets/background/player-bg.png"
		>
			<PlayerCard player={playerInfo} vaultId={currentPlace.id} />
		</DraggableWindow>
	);
};

export default PlayerSection;
