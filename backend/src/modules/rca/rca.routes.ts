import { Router } from "express";
import RCAController from "./rca.controller";
import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";
const router = Router();

// ==========================================
// RCA CRUD
// ==========================================

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  RCAController.create
);

router.get(
  "/",
  authenticate,
  RCAController.getAll
);

router.get(
  "/:id",
  authenticate,
  RCAController.getOne
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  RCAController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  RCAController.delete
);

router.get(
  "/project/:projectId",
  authenticate,
  RCAController.getByProject
);

// ==========================================
// RCA WORKFLOW
// ==========================================

// Submit RCA

router.put(
  "/:id/submit",
  authenticate,
  RCAController.submit
);

// Review RCA

router.post(
  "/:id/review",
  authenticate,
  authorize("REVIEWER"),
  RCAController.review
);

// Get Reviews

router.get(
  "/:id/reviews",
  authenticate,
  RCAController.getReviews
);

// Close RCA

router.put(
  "/:id/close",
  authenticate,
  RCAController.close
);

export default router;