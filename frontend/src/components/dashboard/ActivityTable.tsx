// ============================================
// 📄 src/components/dashboard/ActivityTable.tsx
// ============================================
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  Search,
  Filter,
  Download,
  PlusCircle,
  Pencil,
  Trash2,
  Eye,
  CheckCircle2,
  BadgeCheck,
  Inbox,
} from "lucide-react";
import type { ActivityLog } from "../../types/dashboard.types";

interface ActivityTableProps {
  activities: ActivityLog[];
}

interface ActionStyle {
  bg: string;
  text: string;
  icon: typeof PlusCircle;
}

// Design-system action → icon/color mapping.
const getActionStyle = (action: string): ActionStyle => {
  const key = action.toUpperCase();

  if (key.includes("DELETE")) {
    return { bg: "bg-red-50", text: "text-red-600", icon: Trash2 };
  }
  if (key.includes("CREATE") || key.includes("ADD")) {
    return { bg: "bg-emerald-50", text: "text-emerald-600", icon: PlusCircle };
  }
  if (key.includes("EDIT") || key.includes("UPDATE")) {
    return { bg: "bg-amber-50", text: "text-amber-600", icon: Pencil };
  }
  if (key.includes("REVIEW")) {
    return { bg: "bg-blue-50", text: "text-blue-600", icon: Eye };
  }
  if (key.includes("APPROVE") || key.includes("COMPLETE") || key.includes("RESOLVE")) {
    return { bg: "bg-violet-50", text: "text-[#5B21B6]", icon: CheckCircle2 };
  }
  return { bg: "bg-slate-100", text: "text-slate-600", icon: BadgeCheck };
};

// Status pill derived from the same action label — no new prop required.
type StatusKind = "success" | "warning" | "error" | "info";

const STATUS_STYLES: Record<StatusKind, string> = {
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  error: "bg-red-50 text-red-600",
  info: "bg-blue-50 text-blue-600",
};

const getStatusKind = (action: string): StatusKind => {
  const key = action.toUpperCase();
  if (key.includes("DELETE")) return "error";
  if (key.includes("EDIT") || key.includes("UPDATE") || key.includes("REVIEW")) return "warning";
  if (key.includes("APPROVE") || key.includes("COMPLETE") || key.includes("RESOLVE")) return "success";
  return "info";
};

// Entity badge coloring.
const ENTITY_STYLES: Record<string, string> = {
  project: "bg-violet-50 text-[#5B21B6]",
  task: "bg-blue-50 text-blue-600",
  rca: "bg-amber-50 text-amber-600",
  notification: "bg-slate-100 text-slate-600",
};

const getEntityStyle = (entity: string) =>
  ENTITY_STYLES[entity.trim().toLowerCase()] ?? "bg-slate-100 text-slate-600";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

// Relative time formatting derived from the existing `createdAt` field.
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

const ActivityTable = ({ activities }: ActivityTableProps) => {
  // Local UI-only state — filters/searches the existing `activities` array
  // client-side. Does not alter props, add API calls, or change data shape.
  const [query, setQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("All");

  const actionOptions = useMemo(() => {
    const unique = new Set(activities.map((a) => a.action));
    return ["All", ...Array.from(unique)];
  }, [activities]);

  const filtered = useMemo(() => {
    return activities.filter((activity) => {
      const matchesFilter = actionFilter === "All" || activity.action === actionFilter;
      const matchesQuery =
        query.trim() === "" ||
        [activity.user.name, activity.action, activity.entity, activity.description]
          .join(" ")
          .toLowerCase()
          .includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [activities, actionFilter, query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E5E7EB] px-6 py-5">
        <div>
          <h2
            className="text-base font-semibold text-[#111827]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Recent Activity
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Latest actions across your workspace
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search activity"
              aria-label="Search activity"
              className="w-40 rounded-lg border border-[#E5E7EB] bg-white py-1.5 pl-8 pr-2.5 text-xs text-[#111827] placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6] focus-visible:ring-offset-1 sm:w-48"
            />
          </div>

          <div className="relative">
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              aria-label="Filter by action"
              className="appearance-none rounded-lg border border-[#E5E7EB] bg-white py-1.5 pl-8 pr-3 text-xs font-medium text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6] focus-visible:ring-offset-1"
            >
              {actionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Filter size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <button
            type="button"
            aria-label="Export activity"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-slate-500 transition-colors duration-150 hover:bg-slate-50 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6] focus-visible:ring-offset-1"
          >
            <Download size={15} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F8FAFC]">
            <Inbox size={26} className="text-slate-300" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#111827]">No recent activity</p>
            <p className="mt-1 text-xs text-slate-500">Everything looks quiet today.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="min-w-full">
              <thead className="sticky top-0 z-[1] bg-white">
                <tr className="border-b border-[#E5E7EB]">
                  {["User", "Action", "Entity", "Date", "Status"].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.map((activity) => {
                  const style = getActionStyle(activity.action);
                  const ActionIcon = style.icon;
                  const statusKind = getStatusKind(activity.action);

                  return (
                    <tr
                      key={activity.id}
                      className="border-b border-[#F1F5F9] transition-colors last:border-none hover:bg-[#F8FAFC]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-semibold text-[#5B21B6]">
                            {getInitials(activity.user.name)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#111827]">
                              {activity.user.name}
                            </p>
                            <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                              {activity.user.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${style.bg} ${style.text}`}
                        >
                          <ActionIcon size={12} />
                          {activity.action}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${getEntityStyle(
                            activity.entity
                          )}`}
                        >
                          {activity.entity}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Clock3 size={13} />
                          {getRelativeTime(activity.createdAt)}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${STATUS_STYLES[statusKind]}`}
                        >
                          {statusKind}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile card layout */}
          <div className="divide-y divide-[#F1F5F9] md:hidden">
            {filtered.map((activity) => {
              const style = getActionStyle(activity.action);
              const ActionIcon = style.icon;
              const statusKind = getStatusKind(activity.action);

              return (
                <div key={activity.id} className="flex flex-col gap-3 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-xs font-semibold text-[#5B21B6]">
                        {getInitials(activity.user.name)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111827]">{activity.user.name}</p>
                        <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                          {activity.user.role}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium capitalize ${STATUS_STYLES[statusKind]}`}
                    >
                      {statusKind}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600">{activity.description}</p>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${style.bg} ${style.text}`}
                    >
                      <ActionIcon size={12} />
                      {activity.action}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${getEntityStyle(
                        activity.entity
                      )}`}
                    >
                      {activity.entity}
                    </span>
                    <span className="ml-auto flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock3 size={13} />
                      {getRelativeTime(activity.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ActivityTable;