import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#0F172A] py-24 text-center">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-drift-a absolute left-1/4 top-0 h-80 w-80 rounded-full bg-violet-600/30 blur-[100px]" />
        <div className="animate-drift-b absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-indigo-600/25 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-2xl px-6"
      >
        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Ready to streamline your workflow?
        </h2>

        <p className="mt-6 text-lg text-slate-400">
          Start managing your projects with TeamFlow today.
        </p>

        <Link to="/login">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-10 py-4 font-semibold text-violet-700 shadow-lg shadow-black/30 transition-shadow duration-200 hover:shadow-xl"
          >
            Get Started
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default CTA;