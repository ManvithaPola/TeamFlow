// ============================================
// 📄 src/pages/tasks/Tasks.tsx
// ============================================

import { useMemo, useState } from "react";

import TaskToolbar from "../../components/tasks/TaskToolbar";
import TaskGrid from "../../components/tasks/TaskGrid";
import TaskEmpty from "../../components/tasks/TaskEmpty";
import TaskSkeleton from "../../components/tasks/TaskSkeleton";

import { useTasks } from "../../hooks/useTasks";

import type {
  TaskStatus,
  Priority,
} from "../../types/task.types";

const Tasks = () => {
  const {
    tasks,
    loading,
    error,
    refresh,
  } = useTasks();

  // =====================================
  // UI STATE
  // =====================================

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<TaskStatus | "ALL">("ALL");

  const [priority, setPriority] =
    useState<Priority | "ALL">("ALL");

  const [sort, setSort] = useState<
    "newest" | "oldest" | "priority" | "title"
  >("newest");

  const [view, setView] =
    useState<"grid" | "list">("grid");

  // =====================================
  // FILTER TASKS
  // =====================================

  const filteredTasks = useMemo(() => {
    let data = [...tasks];

    // Search

    if (search.trim()) {
      const query = search.toLowerCase();

      data = data.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(query) ||
          task.description
            ?.toLowerCase()
            .includes(query)
      );
    }

    // Status

    if (status !== "ALL") {
      data = data.filter(
        (task) => task.status === status
      );
    }

    // Priority

    if (priority !== "ALL") {
      data = data.filter(
        (task) =>
          task.priority === priority
      );
    }

    // Sort

    switch (sort) {
      case "title":
        data.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        break;

      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() -
            new Date(b.createdAt).getTime()
        );
        break;

      case "priority": {
        const priorityOrder = {
          CRITICAL: 4,
          HIGH: 3,
          MEDIUM: 2,
          LOW: 1,
        };

        data.sort(
          (a, b) =>
            priorityOrder[b.priority] -
            priorityOrder[a.priority]
        );

        break;
      }

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
    }

    return data;
  }, [
    tasks,
    search,
    status,
    priority,
    sort,
  ]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return <TaskSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
        <h2 className="text-lg font-semibold text-slate-800">
          {error}
        </h2>

        <button
          onClick={refresh}
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // =====================================
  // UI
  // =====================================

  return (
    <div className="space-y-8">
      <TaskToolbar
        taskCount={filteredTasks.length}
        search={search}
        onSearch={setSearch}
        status={status}
        onStatusChange={setStatus}
        priority={priority}
        onPriorityChange={setPriority}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
      />

      {filteredTasks.length === 0 ? (
        <TaskEmpty />
      ) : (
        <TaskGrid
          tasks={filteredTasks}
          view={view}
        />
      )}
    </div>
  );
};

export default Tasks;