// ============================================
// 📄 src/services/user.service.ts
// ============================================

import api from "../api/axios";

import type {
  User,
  UserResponse,
  CreateUserDTO,
  UpdateUserDTO,
  UserFilters,
} from "../types/user.types";

class UserService {

  // ==========================================
  // GET USERS
  // ==========================================

  async getUsers(
    filters: UserFilters,
  ) {

    const response =
      await api.get<UserResponse>(
        "/users",
        {
          params: filters,
        },
      );

    return response.data.data;

  }

  // ==========================================
  // GET USER
  // ==========================================

  async getUser(
    id: string,
  ) {

    const response =
      await api.get<{
        success: boolean;

        data: User;
      }>(`/users/${id}`);

    return response.data.data;

  }

  // ==========================================
  // CREATE
  // ==========================================

  async createUser(
    data: CreateUserDTO,
  ) {

    const response =
      await api.post(
        "/users",
        data,
      );

    return response.data.data;

  }

  // ==========================================
  // UPDATE
  // ==========================================

  async updateUser(
    id: string,

    data: UpdateUserDTO,
  ) {

    const response =
      await api.put(
        `/users/${id}`,
        data,
      );

    return response.data.data;

  }

  // ==========================================
  // CHANGE ROLE
  // ==========================================

  async changeRole(
    id: string,

    role: string,
  ) {

    const response =
      await api.patch(
        `/users/${id}/role`,
        {
          role,
        },
      );

    return response.data.data;

  }

  // ==========================================
  // DELETE
  // ==========================================

  async deleteUser(
    id: string,
  ) {

    await api.delete(
      `/users/${id}`,
    );

  }

}

export default new UserService();