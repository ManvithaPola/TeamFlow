// ============================================
// 📄 src/components/tasks/TaskSkeleton.tsx
// ============================================

const TaskSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Toolbar */}

      <div className="space-y-4">
        <div className="h-8 w-48 rounded bg-slate-200" />

        <div className="h-24 rounded-2xl bg-white border border-slate-200" />
      </div>

      {/* Cards */}

      <div
        className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              space-y-4
            "
          >
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-full bg-slate-200" />

              <div className="h-6 w-24 rounded-full bg-slate-200" />
            </div>

            <div className="h-5 w-2/3 rounded bg-slate-200" />

            <div className="space-y-2">
              <div className="h-3 rounded bg-slate-200" />

              <div className="h-3 w-5/6 rounded bg-slate-200" />
            </div>

            <div className="h-3 w-1/2 rounded bg-slate-200" />

            <div className="flex justify-between">
              <div className="h-3 w-20 rounded bg-slate-200" />

              <div className="h-3 w-20 rounded bg-slate-200" />
            </div>

            <div className="flex gap-3 pt-4">
              <div className="h-10 flex-1 rounded-xl bg-slate-200" />

              <div className="h-10 flex-1 rounded-xl bg-slate-200" />

              <div className="h-10 flex-1 rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskSkeleton;