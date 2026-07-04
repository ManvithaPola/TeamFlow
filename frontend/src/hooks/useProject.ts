// ============================================
// 📄 src/hooks/useProjects.ts
// ============================================

import { useCallback, useEffect, useState } from "react";

import ProjectService from "../services/project.service";

import type {
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "../types/project.types";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // GET PROJECTS
  // ==========================================

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await ProjectService.getProjects();

      setProjects(data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ??
          "Failed to load projects.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ==========================================
  // CREATE PROJECT
  // ==========================================

  const createProject = async (
    data: CreateProjectRequest,
  ) => {
    const project =
      await ProjectService.createProject(data);

    setProjects((prev) => [project, ...prev]);

    return project;
  };

  // ==========================================
  // UPDATE PROJECT
  // ==========================================

  const updateProject = async (
    id: string,
    data: UpdateProjectRequest,
  ) => {
    const updated =
      await ProjectService.updateProject(
        id,
        data,
      );

    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? updated : project,
      ),
    );

    return updated;
  };

  // ==========================================
  // DELETE PROJECT
  // ==========================================

  const deleteProject = async (
    id: string,
  ) => {
    await ProjectService.deleteProject(id);

    setProjects((prev) =>
      prev.filter(
        (project) => project.id !== id,
      ),
    );
  };

  return {
    projects,

    loading,

    error,

    refresh,

    createProject,

    updateProject,

    deleteProject,
  };
};