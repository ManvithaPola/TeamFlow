import { Router } from "express";

import RCASectionController from "./rcaSection.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/authorize.middleware";

const router = Router();

// ==========================================
// CREATE SECTION
// ==========================================

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  RCASectionController.create,
);

// ==========================================
// GET SECTIONS OF AN RCA
// ==========================================

router.get(
  "/rca/:rcaId",
  authenticate,
  RCASectionController.getByRCA,
);

// ==========================================
// UPDATE SECTION
// ==========================================

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  RCASectionController.update,
);

// ==========================================
// DELETE SECTION
// ==========================================

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  RCASectionController.delete,
);

// ==========================================
// REORDER SECTIONS
// ==========================================

router.put(
  "/reorder",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  RCASectionController.reorder,
);

export default router;