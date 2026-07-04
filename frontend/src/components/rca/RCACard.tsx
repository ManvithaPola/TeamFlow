// ============================================
// 📄 src/components/rca/RCACard.tsx
// ============================================

import {
  CalendarDays,
  ClipboardList,
  Eye,
  Pencil,
  Trash2,
  AlertTriangle,
  FolderKanban,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useRCAs } from "../../hooks/useRCAs";

import type { RCA } from "../../types/rca.types";

interface Props {
  rca: RCA;
}

const RCACard = ({ rca }: Props) => {
  const navigate = useNavigate();

  const { deleteRCA } = useRCAs();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${rca.title}"?`
    );

    if (!confirmed) return;

    await deleteRCA(rca.id);
  };

  const severityColors = {
    LOW: "bg-emerald-100 text-emerald-700",

    MEDIUM: "bg-amber-100 text-amber-700",

    HIGH: "bg-orange-100 text-orange-700",

    CRITICAL: "bg-red-100 text-red-700",
  };

  const statusColors = {
    DRAFT: "bg-slate-100 text-slate-700",

    INVESTIGATING:
      "bg-blue-100 text-blue-700",

    SUBMITTED:
      "bg-violet-100 text-violet-700",

    UNDER_REVIEW:
      "bg-amber-100 text-amber-700",

    APPROVED:
      "bg-emerald-100 text-emerald-700",

    CLOSED:
      "bg-slate-200 text-slate-700",
  };

  return (
    <div
      className="
        group
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:border-[#DDD6FE]
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h3
            className="
              text-lg
              font-semibold
              text-[#111827]
            "
          >
            {rca.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
            {rca.incident}
          </p>

        </div>

        <AlertTriangle
          size={22}
          className="text-[#5B21B6]"
        />

      </div>

      {/* Badges */}

      <div className="mt-5 flex flex-wrap gap-2">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${severityColors[rca.severity]}`}
        >
          {rca.severity}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[rca.status]}`}
        >
          {rca.status.replace("_", " ")}
        </span>

      </div>

      {/* Details */}

      <div className="mt-6 space-y-4">

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <FolderKanban size={16} />
          {rca.project.title}
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <ClipboardList size={16} />
          {rca.createdBy.name}
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <CalendarDays size={16} />
          {new Date(
            rca.createdAt,
          ).toLocaleDateString()}
        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">

        <button
          onClick={() =>
            navigate(`/rcas/${rca.id}`)
          }
          className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-[#5B21B6]
          "
        >
          <Eye size={17} />

          View
        </button>

        <div className="flex gap-2">

          <button
            onClick={() =>
              navigate(`/rcas/${rca.id}/edit`)
            }
            className="
              rounded-xl
              border
              border-slate-200
              p-2.5
              text-slate-500
              transition
              hover:bg-[#F8F5FF]
              hover:text-[#5B21B6]
            "
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={handleDelete}
            className="
              rounded-xl
              border
              border-slate-200
              p-2.5
              text-slate-500
              transition
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default RCACard;