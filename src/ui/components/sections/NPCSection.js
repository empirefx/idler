import { useSelector } from "react-redux";
import { useUIVisibility } from "../../UIVisibilityContext";

import "../../../styles/sections/npc-section.css";
import {
	selectAllNPCs,
	selectNPCsForCurrentPlace,
} from "../../../store/slices/npcSlice";
import NPCList from "../list/NPCList";

const NPCSection = () => {
	const npcs = useSelector(selectNPCsForCurrentPlace);
	const _allNpcs = useSelector(selectAllNPCs);
	const { openNPCDialog } = useUIVisibility();

	const handleNPCClick = (npcId) => {
		openNPCDialog(npcId);
	};

	if (npcs.length === 0) {
		return null;
	}
	return (
		<section className="npc-section">
			<NPCList npcs={npcs} onNPCClick={handleNPCClick} />
		</section>
	);
};

export default NPCSection;
