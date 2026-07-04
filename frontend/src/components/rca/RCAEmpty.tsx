// ============================================
// 📄 src/components/rca/RCAEmpty.tsx
// ============================================

import {
  AlertTriangle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const RCAEmpty = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-slate-300
        bg-white
        px-8
        py-20
        text-center
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-violet-100
        "
      >
        <AlertTriangle
          size={30}
          className="text-[#5B21B6]"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        No RCAs Found
      </h2>

      <p className="mt-3 text-slate-500">
        Start documenting incidents by
        creating your first Root Cause
        Analysis.
      </p>

      <button
        onClick={() =>
          navigate("/rcas/create")
        }
        className="
          mt-8
          rounded-xl
          bg-[#5B21B6]
          px-6
          py-3
          font-medium
          text-white
          transition
          hover:bg-[#4C1D95]
        "
      >
        Create RCA
      </button>

    </div>
  );
};

export default RCAEmpty;