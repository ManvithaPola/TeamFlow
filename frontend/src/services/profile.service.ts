// ============================================
// 📄 src/services/profile.service.ts
// ============================================

import api from "../api/axios";

import type {
  Profile,
  ProfileResponse,
  UpdateProfileDTO,
} from "../types/profile.types";

class ProfileService {
  // ==========================================
  // GET PROFILE
  // ==========================================

  async getProfile(): Promise<Profile> {
    const response =
      await api.get<ProfileResponse>(
        "/users/me",
      );

    return response.data.data;
  }

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  async updateProfile(
    data: UpdateProfileDTO,
  ): Promise<Profile> {
    const response =
      await api.put<ProfileResponse>(
        "/users/me",
        data,
      );

    return response.data.data;
  }
}

export default new ProfileService();