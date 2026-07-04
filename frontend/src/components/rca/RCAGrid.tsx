// ============================================
// 📄 src/components/rca/RCAGrid.tsx
// ============================================

import type { RCA } from "../../types/rca.types";

import RCACard from "./RCACard";

interface Props {
  rcas: RCA[];
}

const RCAGrid = ({
  rcas,
}: Props) => {
  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {rcas.map((rca) => (
        <RCACard
          key={rca.id}
          rca={rca}
        />
      ))}
    </div>
  );
};

export default RCAGrid;