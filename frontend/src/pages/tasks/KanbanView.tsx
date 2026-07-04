// ============================================
// 📄 src/pages/tasks/KanbanView.tsx
// ============================================

import { ArrowLeft } from "lucide-react";

import { Link } from "react-router-dom";

import KanbanBoard from "../../components/kanban/KanbanBoard";

import { useTasks } from "../../hooks/useTasks";

const KanbanView = () => {
  const {
    tasks,
    loading,
    error,
    refresh,
  } = useTasks();

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="space-y-6">

        <div className="h-10 w-72 animate-pulse rounded-xl bg-slate-200" />

        <div className="flex gap-6 overflow-hidden">

          {[1, 2, 3, 4, 5].map((column) => (
            <div
              key={column}
              className="h-[650px] w-[320px] animate-pulse rounded-3xl bg-slate-200"
            />
          ))}

        </div>

      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">

        <h2 className="text-lg font-semibold text-red-500">
          {error}
        </h2>

        <button
          onClick={refresh}
          className="rounded-xl bg-[#5B21B6] px-5 py-3 text-white"
        >
          Retry
        </button>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            to="/tasks"
            className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#5B21B6]"
          >
            <ArrowLeft size={16} />

            Back to Tasks
          </Link>

          <h1 className="text-3xl font-bold text-slate-900">
            Kanban Board
          </h1>

          <p className="mt-2 text-slate-500">
            Organize and track tasks by their current status.
          </p>

        </div>

        <div className="rounded-xl bg-violet-100 px-5 py-3 text-sm font-semibold text-[#5B21B6]">

          {tasks.length} Tasks

        </div>

      </div>

      {/* Board */}

      <KanbanBoard tasks={tasks} />

    </div>
  );
};

export default KanbanView;