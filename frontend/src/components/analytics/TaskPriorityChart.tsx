// ============================================
// 📄 TaskPriorityChart.tsx
// ============================================

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

import type {
  TaskPriority,
} from "../../types/analytics.types";

interface Props {
  data: TaskPriority[];
}

const TaskPriorityChart = ({
  data,
}: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-semibold">
        Task Priority
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="priority" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#5B21B6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default TaskPriorityChart;