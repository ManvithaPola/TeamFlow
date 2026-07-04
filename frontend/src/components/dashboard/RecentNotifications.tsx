// ============================================
// 📄 src/components/dashboard/RecentNotifications.tsx
// ============================================
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellRing,
  CheckSquare,
  FolderKanban,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Check,
  ChevronRight,
} from "lucide-react";
import type { DashboardNotification } from "../../types/dashboard.types";

interface RecentNotificationsProps {
  notifications: DashboardNotification[];
}

interface TypeStyle {
  bg: string;
  text: string;
  icon: typeof CheckSquare;
}

// Design-system type → icon/color mapping.
const TYPE_STYLES: Record<string, TypeStyle> = {
  task: { bg: "bg-blue-50", text: "text-blue-600", icon: CheckSquare },
  project: { bg: "bg-violet-50", text: "text-[#5B21B6]", icon: FolderKanban },
  rca: { bg: "bg-amber-50", text: "text-amber-600", icon: AlertTriangle },
  success: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    icon: CheckCircle2,
  },
  warning: { bg: "bg-orange-50", text: "text-orange-600", icon: AlertCircle },
  error: { bg: "bg-red-50", text: "text-red-600", icon: XCircle },
};

const DEFAULT_TYPE_STYLE: TypeStyle = {
  bg: "bg-slate-100",
  text: "text-slate-600",
  icon: Bell,
};

const getTypeStyle = (type: string) =>
  TYPE_STYLES[type.trim().toLowerCase()] ?? DEFAULT_TYPE_STYLE;

// Relative time derived from the existing `createdAt` field.
const getRelativeTime = (dateInput: string | Date) => {
  const date = new Date(dateInput);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.round(diffMs / 60000);
  const diffHr = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHr / 24);

  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min${diffMin === 1 ? "" : "s"} ago`;
  if (diffHr < 24) return `${diffHr} hr${diffHr === 1 ? "" : "s"} ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay} days ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const RecentNotifications = ({ notifications }: RecentNotificationsProps) => {
  // Local, visual-only "read" overlay. There's no onMarkAllRead / onMarkRead
  // callback prop on this component, so this does not call an API or mutate
  // `notifications` — it only affects how items render in this session.
  // Swap this out for a real callback prop whenever the API is wired up.
  const [locallyRead, setLocallyRead] = useState<Set<string>>(new Set());

  const isRead = (n: DashboardNotification) =>
    n.isRead || locallyRead.has(n.id);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !isRead(n)).length,
    [notifications, locallyRead],
  );

  const handleMarkAllRead = () => {
    setLocallyRead(new Set(notifications.map((n) => n.id)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex h-full flex-col overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-[#E5E7EB] px-6 py-5">
        <div className="flex items-center gap-2.5">
          <h2
            className="text-base font-semibold text-[#111827]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Notifications
          </h2>
          {unreadCount > 0 && (
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#5B21B6] px-1.5 text-[11px] font-semibold text-white">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="flex items-center gap-1 text-xs font-medium text-[#5B21B6] transition-colors duration-150 hover:text-[#4C1D95] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6] focus-visible:ring-offset-1 rounded"
            >
              <Check size={13} />
              Mark all read
            </button>
          )}
          <button
            type="button"
            className="text-xs font-medium text-slate-500 transition-colors duration-150 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6] focus-visible:ring-offset-1 rounded"
          >
            View all
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8FAFC]">
              <BellRing size={26} className="text-slate-300" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#111827]">
                You're all caught up
              </p>
              <p className="mt-1 text-xs text-slate-500">
                No unread notifications
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {notifications.map((notification) => {
              const read = isRead(notification);
              const style = getTypeStyle(notification.type);
              const TypeIcon = style.icon;

              return (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`group flex items-start gap-3 border-b border-[#F1F5F9] px-6 py-4 transition-colors duration-150 last:border-none hover:bg-[#F8FAFC] ${
                    read ? "bg-white" : "bg-[#FAF9FF]"
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.bg}`}
                  >
                    <TypeIcon size={16} className={style.text} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3
                        className={`text-sm ${
                          read
                            ? "font-medium text-slate-600"
                            : "font-semibold text-[#111827]"
                        }`}
                      >
                        {notification.title}
                      </h3>
                      <span className="mt-0.5 shrink-0 text-[11px] text-slate-400">
                        {getRelativeTime(notification.createdAt)}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-xs leading-relaxed ${
                        read ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {notification.message}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${style.bg} ${style.text}`}
                      >
                        {notification.type}
                      </span>

                      {!read && (
                        <button
                          type="button"
                          onClick={() =>
                            setLocallyRead((prev) =>
                              new Set(prev).add(notification.id),
                            )
                          }
                          className="text-[11px] font-medium text-[#5B21B6] opacity-0 transition-opacity duration-150 hover:text-[#4C1D95] focus-visible:opacity-100 group-hover:opacity-100"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>

                  {!read && (
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#5B21B6]" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      
    </motion.div>
  );
};

export default RecentNotifications;
