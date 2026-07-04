// ============================================
// 📄 src/components/kanban/KanbanBoard.tsx
// ============================================

import type {
  Task,
  TaskStatus,
} from "../../types/task.types";

import KanbanColumn from "./KanbanColumn";

interface Props {
  tasks: Task[];
}

const columns: {
  title: string;
  status: TaskStatus;
}[] = [
  {
    title: "To Do",
    status: "TODO",
  },
  {
    title: "In Progress",
    status: "IN_PROGRESS",
  },
  {
    title: "In Review",
    status: "IN_REVIEW",
  },
  {
    title: "Done",
    status: "DONE",
  },
  {
    title: "Blocked",
    status: "BLOCKED",
  },
];

const KanbanBoard = ({
  tasks,
}: Props) => {
  return (
    <div
      className="
        flex
        gap-6
        overflow-x-auto
        pb-4
      "
    >
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          status={column.status}
          tasks={tasks.filter(
            (task) =>
              task.status === column.status,
          )}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;