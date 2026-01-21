import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeNotification } from '../../../store/slices/notificationSlice';
import { NOTIFICATION_TYPES } from '../../../store/slices/notificationSlice';
import '../../../styles/sections/notifications.css';

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
    const baseClass = 'notification';
    const typeClass = `notification-${type}`;
    return `${baseClass} ${typeClass}`;
  };

  return (
    <div className={getNotificationClass()} onClick={handleDismiss}>
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={handleDismiss} aria-label="Close">
        ×
      </button>
    </div>
  );
};

export default Notification;