import { motion } from "framer-motion";
import {
  FolderKanban,
  CheckSquare,
  ShieldCheck,
  GitPullRequestArrow,
  Bell,
  BarChart3,
} from "lucide-react";

const features = [
  {
    title: "Project Management",
    icon: FolderKanban,
    description:
      "Plan, organize, and track every project from a single, unified workspace.",
  },
  {
    title: "Task Tracking",
    icon: CheckSquare,
    description:
      "Break work into tasks, assign owners, and watch progress update in real time.",
  },
  {
    title: "Role-Based Access",
    icon: ShieldCheck,
    description:
      "Control exactly who can view, edit, or approve work across your organization.",
  },
  {
    title: "RCA Workflow",
    icon: GitPullRequestArrow,
    description:
      "Document root cause analyses and route them through a structured approval flow.",
  },
  {
    title: "Notifications",
    icon: Bell,
    description:
      "Stay on top of every update with real-time alerts that reach the right person.",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    description:
      "Turn team activity into clear, actionable insight with built-in reporting.",
  },
];

const Features = () => {
  return (
    <section id="features" className="bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-violet-600">
            Features
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Everything your team needs
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-xl hover:shadow-violet-600/10"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 via-violet-600/0 to-indigo-600/0 opacity-0 transition-opacity duration-300 group-hover:from-violet-50 group-hover:to-indigo-50 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-md shadow-violet-600/25 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <feature.icon className="h-6 w-6" strokeWidth={2} />
                </div>

                <h3 className="text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;