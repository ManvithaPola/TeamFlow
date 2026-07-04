import api from "../api/axios";

import type {
  Comment,
  CreateCommentRequest,
  UpdateCommentRequest,
} from "../types/comment.types";

class CommentService {
  // ==========================================
  // GET COMMENTS
  // ==========================================

  async getComments(taskId: string): Promise<Comment[]> {
    const response = await api.get(`/tasks/${taskId}/comments`);

    return response.data.data;
  }

  // ==========================================
  // GET RCA COMMENTS
  // ==========================================

  async getRCAComments(rcaId: string): Promise<Comment[]> {
    const response = await api.get(`/rcas/${rcaId}/comments`);

    return response.data.data;
  }

  // ==========================================
  // CREATE RCA COMMENT
  // ==========================================

  async createRCAComment(
    rcaId: string,
    data: CreateCommentRequest,
  ): Promise<Comment> {
    const response = await api.post(`/rcas/${rcaId}/comments`, data);

    return response.data.data;
  }

  // ==========================================
  // CREATE COMMENT
  // ==========================================

  async createComment(
    taskId: string,
    data: CreateCommentRequest,
  ): Promise<Comment> {
    const response = await api.post(`/tasks/${taskId}/comments`, data);

    return response.data.data;
  }

  // ==========================================
  // UPDATE COMMENT
  // ==========================================

  async updateComment(
    id: string,
    data: UpdateCommentRequest,
  ): Promise<Comment> {
    const response = await api.put(`/comments/${id}`, data);

    return response.data.data;
  }

  // ==========================================
  // DELETE COMMENT
  // ==========================================

  async deleteComment(id: string): Promise<void> {
    await api.delete(`/comments/${id}`);
  }
}

export default new CommentService();
