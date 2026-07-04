// ============================================
// 📄 src/services/auth.service.ts
// ============================================

import api from "../api/axios";
import type { LoginRequest, LoginResponse } from "../types/auth.types";

class AuthService {
  // ===============================
  // LOGIN
  // ===============================

  async login(data: LoginRequest) {
    const response = await api.post("/auth/login", data);

    return response.data.data;
  }

  // ===============================
  // LOGOUT
  // ===============================

  logout(): Promise<void> {
    // Backend logout endpoint is optional — local session
    // clearing is handled by AuthContext.
    return Promise.resolve();
  }

  // ===============================
  // GET CURRENT USER (future use)
  // ===============================

  async getProfile() {
    const response = await api.get("/users/me");
    return response.data;
  }
}

export default new AuthService();
