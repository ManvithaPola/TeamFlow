// ============================================
// 📄 src/pages/rca/CreateRCA.tsx
// ============================================

import { AlertTriangle, ArrowLeft, FolderKanban, Sparkles } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import { useRCAs } from "../../hooks/useRCAs";
import { useProjects } from "../../hooks/useProjects";

import type { CreateRCARequest, Severity } from "../../types/rca.types";

const CreateRCA = () => {
  const navigate = useNavigate();

  const { createRCA } = useRCAs();

  const { projects, refresh } = useProjects();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<CreateRCARequest>({
    title: "",
    incident: "",
    severity: "MEDIUM",
    projectId: "",
  });

  // =====================================
  // LOAD PROJECTS
  // =====================================

  useEffect(() => {
    refresh();
  }, [refresh]);

  // =====================================
  // CHANGE
  // =====================================

  const handleChange = <K extends keyof CreateRCARequest>(
    field: K,
    value: CreateRCARequest[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);

      await createRCA(form);

      navigate("/rcas");
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HERO */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <Link
            to="/rcas"
            className="
              mb-8
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              transition
              hover:text-[#5B21B6]
            "
          >
            <ArrowLeft size={16} />
            Back to RCAs
          </Link>

          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#F3F0FF]
              "
            >
              <AlertTriangle size={28} className="text-[#5B21B6]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#5B21B6]" />

                <span className="text-sm font-medium text-[#5B21B6]">
                  Root Cause Analysis
                </span>
              </div>

              <h1 className="mt-2 text-4xl font-bold text-[#111827]">
                Create RCA
              </h1>

              <p className="mt-2 text-slate-500">
                Document incidents and perform structured root cause analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ================================= */}
          {/* RCA DETAILS */}
          {/* ================================= */}

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8 flex items-center gap-3">
              <div
                className="
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-xl
        bg-[#F3F0FF]
      "
              >
                <FolderKanban size={20} className="text-[#5B21B6]" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">RCA Details</h2>

                <p className="text-sm text-slate-500">
                  Provide the incident information.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-slate-700">
                  RCA Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Payment Failure Investigation"
                  className="
      w-full
      rounded-xl
      border
      border-slate-200
      px-4
      py-3
      outline-none
      transition
      focus:border-[#5B21B6]
    "
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Project
                </label>

                <select
                  value={form.projectId}
                  onChange={(e) => handleChange("projectId", e.target.value)}
                  className="
      w-full
      rounded-xl
      border
      border-slate-200
      px-4
      py-3
      outline-none
      transition
      focus:border-[#5B21B6]
    "
                >
                  <option value="">Select Project</option>

                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Severity
                </label>

                <select
                  value={form.severity}
                  onChange={(e) =>
                    handleChange("severity", e.target.value as Severity)
                  }
                  className="
      w-full
      rounded-xl
      border
      border-slate-200
      px-4
      py-3
      outline-none
      transition
      focus:border-[#5B21B6]
    "
                >
                  <option value="LOW">LOW</option>

                  <option value="MEDIUM">MEDIUM</option>

                  <option value="HIGH">HIGH</option>

                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block font-medium text-slate-700">
                  Incident Description
                </label>

                <textarea
                  rows={8}
                  value={form.incident}
                  onChange={(e) => handleChange("incident", e.target.value)}
                  placeholder="Describe the incident, its impact, timeline, affected users and observations..."
                  className="
      w-full
      rounded-xl
      border
      border-slate-200
      px-4
      py-3
      outline-none
      transition
      focus:border-[#5B21B6]
    "
                />
              </div>
            </div>
          </div>
          <div
            className="
    sticky
    bottom-0
    rounded-3xl
    border
    border-slate-200
    bg-white
    p-6
    shadow-lg
  "
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Ready to Create?</h3>

                <p className="text-sm text-slate-500">
                  The RCA will be created as a Draft.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/rcas")}
                  className="
          rounded-xl
          border
          border-slate-200
          px-6
          py-3
          font-medium
        "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="
          rounded-xl
          bg-gradient-to-r
          from-[#7C3AED]
          to-[#5B21B6]
          px-6
          py-3
          font-medium
          text-white
        "
                >
                  {saving ? "Creating..." : "Create RCA"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRCA;
