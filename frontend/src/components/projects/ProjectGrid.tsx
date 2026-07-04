// ============================================
// 📄 src/components/projects/ProjectGrid.tsx
// ============================================

import ProjectCard from "./ProjectCard";

import type { Project } from "../../types/project.types";

interface Props {
  projects: Project[];
  view: "grid" | "list";
}

const ProjectGrid = ({ projects, view }: Props) => {
  return (
    <div className="bg-[#F8FAFC]">
      <style>{`
      @keyframes projectCardFadeIn {
        from {
          opacity:0;
          transform:translateY(12px);
        }
        to{
          opacity:1;
          transform:translateY(0);
        }
      }

      .project-card-enter{
        opacity:0;
        animation:projectCardFadeIn 420ms cubic-bezier(0.16,1,0.3,1) forwards;
      }
    `}</style>

      {view === "grid" ? (
        <div
          className="
          grid
          grid-cols-1
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
        "
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card-enter"
              style={{
                animationDelay: `${index * 40}ms`,
              }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
        "
        >
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Project
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Created
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Members
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-5">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {project.title}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500 line-clamp-1">
                        {project.description}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className="
                      rounded-full
                      bg-violet-100
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-violet-700
                    "
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-600">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">{project.members.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProjectGrid;
