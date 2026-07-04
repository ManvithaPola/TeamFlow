// ============================================
// 📄 src/components/projects/ProjectCard.tsx
// ============================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  MoreVertical,
  Users,
  ListChecks,
  ShieldAlert,
  Eye,
  Pencil,
  Copy,
  Archive,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import type { Project } from "../../types/project.types";

interface Props {
  project: Project;
}

const statusColors: Record<string, string> = {
  PLANNING: "bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]",
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ON_HOLD: "bg-amber-50 text-amber-700 border-amber-200",
  COMPLETED: "bg-sky-50 text-sky-700 border-sky-200",
  ARCHIVED: "bg-slate-100 text-slate-600 border-slate-200",
};

const statusDotColors: Record<string, string> = {
  PLANNING: "bg-[#7C3AED]",
  ACTIVE: "bg-emerald-500",
  ON_HOLD: "bg-amber-500",
  COMPLETED: "bg-sky-500",
  ARCHIVED: "bg-slate-400",
};

const ProjectCard = ({ project }: Props) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const progress = project.statistics?.progress ?? 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="
        group
        relative
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        rounded-[20px]
        border
        border-[#E5E7EB]
        bg-[#FFFFFF]
        shadow-sm
        transition-shadow
        duration-200
        ease-out
        hover:shadow-xl
        hover:shadow-slate-200/60
      "
    >
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex items-start justify-between gap-3 p-6 pb-4">
        <span
          className={`
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            px-2.5
            py-1
            font-['Inter']
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            ${statusColors[project.status] ?? statusColors.ARCHIVED}
          `}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              statusDotColors[project.status] ?? statusDotColors.ARCHIVED
            }`}
          />
          {project.status.replace("_", " ")}
        </span>

        {/* Three-dot dropdown */}
        <div className="relative">
          <button
            type="button"
            aria-label="More actions"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              rounded-lg
              p-1.5
              text-slate-400
              transition-colors
              duration-150
              hover:bg-slate-100
              hover:text-slate-700
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#DDD6FE]
            "
          >
            <MoreVertical size={18} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.14 }}
                  role="menu"
                  className="
                    absolute
                    right-0
                    top-9
                    z-20
                    w-44
                    overflow-hidden
                    rounded-xl
                    border
                    border-[#E5E7EB]
                    bg-white
                    py-1.5
                    shadow-lg
                  "
                >
                  <button
                    role="menuitem"
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left font-['Inter'] text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Copy size={15} className="text-slate-400" />
                    Duplicate
                  </button>
                  <button
                    role="menuitem"
                    className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left font-['Inter'] text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Archive size={15} className="text-slate-400" />
                    Archive
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Title + description */}

      <div className="px-6">
        <h2
          className="
            font-['Poppins']
            text-lg
            font-bold
            leading-snug
            text-[#111827]
            transition-colors
            duration-150
            group-hover:text-[#5B21B6]
          "
        >
          {project.title}
        </h2>

        <p className="mt-1.5 line-clamp-2 font-['Inter'] text-sm leading-6 text-slate-500">
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Owner */}

      <div className="mt-5 flex items-center gap-3 px-6">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#7C3AED]
            to-[#5B21B6]
            font-['Inter']
            text-sm
            font-semibold
            text-white
          "
        >
          {project.createdBy.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <p className="truncate font-['Inter'] text-sm font-semibold text-[#111827]">
            {project.createdBy.name}
          </p>
          <p className="font-['Inter'] text-xs text-slate-400">
            Project Owner
          </p>
        </div>
      </div>

      {/* ================================= */}
      {/* PROGRESS */}
      {/* ================================= */}

      <div className="mt-5 px-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-['Inter'] text-xs font-medium text-slate-500">
            Progress
          </span>
          <span className="font-['Inter'] text-xs font-bold text-[#5B21B6]">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#5B21B6]"
          />
        </div>
      </div>

      {/* ================================= */}
      {/* STATS */}
      {/* ================================= */}

      <div className="mt-5 grid grid-cols-3 gap-2.5 px-6">
        <div className="flex flex-col items-center gap-1 rounded-xl border border-slate-100 bg-[#F8FAFC] py-3">
          <ListChecks size={15} className="text-[#5B21B6]" />
          <p className="font-['Inter'] text-sm font-bold text-[#111827]">
            {project._count.tasks}
          </p>
          <p className="font-['Inter'] text-[11px] text-slate-400">Tasks</p>
        </div>

        <div className="flex flex-col items-center gap-1 rounded-xl border border-slate-100 bg-[#F8FAFC] py-3">
          <Users size={15} className="text-[#5B21B6]" />
          <p className="font-['Inter'] text-sm font-bold text-[#111827]">
            {project._count.members}
          </p>
          <p className="font-['Inter'] text-[11px] text-slate-400">Members</p>
        </div>

        <div className="flex flex-col items-center gap-1 rounded-xl border border-slate-100 bg-[#F8FAFC] py-3">
          <ShieldAlert size={15} className="text-[#5B21B6]" />
          <p className="font-['Inter'] text-sm font-bold text-[#111827]">
            {project._count.rcas}
          </p>
          <p className="font-['Inter'] text-[11px] text-slate-400">RCA</p>
        </div>
      </div>

      {/* ================================= */}
      {/* MEMBERS */}
      {/* ================================= */}

      <div className="mt-5 px-6">
        <div className="mb-2.5 flex items-center justify-between">
          <h4 className="font-['Inter'] text-xs font-semibold text-slate-600">
            Team
          </h4>
          <span className="font-['Inter'] text-[11px] text-slate-400">
            {project.members.length} members
          </span>
        </div>

        <div className="flex items-center">
          {project.members.slice(0, 5).map((member, index) => (
            <div
              key={member.id}
              className="-ml-2 first:ml-0"
              style={{ zIndex: 10 - index }}
              title={member.user.name}
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-gradient-to-br
                  from-[#7C3AED]
                  to-[#5B21B6]
                  font-['Inter']
                  text-[11px]
                  font-semibold
                  text-white
                  shadow-sm
                "
              >
                {member.user.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            </div>
          ))}

          {project.members.length > 5 && (
            <div
              className="
                -ml-2
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border-2
                border-white
                bg-[#DDD6FE]
                font-['Inter']
                text-[11px]
                font-semibold
                text-[#5B21B6]
              "
            >
              +{project.members.length - 5}
            </div>
          )}
        </div>
      </div>

      {/* Spacer pushes footer down for equal-height cards */}
      <div className="flex-1" />

      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}

      <div className="mt-6 border-t border-slate-100 px-6 pb-6 pt-4">
        <div className="mb-4 flex items-center gap-2 font-['Inter'] text-xs text-slate-400">
          <CalendarDays size={14} className="text-slate-400" />
          <span>
            Updated {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/projects/${project.id}`)}
            type="button"
            className="
              inline-flex
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-xl
              bg-[#5B21B6]
              px-4
              py-2.5
              font-['Inter']
              text-sm
              font-semibold
              text-white
              transition-all
              duration-150
              hover:bg-[#4C1D95]
              hover:shadow-md
              hover:shadow-[#5B21B6]/20
              focus:outline-none
              focus-visible:ring-4
              focus-visible:ring-[#DDD6FE]
            "
          >
            <Eye size={15} />
            View
          </button>

          <button
            type="button"
            aria-label="Edit project"
            onClick={() => navigate(`/projects/${project.id}/edit`)}
            className="
              inline-flex
              items-center
              justify-center
              rounded-xl
              border
              border-[#E5E7EB]
              bg-white
              px-3.5
              py-2.5
              text-slate-600
              transition-all
              duration-150
              hover:border-[#DDD6FE]
              hover:bg-[#F8FAFC]
              hover:text-[#5B21B6]
              focus:outline-none
              focus-visible:ring-4
              focus-visible:ring-[#DDD6FE]
            "
          >
            <Pencil size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;