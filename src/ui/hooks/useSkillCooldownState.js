import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import {
	selectActiveCooldowns,
	selectPausedCooldowns,
} from "../../store/slices/playerSlice";

export const useSkillCooldownState = () => {
	const activeCooldowns = useSelector(selectActiveCooldowns, shallowEqual);
	const pausedCooldowns = useSelector(selectPausedCooldowns, shallowEqual);

	const isCooldownPaused = Object.keys(pausedCooldowns).length > 0;

	return { activeCooldowns, pausedCooldowns, isCooldownPaused };
};

export default useSkillCooldownState;
