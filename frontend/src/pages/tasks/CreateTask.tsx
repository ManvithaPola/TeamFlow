// ============================================
// 📄 src/pages/tasks/CreateTask.tsx
// ============================================

import {
  ArrowLeft,
  ClipboardList,
  Users,
  CalendarRange,
  Sparkles,
} from "lucide-react";

import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { useEffect, useState } from "react";

import { useTasks } from "../../hooks/useTasks";
import { useProjects } from "../../hooks/useProjects";

import type {
  CreateTaskRequest,
  Priority,
} from "../../types/task.types";

const CreateTask = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const projectId = searchParams.get("project") ?? "";

  const { createTask } = useTasks();

  const { projects, getMembers } = useProjects();

  const [saving, setSaving] = useState(false);

  const [members, setMembers] = useState<any[]>([]);

  // =====================================
  // FORM
  // =====================================

  const [form, setForm] =
    useState<CreateTaskRequest>({
      title: "",

      description: "",

      priority: "MEDIUM",

      dueDate: "",

      estimatedHours: undefined,

      projectId,

      assigneeId: "",
    });

  // =====================================
  // LOAD PROJECT MEMBERS
  // =====================================

  useEffect(() => {
    const loadMembers = async () => {
      if (!form.projectId) {
        setMembers([]);
        return;
      }

      try {
        const data = await getMembers(
          form.projectId,
        );

        setMembers(data);
      } catch {
        setMembers([]);
      }
    };

    loadMembers();
  }, [form.projectId, getMembers]);

  // =====================================
  // HANDLE CHANGE
  // =====================================

  const handleChange = <
    K extends keyof CreateTaskRequest
  >(
    field: K,
    value: CreateTaskRequest[K],
  ) => {
    setForm((prev) => ({
      ...prev,

      [field]: value,
    }));
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      await createTask({
        ...form,

        estimatedHours:
          form.estimatedHours || undefined,

        assigneeId:
          form.assigneeId || undefined,

        dueDate:
          form.dueDate || undefined,
      });

      navigate("/tasks");
    } finally {
      setSaving(false);
    }
  };
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

        <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-10 sm:px-10">
          <Link
            to="/tasks"
            className="
              group
              mb-8
              inline-flex
              items-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              transition-all
              hover:gap-2.5
              hover:text-[#5B21B6]
            "
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back to Tasks
          </Link>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#DDD6FE]
                  bg-[#DDD6FE]/40
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-[#5B21B6]
                "
              >
                <Sparkles size={12} />
                New Task
              </div>

              <h1 className="font-['Poppins'] text-4xl font-bold tracking-tight text-[#111827]">
                Create Task
              </h1>

              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-500">
                Create a new task, assign it to a team member,
                set its priority and due date, and start tracking
                progress.
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
        className="relative mx-auto max-w-6xl px-6 pt-10 sm:px-10"
      >
        <div className="grid gap-8 md:grid-cols-[230px_1fr]">

          {/* ================================= */}
          {/* LEFT RAIL */}
          {/* ================================= */}

          <div className="hidden md:block">
            <div className="sticky top-10 space-y-1">

              <RailItem
                icon={<ClipboardList size={15} />}
                label="Task Details"
                index="01"
                active
              />

              <div className="ml-[15px] h-6 w-px bg-slate-200" />

              <RailItem
                icon={<Users size={15} />}
                label="Assignment"
                index="02"
              />

              <div className="ml-[15px] h-6 w-px bg-slate-200" />

              <RailItem
                icon={<CalendarRange size={15} />}
                label="Planning"
                index="03"
              />

            </div>
          </div>

          {/* ================================= */}
          {/* RIGHT CONTENT */}
          {/* ================================= */}

          <div className="space-y-8">
                        {/* ================================= */}
            {/* TASK DETAILS */}
            {/* ================================= */}

            <section
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                transition-shadow
                hover:shadow-[0_8px_30px_rgba(91,33,182,0.06)]
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDD6FE]/50 text-[#5B21B6]">
                  <ClipboardList size={18} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">
                    Task Details
                  </h2>

                  <p className="text-sm text-slate-400">
                    Give your task a meaningful title and description.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Field label="Task Title">
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      handleChange("title", e.target.value)
                    }
                    placeholder="Enter task title"
                    className={inputStyles}
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) =>
                      handleChange(
                        "description",
                        e.target.value,
                      )
                    }
                    placeholder="Describe the task..."
                    className={`${inputStyles} resize-none`}
                  />
                </Field>
              </div>
            </section>

            {/* ================================= */}
            {/* ASSIGNMENT */}
            {/* ================================= */}

            <section
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                transition-shadow
                hover:shadow-[0_8px_30px_rgba(91,33,182,0.06)]
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDD6FE]/50 text-[#5B21B6]">
                  <Users size={18} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">
                    Assignment
                  </h2>

                  <p className="text-sm text-slate-400">
                    Select the project and assign the task.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Field label="Project">
                  <select
                    value={form.projectId}
                    onChange={(e) =>
                      handleChange(
                        "projectId",
                        e.target.value,
                      )
                    }
                    className={inputStyles}
                  >
                    <option value="">
                      Select Project
                    </option>

                    {projects.map((project) => (
                      <option
                        key={project.id}
                        value={project.id}
                      >
                        {project.title}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Assignee">
                  <select
                    value={form.assigneeId}
                    onChange={(e) =>
                      handleChange(
                        "assigneeId",
                        e.target.value,
                      )
                    }
                    className={inputStyles}
                    disabled={!form.projectId}
                  >
                    <option value="">
                      Unassigned
                    </option>

                    {members.map((member) => (
                      <option
                        key={member.user.id}
                        value={member.user.id}
                      >
                        {member.user.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </section>

            {/* ================================= */}
            {/* PLANNING */}
            {/* ================================= */}

            <section
              className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-8
                shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                transition-shadow
                hover:shadow-[0_8px_30px_rgba(91,33,182,0.06)]
              "
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DDD6FE]/50 text-[#5B21B6]">
                  <CalendarRange size={18} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-[#111827]">
                    Planning
                  </h2>

                  <p className="text-sm text-slate-400">
                    Set the priority and schedule for this task.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Field label="Priority">
                  <select
                    value={form.priority}
                    onChange={(e) =>
                      handleChange(
                        "priority",
                        e.target.value as Priority,
                      )
                    }
                    className={inputStyles}
                  >
                    <option value="LOW">
                      🟢 Low
                    </option>

                    <option value="MEDIUM">
                      🟡 Medium
                    </option>

                    <option value="HIGH">
                      🟠 High
                    </option>

                    <option value="CRITICAL">
                      🔴 Critical
                    </option>
                  </select>
                </Field>

                <Field label="Due Date">
                  <input
                    type="date"
                    value={form.dueDate}
                    onChange={(e) =>
                      handleChange(
                        "dueDate",
                        e.target.value,
                      )
                    }
                    className={inputStyles}
                  />
                </Field>

                <Field label="Estimated Hours">
                  <input
                    type="number"
                    min={1}
                    value={form.estimatedHours ?? ""}
                    onChange={(e) =>
                      handleChange(
                        "estimatedHours",
                        e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      )
                    }
                    placeholder="8"
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
          <div className="mx-auto max-w-6xl px-6 sm:px-10">
            <div
              className="
                pointer-events-auto
                mb-6
                flex
                items-center
                justify-end
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white/90
                p-4
                shadow-[0_10px_40px_rgba(15,23,42,0.10)]
                backdrop-blur-md
              "
            >
              <span className="mr-auto hidden text-sm text-slate-400 sm:block">
                The task will be created after submission.
              </span>

              <Link
                to="/tasks"
                className="
                  rounded-xl
                  border
                  border-slate-300
                  px-6
                  py-3
                  font-medium
                  text-slate-700
                  transition-all
                  hover:border-slate-400
                  hover:bg-slate-100
                "
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="
                  rounded-xl
                  bg-[#5B21B6]
                  px-6
                  py-3
                  font-medium
                  text-white
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-[#4C1D95]
                  hover:shadow-lg
                  hover:shadow-[#5B21B6]/20
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {saving ? "Creating..." : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

// ============================================
// SHARED STYLES
// ============================================

const inputStyles = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
  py-3
  text-[#111827]
  placeholder:text-slate-400
  outline-none
  transition-all
  duration-200
  hover:border-slate-300
  focus:border-[#5B21B6]
  focus:ring-4
  focus:ring-[#DDD6FE]/60
`;

// ============================================
// FIELD
// ============================================

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

// ============================================
// LEFT RAIL
// ============================================

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
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-full
        border
        text-xs
        font-semibold
        transition-colors
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

      <p className="text-xs text-slate-400">
        Section {index}
      </p>
    </div>
  </div>
);

export default CreateTask;
          
             