// ============================================
// 📄 src/components/layout/Navbar.tsx
// ============================================

import { Menu, Search } from "lucide-react";

import { useSidebar } from "../../hooks/useSidebar";
import NotificationDropdown from "./NotificationDropdown";
import UserDropdown from "./UserDropdown";
import { COLORS } from "../../constants/colors";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-20
        items-center
        justify-between
        gap-4
        border-b
        border-slate-200/70
        bg-white/70
        px-6
        backdrop-blur-xl
        backdrop-saturate-150
        shadow-[0_1px_2px_rgba(15,23,42,0.04)]
        lg:px-8
      "
    >
      {/* ====================================== */}
      {/* LEFT */}
      {/* ====================================== */}

      <div className="flex flex-1 items-center gap-4">
        {/* Sidebar Toggle */}

        <button
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
          className="
            group
            rounded-xl
            p-2.5
            text-slate-500
            transition-all
            duration-200
            hover:scale-105
            hover:bg-slate-100
            hover:text-[color:var(--color-primary)]
            active:scale-95
          "
          style={
            {
              "--color-primary": COLORS.primary,
            } as React.CSSProperties
          }
        >
          <Menu
            size={22}
            className="transition-transform duration-200 group-hover:rotate-6"
          />
        </button>

        {/* Search */}

        {/* <div
          className="
            hidden
            md:flex
            items-center
            gap-3
            rounded-xl
            border
            border-slate-200
            bg-slate-50/80
            px-4
            py-2.5
            transition-all
            duration-200
            focus-within:border-transparent
            focus-within:bg-white
            focus-within:shadow-[0_0_0_3px_var(--ring-color)]
            focus-within:ring-0
          "
          style={
            {
              "--ring-color": `${COLORS.accent}80`,
            } as React.CSSProperties
          }
        >
          <Search size={18} className="text-slate-400" />

          <input
            type="text"
            placeholder="Search projects, tasks, RCA..."
            className="
              w-72
              bg-transparent
              text-sm
              text-slate-900
              placeholder:text-slate-400
              outline-none
            "
          />
        </div> */}
      </div>

      {/* ====================================== */}
      {/* RIGHT */}
      {/* ====================================== */}

      <div className="flex items-center gap-4">
        <NotificationDropdown />

        <div className="h-8 w-px bg-slate-200" />

        <UserDropdown />
      </div>
    </header>
  );
};

export default Navbar;
