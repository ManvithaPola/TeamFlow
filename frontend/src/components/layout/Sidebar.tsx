// ============================================
// 📄 src/components/layout/Sidebar.tsx
// ============================================
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut, Boxes } from "lucide-react";
import { navigation } from "../../constants/navigation";
import { useSidebar } from "../../hooks/useSidebar";
import { useAuth } from "../../hooks/useAuth";
import { COLORS } from "../../constants/colors";

const ROLE_BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  admin: { bg: "#EDE9FE", text: "#6D28D9" },
  developer: { bg: "#DBEAFE", text: "#1D4ED8" },
  reviewer: { bg: "#FEF3C7", text: "#B45309" },
  manager: { bg: "#D1FAE5", text: "#047857" },
};

const getRoleBadge = (role: string) =>
  ROLE_BADGE_STYLES[role?.toLowerCase()] ?? { bg: "#F1F5F9", text: "#475569" };

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  const menu = navigation[user.role];
  const roleBadge = getRoleBadge(user.role);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Mobile backdrop — only relevant at <lg, closes drawer via existing toggle */}
      {!isCollapsed && (
        <div
          onClick={toggleSidebar}
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-slate-900/50 transition-opacity lg:hidden"
        />
      )}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-50
          flex
          h-screen
          shrink-0
          flex-col
          border-r
          border-white/[0.06]
          transition-all
          duration-300
          ease-in-out
          lg:static
          ${isCollapsed ? "w-20 max-lg:-translate-x-full" : "w-72 max-lg:w-72 max-lg:translate-x-0"}
        `}
        style={{ backgroundColor: COLORS.sidebar }}
      >
        {/* ====================================== */}
        {/* LOGO */}
        {/* ====================================== */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/[0.06] px-5">
          {!isCollapsed ? (
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold text-white"
                style={{ backgroundColor: COLORS.primary }}
              >
                TF
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-[15px] font-semibold tracking-tight text-white">
                  TeamFlow
                </h1>
                <p className="truncate text-[11px] text-slate-400">
                  Project Management Platform
                </p>
              </div>
            </div>
          ) : (
            <div
              className="mx-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold text-white"
              style={{ backgroundColor: COLORS.primary }}
            >
              TF
            </div>
          )}

          {!isCollapsed && (
            <button
              onClick={toggleSidebar}
              aria-label="Collapse sidebar"
              className="
                rounded-md
                p-1.5
                text-slate-400
                transition-colors
                duration-150
                hover:bg-white/[0.06]
                hover:text-white
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white/30
              "
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {isCollapsed && (
          <button
            onClick={toggleSidebar}
            aria-label="Expand sidebar"
            className="
              mx-auto
              mt-3
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-md
              text-slate-400
              transition-colors
              duration-150
              hover:bg-white/[0.06]
              hover:text-white
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white/30
            "
          >
            <ChevronRight size={16} />
          </button>
        )}

        {/* ====================================== */}
        {/* NAVIGATION */}
        {/* ====================================== */}
        <nav className="mt-4 flex flex-1 flex-col gap-1 overflow-y-auto px-3">
          {!isCollapsed && (
            <p className="mb-1 px-3 text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
              Main
            </p>
          )}

          {menu.sidebar.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.title}
                to={item.path}
                aria-label={item.title}
                className={({ isActive }) =>
                  `
                  group
                  relative
                  flex
                  items-center
                  ${isCollapsed ? "justify-center" : "justify-start"}
                  gap-3
                  rounded-[13px]
                  px-3
                  py-2.5
                  text-[13.5px]
                  font-medium
                  transition-all
                  duration-150
                  hover:scale-[1.01]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-white/30
                  ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:bg-white/[0.05] hover:text-slate-100"
                  }
                `
                }
                style={({ isActive }) =>
                  isActive ? { backgroundColor: COLORS.primary } : undefined
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-white/80" />
                    )}
                    <Icon size={18} className="shrink-0" strokeWidth={2} />
                    {!isCollapsed && (
                      <span className="truncate">{item.title}</span>
                    )}

                    {/* Tooltip — collapsed mode only */}
                    {isCollapsed && (
                      <span
                        className="
                          pointer-events-none
                          absolute
                          left-full
                          ml-3
                          whitespace-nowrap
                          rounded-lg
                          bg-slate-800
                          px-2.5
                          py-1.5
                          text-xs
                          font-medium
                          text-white
                          opacity-0
                          shadow-lg
                          transition-opacity
                          duration-150
                          group-hover:opacity-100
                          z-50
                        "
                      >
                        {item.title}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* ====================================== */}
        {/* USER + LOGOUT */}
        {/* ====================================== */}
        <div className="shrink-0 border-t border-white/[0.06] p-3">
          {!isCollapsed && (
            <div
              className="
                mb-2
                flex
                items-center
                gap-3
                rounded-[13px]
                px-2.5
                py-2.5
                transition-colors
                duration-150
                hover:bg-white/[0.05]
              "
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: COLORS.primary }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-slate-200">
                  {user.name}
                </p>
                <span
                  className="mt-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    backgroundColor: roleBadge.bg,
                    color: roleBadge.text,
                  }}
                >
                  {user.role}
                </span>
              </div>
            </div>
          )}

          {isCollapsed && (
            <div
              className="mb-2 flex items-center justify-center rounded-full"
              title={`${user.name} — ${user.role}`}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white"
                style={{ backgroundColor: COLORS.primary }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          <div className="my-1 border-t border-white/[0.06]" />

          <button
            onClick={handleLogout}
            aria-label="Logout"
            className={`
              group
              relative
              flex
              w-full
              items-center
              rounded-[13px]
              px-3
              py-2.5
              text-[13.5px]
              font-medium
              text-slate-400
              transition-all
              duration-150
              hover:scale-[1.01]
              hover:bg-red-500/10
              hover:text-red-400
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-400/40
              ${isCollapsed ? "justify-center" : "justify-start gap-3"}
            `}
          >
            <LogOut size={18} className="shrink-0" strokeWidth={2} />
            {!isCollapsed && <span>Logout</span>}

            {isCollapsed && (
              <span
                className="
                  pointer-events-none
                  absolute
                  left-full
                  ml-3
                  whitespace-nowrap
                  rounded-lg
                  bg-slate-800
                  px-2.5
                  py-1.5
                  text-xs
                  font-medium
                  text-white
                  opacity-0
                  shadow-lg
                  transition-opacity
                  duration-150
                  group-hover:opacity-100
                  z-50
                "
              >
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
