// ============================================
// 📄 src/hooks/useProfile.ts
// ============================================

import { useCallback, useEffect, useState } from "react";

import ProfileService from "../services/profile.service";

import type {
  Profile,
  UpdateProfileDTO,
} from "../types/profile.types";

export const useProfile = () => {
  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);

      const data =
        await ProfileService.getProfile();

      setProfile(data);

      setError("");
    } catch (error: any) {
      setError(
        error.response?.data?.message ??
          "Failed to load profile.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const updateProfile = async (
    data: UpdateProfileDTO,
  ) => {
    const updated =
      await ProfileService.updateProfile(data);

    setProfile(updated);

    return updated;
  };

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    profile,
    loading,
    error,
    loadProfile,
    updateProfile,
  };
};