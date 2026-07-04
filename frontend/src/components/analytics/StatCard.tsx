// ============================================
// 📄 StatCard.tsx
// ============================================

import type {
  LucideIcon,
} from "lucide-react";

interface Props {
  title: string;

  value: number;

  icon: LucideIcon;

  color: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}: Props) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>

        </div>

        <div
          className="rounded-2xl p-4 text-white"
          style={{
            background: color,
          }}
        >
          <Icon size={24} />
        </div>

      </div>
    </div>
  );
};

export default StatCard;