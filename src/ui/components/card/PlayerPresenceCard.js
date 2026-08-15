import { poke } from "../../../store/ws";

const AVATAR_PLACEHOLDER = "https://placehold.net/avatar.svg";

const PlayerPresenceCard = ({ player, poked, animKey }) => {
	const { nickname, level } = player;

	const handlePoke = (event) => {
		event.stopPropagation();
		poke(nickname);
	};

	return (
		<div className={`player-presence-card${poked ? " poked" : ""}`}>
			<img
				className="player-presence-avatar"
				key={poked ? animKey : "avatar"}
				src={AVATAR_PLACEHOLDER}
				alt={nickname}
			/>
			<div className="player-presence-info">
				<div className="player-presence-info-header">
					<span className="player-presence-nickname">{nickname}</span>
					<span className="player-presence-level">Level {level}</span>
				</div>
				<button type="button" className="poke-button" onClick={handlePoke}>
					Poke
				</button>
			</div>
		</div>
	);
};

export default PlayerPresenceCard;
