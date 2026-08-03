import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { skillsCatalog } from "../../../../shared/data/skillsData";
import { selectPlayer } from "../../../store/slices/playerSlice";

const BuffBar = () => {
	const player = useSelector(selectPlayer);
	const [now, setNow] = useState(Date.now());

	useEffect(() => {
		const interval = setInterval(() => setNow(Date.now()), 250);
		return () => clearInterval(interval);
	}, []);

	const activeBuffs = (player?.activeBuffs || []).filter(
		(buff) => !buff.expiresAt || buff.expiresAt > now,
	);

	const buffSlots = activeBuffs
		.map((buff) => {
			const skill = skillsCatalog[buff.skillId];
			if (!skill) return null;
			const remaining = buff.expiresAt
				? Math.max(0, Math.ceil((buff.expiresAt - now) / 1000))
				: 0;
			return {
				type: "buff",
				skillId: buff.skillId,
				name: skill.name,
				description: skill.description,
				remaining,
			};
		})
		.filter(Boolean);

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
				{buffSlots.map((slot) => (
					<div key={slot.skillId} className="buff-slot buff-slot--active">
						<div className="buff-icon-container">
							<div className="buff-icon">{slot.name.charAt(0)}</div>
							<div className="buff-duration">{slot.remaining}s</div>
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
