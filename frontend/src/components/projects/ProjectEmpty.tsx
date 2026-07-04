// ============================================
// 📄 src/components/projects/ProjectEmpty.tsx
// ============================================

import { FolderKanban, Plus } from "lucide-react";

const ProjectEmpty = () => {
  return (
    <div
      className="
        relative
        flex
        min-h-[450px]
        flex-col
        items-center
        justify-center
        overflow-hidden
        rounded-[24px]
        border
        border-[#E5E7EB]
        bg-[#FFFFFF]
        px-8
        py-14
        text-center
        shadow-sm
      "
    >
        {/* Ambient background accent */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-64
            w-64
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#DDD6FE]
            opacity-30
            blur-3xl
          "
        />

        {/* Icon */}

        <div className="relative">
          <div
            className="
              absolute
              inset-0
              -m-3
              rounded-full
              border
              border-dashed
              border-[#DDD6FE]
            "
            aria-hidden="true"
          />

          <div
            className="
              relative
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-[#EDE9FE]
            "
          >
            <FolderKanban size={40} className="text-[#5B21B6]" />
          </div>
        </div>

        {/* Title */}

        <h2 className="relative mt-8 font-['Poppins'] text-2xl font-bold text-[#111827]">
          No projects yet
        </h2>

        {/* Description */}

        <p className="relative mt-4 max-w-md font-['Inter'] text-[15px] leading-7 text-slate-500">
          Create your first project to start collaborating with your
          team, manage tasks, assign members and track progress from
          one place.
        </p>

        {/* CTA */}

        <button
          type="button"
          className="
            group
            relative
            mt-10
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-b
            from-[#7C3AED]
            to-[#5B21B6]
            px-6
            py-3.5
            font-['Inter']
            text-sm
            font-semibold
            text-white
            shadow-md
            shadow-[#5B21B6]/20
            transition-all
            duration-200
            ease-out
            hover:-translate-y-0.5
            hover:shadow-lg
            hover:shadow-[#5B21B6]/30
            active:scale-[0.98]
            active:translate-y-0
            focus:outline-none
            focus-visible:ring-4
            focus-visible:ring-[#DDD6FE]
          "
        >
          <Plus
            size={18}
            className="transition-transform duration-200 group-hover:rotate-90"
          />
          Create Project
        </button>
    </div>
  );
};

export default ProjectEmpty;