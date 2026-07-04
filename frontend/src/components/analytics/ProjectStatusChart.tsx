// ============================================
// 📄 ProjectStatusChart.tsx
// ============================================

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

import type {
  ProjectStatus,
} from "../../types/analytics.types";

interface Props {
  data: ProjectStatus[];
}

const COLORS = [
  "#5B21B6",
  "#10B981",
  "#64748B",
  "#EF4444",
];

const ProjectStatusChart = ({
  data,
}: Props) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-semibold">
        Project Status
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

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

            <Legend />

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ProjectStatusChart;