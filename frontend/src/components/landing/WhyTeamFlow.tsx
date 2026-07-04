import { motion } from "framer-motion";
import { Check } from "lucide-react";

const points = [
  "Centralized Project Management",
  "Task Dependencies",
  "Secure Role-Based Access",
  "RCA Approval Workflow",
  "Real-time Notifications",
  "Activity Tracking",
];

const WhyTeamFlow = () => {
  return (
    <section id="about" className="bg-slate-50 py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-violet-600">
            Why TeamFlow
          </span>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            Built for teams that ship
          </h2>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {points.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white/80 p-5 text-lg font-medium text-slate-700 backdrop-blur-sm transition-colors duration-200 hover:border-violet-200"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-sm shadow-violet-600/30">
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              {point}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTeamFlow;