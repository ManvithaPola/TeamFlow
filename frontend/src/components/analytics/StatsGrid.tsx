// ============================================
// 📄 StatsGrid.tsx
// ============================================

import {
  FolderKanban,
  ListTodo,
  FileWarning,
  AlertTriangle,
} from "lucide-react";

import type {
  Overview,
} from "../../types/analytics.types";

import StatCard from "./StatCard";

interface Props {
  overview: Overview;
}

const StatsGrid = ({
  overview,
}: Props) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        md:grid-cols-2
        xl:grid-cols-4
      "
    >
      <StatCard
        title="Projects"
        value={overview.totalProjects}
        icon={FolderKanban}
        color="#5B21B6"
      />

      <StatCard
        title="Tasks"
        value={overview.totalTasks}
        icon={ListTodo}
        color="#2563EB"
      />

      <StatCard
        title="Open RCAs"
        value={overview.openRCAs}
        icon={FileWarning}
        color="#EA580C"
      />

      <StatCard
        title="Overdue Tasks"
        value={overview.overdueTasks}
        icon={AlertTriangle}
        color="#DC2626"
      />
    </div>
  );
};

export default StatsGrid;