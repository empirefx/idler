import { useSelector } from "react-redux";
import { useUIVisibility } from "../../UIVisibilityContext";

import "../../../styles/sections/npc-section.css";
import NPCList from "../list/NPCList";
import {
	selectNPCsForCurrentPlace,
	selectAllNPCs,
} from "../../../store/slices/npcSlice";

const NPCSection = () => {
	const npcs = useSelector(selectNPCsForCurrentPlace);
	const _allNpcs = useSelector(selectAllNPCs);
	const { openNPCDialog, npcSection } = useUIVisibility();

	const handleNPCClick = (npcId) => {
		openNPCDialog(npcId);
	};

	if (npcs.length === 0 || !npcSection) {
		return null;
	}
	return (
		<section className="npc-section">
			<div className="npc-section-content">
				<div className="npcs-grid">
					<NPCList npcs={npcs} onNPCClick={handleNPCClick} />
				</div>
			</div>
		</section>
	);
};

export default NPCSection;
