// ============================================
// 📄 src/components/projects/ProjectActions.tsx
// ============================================

import {
  MoreVertical,
  Eye,
  SquarePen,
  Users,
  BarChart3,
  Trash2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

interface Props {
  onView?: () => void;
  onEdit?: () => void;
  onMembers?: () => void;
  onAnalytics?: () => void;
  onDelete?: () => void;
}

const ProjectActions = ({
  onView,
  onEdit,
  onMembers,
  onAnalytics,
  onDelete,
}: Props) => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", close);

    return () =>
      window.removeEventListener("mousedown", close);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Trigger */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-600
          transition
          hover:bg-slate-50
          hover:text-slate-900
        "
      >
        <MoreVertical size={18} />
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            top-12
            z-50
            w-60
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-xl
          "
        >
          <button
            onClick={() => {
              onView?.();
              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-left
              text-sm
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            <Eye size={18} />
            View Project
          </button>

          <button
            onClick={() => {
              onEdit?.();
              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-left
              text-sm
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            <SquarePen size={18} />
            Edit Project
          </button>

          <button
            onClick={() => {
              onMembers?.();
              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-left
              text-sm
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            <Users size={18} />
            Manage Members
          </button>

          <button
            onClick={() => {
              onAnalytics?.();
              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-left
              text-sm
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            <BarChart3 size={18} />
            Analytics
          </button>

          <div className="border-t border-slate-200" />

          <button
            onClick={() => {
              onDelete?.();
              setOpen(false);
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-left
              text-sm
              text-red-600
              transition
              hover:bg-red-50
            "
          >
            <Trash2 size={18} />
            Delete Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectActions;