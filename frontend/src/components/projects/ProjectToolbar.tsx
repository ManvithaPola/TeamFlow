// ============================================
// 📄 src/components/projects/ProjectToolbar.tsx
// ============================================
import {
  Search,
  LayoutGrid,
  List,
  Plus,
} from "lucide-react";
import type { ProjectStatus } from "../../types/project.types";
import { useNavigate } from "react-router-dom";

interface ProjectToolbarProps {
  projectCount?: number;

  search: string;
  onSearch: (value: string) => void;

  status: ProjectStatus | "ALL";
  onStatusChange: (status: ProjectStatus | "ALL") => void;

  sort: "newest" | "oldest" | "name";
  onSortChange: (sort: "newest" | "oldest" | "name") => void;

  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

const ProjectToolbar = ({
  projectCount,

  search,
  onSearch,

  status,
  onStatusChange,

  sort,
  onSortChange,

  view,
  onViewChange,
}: ProjectToolbarProps) => {
    const navigate = useNavigate();
  return (
    <div className="space-y-5">
      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-['Poppins'] text-[28px] font-bold leading-tight tracking-tight text-[#111827]">
              Projects
            </h1>

            {typeof projectCount === "number" && (
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-[#DDD6FE]
                  px-2.5
                  py-1
                  font-['Inter']
                  text-xs
                  font-semibold
                  text-[#5B21B6]
                "
              >
                {projectCount} total
              </span>
            )}
          </div>

          <p className="mt-1.5 font-['Inter'] text-sm text-[#64748B]">
            Manage projects, members, progress and collaboration.
          </p>
        </div>

        <button
          onClick={() => navigate("/projects/create")}
          type="button"
          aria-label="Create new project"
          className="
            group
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-b
            from-[#7C3AED]
            to-[#5B21B6]
            px-5
            py-3
            font-['Inter']
            text-sm
            font-medium
            text-white
            shadow-md
            shadow-[#5B21B6]/20
            transition-all
            duration-[180ms]
            ease-out
            hover:-translate-y-0.5
            hover:shadow-lg
            hover:shadow-[#5B21B6]/30
            active:scale-[0.98]
            active:translate-y-0
            focus:outline-none
            focus-visible:ring-4
            focus-visible:ring-[#DDD6FE]
          "
        >
          <Plus
            size={18}
            className="transition-transform duration-[180ms] group-hover:rotate-90"
          />
          New Project
        </button>
      </div>

      {/* ====================================== */}
      {/* TOOLBAR */}
      {/* ====================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          rounded-[20px]
          border
          border-[#E5E7EB]
          bg-white
          p-4
          shadow-sm
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Search */}

        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-[#64748B]
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search projects..."
            className="
    w-full
    rounded-xl
    border
    border-[#E5E7EB]
    bg-[#F8FAFC]
    py-3
    pl-11
    pr-4
    text-sm
    text-[#111827]
    outline-none
    transition-all
    placeholder:text-[#64748B]
    focus:border-[#5B21B6]
    focus:bg-white
    focus:ring-4
    focus:ring-[#DDD6FE]/60
  "
          />
        </div>

        {/* Actions */}

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filter */}

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value as ProjectStatus | "ALL")
            }
            className=" rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm outline-none focus:border-[#5B21B6]"
          >
            <option value="ALL">All</option>
            <option value="PLANNING">Planning</option>
            <option value="ACTIVE">Active</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) =>
              onSortChange(e.target.value as "newest" | "oldest" | "name")
            }
            className="
    rounded-xl
    border
    border-[#E5E7EB]
    bg-white
    px-4
    py-3
    text-sm
    outline-none
    focus:border-[#5B21B6]
  "
          >
            <option value="newest">Newest</option>

            <option value="oldest">Oldest</option>

            <option value="name">Name</option>
          </select>

          {/* Divider */}
          <div
            className="hidden h-8 w-px bg-[#E5E7EB] lg:block"
            aria-hidden="true"
          />

          {/* Grid / List */}

          <div
            role="group"
            aria-label="Toggle view"
            className="
    flex
    items-center
    gap-1
    rounded-xl
    border
    border-[#E5E7EB]
    bg-[#F8FAFC]
    p-1
  "
          >
            {/* Grid */}

            <button
              type="button"
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              onClick={() => onViewChange("grid")}
              className={`
      flex
      items-center
      justify-center
      rounded-lg
      px-3.5
      py-2
      transition-all
      duration-200
      focus:outline-none
      focus-visible:ring-4
      focus-visible:ring-[#DDD6FE]/60
      ${
        view === "grid"
          ? "bg-[#5B21B6] text-white shadow-sm"
          : "text-[#64748B] hover:bg-white hover:text-[#111827]"
      }
    `}
            >
              <LayoutGrid size={17} />
            </button>

            {/* List */}

            <button
              type="button"
              aria-label="List view"
              aria-pressed={view === "list"}
              onClick={() => onViewChange("list")}
              className={`
      flex
      items-center
      justify-center
      rounded-lg
      px-3.5
      py-2
      transition-all
      duration-200
      focus:outline-none
      focus-visible:ring-4
      focus-visible:ring-[#DDD6FE]/60
      ${
        view === "list"
          ? "bg-[#5B21B6] text-white shadow-sm"
          : "text-[#64748B] hover:bg-white hover:text-[#111827]"
      }
    `}
            >
              <List size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectToolbar;
