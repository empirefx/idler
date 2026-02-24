import { createSlice, createSelector, nanoid } from "@reduxjs/toolkit";

// Notification types
export const NOTIFICATION_TYPES = {
	ERROR: "error",
	WARNING: "warning",
	INFO: "info",
	SUCCESS: "success",
};

const initialState = {
	notifications: [],
	maxVisible: 3,
};

const notificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		addNotification: {
			reducer: (state, action) => {
				const { id, message, type, timestamp } = action.payload;
				state.notifications.push({
					id,
					message,
					type: type || NOTIFICATION_TYPES.INFO,
					timestamp,
					visible: true,
				});

				// Keep only maxVisible notifications at the top
				if (state.notifications.length > state.maxVisible) {
					// Mark excess notifications as not visible but keep them in the array
					const visibleCount = state.notifications.filter(
						(n) => n.visible,
					).length;
					if (visibleCount > state.maxVisible) {
						let hiddenCount = visibleCount - state.maxVisible;
						// Hide oldest notifications
						for (
							let i = 0;
							i < state.notifications.length && hiddenCount > 0;
							i++
						) {
							if (state.notifications[i].visible) {
								state.notifications[i].visible = false;
								hiddenCount--;
							}
						}
					}
				}
			},
			prepare: (message, type = NOTIFICATION_TYPES.INFO) => {
				return {
					payload: {
						id: nanoid(),
						message,
						type,
						timestamp: Date.now(),
					},
				};
			},
		},

		removeNotification: (state, action) => {
			const id = action.payload;
			state.notifications = state.notifications.filter(
				(notification) => notification.id !== id,
			);
		},

		clearNotifications: (state) => {
			state.notifications = [];
		},
	},
});

export const { addNotification, removeNotification, clearNotifications } =
	notificationSlice.actions;

// Selector to get visible notifications only (memoized)
export const selectVisibleNotifications = createSelector(
	[(state) => state.notifications.notifications, (state) => state.notifications.maxVisible],
	(notifications, maxVisible) => notifications.filter((n) => n.visible).slice(-maxVisible),
);

export default notificationSlice.reducer;
