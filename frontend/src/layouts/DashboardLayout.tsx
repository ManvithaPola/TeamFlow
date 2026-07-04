// ============================================
// 📄 src/layouts/DashboardLayout.tsx
// ============================================

import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import { COLORS } from "../constants/colors";

const DashboardLayout = () => {
  return (
    <div
      className="
        flex
        h-screen
        overflow-hidden
      "
      style={{
        background: COLORS.background,
      }}
    >
      {/* ====================================== */}
      {/* SIDEBAR */}
      {/* ====================================== */}

      <Sidebar />

      {/* ====================================== */}
      {/* MAIN CONTENT */}
      {/* ====================================== */}

      <div
        className="
          flex
          min-w-0
          flex-1
          flex-col
          overflow-hidden
        "
      >
        {/* ====================================== */}
        {/* NAVBAR */}
        {/* ====================================== */}

        <Navbar />

        {/* ====================================== */}
        {/* PAGE CONTENT */}
        {/* ====================================== */}

        <main
          className="
            flex-1
            overflow-y-auto
            px-8
            py-6
          "
          style={{
            background: COLORS.background,
          }}
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1700px]
            "
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;