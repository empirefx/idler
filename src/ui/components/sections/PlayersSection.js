import { useSelector } from "react-redux";
import {
	selectPokedBy,
	selectPresentPlayers,
} from "../../../store/slices/playersSlice";
import PlayerList from "../list/PlayerList";
import "../../../styles/sections/players-section.css";

const PlayersSection = () => {
	const players = useSelector(selectPresentPlayers);
	const pokedBy = useSelector(selectPokedBy);

	if (players.length === 0) {
		return null;
	}

	return (
		<section className="players-section">
			<PlayerList players={players} pokedBy={pokedBy} />
		</section>
	);
};

export default PlayersSection;
