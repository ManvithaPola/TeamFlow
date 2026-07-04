// ============================================
// 📄 src/components/dashboard/TaskChart.tsx
// ============================================
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import type { TooltipProps } from "recharts";
import { motion } from "framer-motion";
import { Download, RefreshCw, ChevronDown } from "lucide-react";
import type { TaskStatusData } from "../../types/dashboard.types";

interface TaskChartProps {
  data: TaskStatusData[];
}

// Design-system status → color mapping. Falls back to a neutral tone
// for any status label that isn't one of the four known states.
const STATUS_COLORS: Record<string, string> = {
  todo: "#CBD5E1",
  "in progress": "#3B82F6",
  review: "#F59E0B",
  done: "#10B981",
};

const FALLBACK_COLOR = "#A78BFA";

const getStatusColor = (status: string) =>
  STATUS_COLORS[status.trim().toLowerCase()] ?? FALLBACK_COLOR;

const TIME_FILTERS = ["Today", "Week", "Month"] as const;
type TimeFilter = (typeof TIME_FILTERS)[number];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 shadow-lg shadow-slate-900/10">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p
        className="mt-1 text-sm font-semibold text-[#111827]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {payload[0].value} tasks
      </p>
    </div>
  );
};

const TaskChart = ({ data }: TaskChartProps) => {
  // UI-only state for the time filter — purely presentational,
  // does not alter props, data, or any API call.
  const [activeFilter, setActiveFilter] = useState<TimeFilter>("Week");
  const [filterOpen, setFilterOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Derived summary stats computed entirely from the existing `data` prop.
  const { total, completed, completionRate } = useMemo(() => {
    const totalCount = data.reduce((sum, item) => sum + item.count, 0);
    const completedCount = data
      .filter((item) => item.status.trim().toLowerCase() === "done")
      .reduce((sum, item) => sum + item.count, 0);
    const rate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return { total: totalCount, completed: completedCount, completionRate: rate };
  }, [data]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="rounded-[20px] border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-shadow duration-200 hover:shadow-[0_1px_2px_rgba(15,23,42,0.05),0_16px_36px_-12px_rgba(15,23,42,0.14)]"
    >
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2
            className="text-base font-semibold text-[#111827]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Task Status
          </h2>
          <p className="mt-1 text-xs text-slate-500">Distribution of tasks by status</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time filter dropdown — local UI state only */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={filterOpen}
              aria-label="Select time range"
              className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-xs font-medium text-[#111827] transition-colors duration-150 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6] focus-visible:ring-offset-1"
            >
              {activeFilter}
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform duration-150 ${
                  filterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {filterOpen && (
              <ul
                role="listbox"
                className="absolute right-0 z-10 mt-1.5 w-32 overflow-hidden rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg shadow-slate-900/10"
              >
                {TIME_FILTERS.map((filter) => (
                  <li key={filter}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={activeFilter === filter}
                      onClick={() => {
                        setActiveFilter(filter);
                        setFilterOpen(false);
                      }}
                      className={`block w-full px-3 py-1.5 text-left text-xs transition-colors duration-150 hover:bg-slate-50 ${
                        activeFilter === filter
                          ? "font-semibold text-[#5B21B6]"
                          : "text-[#111827]"
                      }`}
                    >
                      {filter}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            aria-label="Export chart"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-slate-500 transition-colors duration-150 hover:bg-slate-50 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6] focus-visible:ring-offset-1"
          >
            <Download size={15} />
          </button>

          <button
            type="button"
            aria-label="Refresh chart"
            onClick={handleRefresh}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] text-slate-500 transition-colors duration-150 hover:bg-slate-50 hover:text-[#111827] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B21B6] focus-visible:ring-offset-1"
          >
            <RefreshCw size={15} className={isRefreshing ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EEF1F5" />
          <XAxis
            dataKey="status"
            tick={{ fill: "#94A3B8", fontSize: 11, fontFamily: "Inter" }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: "#94A3B8", fontSize: 11, fontFamily: "Inter" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48} animationDuration={700}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getStatusColor(entry.status)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Total Tasks
          </p>
          <p
            className="mt-1 text-xl font-bold text-[#111827]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {total}
          </p>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Completed
          </p>
          <p
            className="mt-1 text-xl font-bold text-[#111827]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {completed}
          </p>
        </div>

        <div className="rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
            Completion Rate
          </p>
          <p
            className="mt-1 text-xl font-bold text-[#10B981]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {completionRate}%
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskChart;