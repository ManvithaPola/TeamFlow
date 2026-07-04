// ============================================
// 📄 src/services/project.service.ts
// ============================================

import api from "../api/axios";

import type {
  Project,
  ProjectMember,
  CreateProjectRequest,
  UpdateProjectRequest,
} from "../types/project.types";

class ProjectService {
  // ==========================================
  // GET ALL PROJECTS
  // ==========================================

  async getProjects(): Promise<Project[]> {
    const response = await api.get("/projects");

    return response.data.data;
  }

  // ==========================================
  // GET PROJECT BY ID
  // ==========================================

  async getProject(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);

    return response.data.data;
  }

  // ==========================================
  // CREATE PROJECT
  // ==========================================

  async createProject(data: CreateProjectRequest): Promise<Project> {
    const response = await api.post("/projects", data);

    return response.data.data;
  }

  // ==========================================
  // UPDATE PROJECT
  // ==========================================

  async updateProject(
    id: string,
    data: UpdateProjectRequest,
  ): Promise<Project> {
    const response = await api.put(`/projects/${id}`, data);

    return response.data.data;
  }

  // ==========================================
  // DELETE PROJECT
  // ==========================================

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }

  // ==========================================
  // GET PROJECT MEMBERS
  // ==========================================

  async getMembers(projectId: string): Promise<ProjectMember[]> {
    const response = await api.get(`/projects/${projectId}/members`);

    return response.data.data;
  }

  // ==========================================
  // ADD PROJECT MEMBER
  // ==========================================

  async addMember(
    projectId: string,
    userId: string,
    role: string,
  ): Promise<ProjectMember> {
    const response = await api.post(`/projects/${projectId}/members`, {
      userId,
      role,
    });

    return response.data.data;
  }

  // ==========================================
  // REMOVE PROJECT MEMBER
  // ==========================================

  async removeMember(projectId: string, userId: string): Promise<void> {
    await api.delete(`/projects/${projectId}/members/${userId}`);
  }
}

export default new ProjectService();
