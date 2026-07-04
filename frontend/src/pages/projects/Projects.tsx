// ============================================
// 📄 src/pages/projects/Projects.tsx
// ============================================

import { useMemo, useState } from "react";

import ProjectToolbar from "../../components/projects/ProjectToolbar";
import ProjectGrid from "../../components/projects/ProjectGrid";
import ProjectEmpty from "../../components/projects/ProjectEmpty";
import ProjectSkeleton from "../../components/projects/ProjectSkeleton";

import { useProjects } from "../../hooks/useProjects";

import type { ProjectStatus } from "../../types/project.types";

const Projects = () => {
  const { projects, loading, error, refresh } = useProjects();

  // =====================================
  // UI STATE
  // =====================================

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<ProjectStatus | "ALL">("ALL");

  const [sort, setSort] = useState<"newest" | "oldest" | "name">("newest");

  const [view, setView] = useState<"grid" | "list">("grid");

  // =====================================
  // FILTERED PROJECTS
  // =====================================

  const filteredProjects = useMemo(() => {
    let data = [...projects];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      data = data.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query),
      );
    }

    // Status Filter
    if (status !== "ALL") {
      data = data.filter((project) => project.status === status);
    }

    // Sorting
    switch (sort) {
      case "name":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
    }

    return data;
  }, [projects, search, status, sort]);

  // =====================================
  // LOADING
  // =====================================

  if (loading) {
    return <ProjectSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
        <h2 className="text-lg font-semibold text-slate-800">{error}</h2>

        <button
          onClick={refresh}
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProjectToolbar
        projectCount={filteredProjects.length}
        search={search}
        onSearch={setSearch}
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
      />

      {filteredProjects.length === 0 ? (
        <ProjectEmpty />
      ) : (
        <ProjectGrid projects={filteredProjects} view={view} />
      )}
    </div>
  );
};

export default Projects;
