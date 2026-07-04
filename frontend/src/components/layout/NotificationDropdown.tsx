// ============================================
// 📄 src/components/layout/NotificationDropdown.tsx
// ============================================

import { Bell, CheckCheck, Trash2 } from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { getRelativeTime } from "../../utils/time";
import { useNotifications } from "../../hooks/useNotifications";
import { COLORS } from "../../constants/colors";
import { useNavigate } from "react-router-dom";
const NotificationDropdown = () => {
  const {
    notifications,

    unreadCount,

    loading,

    markAsRead,

    markAllAsRead,

    deleteNotification,
  } = useNotifications();

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", close);

    return () => window.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Notification Button */}

      <button
        onClick={() => setOpen(!open)}
        className="
          relative
          rounded-xl
          p-2.5
          text-slate-500
          transition-all
          duration-200
          hover:scale-105
          hover:bg-slate-100
          hover:text-slate-900
          active:scale-95
        "
      >
        <Bell size={22} />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -right-1
              -top-1
              flex
              h-5
              min-w-[20px]
              animate-pulse
              items-center
              justify-center
              rounded-full
              bg-red-500
              px-1
              text-[10px]
              font-bold
              text-white
              ring-2
              ring-white
            "
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-4
            w-[380px]
            origin-top-right
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white/95
            shadow-xl
            shadow-slate-900/10
            backdrop-blur-xl
            backdrop-saturate-150
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-100
              px-5
              py-4
            "
          >
            <div>
              <h3
                className="
                  font-semibold
                  text-slate-800
                "
              >
                Notifications
              </h3>

              <p
                className="
                  text-xs
                  text-slate-400
                "
              >
                {unreadCount} unread
              </p>
            </div>

            <button
              onClick={markAllAsRead}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                px-3
                py-2
                text-xs
                font-medium
                transition-colors
                duration-150
                hover:bg-slate-100
              "
              style={{ color: COLORS.primary }}
            >
              <CheckCheck size={16} />
              Read All
            </button>
          </div>

          {/* Notification List */}

          <div
            className="
              max-h-[420px]
              overflow-y-auto
            "
          >
            {" "}
            {loading ? (
              <div className="p-8 text-center text-sm text-slate-400">
                Loading notifications...
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={40} className="mx-auto mb-3 text-slate-300" />

                <p className="font-medium text-slate-600">No notifications</p>

                <p className="mt-1 text-sm text-slate-400">
                  You're all caught up 🎉
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    group
                    border-b
                    border-slate-100
                    p-4
                    transition-colors
                    duration-150
                    hover:bg-slate-50
                    ${notification.isRead ? "" : "bg-[var(--unread-bg)]"}
                  `}
                  style={
                    !notification.isRead
                      ? ({
                          "--unread-bg": `${COLORS.accent}30`,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="flex-1 cursor-pointer"
                      onClick={() => {
                        if (!notification.isRead) {
                          markAsRead(notification.id);
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {!notification.isRead && (
                          <span
                            className="h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: COLORS.primary }}
                          />
                        )}
                        <h4 className="font-medium text-slate-800">
                          {notification.title}
                        </h4>
                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {notification.message}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {getRelativeTime(notification.createdAt)}
                      </p>
                    </div>

                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="
                        rounded-lg
                        p-2
                        text-slate-400
                        opacity-0
                        transition-all
                        duration-150
                        hover:bg-red-50
                        hover:text-red-500
                        group-hover:opacity-100
                      "
                      title="Delete Notification"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}

          <div
            className="
              border-t
              border-slate-100
              p-4
            "
          >
            <button
              onClick={() => {
                setOpen(false);
                navigate("/notifications");
              }}
              className="
    w-full
    rounded-xl
    px-4
    py-3
    text-sm
    font-medium
    text-white
    shadow-sm
    transition-all
    duration-200
    hover:shadow-md
    hover:brightness-110
    active:scale-[0.98]
  "
              style={{ backgroundColor: COLORS.primary }}
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
