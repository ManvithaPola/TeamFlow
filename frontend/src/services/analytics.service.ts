// ============================================
// 📄 src/services/analytics.service.ts
// ============================================

import api from "../api/axios";

import type {
  AnalyticsData,
  AnalyticsResponse,
} from "../types/analytics.types";

class AnalyticsService {

  // ==========================================
  // GET ANALYTICS
  // ==========================================

  async getAnalytics(): Promise<AnalyticsData> {

    const response =
      await api.get<AnalyticsResponse>(
        "/analytics",
      );

    return response.data.data;

  }

}

export default new AnalyticsService();