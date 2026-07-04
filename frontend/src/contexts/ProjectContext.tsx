// ============================================
// 📄 src/contexts/ProjectContext.tsx
// ============================================

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import ProjectService from "../services/project.service";

import type {
  Project,
  ProjectMember,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "../types/project.types";

import type { UserRole } from "../types/auth.types";

// ============================================
// CONTEXT TYPE
// ============================================

interface ProjectContextType {
  projects: Project[];

  project: Project | null;

  loading: boolean;

  error: string | null;

  refresh: () => Promise<void>;

  getProject: (id: string) => Promise<void>;

  createProject: (data: CreateProjectRequest) => Promise<void>;

  updateProject: (id: string, data: UpdateProjectRequest) => Promise<void>;

  deleteProject: (id: string) => Promise<void>;

  getMembers: (projectId: string) => Promise<ProjectMember[]>;

  addMember: (
    projectId: string,
    userId: string,
    role: UserRole,
  ) => Promise<void>;

  removeMember: (projectId: string, userId: string) => Promise<void>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(
  undefined,
);

// ============================================
// PROVIDER
// ============================================

interface Props {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: Props) => {
  // ========================================
  // STATE
  // ========================================

  const [projects, setProjects] = useState<Project[]>([]);

  const [project, setProject] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // ========================================
  // GET ALL PROJECTS
  // ========================================

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const data = await ProjectService.getProjects();

      setProjects(data);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // GET SINGLE PROJECT
  // ========================================

  // ========================================
  // GET SINGLE PROJECT
  // ========================================

  const getProject = useCallback(async (id: string) => {
    try {
      setLoading(true);

      setError(null);

      const data = await ProjectService.getProject(id);

      setProject(data);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to fetch project");
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    refresh();
  }, [refresh]);
  // ========================================
  // CREATE PROJECT
  // ========================================

  const createProject = async (data: CreateProjectRequest) => {
    try {
      setLoading(true);

      setError(null);

      await ProjectService.createProject(data);

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to create project");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // UPDATE PROJECT
  // ========================================

  // const updateProject = async (id: string, data: UpdateProjectRequest) => {
  //   try {
  //     setLoading(true);

  //     setError(null);

  //     const updated = await ProjectService.updateProject(id, data);
  //     await getProject(id);

  //     await refresh();
  //   } catch (err: any) {
  //     setError(err.response?.data?.message ?? "Failed to update project");

  //     throw err;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const updateProject = async (id: string, data: UpdateProjectRequest) => {
    try {
      console.log("Updating project:", data);

      setLoading(true);
      setError(null);

      const updated = await ProjectService.updateProject(id, data);

      console.log("Updated project:", updated);

      await getProject(id);

      await refresh();
    } catch (err) {
      console.error("Update failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // DELETE PROJECT
  // ========================================

  const deleteProject = async (id: string) => {
    try {
      setLoading(true);

      setError(null);

      await ProjectService.deleteProject(id);

      if (project?.id === id) {
        setProject(null);
      }

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to delete project");

      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // GET MEMBERS
  // ========================================

  const getMembers = async (projectId: string): Promise<ProjectMember[]> => {
    try {
      return await ProjectService.getMembers(projectId);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to fetch members");

      return [];
    }
  };

  // ========================================
  // ADD MEMBER
  // ========================================

  const addMember = async (
    projectId: string,
    userId: string,
    role: UserRole,
  ) => {
    try {
      await ProjectService.addMember(projectId, userId, role);

      if (project?.id === projectId) {
        await getProject(projectId);
      }

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to add member");

      throw err;
    }
  };

  // ========================================
  // REMOVE MEMBER
  // ========================================

  const removeMember = async (projectId: string, userId: string) => {
    try {
      await ProjectService.removeMember(projectId, userId);

      if (project?.id === projectId) {
        await getProject(projectId);
      }

      await refresh();
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to remove member");

      throw err;
    }
  };

  // ========================================
  // PROVIDER
  // ========================================

  return (
    <ProjectContext.Provider
      value={{
        projects,

        project,

        loading,

        error,

        refresh,

        getProject,

        createProject,

        updateProject,

        deleteProject,

        getMembers,

        addMember,

        removeMember,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectProvider;
