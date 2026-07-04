import { motion } from "framer-motion";
import {
  Rocket,
  UserPlus,
  ListChecks,
  TrendingUp,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";

const steps = [
  { title: "Create Project", icon: Rocket },
  { title: "Invite Team", icon: UserPlus },
  { title: "Assign Tasks", icon: ListChecks },
  { title: "Track Progress", icon: TrendingUp },
  { title: "Review RCA", icon: ClipboardCheck },
  { title: "Complete Project", icon: CheckCircle2 },
];

const Workflow = () => {
  return (
    <section id="workflow" className="relative py-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-16 max-w-2xl px-6 text-center"
      >
        <span className="text-sm font-semibold uppercase tracking-wider text-violet-600">
          Workflow
        </span>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
          How TeamFlow Works
        </h2>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Connecting line — visible on desktop where steps sit in a row */}
        <div className="absolute left-0 right-0 top-[4.5rem] hidden h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent lg:block" />

        <div className="flex flex-wrap justify-center gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group relative w-48 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-600/10"
            >
              <span className="absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 text-xs font-bold text-white shadow-md shadow-violet-600/30">
                {i + 1}
              </span>

              <step.icon className="mx-auto mb-3 mt-2 h-6 w-6 text-violet-600 transition-transform duration-300 group-hover:scale-110" />

              <p className="text-sm font-semibold text-slate-800">
                {step.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;