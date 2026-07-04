// ============================================
// 📄 src/components/dashboard/ProjectChart.tsx
// ============================================
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { ProjectProgressData } from "../../types/dashboard.types";

interface ProjectChartProps {
  data: ProjectProgressData[];
}

const COLORS = ["#6366F1", "#22D3EE", "#34D399", "#FBBF24", "#FB7185", "#A78BFA"];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/[0.1] bg-[#12151F] px-4 py-2.5 shadow-xl">
      <p className="font-['Poppins'] text-sm font-semibold text-slate-50">
        {payload[0].name}
      </p>
      <p className="mt-0.5 font-['JetBrains_Mono'] text-xs text-slate-400">
        {payload[0].value}%
      </p>
    </div>
  );
};

const ProjectChart = ({ data }: ProjectChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl"
    >
      <div className="mb-6">
        <h2 className="font-['Poppins'] text-base font-semibold text-slate-50">
          Project Progress
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Overall project completion overview
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={96}
            innerRadius={62}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              fontFamily: "Inter",
              fontSize: 12,
              color: "#8891A5",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export default ProjectChart;