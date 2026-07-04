// ============================================
// 📄 src/pages/projects/EditProject.tsx
// ============================================

import { useEffect, useState } from "react";
import ProjectSkeleton from "../../components/projects/ProjectSkeleton";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CalendarRange,
  Activity,
  AlertTriangle,
} from "lucide-react";

import { useProjects } from "../../hooks/useProjects";

import type { ProjectStatus } from "../../types/project.types";

const EditProject = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { project, loading, getProject, updateProject, deleteProject } =
    useProjects();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "PLANNING" as ProjectStatus,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (id) {
      getProject(id);
    }
  }, [id, getProject]);

  useEffect(() => {
    if (!project) return;

    setForm({
      title: project.title,
      description: project.description ?? "",
      status: project.status,
      startDate: project.startDate?.slice(0, 10) ?? "",
      endDate: project.endDate?.slice(0, 10) ?? "",
    });
  }, [project]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    try {
      setSaving(true);

      await updateProject(id, {
        title: form.title,
        description: form.description,
        status: form.status,
        startDate: form.startDate,
        endDate: form.endDate,
      });

      navigate(`/projects/${id}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    const ok = window.confirm("Delete this project?");

    if (!ok) return;

    await deleteProject(id);

    navigate("/projects");
  };

  if (loading) {
    return <ProjectSkeleton />;
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Project not found
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      {/* ================================= */}
      {/* HERO HEADER */}
      {/* ================================= */}

      <div className="relative overflow-hidden border-b border-slate-200 bg-white">
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
                <Activity size={12} />
                Editing Project
              </div>

              <h1 className="font-['Poppins'] text-4xl font-bold tracking-tight text-[#111827]">
                Edit Project
              </h1>

              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500">
                Update the details below. Changes apply as soon as you save.
              </p>
            </div>

            <StatusPill
              status={
                form.status === "ACTIVE"
                  ? "active"
                  : form.status === "ON_HOLD"
                    ? "on-hold"
                    : form.status === "COMPLETED"
                      ? "completed"
                      : "planning"
              }
            />
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
          {/* Step rail */}
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
              <div className="ml-[15px] h-6 w-px bg-slate-200" />
              <RailItem
                icon={<AlertTriangle size={15} />}
                label="Danger Zone"
                index="03"
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
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Enter project title"
                    className={inputStyles}
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    rows={5}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe your project..."
                    className={`${inputStyles} resize-none`}
                  />
                </Field>

                <Field label="Status">
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        { value: "planning", label: "Planning" },
                        { value: "active", label: "Active" },
                        { value: "on-hold", label: "On Hold" },
                        { value: "completed", label: "Completed" },
                        { value: "archived", label: "Archived" },
                      ] as const
                    ).map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            status: option.value
                              .toUpperCase()
                              .replace("-", "_") as ProjectStatus,
                          }))
                        }
                        className={`
                          rounded-xl border px-4 py-2 text-sm font-medium
                          transition-all duration-200
                          ${
                            form.status ===
                            option.value.toUpperCase().replace("-", "_")
                              ? "border-[#5B21B6] bg-[#5B21B6] text-white shadow-sm"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                          }
                        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
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
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </Field>

                <Field label="End Date">
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    className={inputStyles}
                  />
                </Field>
              </div>
            </section>

            {/* Danger Zone */}
            <section
              className="
                rounded-3xl border border-red-200 bg-red-50/40 p-8
                transition-shadow duration-300
                hover:shadow-[0_8px_30px_rgba(220,38,38,0.06)]
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <AlertTriangle size={17} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">
                    Danger Zone
                  </h2>
                  <p className="text-sm text-slate-400">
                    Irreversible actions for this project.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-red-200 bg-white p-5 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium text-[#111827]">
                    Delete this project
                  </p>
                  <p className="text-sm text-slate-400">
                    This permanently removes the project and all of its data.
                    This cannot be undone.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDelete}
                  className="
                    shrink-0 rounded-xl border border-red-300 bg-white px-5 py-2.5
                    text-sm font-medium text-red-600
                    transition-all duration-200
                    hover:border-red-400 hover:bg-red-50
                  "
                >
                  Delete Project
                </button>
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
                {id ? `Editing project ` : "Editing project"}
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
                disabled={saving}
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
                {saving ? "Saving..." : "Save Changes"}
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

const StatusPill = ({
  status,
}: {
  status:
    | "planning"
    | "active"
    | "on-hold"
    | "completed";
}) => {
  const styles = {
    planning:
      "bg-blue-50 text-blue-700 border-blue-200",

    active:
      "bg-emerald-50 text-emerald-700 border-emerald-200",

    "on-hold":
      "bg-amber-50 text-amber-700 border-amber-200",

    completed:
      "bg-slate-100 text-slate-600 border-slate-200",
  }[status];

  const label = {
    planning: "Planning",

    active: "Active",

    "on-hold": "On Hold",

    completed: "Completed",
  }[status];

  return (
    <div
      className={`inline-flex h-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${styles}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </div>
  );
};

export default EditProject;
