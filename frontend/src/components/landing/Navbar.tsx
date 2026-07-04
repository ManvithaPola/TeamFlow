import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Workflow as WorkflowIcon } from "lucide-react";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Workflow", href: "#workflow" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-900 text-white shadow-lg shadow-violet-600/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
            <WorkflowIcon className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="bg-gradient-to-r from-violet-700 via-violet-600 to-indigo-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            TeamFlow
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-violet-700"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <button className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-violet-700">
              Login
            </button>
          </Link>

          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-600/25 transition-shadow duration-200 hover:shadow-lg hover:shadow-violet-600/40"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;