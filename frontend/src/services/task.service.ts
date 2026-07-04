// ============================================
// 📄 src/services/task.service.ts
// ============================================

import api from "../api/axios";

import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
  ChangeTaskStatusRequest,
  AssignTaskRequest,
} from "../types/task.types";

class TaskService {
  // ==========================================
  // GET ALL TASKS
  // ==========================================

  async getTasks(): Promise<Task[]> {
    const response = await api.get("/tasks");

    return response.data.data;
  }

  // ==========================================
  // GET TASK BY ID
  // ==========================================

  async getTask(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);

    return response.data.data;
  }

  // ==========================================
  // CREATE TASK
  // ==========================================

  async createTask(
    data: CreateTaskRequest,
  ): Promise<Task> {
    const response = await api.post(
      "/tasks",
      data,
    );

    return response.data.data;
  }

  // ==========================================
  // UPDATE TASK
  // ==========================================

  async updateTask(
    id: string,
    data: UpdateTaskRequest,
  ): Promise<Task> {
    const response = await api.put(
      `/tasks/${id}`,
      data,
    );

    return response.data.data;
  }

  // ==========================================
  // DELETE TASK
  // ==========================================

  async deleteTask(
    id: string,
  ): Promise<void> {
    await api.delete(`/tasks/${id}`);
  }

  // ==========================================
  // GET TASKS BY PROJECT
  // ==========================================

  async getTasksByProject(
    projectId: string,
  ): Promise<Task[]> {
    const response = await api.get(
      `/tasks/project/${projectId}`,
    );

    return response.data.data;
  }

  // ==========================================
  // GET TASKS BY ASSIGNEE
  // ==========================================

  async getTasksByAssignee(
    userId: string,
  ): Promise<Task[]> {
    const response = await api.get(
      `/tasks/assignee/${userId}`,
    );

    return response.data.data;
  }

  // ==========================================
  // CHANGE TASK STATUS
  // ==========================================

  async changeStatus(
    id: string,
    data: ChangeTaskStatusRequest,
  ): Promise<Task> {
    const response = await api.patch(
      `/tasks/${id}/status`,
      data,
    );

    return response.data.data;
  }

  // ==========================================
  // ASSIGN TASK
  // ==========================================

  async assignTask(
    id: string,
    data: AssignTaskRequest,
  ): Promise<Task> {
    const response = await api.patch(
      `/tasks/${id}/assign`,
      data,
    );

    return response.data.data;
  }
}

export default new TaskService();