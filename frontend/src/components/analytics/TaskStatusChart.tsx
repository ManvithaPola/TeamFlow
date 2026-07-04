// ============================================
// 📄 TaskStatusChart.tsx
// ============================================

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import type {
  TaskStatus,
} from "../../types/analytics.types";

interface Props {
  data: TaskStatus[];
}

const COLORS = [
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#10B981",
];

const TaskStatusChart = ({
  data,
}: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-semibold">
        Task Status
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              outerRadius={110}
              label
            >

              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default TaskStatusChart;