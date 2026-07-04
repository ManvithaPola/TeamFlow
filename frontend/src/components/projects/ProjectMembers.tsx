// ============================================
// 📄 src/components/projects/ProjectMembers.tsx
// ============================================

import type { ProjectMember } from "../../types/project.types";

interface Props {
  members: ProjectMember[];
  maxVisible?: number;
  showCount?: boolean;
}

const ProjectMembers = ({
  members,
  maxVisible = 5,
  showCount = true,
}: Props) => {
  const visibleMembers = members.slice(0, maxVisible);
  const remaining = members.length - maxVisible;

  return (
    <div className="flex items-center justify-between">
      {/* Members */}
      <div className="flex items-center">
        {visibleMembers.map((member, index) => (
          <div
            key={member.id}
            className="
              -ml-3 first:ml-0
              transition-transform duration-200 ease-out
              hover:z-20 hover:-translate-y-0.5 hover:scale-110
            "
            style={{ zIndex: visibleMembers.length - index }}
            title={member.user.name}
          >
            {member.user.avatar ? (
              <img
                src={member.user.avatar}
                alt={member.user.name}
                className="
                  h-10 w-10 rounded-full
                  border-2 border-white object-cover
                  shadow-sm
                  ring-1 ring-slate-200/60
                  transition-shadow duration-200
                  hover:shadow-md
                "
              />
            ) : (
              <div
                className="
                  flex h-10 w-10 items-center justify-center rounded-full
                  border-2 border-white bg-gradient-to-br from-[#5B21B6] to-indigo-600
                  text-sm font-semibold text-white
                  shadow-sm ring-1 ring-slate-200/60
                  transition-shadow duration-200
                  hover:shadow-md
                "
              >
                {member.user.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
            )}
          </div>
        ))}

        {remaining > 0 && (
          <div
            className="
              -ml-3 flex h-10 w-10 items-center justify-center rounded-full
              border-2 border-white bg-slate-100 text-xs font-semibold text-slate-600
              shadow-sm ring-1 ring-slate-200/60
              transition-transform duration-200 ease-out
              hover:z-20 hover:-translate-y-0.5 hover:scale-110 hover:bg-slate-200
            "
            title={`${remaining} more member${remaining !== 1 ? "s" : ""}`}
          >
            +{remaining}
          </div>
        )}
      </div>

      {/* Count */}
      {showCount && (
        <span className="text-sm font-medium text-slate-400">
          {members.length} Member{members.length !== 1 && "s"}
        </span>
      )}
    </div>
  );
};

export default ProjectMembers;