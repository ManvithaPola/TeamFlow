// ============================================
// 📄 src/components/projects/ProjectStatusBadge.tsx
// ============================================

import type { ProjectStatus } from "../../types/project.types";

interface Props {
  status: ProjectStatus;
}

const styles: Record<ProjectStatus, { badge: string; dot: string }> = {
  PLANNING: {
    badge: "bg-violet-50 text-violet-700 border-violet-200",
    dot: "bg-violet-500",
  },
  ACTIVE: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
  },
  ON_HOLD: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
  },
  COMPLETED: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
  },
  ARCHIVED: {
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
  },
};

const ProjectStatusBadge = ({ status }: Props) => {
  const { badge, dot } = styles[status];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full border
        px-3 py-1 text-xs font-semibold tracking-wide
        transition-all duration-200
        hover:shadow-sm
        ${badge}
      `}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {status.replace("_", " ")}
    </span>
  );
};

export default ProjectStatusBadge;