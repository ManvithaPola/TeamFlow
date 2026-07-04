// ============================================
// 📄 src/components/tasks/TaskGrid.tsx
// ============================================

import TaskCard from "./TaskCard";

import type { Task } from "../../types/task.types";

interface Props {
  tasks: Task[];
  view: "grid" | "list";
}

const TaskGrid = ({ tasks, view }: Props) => {
  return (
    <div className="bg-[#F8FAFC]">
      <style>{`
        @keyframes taskCardFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .task-card-enter {
          opacity: 0;
          animation: taskCardFadeIn 420ms cubic-bezier(0.16,1,0.3,1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .task-card-enter {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      <div
        className={
          view === "grid"
            ? `
              grid
              grid-cols-1
              gap-x-6
              gap-y-8
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
            `
            : `
              flex
              flex-col
              gap-5
            `
        }
      >
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="task-card-enter flex h-full [&>*]:h-full [&>*]:w-full"
            style={{
              animationDelay: `${Math.min(index, 12) * 45}ms`,
            }}
          >
            <TaskCard
              task={task}
              view={view}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskGrid;