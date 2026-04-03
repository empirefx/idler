import { useSelector } from "react-redux";
import { selectPlayer } from "../../../store/slices/playerSlice";
import { skillsCatalog } from "../../../data/skillsData";

const BuffBar = () => {
	const player = useSelector(selectPlayer);

	const activeBuffs = player?.activeBuffs || [];

	const buffSlots = [];

	activeBuffs.forEach((buff) => {
		const skill = skillsCatalog[buff.skillId];
		if (skill) {
			buffSlots.push({
				type: "buff",
				skillId: buff.skillId,
				name: skill.name,
				description: skill.description,
				duration: buff.duration,
			});
		}
	});

	if (buffSlots.length === 0) {
		return (
			<div className="buff-bar buff-bar--empty">
				<div className="buff-bar-placeholder"></div>
			</div>
		);
	}

	return (
		<div className="buff-bar">
			<div className="buff-bar-slots">
				{buffSlots.map((slot, index) => (
					<div
						key={`${slot.skillId}-${index}`}
						className="buff-slot buff-slot--active"
					>
						<div className="buff-icon-container">
							<div className="buff-icon">{slot.name.charAt(0)}</div>
							<div className="buff-duration">{slot.duration}s</div>
						</div>
						<div className="tooltip">
							<strong>{slot.name}</strong>
							{slot.description}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default BuffBar;
