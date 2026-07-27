// @vitest-environment jsdom
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import NotificationContainer from "../src/ui/components/common/NotificationContainer";
import notificationReducer from "../src/store/slices/notificationSlice";
import {
  addNotification,
  NOTIFICATION_TYPES,
} from "../src/store/slices/notificationSlice";

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
});
