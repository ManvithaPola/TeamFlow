// ============================================
// 📄 src/components/projects/ProjectSkeleton.tsx
// ============================================

const ProjectSkeleton = () => {
  return (
    <div className="bg-[#F8FAFC]">
      <div
        className="
          grid
          grid-cols-1
          items-stretch
          gap-x-6
          gap-y-8
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
        "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
              flex
              h-full
              flex-col
              overflow-hidden
              rounded-[20px]
              border
              border-[#E5E7EB]
              bg-[#FFFFFF]
              shadow-sm
            "
          >
            {/* Header: status badge + three-dot */}
            <div className="flex items-start justify-between gap-3 p-6 pb-4">
              <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
              <div className="h-6 w-6 animate-pulse rounded-lg bg-slate-100" />
            </div>

            {/* Title + description */}
            <div className="px-6">
              <div className="mb-3 h-5 w-4/5 animate-pulse rounded-md bg-slate-200" />
              <div className="mb-2 h-3.5 w-full animate-pulse rounded bg-slate-100" />
              <div className="h-3.5 w-3/5 animate-pulse rounded bg-slate-100" />
            </div>

            {/* Owner */}
            <div className="mt-5 flex items-center gap-3 px-6">
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-slate-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3.5 w-28 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
              </div>
            </div>

            {/* Progress */}
            <div className="mt-5 px-6">
              <div className="mb-2 flex items-center justify-between">
                <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-8 animate-pulse rounded bg-slate-200" />
              </div>
              <div className="h-2 w-full animate-pulse rounded-full bg-slate-100" />
            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-3 gap-2.5 px-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex flex-col items-center gap-2 rounded-xl border border-slate-100 bg-[#F8FAFC] py-3"
                >
                  <div className="h-3.5 w-3.5 animate-pulse rounded-full bg-slate-200" />
                  <div className="h-3.5 w-6 animate-pulse rounded bg-slate-200" />
                  <div className="h-2.5 w-10 animate-pulse rounded bg-slate-100" />
                </div>
              ))}
            </div>

            {/* Members */}
            <div className="mt-5 px-6">
              <div className="mb-2.5 flex items-center justify-between">
                <div className="h-3 w-10 animate-pulse rounded bg-slate-200" />
                <div className="h-2.5 w-16 animate-pulse rounded bg-slate-100" />
              </div>
              <div className="flex items-center">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="-ml-2 first:ml-0">
                    <div className="h-8 w-8 animate-pulse rounded-full border-2 border-white bg-slate-200" />
                  </div>
                ))}
              </div>
            </div>

            {/* Spacer to match ProjectCard's equal-height footer alignment */}
            <div className="flex-1" />

            {/* Footer */}
            <div className="mt-6 border-t border-slate-100 px-6 pb-6 pt-4">
              <div className="mb-4 h-3 w-32 animate-pulse rounded bg-slate-100" />

              <div className="flex items-center gap-2">
                <div className="h-10 flex-1 animate-pulse rounded-xl bg-slate-200" />
                <div className="h-10 w-11 animate-pulse rounded-xl bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSkeleton;