// ============================================
// 📄 src/pages/rca/EditRCA.tsx
// ============================================

import { AlertTriangle, ArrowLeft, FolderKanban, Sparkles } from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { useRCAs } from "../../hooks/useRCAs";
import { useProjects } from "../../hooks/useProjects";

import type { UpdateRCARequest, Severity } from "../../types/rca.types";

const EditRCA = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { rca, getRCA, updateRCA } = useRCAs();

  const { projects, refresh } = useProjects();

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<UpdateRCARequest>({
    title: "",
    incident: "",
    severity: "MEDIUM",
    status: "DRAFT",
  });

  const [projectId, setProjectId] = useState("");

  // =====================================
  // LOAD RCA
  // =====================================

  useEffect(() => {
    if (id) {
      getRCA(id);
    }
  }, [id, getRCA]);

  // =====================================
  // LOAD PROJECTS
  // =====================================

  useEffect(() => {
    refresh();
  }, [refresh]);

  // =====================================
  // POPULATE FORM
  // =====================================

  useEffect(() => {
    if (!rca) return;

    setForm({
      title: rca.title,
      incident: rca.incident,
      severity: rca.severity,
      status: rca.status,
    });

    setProjectId(rca.projectId);
  }, [rca]);

  // =====================================
  // CHANGE
  // =====================================

  const handleChange = <K extends keyof UpdateRCARequest>(
    field: K,
    value: UpdateRCARequest[K],
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

    if (!id) return;

    try {
      setSaving(true);

      await updateRCA(id, form);

      navigate(`/rcas/${id}`);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
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

              <h1 className="mt-2 text-4xl font-bold">Edit RCA</h1>

              <p className="mt-2 text-slate-500">
                Update your Root Cause Analysis.
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
                  Update the incident information.
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
                  className="
      w-full
      rounded-xl
      border
      border-slate-200
      px-4
      py-3
      outline-none
      focus:border-[#5B21B6]
    "
                />
              </div>
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Project
                </label>

                <select
                  disabled
                  value={projectId}
                  className="
      w-full
      rounded-xl
      border
      border-slate-200
      bg-slate-100
      px-4
      py-3
      text-slate-500
    "
                >
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
      focus:border-[#5B21B6]
    "
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    handleChange(
                      "status",
                      e.target.value as UpdateRCARequest["status"],
                    )
                  }
                  className="
      w-full
      rounded-xl
      border
      border-slate-200
      px-4
      py-3
      outline-none
      focus:border-[#5B21B6]
    "
                >
                  <option value="DRAFT">Draft</option>

                  <option value="INVESTIGATING">Investigating</option>

                  <option value="SUBMITTED">Submitted</option>

                  <option value="UNDER_REVIEW">Under Review</option>

                  <option value="APPROVED">Approved</option>

                  <option value="CLOSED">Closed</option>
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
                  className="
      w-full
      rounded-xl
      border
      border-slate-200
      px-4
      py-3
      outline-none
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
                <h3 className="font-semibold">Save Changes</h3>

                <p className="text-sm text-slate-500">
                  Your RCA will be updated immediately.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => navigate(`/rcas/${id}`)}
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
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRCA;
