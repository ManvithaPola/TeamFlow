// ============================================
// 📄 src/components/analytics/AnalyticsHeader.tsx
// ============================================

import {
  BarChart3,
} from "lucide-react";

const AnalyticsHeader = () => {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-3xl
        bg-gradient-to-r
        from-[#5B21B6]
        to-[#7C3AED]
        px-8
        py-8
        text-white
      "
    >
      <div>

        <p className="text-sm opacity-80">
          Live Reporting
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Reports & Analytics
        </h1>

        <p className="mt-2 text-sm opacity-80">
          Dashboard figures reflect live data in real time.
        </p>

      </div>

      <div
        className="
          rounded-3xl
          bg-white/20
          p-5
        "
      >
        <BarChart3 size={42} />
      </div>

    </div>
  );
};

export default AnalyticsHeader;