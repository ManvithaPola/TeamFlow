// ============================================
// 📄 src/components/projects/ProjectProgress.tsx
// ============================================

import { motion } from "framer-motion";

interface Props {
  value: number;
  label?: string;
  showPercentage?: boolean;
}

const ProjectProgress = ({
  value,
  label = "Progress",
  showPercentage = true,
}: Props) => {
  const progress = Math.min(100, Math.max(0, value));

  return (
    <div className="group space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-700">{label}</p>

        {showPercentage && (
          <span className="text-sm font-semibold tabular-nums text-[#5B21B6]">
            {progress}%
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div
        className="
          relative h-3 overflow-hidden rounded-full bg-slate-100
          ring-1 ring-inset ring-slate-200/60
          transition-all duration-200
          group-hover:bg-[#F8FAFC]
        "
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="
            relative h-full rounded-full
            bg-gradient-to-r from-[#5B21B6] via-indigo-500 to-sky-500
            shadow-[0_0_10px_rgba(91,33,182,0.35)]
            transition-shadow duration-300
            group-hover:shadow-[0_0_14px_rgba(91,33,182,0.5)]
          "
        >
          {/* Glossy highlight */}
          <span
            aria-hidden
            className="
              pointer-events-none absolute inset-0 rounded-full
              bg-gradient-to-b from-white/25 to-transparent
            "
          />
        </motion.div>
      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs font-medium text-slate-400">
        <span>0%</span>
        <span>100%</span>
      </div>
    </div>
  );
};

export default ProjectProgress;