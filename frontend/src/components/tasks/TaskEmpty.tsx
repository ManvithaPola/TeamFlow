// ============================================
// 📄 src/components/tasks/TaskEmpty.tsx
// ============================================

import { ClipboardList, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TaskEmpty = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        flex
        min-h-[420px]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-[#DDD6FE]
        bg-white
        px-6
        text-center
      "
    >
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-[#F3F0FF]
          text-[#5B21B6]
        "
      >
        <ClipboardList size={38} />
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-[#111827]">
        No Tasks Found
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
        There are no tasks matching your search or filters.
        Create a new task to get started.
      </p>

      <button
        onClick={() => navigate("/tasks/create")}
        className="
          mt-8
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-[#5B21B6]
          px-6
          py-3
          font-medium
          text-white
          transition-all
          hover:-translate-y-0.5
          hover:bg-[#4C1D95]
        "
      >
        <Plus size={18} />

        Create Task
      </button>
    </div>
  );
};

export default TaskEmpty;