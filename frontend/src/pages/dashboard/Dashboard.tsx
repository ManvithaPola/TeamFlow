// ============================================
// 📄 src/pages/dashboard/Dashboard.tsx
// ============================================

import {
  FolderKanban,
  ListTodo,
  FileWarning,
  Bell,
  RefreshCw,
} from "lucide-react";

import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatCard from "../../components/dashboard/StatCard";
import TaskChart from "../../components/dashboard/TaskChart";
import ProjectChart from "../../components/dashboard/ProjectChart";
import ActivityTable from "../../components/dashboard/ActivityTable";
import RecentNotifications from "../../components/dashboard/RecentNotifications";

import { useDashboard } from "../../hooks/useDashboard";

const Dashboard = () => {
  const {
    dashboard,
    loading,
    error,
    refresh,
  } = useDashboard();

  // ============================================
  // Loading State
  // ============================================

  if (loading) {
    return (
      <div className="space-y-6 p-6">

        <div className="h-44 animate-pulse rounded-3xl bg-slate-200" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

          {[1, 2, 3, 4].map((item) => (

            <div
              key={item}
              className="h-36 animate-pulse rounded-2xl bg-slate-200"
            />

          ))}

        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />

          <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />

        </div>

      </div>
    );
  }

  // ============================================
  // Error State
  // ============================================

  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-5">

        <h2 className="text-2xl font-semibold text-slate-700">
          {error}
        </h2>

        <button
          onClick={refresh}
          className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-white hover:bg-violet-700"
        >
          <RefreshCw size={18} />

          Retry

        </button>

      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="space-y-8 p-6">

      {/* ============================================
          Welcome Banner
      ============================================ */}

      <WelcomeBanner />

      {/* ============================================
          Statistics
      ============================================ */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Projects"
          value={dashboard.stats.projects}
          subtitle="Total Projects"
          icon={FolderKanban}
          color="#7C3AED"
        />

        <StatCard
          title="Tasks"
          value={dashboard.stats.tasks}
          subtitle="Active Tasks"
          icon={ListTodo}
          color="#2563EB"
        />

        <StatCard
          title="Pending RCA"
          value={dashboard.stats.pendingRCA}
          subtitle="Awaiting Review"
          icon={FileWarning}
          color="#F97316"
        />

        <StatCard
          title="Notifications"
          value={dashboard.stats.notifications}
          subtitle="Unread Notifications"
          icon={Bell}
          color="#10B981"
        />

      </div>

      {/* ============================================
          Charts
      ============================================ */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <TaskChart
          data={dashboard.taskStatus}
        />

        <ProjectChart
          data={dashboard.projectProgress}
        />

      </div>

      {/* ============================================
          Bottom Section
      ============================================ */}

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-3">

        <div className="2xl:col-span-2">

          <ActivityTable
            activities={dashboard.recentActivity}
          />

        </div>

        <div>

          <RecentNotifications
            notifications={dashboard.notifications}
          />

        </div>

      </div>

    </div>
  );
};

export default Dashboard;