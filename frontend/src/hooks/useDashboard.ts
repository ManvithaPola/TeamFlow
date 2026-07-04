// ============================================
// 📄 src/hooks/useDashboard.ts
// ============================================

import { useCallback, useEffect, useState } from "react";

import DashboardService from "../services/dashboard.service";

import type { DashboardData } from "../types/dashboard.types";

export const useDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // ============================================
  // Fetch Dashboard Data
  // ============================================

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await DashboardService.getDashboard();

      setDashboard(data);
    } catch (err: unknown) {
      console.error(err);

      setError("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
  // Initial Load
  // ============================================

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // ============================================
  // Return
  // ============================================

  return {
    dashboard,
    loading,
    error,
    refresh: fetchDashboard,
  };
};