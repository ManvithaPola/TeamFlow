// ============================================
// 📄 src/components/kanban/TaskCard.tsx
// ============================================

import {
  Calendar,
  MessageSquare,
  Paperclip,
  User,
} from "lucide-react";

import type { Task } from "../../types/task.types";

interface Props {
  task: Task;
}

const priorityColor = {
  LOW: "bg-slate-100 text-slate-700",

  MEDIUM: "bg-blue-100 text-blue-700",

  HIGH: "bg-amber-100 text-amber-700",

  CRITICAL: "bg-red-100 text-red-700",
};

const TaskCard = ({
  task,
}: Props) => {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Priority */}

      <div className="mb-3 flex items-center justify-between">

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${priorityColor[task.priority]}
          `}
        >
          {task.priority}
        </span>

      </div>

      {/* Title */}

      <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
        {task.title}
      </h3>

      {/* Description */}

      {task.description && (
        <p className="mt-2 line-clamp-3 text-sm text-slate-500">
          {task.description}
        </p>
      )}

      {/* Footer */}

      <div className="mt-5 space-y-3">

        {/* Due Date */}

        {task.dueDate && (
          <div className="flex items-center gap-2 text-sm text-slate-500">

            <Calendar size={15} />

            {new Date(task.dueDate).toLocaleDateString()}

          </div>
        )}

        {/* Assignee */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2">

            {task.assignee?.avatar ? (
              <img
                src={task.assignee.avatar}
                alt={task.assignee.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-[#5B21B6]
                  text-xs
                  font-semibold
                  text-white
                "
              >
                {task.assignee?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() ?? (
                  <User size={14} />
                )}
              </div>
            )}

            <span className="text-sm text-slate-600">

              {task.assignee?.name ?? "Unassigned"}

            </span>

          </div>

          {/* Counts */}

          <div className="flex items-center gap-3 text-slate-400">

            <div className="flex items-center gap-1">

              <MessageSquare size={15} />

              {task._count.comments}

            </div>

            <div className="flex items-center gap-1">

              <Paperclip size={15} />

              {task._count.attachments}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TaskCard;