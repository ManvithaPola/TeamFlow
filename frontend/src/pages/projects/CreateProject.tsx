// ============================================
// 📄 src/pages/projects/CreateProject.tsx
// ============================================

import { ArrowLeft, FileText, CalendarRange, Sparkles } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useState, type ReactNode } from "react";

import { useProjects } from "../../hooks/useProjects";

const CreateProject = () => {
  const navigate = useNavigate();

  const { createProject } = useProjects();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Project title is required");
      return;
    }

    try {
      setLoading(true);

      await createProject(form);

      navigate("/projects");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      {/* ================================= */}
      {/* HERO HEADER */}
      {/* ================================= */}

      <div className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Ambient gradient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 420px at 12% -10%, rgba(91,33,182,0.10), transparent 60%), radial-gradient(700px 320px at 90% -20%, rgba(221,214,254,0.35), transparent 55%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 pt-10 pb-12 sm:px-10">
          <Link
            to="/projects"
            className="
              group mb-8 inline-flex items-center gap-2
              text-sm font-medium text-slate-500
              transition-all duration-200
              hover:gap-2.5 hover:text-[#5B21B6]
            "
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
            Back to Projects
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div
                className="
                  mb-4 inline-flex items-center gap-1.5 rounded-full
                  border border-[#DDD6FE] bg-[#DDD6FE]/40 px-3 py-1
                  text-xs font-semibold uppercase tracking-wide text-[#5B21B6]
                "
              >
                <Sparkles size={12} />
                New Project
              </div>

              <h1 className="font-['Poppins'] text-4xl font-bold tracking-tight text-[#111827]">
                Create Project
              </h1>

              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500">
                Set the details below to spin up a new workspace and start
                collaborating with your team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* FORM */}
      {/* ================================= */}

      <form
        onSubmit={handleSubmit}
        className="relative mx-auto max-w-5xl px-6 pt-10 sm:px-10"
      >
        <div className="grid gap-8 md:grid-cols-[220px_1fr]">
          {/* Step rail — reflects the two real sections below */}
          <div className="hidden md:block">
            <div className="sticky top-10 space-y-1">
              <RailItem
                icon={<FileText size={15} />}
                label="Basic Information"
                index="01"
                active
              />
              <div className="ml-[15px] h-6 w-px bg-slate-200" />
              <RailItem
                icon={<CalendarRange size={15} />}
                label="Timeline"
                index="02"
              />
            </div>
          </div>

          <div className="space-y-8">
            {/* Basic Info */}
            <section
              className="
                group rounded-3xl border border-slate-200 bg-white p-8
                shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                transition-shadow duration-300
                hover:shadow-[0_8px_30px_rgba(91,33,182,0.06)]
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DDD6FE]/50 text-[#5B21B6]">
                  <FileText size={17} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">
                    Basic Information
                  </h2>
                  <p className="text-sm text-slate-400">
                    What is this project about?
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Field label="Project Title">
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter project title"
                    className={inputStyles}
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    rows={5}
                    placeholder="Describe your project..."
                    className={`${inputStyles} resize-none`}
                  />
                </Field>
              </div>
            </section>

            {/* Timeline */}
            <section
              className="
                group rounded-3xl border border-slate-200 bg-white p-8
                shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                transition-shadow duration-300
                hover:shadow-[0_8px_30px_rgba(91,33,182,0.06)]
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#DDD6FE]/50 text-[#5B21B6]">
                  <CalendarRange size={17} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">
                    Timeline
                  </h2>
                  <p className="text-sm text-slate-400">
                    When does work begin and end?
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Start Date">
                  <input
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    type="date"
                    className={inputStyles}
                  />
                </Field>

                <Field label="End Date">
                  <input
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    type="date"
                    className={inputStyles}
                  />
                </Field>
              </div>
            </section>
          </div>
        </div>

        {/* ================================= */}
        {/* STICKY ACTION BAR */}
        {/* ================================= */}

        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-10">
            <div
              className="
                pointer-events-auto mb-6 flex items-center justify-end gap-4
                rounded-2xl border border-slate-200 bg-white/90 p-4
                shadow-[0_10px_40px_rgba(15,23,42,0.10)]
                backdrop-blur-md
              "
            >
              <span className="mr-auto hidden text-sm text-slate-400 sm:block">
                Changes are saved when you create the project
              </span>

              <Link
                to="/projects"
                className="
                  rounded-xl border border-slate-300 px-6 py-3
                  font-medium text-slate-700
                  transition-all duration-200
                  hover:border-slate-400 hover:bg-slate-100
                "
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="
                  relative overflow-hidden rounded-xl bg-[#5B21B6] px-6 py-3
                  font-medium text-white shadow-sm
                  transition-all duration-200
                  hover:-translate-y-0.5 hover:bg-[#4C1D95] hover:shadow-lg hover:shadow-[#5B21B6]/25
                  active:translate-y-0
                  disabled:opacity-60
disabled:cursor-not-allowed
                "
              >
                {loading ? "Creating..." : "Create Project"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// ============================================
// Shared styles & small building blocks
// ============================================

const inputStyles = `
  w-full rounded-xl border border-slate-200 bg-white px-4 py-3
  text-[#111827] placeholder:text-slate-400
  outline-none transition-all duration-200
  focus:border-[#5B21B6] focus:ring-4 focus:ring-[#5B21B6]/10
  hover:border-slate-300
`;

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {label}
    </label>
    {children}
  </div>
);

const RailItem = ({
  icon,
  label,
  index,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  index: string;
  active?: boolean;
}) => (
  <div className="flex items-center gap-3">
    <div
      className={`
        flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold
        transition-colors duration-200
        ${
          active
            ? "border-[#5B21B6] bg-[#5B21B6] text-white"
            : "border-slate-200 bg-white text-slate-400"
        }
      `}
    >
      {icon}
    </div>
    <div>
      <p
        className={`text-sm font-medium ${
          active ? "text-[#111827]" : "text-slate-400"
        }`}
      >
        {label}
      </p>
      <p className="text-xs text-slate-400">Section {index}</p>
    </div>
  </div>
);

export default CreateProject;
