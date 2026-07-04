// ============================================
// 📄 src/hooks/useReviews.ts
// ============================================

import { useCallback, useEffect, useState } from "react";

import ReviewService from "../services/review.service";

import type {
  Review,
  UpdateReviewDTO,
} from "../types/review.types";

export const useReviews = () => {

  const [reviews, setReviews] =
    useState<Review[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD REVIEWS
  // ==========================================

  const loadReviews = useCallback(
    async () => {

      try {

        setLoading(true);

        const data =
          await ReviewService.getReviews();

        setReviews(data);

        setError("");

      } catch (error: any) {

        setError(
          error.response?.data?.message ??
            "Failed to load reviews.",
        );

      } finally {

        setLoading(false);

      }

    },
    [],
  );

  // ==========================================
  // UPDATE REVIEW
  // ==========================================

  const updateReview = async (
    reviewId: string,
    data: UpdateReviewDTO,
  ) => {

    const updated =
      await ReviewService.updateReview(
        reviewId,
        data,
      );

    setReviews((previous) =>
      previous.map((review) =>
        review.id === reviewId
          ? updated
          : review,
      ),
    );

    return updated;

  };

  useEffect(() => {

    loadReviews();

  }, [loadReviews]);

  return {

    reviews,

    loading,

    error,

    refresh: loadReviews,

    updateReview,

  };

};