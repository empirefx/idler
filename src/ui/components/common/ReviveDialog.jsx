import { useSelector } from "react-redux";
import { selectIsDead } from "../../../store/slices/playerSlice";
import { revive } from "../../../store/ws";
import ConfirmAlert from "./ConfirmAlert";

const ReviveDialog = () => {
	const isDead = useSelector(selectIsDead);

	if (!isDead) return null;

	return (
		<ConfirmAlert
			open
			title="You died"
			message="You died. Revive?"
			variant="danger"
			confirmLabel="Revive"
			showCancel={false}
			onConfirm={revive}
			onCancel={() => {}}
		/>
	);
};

export default ReviveDialog;
