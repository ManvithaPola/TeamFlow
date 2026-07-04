// ============================================
// 📄 src/services/review.service.ts
// ============================================

import api from "../api/axios";

import type {
  Review,
  ReviewsResponse,
  UpdateReviewDTO,
} from "../types/review.types";

class ReviewService {

  // ==========================================
  // GET ALL REVIEWS
  // ==========================================

  async getReviews(): Promise<Review[]> {

    const response =
      await api.get<ReviewsResponse>(
        "/reviews",
      );

    return response.data.data;

  }

  // ==========================================
  // UPDATE REVIEW
  // ==========================================

  async updateReview(
    reviewId: string,
    data: UpdateReviewDTO,
  ): Promise<Review> {

    const response =
      await api.patch<{
        success: boolean;
        data: Review;
      }>(
        `/reviews/${reviewId}`,
        data,
      );

    return response.data.data;

  }

}

export default new ReviewService();