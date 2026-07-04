// ============================================
// 📄 src/services/dashboard.service.ts
// ============================================

import api from "../api/axios";
import type {
  DashboardData,
  DashboardResponse,
} from "../types/dashboard.types";

class DashboardService {
  // ============================================
  // Get Dashboard Data
  // ============================================

  async getDashboard(): Promise<DashboardData> {
    const response = await api.get<DashboardResponse>("/dashboard");

    return response.data.data;
  }
}

export default new DashboardService();