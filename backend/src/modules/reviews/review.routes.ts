// ============================================
// 📄 src/modules/reviews/review.routes.ts
// ============================================

import { Router } from "express";

import ReviewController from "./review.controller";

import {
  authenticate,
} from "../../middleware/auth.middleware";

import {
  authorize,
} from "../../middleware/authorize.middleware";

import { Role } from "@prisma/client";

const router = Router();

// ==========================================
// GET ALL REVIEWS
// ==========================================

router.get(
  "/",
  authenticate,
  ReviewController.getAll,
);

// ==========================================
// UPDATE REVIEW
// ==========================================

router.patch(
  "/:id",
  authenticate,
  authorize(
    Role.ADMIN,
    Role.MANAGER,
    Role.REVIEWER,
  ),
  ReviewController.update,
);

export default router;