// ============================================
// 📄 src/components/tasks/TaskToolbar.tsx
// ============================================

import { Search, LayoutGrid, List, Plus, Columns3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { TaskStatus, Priority } from "../../types/task.types";

interface TaskToolbarProps {
  taskCount?: number;

  search: string;
  onSearch: (value: string) => void;

  status: TaskStatus | "ALL";
  onStatusChange: (status: TaskStatus | "ALL") => void;

  priority: Priority | "ALL";
  onPriorityChange: (priority: Priority | "ALL") => void;

  sort: "newest" | "oldest" | "priority" | "title";
  onSortChange: (sort: "newest" | "oldest" | "priority" | "title") => void;

  view: "grid" | "list" | "kanban";

  onViewChange: (view: "grid" | "list" | "kanban") => void;
}

const TaskToolbar = ({
  taskCount,

  search,
  onSearch,

  status,
  onStatusChange,

  priority,
  onPriorityChange,

  sort,
  onSortChange,

  view,
  onViewChange,
}: TaskToolbarProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-5">
      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-['Poppins'] text-[28px] font-bold tracking-tight text-[#111827]">
              Tasks
            </h1>

            {typeof taskCount === "number" && (
              <span
                className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-[#DDD6FE]
                  px-2.5
                  py-1
                  text-xs
                  font-semibold
                  text-[#5B21B6]
                "
              >
                {taskCount} Tasks
              </span>
            )}
          </div>

          <p className="mt-1.5 text-sm text-[#64748B]">
            Manage tasks, priorities and assignments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/tasks/kanban")}
            className="
      rounded-xl
      border
      border-[#E5E7EB]
      bg-white
      px-5
      py-3
      text-sm
      font-medium
      text-[#5B21B6]
      transition
      hover:bg-violet-50
    "
          >
            Kanban View
          </button>

          <button
            onClick={() => navigate("/tasks/calendar")}
            className="
    rounded-xl
    border
    border-[#E5E7EB]
    bg-white
    px-5
    py-3
    text-sm
    font-medium
    text-[#5B21B6]
    hover:bg-violet-50
  "
          >
            Calendar
          </button>

          <button
            onClick={() => navigate("/tasks/list")}
            className="
    rounded-xl
    border
    border-[#E5E7EB]
    bg-white
    px-5
    py-3
    text-sm
    font-medium
    text-[#5B21B6]
    hover:bg-violet-50
  "
          >
            List View
          </button>

          <button
            type="button"
            onClick={() => navigate("/tasks/create")}
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
      text-sm
      font-medium
      text-white
      shadow-md
      shadow-[#5B21B6]/20
      transition-all
      hover:-translate-y-0.5
      hover:shadow-lg
    "
          >
            <Plus
              size={18}
              className="transition-transform group-hover:rotate-90"
            />
            New Task
          </button>
        </div>
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
            className="
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
            placeholder="Search tasks..."
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

        {/* Filters */}

        <div className="flex flex-wrap items-center gap-3">
          {/* Status */}

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value as TaskStatus | "ALL")
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
            <option value="ALL">All Status</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="DONE">Done</option>
            <option value="BLOCKED">Blocked</option>
          </select>

          {/* Priority */}

          <select
            value={priority}
            onChange={(e) =>
              onPriorityChange(e.target.value as Priority | "ALL")
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
            <option value="ALL">All Priority</option>

            <option value="LOW">Low</option>

            <option value="MEDIUM">Medium</option>

            <option value="HIGH">High</option>

            <option value="CRITICAL">Critical</option>
          </select>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) =>
              onSortChange(
                e.target.value as "newest" | "oldest" | "priority" | "title",
              )
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

            <option value="priority">Priority</option>

            <option value="title">Title</option>
          </select>

          {/* Divider */}

          <div className="hidden h-8 w-px bg-[#E5E7EB] lg:block" />

          {/* View Toggle */}

          {/* View Toggle */}

          <div
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
              onClick={() => onViewChange("grid")}
              className={`rounded-lg px-3.5 py-2 transition ${
                view === "grid"
                  ? "bg-[#5B21B6] text-white"
                  : "text-[#64748B] hover:bg-white"
              }`}
            >
              <LayoutGrid size={17} />
            </button>

            {/* List */}

            <button
              onClick={() => onViewChange("list")}
              className={`rounded-lg px-3.5 py-2 transition ${
                view === "list"
                  ? "bg-[#5B21B6] text-white"
                  : "text-[#64748B] hover:bg-white"
              }`}
            >
              <List size={17} />
            </button>

            {/* Kanban */}

            <button
              onClick={() => navigate("/tasks/kanban")}
              className="
      rounded-lg
      px-3.5
      py-2
      text-[#64748B]
      transition
      hover:bg-white
    "
            >
              <Columns3 size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskToolbar;
