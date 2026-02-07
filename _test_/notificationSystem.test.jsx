import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import NotificationContainer from "../../src/ui/components/common/NotificationContainer";
import notificationReducer from "../../src/store/slices/notificationSlice";
import {
	addNotification,
	NOTIFICATION_TYPES,
} from "../../src/store/slices/notificationSlice";

// Test the notification system
const createTestStore = (initialState = {}) => {
	return configureStore({
		reducer: {
			notifications: notificationReducer,
		},
		preloadedState: {
			notifications: {
				notifications: [],
				maxVisible: 3,
				...initialState.notifications,
			},
		},
	});
};

describe("Notification System", () => {
	test("should render notification container with no notifications", () => {
		const store = createTestStore();

		render(
			<Provider store={store}>
				<NotificationContainer />
			</Provider>,
		);

		// Container should not render when no notifications
		expect(screen.queryByRole("alert")).not.toBeInTheDocument();
	});

	test("should render single notification", () => {
		const store = createTestStore();

		// Add a notification
		store.dispatch(
			addNotification("Test notification", NOTIFICATION_TYPES.INFO),
		);

		render(
			<Provider store={store}>
				<NotificationContainer />
			</Provider>,
		);

		// Should find the notification message
		expect(screen.getByText("Test notification")).toBeInTheDocument();
	});

	test("should render warning notification", () => {
		const store = createTestStore();

		// Add a warning notification (like weight limit)
		store.dispatch(
			addNotification(
				"Cannot carry more weight - inventory overweight!",
				NOTIFICATION_TYPES.WARNING,
			),
		);

		render(
			<Provider store={store}>
				<NotificationContainer />
			</Provider>,
		);

		// Should find the weight warning message
		expect(
			screen.getByText("Cannot carry more weight - inventory overweight!"),
		).toBeInTheDocument();
	});

	test("should render error notification", () => {
		const store = createTestStore();

		// Add an error notification (like inventory full)
		store.dispatch(
			addNotification(
				"Inventory is full - no more slots available!",
				NOTIFICATION_TYPES.WARNING,
			),
		);

		render(
			<Provider store={store}>
				<NotificationContainer />
			</Provider>,
		);

		// Should find the inventory full message
		expect(
			screen.getByText("Inventory is full - no more slots available!"),
		).toBeInTheDocument();
	});
});
