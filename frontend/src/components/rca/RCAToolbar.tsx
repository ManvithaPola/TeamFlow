// ============================================
// 📄 src/components/rca/RCAToolbar.tsx
// ============================================

import {
  Filter,
  Search,
} from "lucide-react";

const RCAToolbar = () => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >
      {/* Search */}

      <div className="relative w-full lg:max-w-md">

        <Search
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          placeholder="Search RCAs..."
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            py-3
            pl-11
            pr-4
            outline-none
            transition
            focus:border-[#5B21B6]
          "
        />

      </div>

      {/* Filters */}

      <div className="flex gap-3">

        <select
          className="
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            outline-none
            focus:border-[#5B21B6]
          "
        >
          <option>Status</option>

          <option>DRAFT</option>

          <option>INVESTIGATING</option>

          <option>SUBMITTED</option>

          <option>UNDER REVIEW</option>

          <option>APPROVED</option>

          <option>CLOSED</option>
        </select>

        <select
          className="
            rounded-xl
            border
            border-slate-200
            px-4
            py-3
            outline-none
            focus:border-[#5B21B6]
          "
        >
          <option>Severity</option>

          <option>LOW</option>

          <option>MEDIUM</option>

          <option>HIGH</option>

          <option>CRITICAL</option>
        </select>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            transition
            hover:bg-slate-50
          "
        >
          <Filter size={17} />

          Filters
        </button>

      </div>

    </div>
  );
};

export default RCAToolbar;