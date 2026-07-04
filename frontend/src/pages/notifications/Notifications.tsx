import { Bell } from "lucide-react";

import { useNotifications } from "../../hooks/useNotifications";

import NotificationList from "../../components/notifications/NotificationList";

const Notifications = () => {
  const {
    unreadCount,
    markAllAsRead,
    notifications,
  } = useNotifications();

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Notifications
          </h1>

          <p className="mt-2 text-slate-500">
            Stay updated with your latest project activities.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
            "
          >
            <Bell
              size={18}
              className="text-violet-600"
            />

            <span className="font-medium">
              {unreadCount} Unread
            </span>
          </div>

          <button
            onClick={markAllAsRead}
            disabled={
              unreadCount === 0
            }
            className="
              rounded-xl
              bg-[#5B21B6]
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-[#4C1D95]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Mark All Read
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-3 gap-6">
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
          "
        >
          <p className="text-sm text-slate-500">
            Total
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {notifications.length}
          </h2>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
          "
        >
          <p className="text-sm text-slate-500">
            Unread
          </p>

          <h2 className="mt-2 text-3xl font-bold text-violet-600">
            {unreadCount}
          </h2>
        </div>

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-6
          "
        >
          <p className="text-sm text-slate-500">
            Read
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {notifications.length -
              unreadCount}
          </h2>
        </div>
      </div>

      {/* Notification List */}

      <NotificationList />
    </div>
  );
};

export default Notifications;