import { motion } from "framer-motion";
import { FolderKanban, CheckSquare, Users, GitPullRequestArrow } from "lucide-react";

const stats = [
  { number: "100+", label: "Projects", icon: FolderKanban },
  { number: "500+", label: "Tasks", icon: CheckSquare },
  { number: "50+", label: "Team Members", icon: Users },
  { number: "25+", label: "RCA Reports", icon: GitPullRequestArrow },
];

const Statistics = () => {
  return (
    <section className="relative bg-white py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 md:grid-cols-4">
        {stats.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/60 p-8 text-center transition-colors duration-300 hover:border-violet-200 hover:bg-violet-50/50"
          >
            <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-violet-600 to-indigo-600 transition-transform duration-300 group-hover:scale-x-100" />

            <item.icon className="mx-auto mb-3 h-6 w-6 text-violet-600 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

            <h2 className="bg-gradient-to-r from-violet-700 to-indigo-700 bg-clip-text text-4xl font-bold text-transparent">
              {item.number}
            </h2>

            <p className="mt-2 text-sm font-medium text-slate-500">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;