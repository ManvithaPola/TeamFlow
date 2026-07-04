// ============================================
// 📄 src/components/kanban/KanbanColumn.tsx
// ============================================

import type {
  Task,
  TaskStatus,
} from "../../types/task.types";

import TaskCard from "./TaskCard";

interface Props {
  title: string;

  status: TaskStatus;

  tasks: Task[];
}

const statusColors: Record<TaskStatus, string> = {
  TODO: "bg-slate-100 text-slate-700",

  IN_PROGRESS: "bg-blue-100 text-blue-700",

  IN_REVIEW: "bg-amber-100 text-amber-700",

  DONE: "bg-emerald-100 text-emerald-700",

  BLOCKED: "bg-red-100 text-red-700",
};

const KanbanColumn = ({
  title,
  status,
  tasks,
}: Props) => {
  return (
    <div
      className="
        flex
        min-w-[320px]
        flex-col
        rounded-3xl
        bg-slate-100
        p-4
      "
    >
      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-semibold text-slate-800">
          {title}
        </h2>

        <span
          className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${statusColors[status]}
          `}
        >
          {tasks.length}
        </span>

      </div>

      {/* Tasks */}

      <div className="flex flex-col gap-4">

        {tasks.length === 0 ? (

          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-slate-300
              py-10
              text-center
              text-sm
              text-slate-400
            "
          >
            No tasks
          </div>

        ) : (

          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
            />
          ))

        )}

      </div>

    </div>
  );
};

export default KanbanColumn;