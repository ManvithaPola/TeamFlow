// ============================================
// 📄 RCAStatusChart.tsx
// ============================================

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  RCAStatus,
} from "../../types/analytics.types";

interface Props {
  data: RCAStatus[];
}

const RCAStatusChart = ({
  data,
}: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-semibold">
        RCA Status
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="status" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#F59E0B"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default RCAStatusChart;