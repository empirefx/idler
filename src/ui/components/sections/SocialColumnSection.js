import NPCSection from "./NPCSection";
import PlayersSection from "./PlayersSection";
import "../../../styles/sections/social-column-section.css";

const SocialColumnSection = () => (
	<div className="social-column">
		<NPCSection />
		<PlayersSection />
	</div>
);

export default SocialColumnSection;
