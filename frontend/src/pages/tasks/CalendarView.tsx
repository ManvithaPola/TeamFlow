// ============================================
// 📄 src/pages/tasks/CalendarView.tsx
// ============================================

import { ArrowLeft } from "lucide-react";

import { Link } from "react-router-dom";

import { useTasks } from "../../hooks/useTasks";

import TaskCalendar from "../../components/calendar/TaskCalendar";

const CalendarView = () => {
  const {
    tasks,
    loading,
    error,
    refresh,
  } = useTasks();

  if (loading) {
    return (
      <div className="h-96 animate-pulse rounded-3xl bg-slate-200" />
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">

        <p className="text-red-500">
          {error}
        </p>

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

      <div>

        <Link
          to="/tasks"
          className="mb-3 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#5B21B6]"
        >
          <ArrowLeft size={16} />

          Back to Tasks
        </Link>

        <h1 className="text-3xl font-bold">
          Calendar View
        </h1>

        <p className="mt-2 text-slate-500">
          View tasks based on their due dates.
        </p>

      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">

        <TaskCalendar tasks={tasks} />

      </div>

    </div>
  );
};

export default CalendarView;