// ============================================
// 📄 src/hooks/useAnalytics.ts
// ============================================

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import AnalyticsService from "../services/analytics.service";

import type {
  AnalyticsData,
} from "../types/analytics.types";

export const useAnalytics = () => {

  const [
    analytics,
    setAnalytics,
  ] =
    useState<AnalyticsData | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // ==========================================
  // FETCH
  // ==========================================

  const fetchAnalytics =
    useCallback(async () => {

      try {

        setLoading(true);

        setError(null);

        const data =
          await AnalyticsService.getAnalytics();

        setAnalytics(data);

      } catch (error) {

        console.error(error);

        setError(
          "Failed to load analytics.",
        );

      } finally {

        setLoading(false);

      }

    }, []);

  useEffect(() => {

    fetchAnalytics();

  }, [fetchAnalytics]);

  return {

    analytics,

    loading,

    error,

    refresh: fetchAnalytics,

  };

};