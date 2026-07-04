// ============================================
// 📄 src/components/dashboard/WelcomeBanner.tsx
// ============================================
import { motion } from "framer-motion";
import {
  CalendarDays,
  Sparkles,
  ArrowUpRight,
  Plus,
  Orbit,
  Radio,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const WelcomeBanner = () => {
  const { user } = useAuth();
  const hour = new Date().getHours();

  let greeting = "Good evening";
  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-[#0F172A] via-[#1B1140] to-[#2C1467] p-8 shadow-2xl md:p-10"
    >
      {/* Grid mesh backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(221,214,254,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(221,214,254,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 75% 75% at 25% 15%, black 40%, transparent 100%)",
        }}
      />

      {/* Glow orbs — primary + accent */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#5B21B6]/30 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-10 left-1/3 h-56 w-56 rounded-full bg-[#DDD6FE]/10 blur-[100px]" />

      {/* Futuristic scan sweep */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#DDD6FE]/[0.06] to-transparent"
        animate={{ x: ["-40%", "140%"] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 2,
        }}
      />

      <div className="relative flex flex-col justify-between gap-10 md:flex-row md:items-center">
        {/* Left */}
        <div className="max-w-xl">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#DDD6FE]" />
            <p className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.22em] text-[#DDD6FE]/70">
              TeamFlow Dashboard
            </p>
          </div>

          <h1 className="mt-4 font-['Poppins'] text-4xl font-bold leading-tight md:text-[2.75rem]">
            <span className="bg-gradient-to-r from-white via-white to-slate-300 bg-clip-text text-transparent">
              {greeting},{" "}
            </span>
            <span className="bg-gradient-to-r from-[#DDD6FE] to-[#A78BFA] bg-clip-text text-transparent">
              {user?.name ?? "User"}
            </span>
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Here's what's moving across your projects, tasks, RCA reviews and
            notifications today.
          </p>

          {/* Status pill */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-['JetBrains_Mono'] text-[11px] text-slate-300">
              All systems operational
            </span>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#5B21B6] to-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#5B21B6]/30 transition-shadow hover:shadow-xl hover:shadow-[#5B21B6]/50"
            >
              View Projects
              <ArrowUpRight
                size={15}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.button>

            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-2 rounded-xl border border-[#DDD6FE]/25 bg-white/[0.02] px-5 py-2.5 text-sm font-semibold text-[#DDD6FE] backdrop-blur-sm transition-colors hover:bg-[#F8FAFC]/5"
            >
              <Plus size={15} />
              Create Project
            </motion.button>
          </div>
        </div>

        {/* Right — illustration + info card */}
        <div className="relative mx-auto flex h-52 w-52 shrink-0 items-center justify-center md:mx-0">
          {/* Orbit rings */}
          <motion.div
            className="absolute h-52 w-52 rounded-full border border-[#DDD6FE]/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#DDD6FE] shadow-[0_0_12px_2px_rgba(221,214,254,0.6)]" />
          </motion.div>
          <motion.div
            className="absolute h-36 w-36 rounded-full border border-[#7C3AED]/25"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute -bottom-1 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#7C3AED] shadow-[0_0_10px_2px_rgba(124,58,237,0.6)]" />
          </motion.div>

          {/* Center node */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm">
            <Orbit size={22} className="text-[#DDD6FE]" />
          </div>

          {/* Floating glass info card (real data) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            whileHover={{ y: -3 }}
            className="absolute -bottom-6 -right-4 w-56 rounded-2xl border border-black/[0.04] bg-[#FFFFFF] p-4 shadow-2xl md:-right-10"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5B21B6]/10">
                <CalendarDays size={16} className="text-[#5B21B6]" />
              </div>
              <div>
                <p className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest text-slate-400">
                  Today
                </p>
                <h3 className="font-['Poppins'] text-[13px] font-semibold text-[#111827]">
                  {today}
                </h3>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-3 border-t border-[#111827]/[0.06] pt-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5B21B6]/10">
                <Radio size={16} className="text-[#5B21B6]" />
              </div>
              <div>
                <p className="font-['JetBrains_Mono'] text-[9px] uppercase tracking-widest text-slate-400">
                  Logged in as
                </p>
                <h2 className="font-['Poppins'] text-[13px] font-semibold text-[#111827]">
                  {user?.role}
                </h2>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
