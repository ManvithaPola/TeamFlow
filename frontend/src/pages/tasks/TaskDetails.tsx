// ============================================
// 📄 src/pages/tasks/TaskDetails.tsx
// ============================================

import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Clock3,
  Pencil,
  Trash2,
  User,
  FolderKanban,
  Flag,
} from "lucide-react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect } from "react";

import { useTasks } from "../../hooks/useTasks";
import CommentList from "../../components/comments/CommentList";
import AttachmentList from "../../components/attachments/AttachmentList";
const TaskDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { task, loading, getTask, deleteTask } = useTasks();

  // =====================================
  // LOAD TASK
  // =====================================

  useEffect(() => {
    if (id) {
      getTask(id);
    }
  }, [id, getTask]);

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm(`Delete "${task?.title}"?`);

    if (!confirmed) return;

    await deleteTask(id);

    navigate("/tasks");
  };

  // =====================================
  // LOADING
  // =====================================

  if (loading || !task) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-slate-500">Loading task...</p>
      </div>
    );
  }

  // =====================================
  // PAGE
  // =====================================

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-16">
      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <div className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(1100px 420px at 12% -10%, rgba(91,33,182,0.10), transparent 60%), radial-gradient(700px 320px at 90% -20%, rgba(221,214,254,0.35), transparent 55%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-10 sm:px-10">
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
              hover:text-[#5B21B6]
            "
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back to Tasks
          </Link>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* LEFT */}

            <div>
              <div className="mb-4 flex flex-wrap gap-3">
                <Badge color="violet">{task.priority}</Badge>

                <Badge color="emerald">{task.status.replace("_", " ")}</Badge>
              </div>

              <h1 className="text-4xl font-bold text-[#111827]">
                {task.title}
              </h1>

              <p className="mt-4 max-w-3xl leading-7 text-slate-500">
                {task.description || "No description provided."}
              </p>
            </div>

            {/* RIGHT */}

            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/tasks/${task.id}/edit`)}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  font-medium
                  transition
                  hover:border-[#DDD6FE]
                  hover:bg-[#F3F0FF]
                "
              >
                <Pencil size={18} />
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-red-600
                  px-5
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-red-700
                "
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* CONTENT */}
      {/* ================================= */}

      <div className="mx-auto mt-10 max-w-7xl px-6 sm:px-10">
        <div className="grid gap-8 xl:grid-cols-3">
          {/* LEFT */}

          <div className="space-y-6 xl:col-span-2">
            {/* ================================= */}
            {/* TASK INFORMATION */}
            {/* ================================= */}

            <Card>
              <SectionTitle icon={<ClipboardList size={18} />}>
                Task Information
              </SectionTitle>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <InfoCard
                  icon={<FolderKanban size={18} />}
                  label="Project"
                  value={task.project.title}
                />

                <InfoCard
                  icon={<User size={18} />}
                  label="Assignee"
                  value={task.assignee?.name ?? "Unassigned"}
                />

                <InfoCard
                  icon={<User size={18} />}
                  label="Reporter"
                  value={task.reporter.name}
                />

                <InfoCard
                  icon={<Flag size={18} />}
                  label="Priority"
                  value={task.priority}
                />

                <InfoCard
                  icon={<CalendarDays size={18} />}
                  label="Due Date"
                  value={
                    task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "Not Set"
                  }
                />

                <InfoCard
                  icon={<Clock3 size={18} />}
                  label="Estimated Hours"
                  value={
                    task.estimatedHours
                      ? `${task.estimatedHours} hrs`
                      : "Not Estimated"
                  }
                />
              </div>
            </Card>

            {/* ================================= */}
            {/* DESCRIPTION */}
            {/* ================================= */}

            <Card>
              <SectionTitle>Description</SectionTitle>

              <div
                className="
                  mt-6
                  rounded-2xl
                  border
                  border-slate-100
                  bg-slate-50
                  p-6
                "
              >
                <p className="leading-8 text-slate-600">
                  {task.description || "No description available."}
                </p>
              </div>
            </Card>

            {/* ================================= */}
            {/* COMMENTS */}
            {/* ================================= */}

            <CommentList taskId={task.id} />
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            {/* ================================= */}
            {/* STATUS */}
            {/* ================================= */}

            <Card>
              <SectionTitle>Status</SectionTitle>

              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm text-slate-500">Current Status</span>

                  <Badge color="emerald">{task.status.replace("_", " ")}</Badge>
                </div>

                <div className="mb-5 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#5B21B6] to-indigo-500"
                    style={{
                      width:
                        task.status === "DONE"
                          ? "100%"
                          : task.status === "IN_PROGRESS"
                            ? "60%"
                            : task.status === "IN_REVIEW"
                              ? "85%"
                              : task.status === "BLOCKED"
                                ? "30%"
                                : "10%",
                    }}
                  />
                </div>

                <button
                  className="
                    w-full
                    rounded-xl
                    bg-[#5B21B6]
                    py-3
                    font-medium
                    text-white
                    transition
                    hover:bg-[#4C1D95]
                  "
                >
                  Change Status
                </button>
              </div>
            </Card>

            {/* ================================= */}
            {/* ATTACHMENTS */}
            {/* ================================= */}

            <AttachmentList taskId={task.id} />

            {/* ================================= */}
            {/* DEPENDENCIES */}
            {/* ================================= */}

            <Card>
              <SectionTitle>Dependencies</SectionTitle>

              <div className="mt-6 space-y-4">
                {task.outgoingRelations.length === 0 &&
                task.incomingRelations.length === 0 ? (
                  <p className="text-slate-400">No dependencies.</p>
                ) : (
                  <>
                    {task.outgoingRelations.map((relation) => (
                      <div
                        key={relation.id}
                        className="
                            rounded-xl
                            border
                            border-slate-200
                            p-4
                          "
                      >
                        <p className="text-xs text-slate-400">Depends On</p>

                        <p className="mt-1 font-medium">
                          {relation.targetTask.title}
                        </p>
                      </div>
                    ))}

                    {task.incomingRelations.map((relation) => (
                      <div
                        key={relation.id}
                        className="
                            rounded-xl
                            border
                            border-slate-200
                            p-4
                          "
                      >
                        <p className="text-xs text-slate-400">Blocking</p>

                        <p className="mt-1 font-medium">
                          {relation.sourceTask.title}
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </Card>

            {/* ================================= */}
            {/* QUICK ACTIONS */}
            {/* ================================= */}

            <Card>
              <SectionTitle>Quick Actions</SectionTitle>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => navigate(`/tasks/${task.id}/edit`)}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    py-3
                    font-medium
                    transition
                    hover:bg-[#F8F5FF]
                    hover:border-[#DDD6FE]
                  "
                >
                  Edit Task
                </button>

                <button
                  onClick={handleDelete}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-red-200
                    py-3
                    font-medium
                    text-red-600
                    transition
                    hover:bg-red-50
                  "
                >
                  Delete Task
                </button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HELPER COMPONENTS
// ============================================

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
    {children}
  </div>
);

const SectionTitle = ({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center gap-3">
    {icon && <div className="text-[#5B21B6]">{icon}</div>}

    <h2 className="text-xl font-semibold text-[#111827]">{children}</h2>
  </div>
);

const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
    <div className="mb-3 flex items-center gap-2 text-[#5B21B6]">
      {icon}
      <span className="text-sm font-medium text-slate-500">{label}</span>
    </div>

    <p className="font-semibold text-[#111827]">{value}</p>
  </div>
);

const Badge = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "emerald" | "violet" | "slate";
}) => {
  const styles = {
    emerald: "bg-emerald-100 text-emerald-700",
    violet: "bg-violet-100 text-violet-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-semibold ${styles[color]}`}
    >
      {children}
    </span>
  );
};

const Avatar = ({ initial }: { initial: string }) => (
  <div
    className="
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-full
      bg-[#5B21B6]
      font-semibold
      text-white
    "
  >
    {initial}
  </div>
);

export default TaskDetails;
