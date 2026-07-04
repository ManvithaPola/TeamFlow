// ============================================
// 📄 ProductivityTable.tsx
// ============================================

import type {
  Productivity,
} from "../../types/analytics.types";

interface Props {
  data: Productivity[];
}

const ProductivityTable = ({
  data,
}: Props) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">

        <h2 className="text-lg font-semibold text-slate-800">
          Team Productivity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Developer task completion statistics
        </p>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Developer
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Assigned
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Completed
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Completion
              </th>

            </tr>

          </thead>

          <tbody>

            {data.length === 0 ? (

              <tr>

                <td
                  colSpan={4}
                  className="py-12 text-center text-slate-400"
                >
                  No productivity data available.
                </td>

              </tr>

            ) : (

              data.map((developer) => {

                const percentage =
                  developer.assigned === 0
                    ? 0
                    : Math.round(
                        (developer.completed /
                          developer.assigned) *
                          100,
                      );

                return (

                  <tr
                    key={developer.developer}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >

                    <td className="px-6 py-5 font-medium text-slate-800">

                      {developer.developer}

                    </td>

                    <td className="px-6 py-5 text-center">

                      {developer.assigned}

                    </td>

                    <td className="px-6 py-5 text-center">

                      {developer.completed}

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="h-2 flex-1 rounded-full bg-slate-200">

                          <div
                            className="h-2 rounded-full bg-[#5B21B6]"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                        <span className="w-12 text-right text-sm font-semibold">

                          {percentage}%

                        </span>

                      </div>

                    </td>

                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default ProductivityTable;