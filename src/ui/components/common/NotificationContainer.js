import { useSelector } from "react-redux";
import Notification from "./Notification";
import { selectVisibleNotifications } from "../../../store/slices/notificationSlice";
import "../../../styles/sections/notifications.css";

const NotificationContainer = () => {
	const notifications = useSelector(selectVisibleNotifications);

	if (notifications.length === 0) {
		return null;
	}

	return (
		<div className="notification-container">
			{notifications.map((notification) => (
				<Notification key={notification.id} notification={notification} />
			))}
		</div>
	);
};

export default NotificationContainer;
