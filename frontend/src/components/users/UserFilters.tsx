// ============================================
// 📄 UserFilters.tsx
// ============================================

import {
  Search,
} from "lucide-react";

import type {
  UserFilters as Filters,
} from "../../types/user.types";

interface Props {
  filters: Filters;

  setFilters: React.Dispatch<
    React.SetStateAction<Filters>
  >;
}

const UserFilters = ({
  filters,
  setFilters,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="relative flex-1 min-w-[260px]">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search users..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
              page: 1,
            }))
          }
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-[#5B21B6]"
        />

      </div>

      <select
        value={filters.role}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            role: e.target.value,
            page: 1,
          }))
        }
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-[#5B21B6]"
      >

        <option value="">
          All Roles
        </option>

        <option value="ADMIN">
          Admin
        </option>

        <option value="MANAGER">
          Manager
        </option>

        <option value="DEVELOPER">
          Developer
        </option>

        <option value="REVIEWER">
          Reviewer
        </option>

      </select>

    </div>
  );
};

export default UserFilters;