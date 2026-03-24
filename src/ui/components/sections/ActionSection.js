import SkillBar from "./SkillBar";
import ControlSection from "./ControlSection";
import PlayerEntitySection from "./PlayerEntitySection";

import "../../../styles/sections/action-section.css";

const ActionSection = ({ clearCache }) => {
	return (
		<section className="action-section">
			<PlayerEntitySection />
			<SkillBar />
			<ControlSection clearCache={clearCache} />
		</section>
	);
};

export default ActionSection;
