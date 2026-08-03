import { useSelector } from "react-redux";

import "../../../styles/sections/player-section.css";
import { selectCurrentPlace } from "../../../store/slices/placesSlice";
import { selectPlayer } from "../../../store/slices/playerSlice";
import { selectInventoryByPlaceId } from "../../../store/slices/inventorySlice";
import { useUIVisibility } from "../../UIVisibilityContext";
import PlayerCard from "../card/PlayerCard";
import DraggableWindow from "../common/DraggableWindow";

const PlayerSection = () => {
	const { playerCard, togglePlayerCard } = useUIVisibility();
	const playerInfo = useSelector(selectPlayer);
	const currentPlace = useSelector(selectCurrentPlace);
	const vault = useSelector((state) =>
		currentPlace ? selectInventoryByPlaceId(state, currentPlace.id) : null,
	);

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
			<PlayerCard player={playerInfo} vaultId={vault?.id} />
		</DraggableWindow>
	);
};

export default PlayerSection;
