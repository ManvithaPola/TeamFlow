// ============================================
// 📄 src/modules/reviews/review.controller.ts
// ============================================

import { Request, Response } from "express";

import ReviewService from "./review.service";

import { ReviewStatus } from "@prisma/client";

class ReviewController {

  // ==========================================
  // GET ALL REVIEWS
  // ==========================================

  async getAll(
    req: Request,
    res: Response,
  ) {

    try {

      const reviews =
        await ReviewService.getReviews();

      return res.json({

        success: true,

        data: reviews,

      });

    } catch (error: any) {

      return res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }

  // ==========================================
  // UPDATE REVIEW
  // ==========================================

  async update(
    req: Request,
    res: Response,
  ) {

    try {

      const review =
        await ReviewService.updateReview(

          req.params.id,

          req.body.status as ReviewStatus,

          req.body.comment,

        );

      return res.json({

        success: true,

        message:
          "Review updated successfully.",

        data: review,

      });

    } catch (error: any) {

      return res.status(400).json({

        success: false,

        message: error.message,

      });

    }

  }

}

export default new ReviewController();