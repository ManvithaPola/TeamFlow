import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, FolderKanban, CheckSquare, GitPullRequestArrow } from "lucide-react";

const PREVIEW_ROWS = [
  { icon: FolderKanban, label: "Projects", value: "12 active", tint: "from-violet-500/20 to-violet-500/5" },
  { icon: CheckSquare, label: "Tasks", value: "84 in progress", tint: "from-indigo-500/20 to-indigo-500/5" },
  { icon: GitPullRequestArrow, label: "RCA Workflow", value: "3 pending review", tint: "from-fuchsia-500/20 to-fuchsia-500/5" },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-32">
      {/* Ambient gradient mesh */}
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-drift-a absolute -left-20 top-0 h-96 w-96 rounded-full bg-violet-600/30 blur-[100px]" />
        <div className="animate-drift-b absolute right-0 top-20 h-[28rem] w-[28rem] rounded-full bg-indigo-600/25 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-violet-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_2px_rgba(167,139,250,0.8)]" />
            Now with real-time RCA workflows
          </div>

          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl">
            Manage Projects
            <br />
            <span className="bg-gradient-to-r from-violet-300 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Without the Chaos.
            </span>
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-slate-400">
            Organize projects, assign tasks, collaborate with your team, and
            streamline RCA workflows — all in one platform built for teams
            that move fast.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-700 px-8 py-4 font-semibold text-white shadow-lg shadow-violet-600/30 transition-shadow duration-200 hover:shadow-xl hover:shadow-violet-600/50"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10"
            >
              <PlayCircle className="h-4 w-4" />
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: -6 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{ rotateX: 2, rotateY: -2, scale: 1.01 }}
          style={{ perspective: 1000 }}
          className="relative"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-200">
                Dashboard Preview
              </h2>
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {PREVIEW_ROWS.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className={`flex items-center justify-between rounded-xl bg-gradient-to-r ${row.tint} border border-white/10 p-5`}
                >
                  <div className="flex items-center gap-3">
                    <row.icon className="h-5 w-5 text-violet-300" />
                    <span className="font-medium text-white">{row.label}</span>
                  </div>
                  <span className="text-sm text-slate-400">{row.value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Glow accent behind the card */}
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-violet-600/20 to-indigo-600/10 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;