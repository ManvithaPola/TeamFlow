// ============================================
// 📄 src/components/rca/RCASkeleton.tsx
// ============================================

const RCASkeleton = () => {
  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {Array.from({ length: 6 }).map(
        (_, index) => (
          <div
            key={index}
            className="
              h-72
              animate-pulse
              rounded-3xl
              bg-slate-200
            "
          />
        ),
      )}
    </div>
  );
};

export default RCASkeleton;