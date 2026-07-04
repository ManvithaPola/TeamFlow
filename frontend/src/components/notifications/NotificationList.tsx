import { useNotifications } from "../../hooks/useNotifications";

import NotificationCard from "./NotificationCard";
import EmptyNotifications from "./EmptyNotifications";

const NotificationList = () => {
  const {
    notifications,
    loading,
    markAsRead,
    deleteNotification,
  } = useNotifications();

  if (loading) {
    return (
      <p className="text-slate-500">
        Loading...
      </p>
    );
  }

  if (
    notifications.length === 0
  ) {
    return (
      <EmptyNotifications />
    );
  }

  return (
    <div className="space-y-5">
      {notifications.map(
        (
          notification,
        ) => (
          <NotificationCard
            key={
              notification.id
            }
            notification={
              notification
            }
            onRead={
              markAsRead
            }
            onDelete={
              deleteNotification
            }
          />
        ),
      )}
    </div>
  );
};

export default NotificationList;