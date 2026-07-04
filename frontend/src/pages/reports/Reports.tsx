// ============================================
// 📄 src/pages/reports/Reports.tsx
// ============================================

import { RefreshCw } from "lucide-react";
import { useState } from "react";
import Filters from "../../components/analytics/Filters";
import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import StatsGrid from "../../components/analytics/StatsGrid";
import TaskStatusChart from "../../components/analytics/TaskStatusChart";
import TaskPriorityChart from "../../components/analytics/TaskPriorityChart";
import ProjectStatusChart from "../../components/analytics/ProjectStatusChart";
import RCAStatusChart from "../../components/analytics/RCAStatusChart";
import { useAnalytics } from "../../hooks/useAnalytics";
import ProductivityTable from "../../components/analytics/ProductivityTable";
import ExportButtons from "../../components/analytics/ExportButtons";
const Reports = () => {
  const { analytics, loading, error, refresh } = useAnalytics();
  const [project, setProject] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");
  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="h-24 animate-pulse rounded-3xl bg-slate-200" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-3xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  // ==========================================
  // Error
  // ==========================================

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
        <h2 className="text-xl font-semibold text-slate-700">{error}</h2>

        <button
          onClick={refresh}
          className="flex items-center gap-2 rounded-xl bg-[#5B21B6] px-5 py-3 text-white"
        >
          <RefreshCw size={18} />
          Retry
        </button>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  return (
    <div className="space-y-8 p-6">
      <AnalyticsHeader />
      <Filters
        project={project}
        setProject={setProject}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />

      <StatsGrid overview={analytics.overview} />

      {/* ==========================================
        Charts
    ========================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TaskStatusChart data={analytics.taskStatus} />

        <TaskPriorityChart data={analytics.taskPriority} />

        <ProjectStatusChart data={analytics.projectStatus} />

        <RCAStatusChart data={analytics.rcaStatus} />
      </div>
      <ProductivityTable data={analytics.productivity} />
      <ExportButtons analytics={analytics} />
    </div>
  );
};

export default Reports;
