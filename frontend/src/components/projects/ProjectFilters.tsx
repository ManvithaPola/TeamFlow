// ============================================
// 📄 src/components/projects/ProjectFilters.tsx
// ============================================

import { Filter, RotateCcw, ChevronDown } from "lucide-react";

import { ProjectStatus } from "../../types/project.types";

interface Props {
  status: ProjectStatus | "ALL";
  sortBy: string;

  onStatusChange: (status: ProjectStatus | "ALL") => void;
  onSortChange: (value: string) => void;

  onReset: () => void;
}

const selectClasses = `
  h-11
  appearance-none
  rounded-xl
  border
  border-[#E5E7EB]
  bg-white
  py-2.5
  pl-4
  pr-9
  font-['Inter']
  text-sm
  text-[#111827]
  outline-none
  transition-all
  duration-200
  ease-out
  hover:border-slate-300
  focus:border-[#5B21B6]
  focus:ring-4
  focus:ring-[#DDD6FE]/60
`;

const ProjectFilters = ({
  status,
  sortBy,
  onStatusChange,
  onSortChange,
  onReset,
}: Props) => {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        gap-3
        rounded-2xl
        border
        border-[#E5E7EB]
        bg-white
        p-5
        shadow-sm
      "
    >
      {/* Heading */}

      <div className="flex items-center gap-2 pr-1 text-[#111827]">
        <Filter size={17} className="text-[#5B21B6]" />
        <span className="font-['Inter'] text-sm font-semibold">
          Filters
        </span>
      </div>

      {/* Status */}

      <div className="relative">
        <select
          value={status}
          aria-label="Filter by status"
          onChange={(e) =>
            onStatusChange(e.target.value as ProjectStatus | "ALL")
          }
          className={selectClasses}
        >
          <option value="ALL">All Status</option>
          <option value="PLANNING">Planning</option>
          <option value="ACTIVE">Active</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="COMPLETED">Completed</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <ChevronDown
          size={15}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />
      </div>

      {/* Sort */}

      <div className="relative">
        <select
          value={sortBy}
          aria-label="Sort projects"
          onChange={(e) => onSortChange(e.target.value)}
          className={selectClasses}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
        </select>

        <ChevronDown
          size={15}
          className="
            pointer-events-none
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />
      </div>

      {/* Reset */}

      <button
        type="button"
        onClick={onReset}
        className="
          ml-auto
          inline-flex
          items-center
          gap-2
          rounded-xl
          border
          border-[#E5E7EB]
          px-4
          py-2.5
          font-['Inter']
          text-sm
          font-medium
          text-slate-600
          transition-all
          duration-150
          hover:-translate-y-0.5
          hover:border-slate-300
          hover:bg-[#F8FAFC]
          hover:text-[#111827]
          focus:outline-none
          focus-visible:ring-4
          focus-visible:ring-[#DDD6FE]/60
          active:translate-y-0
        "
      >
        <RotateCcw size={15} />
        Reset
      </button>
    </div>
  );
};

export default ProjectFilters;