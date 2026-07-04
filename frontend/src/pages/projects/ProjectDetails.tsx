// ============================================
// 📄 src/pages/projects/ProjectDetails.tsx
// ============================================

import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Pencil,
  MoreVertical,
  TrendingUp,
  ListChecks,
  Users,
  FileWarning,
  Plus,
  Trash2,
  UserPlus,
  FileSearch,
  BarChart3,
  CalendarClock,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import AddMemberDialog from "../../components/project-members/AddMemberDialog";

import RemoveMemberDialog from "../../components/project-members/RemoveMemberDialog";

import { useProjectMembers } from "../../hooks/useProjectMembers";

import type { ProjectMember } from "../../types/projectMember.types";

import { useProjects } from "../../hooks/useProjects";

import ProjectSkeleton from "../../components/projects/ProjectSkeleton";

const ProjectDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { project, loading, error, getProject, deleteProject } = useProjects();
  const { members, loadMembers } = useProjectMembers();

  const [showAddDialog, setShowAddDialog] = useState(false);

  const [removeMember, setRemoveMember] = useState<ProjectMember | null>(null);
  // ============================================
  // PROJECT STATISTICS
  // ============================================

  useEffect(() => {
    if (id) {
      getProject(id);
    }
  }, [id, getProject]);
  useEffect(() => {
    if (project) {
      loadMembers(project.id);
    }
  }, [project, loadMembers]);

  if (loading) {
    return <ProjectSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p>Project not found.</p>
      </div>
    );
  }
  const totalTasks = project.tasks.length;

  const completedTasks = project.tasks.filter(
    (task) => task.status === "DONE",
  ).length;

  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleDelete = async () => {
    if (!window.confirm("Delete this project?")) return;

    await deleteProject(project.id);

    navigate("/projects");
  };

  return (
    <div className="min-h-screen space-y-6 bg-[#F8FAFC] pb-16">
      {/* ================================= */}
      {/* BACK */}
      {/* ================================= */}

      <Link
        to="/projects"
        className="
          group inline-flex items-center gap-2
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

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <div
        className="
          relative overflow-hidden rounded-3xl border border-slate-200
          bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)]
        "
      >
        {/* Ambient gradient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 360px at 8% -20%, rgba(91,33,182,0.08), transparent 60%), radial-gradient(600px 280px at 96% -10%, rgba(221,214,254,0.4), transparent 55%)",
          }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-5">
            <span
              className={`
    inline-flex items-center gap-1.5 rounded-full
    px-3 py-1 text-xs font-semibold uppercase tracking-wide border
    ${
      project.status === "ACTIVE"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : project.status === "COMPLETED"
          ? "border-blue-200 bg-blue-50 text-blue-700"
          : project.status === "ON_HOLD"
            ? "border-amber-200 bg-amber-50 text-amber-700"
            : project.status === "ARCHIVED"
              ? "border-slate-300 bg-slate-100 text-slate-600"
              : "border-violet-200 bg-violet-50 text-violet-700"
    }
  `}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />

              {project.status.replace("_", " ")}
            </span>

            <div>
              <h1 className="font-['Poppins'] text-4xl font-bold tracking-tight text-[#111827]">
                {project.title}
              </h1>

              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-500">
                {project.description || "No description provided."}
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-1">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={17} className="text-[#5B21B6]" />
                {project.startDate
                  ? new Date(project.startDate).toLocaleDateString()
                  : "Not set"}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock3 size={17} className="text-[#5B21B6]" />
                Updated {new Date(project.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 gap-3">
            <Link
              to={`/projects/${project.id}/edit`}
              className="
                rounded-xl border border-slate-200 bg-white p-3
                text-slate-600 shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5 hover:border-[#5B21B6]/30 hover:bg-[#DDD6FE]/30 hover:text-[#5B21B6]
              "
              aria-label="Edit project"
            >
              <Pencil size={18} />
            </Link>
            <button
              onClick={handleDelete}
              className="
                rounded-xl border border-slate-200 bg-white p-3
                text-slate-600 shadow-sm
                transition-all duration-200
                hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50
              "
              aria-label="More options"
            >
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ================================= */}
      {/* ANALYTICS */}
      {/* ================================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <MetricCard
          icon={<TrendingUp size={18} />}
          label="Completion Rate"
          value={`${project.statistics?.progress ?? 0}%`}
          valueClass="text-[#5B21B6]"
          footer={<span className="text-slate-400">Project completion</span>}
        />

        <MetricCard
          icon={<ListChecks size={18} />}
          label="Open Tasks"
          value={String(
            project.statistics?.pendingTasks ?? project._count.tasks,
          )}
          footer={<span className="text-slate-400">Pending tasks</span>}
        />

        <MetricCard
          icon={<Users size={18} />}
          label="Members"
          value={String(project.members.length)}
          footer={<span className="text-slate-400">Team members</span>}
        />
      </div>

      {/* ================================= */}
      {/* OVERVIEW */}
      {/* ================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 xl:col-span-2">
          {/* Progress */}
          <Card>
            <div className="flex items-center justify-between">
              <SectionTitle icon={<BarChart3 size={18} />}>
                Project Progress
              </SectionTitle>

              <span className="text-lg font-bold text-[#5B21B6]">
                {progress}%
              </span>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#5B21B6] to-indigo-500 transition-all duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4">
              <Stat value={String(totalTasks)} label="Total Tasks" />

              <Stat
                value={String(completedTasks)}
                label="Completed"
                valueClass="text-emerald-600"
              />

              <Stat
                value={String(pendingTasks)}
                label="Pending"
                valueClass="text-amber-600"
              />
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <SectionTitle className="mb-6">Recent Activity</SectionTitle>

            <div className="space-y-5">
              <div className="rounded-xl border border-dashed border-slate-200 p-6 text-center">
                <p className="text-sm text-slate-500">
                  Activity timeline will appear here once project activity
                  logging is implemented.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Team */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Header */}

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Team Members
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {members.length} Members
                </p>
              </div>

              <button
                onClick={() => setShowAddDialog(true)}
                className="
        flex items-center gap-2
        rounded-xl
        bg-[#5B21B6]
        px-5
        py-2.5
        font-medium
        text-white
        transition
        hover:bg-[#4C1D95]
      "
              >
                <UserPlus size={18} />
                Add Member
              </button>
            </div>

            {/* Members */}

            <div className="space-y-4">
              {members.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center">
                  <p className="text-slate-500">No members added yet.</p>
                </div>
              ) : (
                members.map((member) => (
                  <div
                    key={member.id}
                    className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-4
            transition-all
            duration-200
            hover:border-violet-200
            hover:shadow-md
          "
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}

                      {member.user.avatar ? (
                        <img
                          src={member.user.avatar}
                          alt={member.user.name}
                          className="
                  h-14
                  w-14
                  rounded-full
                  object-cover
                  ring-2
                  ring-violet-100
                "
                        />
                      ) : (
                        <div
                          className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[#5B21B6]
                  to-indigo-600
                  text-lg
                  font-bold
                  text-white
                "
                        >
                          {member.user.name
                            .split(" ")
                            .map((word) => word[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                      )}

                      {/* Details */}

                      <div className="min-w-0 flex-1">
                        {/* Top */}

                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-lg font-semibold text-slate-900">
                              {member.user.name}
                            </h3>

                            <p className="truncate text-sm text-slate-500">
                              {member.user.email}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <button
                              className="
                      rounded-lg
                      p-2
                      text-slate-500
                      transition
                      hover:bg-blue-50
                      hover:text-blue-600
                    "
                            >
                              <Pencil size={18} />
                            </button>

                            <button
                              onClick={() => {
                                console.log("Member clicked:", member);
                                setRemoveMember(member);
                              }}
                              className="
    rounded-lg
    p-2
    text-slate-500
    transition
    hover:bg-red-50
    hover:text-red-600
  "
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        {/* Bottom */}

                        <div className="mt-4 flex items-center justify-between">
                          <span
                            className="
                    rounded-full
                    bg-violet-100
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-violet-700
                  "
                          >
                            {member.role}
                          </span>

                          <span className="text-xs text-slate-400">
                            Joined{" "}
                            {new Date(member.joinedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Timeline */}
          <Card>
            <SectionTitle className="mb-5" size="sm">
              Timeline
            </SectionTitle>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Start Date</span>

                <span className="font-medium text-[#111827]">
                  {project.startDate
                    ? new Date(project.startDate).toLocaleDateString()
                    : "Not set"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">End Date</span>

                <span className="font-medium text-[#111827]">
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString()
                    : "Not set"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Status</span>

                <span className="font-medium text-[#111827]">
                  {project.status.replace("_", " ")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400">Created</span>

                <span className="font-medium text-[#111827]">
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ================================= */}
      {/* TASKS + RCA */}
      {/* ================================= */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Recent Tasks */}
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <SectionTitle>Recent Tasks</SectionTitle>
            <ViewAllButton>View All</ViewAllButton>
          </div>

          <div className="space-y-4">
            {project.tasks.length === 0 ? (
              <p className="text-center text-slate-500 py-6">No tasks found.</p>
            ) : (
              project.tasks
                .slice(0, 5)
                .map((task) => (
                  <ListRow
                    key={task.id}
                    title={task.title}
                    subtitle={
                      task.assignee
                        ? `Assigned to ${task.assignee.name}`
                        : "Unassigned"
                    }
                    badge={
                      <Badge
                        tone={
                          task.status === "DONE"
                            ? "emerald"
                            : task.status === "IN_PROGRESS"
                              ? "blue"
                              : "amber"
                        }
                      >
                        {task.status.replace("_", " ")}
                      </Badge>
                    }
                  />
                ))
            )}
          </div>
        </Card>

        {/* Recent RCA */}
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <SectionTitle>Recent RCA</SectionTitle>
            <ViewAllButton>View All</ViewAllButton>
          </div>

          <div className="space-y-4">
            {project.rcas.length === 0 ? (
              <p className="py-6 text-center text-slate-500">No RCA reports.</p>
            ) : (
              project.rcas
                .slice(0, 5)
                .map((rca) => (
                  <ListRow
                    key={rca.id}
                    title={rca.title}
                    subtitle={new Date(rca.createdAt).toLocaleDateString()}
                    badge={
                      <Badge
                        tone={
                          rca.status === "APPROVED"
                            ? "emerald"
                            : rca.status === "UNDER_REVIEW"
                              ? "amber"
                              : "blue"
                        }
                      >
                        {rca.status.replace("_", " ")}
                      </Badge>
                    }
                  />
                ))
            )}
          </div>
        </Card>
      </div>

      {/* ================================= */}
      {/* UPCOMING DEADLINES */}
      {/* ================================= */}

      <Card>
        <div className="mb-6 flex items-center justify-between">
          <SectionTitle icon={<CalendarClock size={18} />}>
            Upcoming Deadlines
          </SectionTitle>
          <ViewAllButton>View Calendar</ViewAllButton>
        </div>

        <div className="space-y-4">
          {[
            { title: "Authentication Module", date: "Tomorrow" },
            { title: "Dashboard Review", date: "July 10" },
            { title: "Sprint Demo", date: "July 15" },
          ].map((deadline) => (
            <ListRow
              key={deadline.title}
              title={deadline.title}
              subtitle="Deadline"
              badge={<Badge tone="red">{deadline.date}</Badge>}
            />
          ))}
        </div>
      </Card>

      {/* ================================= */}
      {/* QUICK ACTIONS */}
      {/* ================================= */}

      <Card>
        <SectionTitle className="mb-6">Quick Actions</SectionTitle>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ActionTile
            icon={<Plus size={18} />}
            title="Create Task"
            description="Create a new project task."
            onClick={() => navigate("/tasks/create")}
          />

          <ActionTile
            icon={<UserPlus size={18} />}
            title="Add Member"
            description="Invite a team member."
            onClick={() => setShowAddDialog(true)}
          />

          <ActionTile
            icon={<FileWarning size={18} />}
            title="Create RCA"
            description="Start a Root Cause Analysis."
            onClick={() => navigate("/rcas/create")}
          />

          <ActionTile
            icon={<FileSearch size={18} />}
            title="View Reports"
            description="Open project analytics."
            onClick={() => navigate("/reports")}
          />
        </div>
      </Card>
      {showAddDialog && project && (
        <AddMemberDialog
          projectId={project.id}
          onClose={() => setShowAddDialog(false)}
          onAdded={() => {
            setShowAddDialog(false);
            loadMembers(project.id);
          }}
        />
      )}

      {removeMember && project && (
        <RemoveMemberDialog
          projectId={project.id}
          memberId={removeMember.id}
          memberName={removeMember.user.name}
          onClose={() => setRemoveMember(null)}
          onRemoved={() => {
            setRemoveMember(null);
            loadMembers(project.id);
          }}
        />
      )}
    </div>
  );
};

// ============================================
// Shared building blocks
// ============================================

const Card = ({ children }: { children: React.ReactNode }) => (
  <div
    className="
      rounded-3xl border border-slate-200 bg-white p-6
      shadow-[0_1px_2px_rgba(15,23,42,0.04)]
      transition-shadow duration-300
      hover:shadow-[0_8px_30px_rgba(91,33,182,0.06)]
    "
  >
    {children}
  </div>
);

const SectionTitle = ({
  children,
  icon,
  size = "lg",
  className = "",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: "lg" | "sm";
  className?: string;
}) => (
  <h2
    className={`flex items-center gap-2 font-['Poppins'] font-semibold text-[#111827] ${
      size === "lg" ? "text-xl" : "text-lg"
    } ${className}`}
  >
    {icon && <span className="text-[#5B21B6]">{icon}</span>}
    {children}
  </h2>
);

const MetricCard = ({
  icon,
  label,
  value,
  valueClass = "text-[#111827]",
  footer,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
  footer?: React.ReactNode;
}) => (
  <div
    className="
      rounded-3xl border border-slate-200 bg-white p-6
      shadow-[0_1px_2px_rgba(15,23,42,0.04)]
      transition-all duration-300
      hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(91,33,182,0.08)]
    "
  >
    <div className="flex items-center gap-2 text-sm text-slate-400">
      <span className="text-[#5B21B6]">{icon}</span>
      {label}
    </div>
    <h2 className={`mt-3 text-4xl font-bold tracking-tight ${valueClass}`}>
      {value}
    </h2>
    {footer && <p className="mt-3 text-sm">{footer}</p>}
  </div>
);

const Stat = ({
  value,
  label,
  valueClass = "text-[#111827]",
}: {
  value: string;
  label: string;
  valueClass?: string;
}) => (
  <div className="rounded-2xl bg-slate-50 p-4 text-center transition-colors duration-200 hover:bg-[#DDD6FE]/25">
    <p className={`text-2xl font-bold ${valueClass}`}>{value}</p>
    <p className="mt-1 text-sm text-slate-400">{label}</p>
  </div>
);

const Avatar = ({
  initial,
  filled = false,
}: {
  initial: string;
  filled?: boolean;
}) => (
  <div
    className={`
      flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold
      ${filled ? "bg-[#5B21B6] text-white" : "bg-[#DDD6FE]/60 text-[#5B21B6]"}
    `}
  >
    {initial}
  </div>
);

const Badge = ({
  tone,
  children,
}: {
  tone: "emerald" | "blue" | "amber" | "red";
  children: React.ReactNode;
}) => {
  const styles = {
    emerald: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    amber: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-600",
  }[tone];

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles}`}>
      {children}
    </span>
  );
};

const ListRow = ({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge: React.ReactNode;
}) => (
  <div
    className="
      flex items-center justify-between rounded-2xl border border-slate-100 p-4
      transition-all duration-200
      hover:-translate-y-0.5 hover:border-[#DDD6FE] hover:bg-[#F8FAFC]
    "
  >
    <div>
      <h4 className="font-medium text-[#111827]">{title}</h4>
      <p className="mt-1 text-sm text-slate-400">{subtitle}</p>
    </div>
    {badge}
  </div>
);

const ViewAllButton = ({ children }: { children: React.ReactNode }) => (
  <button
    className="
      text-sm font-medium text-[#5B21B6]
      transition-colors duration-200
      hover:text-[#4C1D95]
    "
  >
    {children}
  </button>
);

interface ActionTileProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

const ActionTile = ({ icon, title, description, onClick }: ActionTileProps) => (
  <button
    type="button"
    onClick={onClick}
    className="
      group
      flex
      w-full
      flex-col
      items-start
      gap-3
      rounded-2xl
      border
      border-slate-200
      bg-white
      p-5
      text-left
      transition-all
      duration-200
      hover:-translate-y-1
      hover:border-[#DDD6FE]
      hover:shadow-lg
    "
  >
    <div className="rounded-xl bg-[#DDD6FE]/40 p-3 text-[#5B21B6]">{icon}</div>

    <div>
      <h3 className="font-semibold text-[#111827]">{title}</h3>

      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  </button>
);

export default ProjectDetails;
