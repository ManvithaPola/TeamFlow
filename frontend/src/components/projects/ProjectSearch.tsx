// ============================================
// 📄 src/components/projects/ProjectSearch.tsx
// ============================================

import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const ProjectSearch = ({ value, onChange }: Props) => {
  return (
    <div className="group relative w-full">
      {/* Search Icon */}

      <Search
        size={18}
        className="
          pointer-events-none
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          transition-colors
          duration-200
          group-focus-within:text-[#5B21B6]
        "
      />

      {/* Input */}

      <input
        type="text"
        value={value}
        placeholder="Search projects..."
        aria-label="Search projects"
        onChange={(e) => onChange(e.target.value)}
        className="
          h-12
          w-full
          rounded-[20px]
          border
          border-[#E5E7EB]
          bg-white
          py-3
          pl-11
          pr-11
          font-['Inter']
          text-sm
          text-[#111827]
          outline-none
          transition-all
          duration-200
          ease-out
          placeholder:text-slate-400
          hover:border-slate-300
          hover:shadow-sm
          focus:border-[#5B21B6]
          focus:shadow-sm
          focus:ring-4
          focus:ring-[#DDD6FE]/60
        "
      />

      {/* Clear */}

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            rounded-lg
            p-1.5
            text-slate-400
            transition-all
            duration-150
            hover:bg-slate-100
            hover:text-slate-700
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#DDD6FE]
          "
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
};

export default ProjectSearch;