// ============================================
// 📄 src/components/dashboard/StatCard.tsx
// ============================================

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  subtitle,
}: StatCardProps) => {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all"
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${color}20`,
          }}
        >
          <Icon
            size={28}
            style={{
              color,
            }}
          />
        </div>

      </div>
    </motion.div>
  );
};

export default StatCard;