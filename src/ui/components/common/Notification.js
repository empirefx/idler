import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../../store/slices/notificationSlice";
import "../../../styles/sections/notifications.css";

const Notification = ({ notification }) => {
	const dispatch = useDispatch();
	const { id, message, type } = notification;

	useEffect(() => {
		// Auto-dismiss after 5 seconds
		const timer = setTimeout(() => {
			dispatch(removeNotification(id));
		}, 5000);

		return () => clearTimeout(timer);
	}, [dispatch, id]);

	const handleDismiss = () => {
		dispatch(removeNotification(id));
	};

	const getNotificationClass = () => {
		const baseClass = "notification";
		const typeClass = `notification-${type}`;
		return `${baseClass} ${typeClass}`;
	};

	return (
		<div
			className={getNotificationClass()}
			onClick={handleDismiss}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleDismiss();
				}
			}}
			role="alert"
			tabIndex={0}
		>
			<span className="notification-message">{message}</span>
			<button
				className="notification-close"
				onClick={handleDismiss}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						handleDismiss();
					}
				}}
				aria-label="Close"
				type="button"
			>
				×
			</button>
		</div>
	);
};

export default Notification;
