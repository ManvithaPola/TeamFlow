// ============================================
// 📄 src/services/rca.service.ts
// ============================================

import api from "../api/axios";

import type {
  RCA,
  CreateRCARequest,
  UpdateRCARequest,
  ReviewRCARequest,
} from "../types/rca.types";

class RCAService {
  // ==========================================
  // GET ALL RCAs
  // ==========================================

  async getRCAs(): Promise<RCA[]> {
    const response = await api.get("/rcas");

    return response.data.data;
  }

  // ==========================================
  // GET RCA
  // ==========================================

  async getRCA(id: string): Promise<RCA> {
    const response = await api.get(`/rcas/${id}`);

    return response.data.data;
  }

  // ==========================================
  // CREATE RCA
  // ==========================================

  async createRCA(data: CreateRCARequest): Promise<RCA> {
    const response = await api.post("/rcas", data);

    return response.data.data;
  }

  // ==========================================
  // UPDATE RCA
  // ==========================================

  async updateRCA(id: string, data: UpdateRCARequest): Promise<RCA> {
    const response = await api.put(`/rcas/${id}`, data);

    return response.data.data;
  }

  // ==========================================
  // DELETE RCA
  // ==========================================

  async deleteRCA(id: string): Promise<void> {
    await api.delete(`/rcas/${id}`);
  }

  // ==========================================
  // GET RCAs BY PROJECT
  // ==========================================

  async getRCAsByProject(projectId: string): Promise<RCA[]> {
    const response = await api.get(`/rcas/project/${projectId}`);

    return response.data.data;
  }

  // ==========================================
  // SUBMIT RCA
  // ==========================================

  async submitRCA(id: string): Promise<RCA> {
    const response = await api.put(`/rcas/${id}/submit`);

    return response.data.data;
  }

  // ==========================================
  // REVIEW RCA
  // ==========================================

  async reviewRCA(id: string, data: ReviewRCARequest) {
    const response = await api.post(`/rcas/${id}/review`, data);

    return response.data.data;
  }

  // ==========================================
  // SUBMIT REVIEW
  // ==========================================

  async submitReview(
    rcaId: string,
    data: {
      status: "APPROVED" | "REJECTED";
      comment: string;
    },
  ) {
    const response = await api.post(`/rcas/${rcaId}/review`, data);

    return response.data.data;
  }

  // ==========================================
  // GET REVIEWS
  // ==========================================

  async getReviews(id: string) {
    const response = await api.get(`/rcas/${id}/reviews`);

    return response.data.data;
  }

  // ==========================================
  // CLOSE RCA
  // ==========================================

  async closeRCA(id: string): Promise<RCA> {
    const response = await api.put(`/rcas/${id}/close`);

    return response.data.data;
  }
}

export default new RCAService();
