import { Workflow as WorkflowIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#0F172A] py-12 text-center">
      <div className="mx-auto flex flex-col items-center gap-3">
        <span className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-800 text-white">
            <WorkflowIcon className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-bold text-white">TeamFlow</span>
        </span>

        <p className="text-sm text-slate-500">
          Modern Project Management Platform
        </p>

        <p className="mt-4 text-xs text-slate-600">
          © 2026 TeamFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;