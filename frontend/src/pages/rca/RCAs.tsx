// ============================================
// 📄 src/pages/rca/RCAs.tsx
// ============================================

import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useRCAs } from "../../hooks/useRCAs";

import RCAGrid from "../../components/rca/RCAGrid";
import RCAToolbar from "../../components/rca/RCAToolbar";
import RCAEmpty from "../../components/rca/RCAEmpty";
import RCASkeleton from "../../components/rca/RCASkeleton";

const RCAs = () => {
  const navigate = useNavigate();

  const {
    rcas,
    loading,
  } = useRCAs();

  if (loading) {
    return <RCASkeleton />;
  }

  return (
    <div className="space-y-8">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#111827]">
            Root Cause Analysis
          </h1>

          <p className="mt-2 text-slate-500">
            Create, manage and review RCA reports across projects.
          </p>

        </div>

        <button
          onClick={() => navigate("/rcas/create")}
          className="
            group
            inline-flex
            items-center
            gap-2
            rounded-xl
            bg-gradient-to-b
            from-[#7C3AED]
            to-[#5B21B6]
            px-5
            py-3
            font-medium
            text-white
            shadow-lg
            shadow-[#5B21B6]/20
            transition
            hover:-translate-y-0.5
          "
        >
          <Plus
            size={18}
            className="transition group-hover:rotate-90"
          />

          New RCA
        </button>

      </div>

      {/* ================================= */}
      {/* TOOLBAR */}
      {/* ================================= */}

      <RCAToolbar />

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      {rcas.length === 0 ? (
        <RCAEmpty />
      ) : (
        <RCAGrid rcas={rcas} />
      )}

    </div>
  );
};

export default RCAs;