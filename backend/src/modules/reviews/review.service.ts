// ============================================
// 📄 src/modules/reviews/review.service.ts
// ============================================

import prisma from "../../lib/prisma";
import { ReviewStatus } from "@prisma/client";

class ReviewService {

  // ==========================================
  // GET ALL REVIEWS
  // ==========================================

  async getReviews() {

    return prisma.rCAReview.findMany({

      include: {

        reviewer: {

          select: {

            id: true,

            name: true,

            email: true,

            avatar: true,

          },

        },

        rca: {

          select: {

            id: true,

            title: true,

            incident: true,

            severity: true,

            status: true,

            project: {

              select: {

                id: true,

                title: true,

              },

            },

          },

        },

      },

      orderBy: {

        reviewedAt: "desc",

      },

    });

  }

  // ==========================================
  // UPDATE REVIEW
  // ==========================================

  async updateReview(
    reviewId: string,
    status: ReviewStatus,
    comment?: string,
  ) {

    const review =
      await prisma.rCAReview.findUnique({

        where: {

          id: reviewId,

        },

      });

    if (!review) {

      throw new Error(
        "Review not found",
      );

    }

    return prisma.rCAReview.update({

      where: {

        id: reviewId,

      },

      data: {

        status,

        comment,

        reviewedAt: new Date(),

      },

      include: {

        reviewer: true,

        rca: {

          include: {

            project: true,

          },

        },

      },

    });

  }

}

export default new ReviewService();