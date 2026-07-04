// ============================================
// 📄 UserPagination.tsx
// ============================================

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props {

  page: number;

  totalPages: number;

  onPageChange: (
    page: number,
  ) => void;

}

const UserPagination = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {

  if (totalPages <= 1) {
    return null;
  }

  return (

    <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">

      <button
        disabled={page === 1}
        onClick={() =>
          onPageChange(page - 1)
        }
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-100"
      >
        <ChevronLeft size={18} />

        Previous

      </button>

      <div className="flex items-center gap-2">

        {Array.from(
          {
            length: totalPages,
          },
          (_, i) => i + 1,
        ).map((number) => (

          <button
            key={number}
            onClick={() =>
              onPageChange(number)
            }
            className={`h-10 w-10 rounded-lg font-medium transition ${
              page === number
                ? "bg-[#5B21B6] text-white"
                : "hover:bg-slate-100"
            }`}
          >

            {number}

          </button>

        ))}

      </div>

      <button
        disabled={
          page === totalPages
        }
        onClick={() =>
          onPageChange(page + 1)
        }
        className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-slate-100"
      >

        Next

        <ChevronRight size={18} />

      </button>

    </div>

  );

};

export default UserPagination;