// ============================================
// 📄 src/components/layout/UserDropdown.tsx
// ============================================
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { COLORS } from "../../constants/colors";

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", close);
    return () => {
      window.removeEventListener("mousedown", close);
    };
  }, []);

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        className="
          flex
          items-center
          gap-3
          rounded-xl
          px-2
          py-1.5
          transition-all
          duration-200
          hover:bg-slate-100
          active:scale-[0.98]
        "
      >
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            text-sm
            font-semibold
            text-white
            shadow-sm
            ring-2
            ring-white
          "
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, #7C3AED)`,
          }}
        >
          {initials}
        </div>
        <div className="hidden text-left lg:block">
          <p className="text-sm font-semibold leading-tight text-slate-800">
            {user.name}
          </p>
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {user.role}
          </p>
        </div>
        <ChevronDown
          size={16}
          className={`
            text-slate-400
            transition-transform
            duration-200
            ${open ? "rotate-180" : "rotate-0"}
          `}
        />
      </button>

      {open && (
        <div
          className="
            absolute
            right-0
            z-50
            mt-3
            w-64
            origin-top-right
            overflow-hidden
            rounded-2xl
            border
            border-slate-200/70
            bg-white/90
            shadow-xl
            shadow-slate-900/10
            backdrop-blur-xl
            backdrop-saturate-150
            animate-[fadeIn_0.15s_ease-out]
          "
        >
          <div className="border-b border-slate-100 p-4">
            <p className="truncate text-sm font-semibold text-slate-800">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-500">{user.email}</p>
            <p
              className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-wider"
              style={{
                color: COLORS.primary,
                backgroundColor: `${COLORS.accent}60`,
              }}
            >
              {user.role}
            </p>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-left
              text-[13.5px]
              text-slate-600
              transition-colors
              duration-150
              hover:bg-slate-50
              hover:text-slate-900
            "
          >
            <User size={17} className="text-slate-400" />
            Profile
          </button>

          <button
            onClick={() => {
              setOpen(false);
              navigate("/settings");
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-left
              text-[13.5px]
              text-slate-600
              transition-colors
              duration-150
              hover:bg-slate-50
              hover:text-slate-900
            "
          >
            <Settings size={17} className="text-slate-400" />
            Settings
          </button>

          <hr className="border-slate-100" />

          <button
            onClick={() => {
              setOpen(false);
              logout();
              navigate("/login", { replace: true });
            }}
            className="
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-left
              text-[13.5px]
              text-red-500
              transition-colors
              duration-150
              hover:bg-red-50
              hover:text-red-600
            "
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;