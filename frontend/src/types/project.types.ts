// ============================================
// 📄 src/types/project.types.ts
// ============================================

import type { UserRole } from "./auth.types";

// ============================================
// ENUMS
// ============================================

export type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "ARCHIVED";

// ============================================
// MEMBER
// ============================================

export interface ProjectMember {
  id: string;

  userId: string;

  projectId: string;

  role: UserRole;

  joinedAt: string;

  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    role: UserRole;
  };
}

// ============================================
// TASK
// ============================================

export interface ProjectTask {
  id: string;

  title: string;

  description?: string | null;

  status: string;

  priority?: string;

  dueDate?: string | null;

  createdAt: string;

  updatedAt?: string;
}

// ============================================
// RCA
// ============================================

export interface ProjectRCA {
  id: string;

  title: string;

  description?: string | null;

  status?: string;

  createdAt: string;

  updatedAt?: string;
}

// ============================================
// PROJECT
// ============================================

export interface Project {
  id: string;

  title: string;

  description?: string | null;

  status: ProjectStatus;

  startDate?: string | null;

  endDate?: string | null;

  createdAt: string;

  updatedAt: string;

  createdById: string;

  createdBy: {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    role: UserRole;
    theme?: string;
  };

  members: ProjectMember[];

  tasks: ProjectTask[];

  rcas: ProjectRCA[];

  _count?: {
    tasks: number;
    members: number;
    rcas: number;
  };

  statistics?: {
    totalMembers: number;

    totalTasks: number;

    completedTasks: number;

    pendingTasks: number;

    totalRCAs: number;

    progress: number;
  };
}

// ============================================
// CREATE PROJECT
// ============================================

export interface CreateProjectRequest {
  title: string;

  description?: string;

  status?: ProjectStatus;

  startDate?: string;

  endDate?: string;

  memberIds?: string[];
}

// ============================================
// UPDATE PROJECT
// ============================================

export interface UpdateProjectRequest {
  title?: string;

  description?: string;

  status?: ProjectStatus;

  startDate?: string;

  endDate?: string;
}

// ============================================
// RESPONSES
// ============================================

export interface ProjectsResponse {
  projects: Project[];
}

export interface ProjectResponse {
  project: Project;
}