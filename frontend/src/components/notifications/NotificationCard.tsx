import {
  Bell,
  Check,
  Trash2,
} from "lucide-react";

import type { Notification } from "../../services/notification.service";

interface Props {
  notification: Notification;

  onRead: (
    id: string,
  ) => Promise<void>;

  onDelete: (
    id: string,
  ) => Promise<void>;
}

const NotificationCard = ({
  notification,
  onRead,
  onDelete,
}: Props) => {
  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        transition

        ${
          notification.isRead
            ? "border-slate-200 bg-white"
            : "border-violet-200 bg-violet-50"
        }
      `}
    >
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div
            className="
              rounded-xl
              bg-violet-100
              p-3
              text-violet-700
            "
          >
            <Bell size={18} />
          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              {notification.title}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {notification.message}
            </p>

            <p className="mt-3 text-xs text-slate-400">
              {new Date(
                notification.createdAt,
              ).toLocaleString()}
            </p>

          </div>

        </div>

        <div className="flex gap-2">

          {!notification.isRead && (
            <button
              onClick={() =>
                onRead(
                  notification.id,
                )
              }
              className="
                rounded-lg
                border
                border-green-200
                p-2
                text-green-600
                hover:bg-green-50
              "
            >
              <Check size={18} />
            </button>
          )}

          <button
            onClick={() =>
              onDelete(
                notification.id,
              )
            }
            className="
              rounded-lg
              border
              border-red-200
              p-2
              text-red-600
              hover:bg-red-50
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default NotificationCard;