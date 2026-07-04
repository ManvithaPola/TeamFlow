// ============================================
// 📄 Filters.tsx
// ============================================

import { Filter } from "lucide-react";

interface Props {
  project: string;

  setProject: (value: string) => void;

  fromDate: string;

  setFromDate: (value: string) => void;

  toDate: string;

  setToDate: (value: string) => void;
}

const Filters = ({
  project,
  setProject,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}: Props) => {
  return (
    <div
      className="
        flex
        flex-wrap
        items-end
        gap-5
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center gap-2">

        <Filter
          size={20}
          className="text-[#5B21B6]"
        />

        <h2 className="font-semibold">
          Filters
        </h2>

      </div>

      <div className="flex flex-col">

        <label className="mb-1 text-sm text-slate-500">
          Project
        </label>

        <input
          value={project}
          onChange={(event) =>
            setProject(event.target.value)
          }
          placeholder="Project Name"
          className="
            rounded-xl
            border
            border-slate-300
            px-4
            py-2
            outline-none
            focus:border-[#5B21B6]
          "
        />

      </div>

      <div className="flex flex-col">

        <label className="mb-1 text-sm text-slate-500">
          From
        </label>

        <input
          type="date"
          value={fromDate}
          onChange={(event) =>
            setFromDate(event.target.value)
          }
          className="
            rounded-xl
            border
            border-slate-300
            px-4
            py-2
            outline-none
            focus:border-[#5B21B6]
          "
        />

      </div>

      <div className="flex flex-col">

        <label className="mb-1 text-sm text-slate-500">
          To
        </label>

        <input
          type="date"
          value={toDate}
          onChange={(event) =>
            setToDate(event.target.value)
          }
          className="
            rounded-xl
            border
            border-slate-300
            px-4
            py-2
            outline-none
            focus:border-[#5B21B6]
          "
        />

      </div>

    </div>
  );
};

export default Filters;