// ============================================
// 📄 src/components/tasks/TaskCard.tsx
// ============================================

import {
  CalendarDays,
  MessageSquare,
  Paperclip,
  FolderKanban,
  User,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useTasks } from "../../hooks/useTasks";
import type { Task, Priority, TaskStatus } from "../../types/task.types";

interface Props {
  task: Task;
  view: "grid" | "list";
}

const priorityStyles: Record<Priority, string> = {
  LOW: "bg-emerald-50 text-emerald-700",
  MEDIUM: "bg-amber-50 text-amber-700",
  HIGH: "bg-orange-50 text-orange-700",
  CRITICAL: "bg-red-50 text-red-700",
};

const statusStyles: Record<TaskStatus, string> = {
  TODO: "bg-slate-100 text-slate-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  IN_REVIEW: "bg-violet-100 text-violet-700",
  DONE: "bg-emerald-100 text-emerald-700",
  BLOCKED: "bg-red-100 text-red-700",
};

const TaskCard = ({ task, view }: Props) => {
  const navigate = useNavigate();
  const { deleteTask } = useTasks();
  const handleDelete = async () => {
    const confirmed = window.confirm(`Delete "${task.title}"?`);

    if (!confirmed) return;

    try {
      await deleteTask(task.id);
    } catch (error) {
      console.error(error);
      alert("Failed to delete task");
    }
  };
  return (
    <div
      className={`
        group
        rounded-2xl
        border
        border-[#E5E7EB]
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#DDD6FE]
        hover:shadow-xl
        ${view === "list" ? "flex items-center justify-between gap-8" : ""}
      `}
    >
      {/* ================================= */}
      {/* LEFT */}
      {/* ================================= */}

      <div className="flex-1">
        {/* Badges */}

        <div className="mb-4 flex items-center gap-2">
          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${priorityStyles[task.priority]}
            `}
          >
            {task.priority}
          </span>

          <span
            className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${statusStyles[task.status]}
            `}
          >
            {task.status.replace("_", " ")}
          </span>
        </div>

        {/* Title */}

        <h3
          className="
            text-lg
            font-semibold
            text-[#111827]
            transition-colors
            group-hover:text-[#5B21B6]
          "
        >
          {task.title}
        </h3>

        {/* Description */}

        <p
          className="
            mt-2
            line-clamp-2
            text-sm
            leading-relaxed
            text-slate-500
          "
        >
          {task.description || "No description provided."}
        </p>

        {/* Info */}

        <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <FolderKanban size={16} />
            {task.project.title}
          </div>

          <div className="flex items-center gap-2">
            <User size={16} />
            {task.assignee?.name ?? "Unassigned"}
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </div>
        </div>

        {/* Counts */}

        <div className="mt-5 flex items-center gap-5 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <MessageSquare size={16} />
            {task._count.comments} Comments
          </div>

          <div className="flex items-center gap-2">
            <Paperclip size={16} />
            {task._count.attachments} Files
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* ACTIONS */}
      {/* ================================= */}

      <div
        className="
          mt-6
          flex
          gap-2
          md:mt-0
        "
      >
        <button
          onClick={() => navigate(`/tasks/${task.id}`)}
          className="
            rounded-xl
            border
            border-slate-200
            p-2.5
            text-slate-500
            transition
            hover:border-violet-200
            hover:bg-violet-50
            hover:text-[#5B21B6]
          "
        >
          <Eye size={18} />
        </button>

        <button
          onClick={() => navigate(`/tasks/${task.id}/edit`)}
          className="
            rounded-xl
            border
            border-slate-200
            p-2.5
            text-slate-500
            transition
            hover:border-blue-200
            hover:bg-blue-50
            hover:text-blue-600
          "
        >
          <Pencil size={18} />
        </button>

        <button
          onClick={handleDelete}
          className="
            rounded-xl
            border
            border-slate-200
            p-2.5
            text-slate-500
            transition
            hover:border-red-200
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
